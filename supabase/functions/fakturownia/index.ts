import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { hashSync, compareSync } from "https://deno.land/x/bcrypt@v0.4.1/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, x-supabase-client-platform, apikey, content-type',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
};

// Security constants
const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_DURATION_MINUTES = 15;
const PASSWORD_MIN_LENGTH = 8;
const OTP_EXPIRY_MINUTES = 10;
const MAX_OTP_ATTEMPTS = 5;

// Email config
const EMAIL_FROM = "automat@rawinet.pl";

// Helper function to safely parse JSON response
async function safeJsonParse(response: Response, url: string) {
  const text = await response.text();
  
  if (!response.ok) {
    console.error(`Fakturownia API error: ${response.status} ${response.statusText}`);
    console.error(`URL: ${url}`);
    console.error(`Response: ${text.substring(0, 500)}`);
    throw new Error(`Fakturownia API error: ${response.status} ${response.statusText}`);
  }
  
  if (text.trim().startsWith('<!DOCTYPE') || text.trim().startsWith('<html')) {
    console.error(`Fakturownia returned HTML instead of JSON`);
    console.error(`URL: ${url}`);
    console.error(`Response: ${text.substring(0, 500)}`);
    throw new Error('Fakturownia API returned an error page. Please check credentials.');
  }
  
  try {
    return JSON.parse(text);
  } catch (e) {
    console.error(`Failed to parse JSON from Fakturownia`);
    console.error(`URL: ${url}`);
    console.error(`Response: ${text.substring(0, 500)}`);
    throw new Error('Invalid JSON response from Fakturownia');
  }
}

// Password validation function
function validatePasswordStrength(password: string): { valid: boolean; message?: string } {
  if (password.length < PASSWORD_MIN_LENGTH) {
    return { valid: false, message: `Hasło musi mieć minimum ${PASSWORD_MIN_LENGTH} znaków` };
  }
  if (!/[A-Z]/.test(password)) {
    return { valid: false, message: 'Hasło musi zawierać co najmniej jedną wielką literę' };
  }
  if (!/[0-9]/.test(password)) {
    return { valid: false, message: 'Hasło musi zawierać co najmniej jedną cyfrę' };
  }
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    return { valid: false, message: 'Hasło musi zawierać co najmniej jeden znak specjalny' };
  }
  return { valid: true };
}

// Generate secure random password
function generateSecurePassword(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789';
  const specialChars = '!@#$%&*';
  let password = 'Rawi';
  
  for (let i = 0; i < 6; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  
  password += specialChars.charAt(Math.floor(Math.random() * specialChars.length));
  password += chars.charAt(Math.floor(Math.random() * chars.length));
  
  return password;
}

// Generate 6-digit OTP code
function generateOtpCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Generate session token
function generateSessionToken(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let token = '';
  for (let i = 0; i < 64; i++) {
    token += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return token;
}

// Send email via SMTP (home.pl)
async function sendEmail(to: string, subject: string, htmlBody: string): Promise<boolean> {
  try {
    const smtpPassword = Deno.env.get('SMTP_PASSWORD');
    if (!smtpPassword) {
      console.error('SMTP_PASSWORD not configured');
      return false;
    }

    const client = new SmtpClient();
    
    await client.connectTLS({
      hostname: SMTP_HOST,
      port: SMTP_PORT,
      username: SMTP_FROM,
      password: smtpPassword,
    });

    await client.send({
      from: SMTP_FROM,
      to: to,
      subject: subject,
      content: htmlBody,
      html: htmlBody,
    });

    await client.close();
    console.log(`Email sent to ${to}: ${subject}`);
    return true;
  } catch (error) {
    console.error('Failed to send email:', error);
    return false;
  }
}

// Email templates
function getPasswordEmailHtml(password: string): string {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, #6366f1, #8b5cf6); padding: 30px; border-radius: 12px 12px 0 0; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 24px;">RAWI-NET</h1>
        <p style="color: rgba(255,255,255,0.8); margin: 8px 0 0;">Panel Klienta</p>
      </div>
      <div style="background: #ffffff; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 12px 12px;">
        <h2 style="color: #1f2937; margin-top: 0;">Twoje dane logowania</h2>
        <p style="color: #6b7280;">Twoje hasło do Panelu Klienta RAWI-NET zostało wygenerowane:</p>
        <div style="background: #f3f4f6; border: 2px dashed #d1d5db; border-radius: 8px; padding: 20px; text-align: center; margin: 20px 0;">
          <p style="font-size: 24px; font-weight: bold; color: #1f2937; letter-spacing: 2px; margin: 0;">${password}</p>
        </div>
        <p style="color: #6b7280; font-size: 14px;">Po pierwszym logowaniu zostaniesz poproszony o zmianę hasła na własne.</p>
        <p style="color: #ef4444; font-size: 14px; font-weight: 500;">⚠️ Nie udostępniaj nikomu tego hasła.</p>
        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;">
        <p style="color: #9ca3af; font-size: 12px; text-align: center;">RAWI-NET — Twój dostawca internetu</p>
      </div>
    </div>
  `;
}

function getOtpEmailHtml(code: string): string {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, #6366f1, #8b5cf6); padding: 30px; border-radius: 12px 12px 0 0; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 24px;">RAWI-NET</h1>
        <p style="color: rgba(255,255,255,0.8); margin: 8px 0 0;">Weryfikacja urządzenia</p>
      </div>
      <div style="background: #ffffff; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 12px 12px;">
        <h2 style="color: #1f2937; margin-top: 0;">Kod weryfikacyjny</h2>
        <p style="color: #6b7280;">Wykryliśmy logowanie z nowego urządzenia. Wprowadź poniższy kod, aby potwierdzić swoją tożsamość:</p>
        <div style="background: #f3f4f6; border-radius: 8px; padding: 20px; text-align: center; margin: 20px 0;">
          <p style="font-size: 36px; font-weight: bold; color: #1f2937; letter-spacing: 8px; margin: 0;">${code}</p>
        </div>
        <p style="color: #6b7280; font-size: 14px;">Kod jest ważny przez <strong>${OTP_EXPIRY_MINUTES} minut</strong>.</p>
        <p style="color: #ef4444; font-size: 14px; font-weight: 500;">Jeśli to nie Ty — zignoruj tę wiadomość i zmień hasło.</p>
        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;">
        <p style="color: #9ca3af; font-size: 12px; text-align: center;">RAWI-NET — Twój dostawca internetu</p>
      </div>
    </div>
  `;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const FAKTUROWNIA_API_TOKEN = Deno.env.get('FAKTUROWNIA_API_TOKEN');
    const FAKTUROWNIA_DOMAIN = Deno.env.get('FAKTUROWNIA_DOMAIN');
    const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    const supabaseAdmin = createClient(
      SUPABASE_URL!,
      SUPABASE_SERVICE_ROLE_KEY!
    );

    const body = await req.json();
    const { action, clientId, email, invoiceId, password, newPassword, clientName, ipAddress, deviceFingerprint, otpCode } = body;

    // ============= Authentication Actions =============
    
    if (action === 'verifyPassword') {
      if (!email || !password) {
        return new Response(
          JSON.stringify({ error: 'Email i hasło są wymagane' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      const normalizedEmail = email.toLowerCase().trim();

      // Get client credentials
      const { data: credentials, error: credError } = await supabaseAdmin
        .from('client_credentials')
        .select('*')
        .eq('email', normalizedEmail)
        .maybeSingle();

      if (credError) {
        console.error('Database error:', credError);
        return new Response(
          JSON.stringify({ error: 'Błąd serwera' }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // --- FIRST TIME LOGIN: no credentials exist yet ---
      if (!credentials) {
        // Check if client exists in Fakturownia by email
        if (FAKTUROWNIA_API_TOKEN && FAKTUROWNIA_DOMAIN) {
          let domain = FAKTUROWNIA_DOMAIN.replace(/^https?:\/\//, '');
          if (!domain.includes('.fakturownia.pl')) {
            domain = `${domain}.fakturownia.pl`;
          }
          const baseUrl = `https://${domain}`;
          const apiTokenParam = encodeURIComponent(FAKTUROWNIA_API_TOKEN);
          const clientUrl = `${baseUrl}/clients.json?api_token=${apiTokenParam}&email=${encodeURIComponent(normalizedEmail)}`;
          
          try {
            const clientResponse = await fetch(clientUrl, { 
              headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
            });
            const clients = await safeJsonParse(clientResponse, clientUrl.replace(apiTokenParam, '***'));
            
            if (clients && clients.length > 0) {
              // Client found in Fakturownia — generate password and send via email
              const generatedPassword = generateSecurePassword();
              const passwordHash = hashSync(generatedPassword);
              
              await supabaseAdmin.from('client_credentials').insert({
                email: normalizedEmail,
                password_hash: passwordHash,
                client_name: clients[0].name || null,
                must_change_password: true,
                failed_attempts: 0,
                temp_password: generatedPassword,
              });

              // Send password via email
              const emailSent = await sendEmail(
                normalizedEmail,
                'RAWI-NET — Twoje hasło do Panelu Klienta',
                getPasswordEmailHtml(generatedPassword)
              );

              await supabaseAdmin.from('login_attempts').insert({
                email: normalizedEmail,
                success: false,
                ip_address: ipAddress || null
              });

              return new Response(
                JSON.stringify({ 
                  valid: false, 
                  firstLogin: true,
                  emailSent,
                  message: emailSent 
                    ? 'Hasło zostało wysłane na Twój adres email. Sprawdź skrzynkę i zaloguj się ponownie.'
                    : 'Nie udało się wysłać emaila. Skontaktuj się z biurem.'
                }),
                { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
              );
            }
          } catch (apiErr) {
            console.error('Fakturownia API check error:', apiErr);
          }
        }

        // Not found anywhere
        await supabaseAdmin.from('login_attempts').insert({
          email: normalizedEmail,
          success: false,
          ip_address: ipAddress || null
        });
        
        return new Response(
          JSON.stringify({ valid: false, message: 'Nieprawidłowy email lub hasło' }),
          { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Check if account is locked
      if (credentials.locked_until && new Date(credentials.locked_until) > new Date()) {
        const remainingMinutes = Math.ceil(
          (new Date(credentials.locked_until).getTime() - Date.now()) / 60000
        );
        
        await supabaseAdmin.from('login_attempts').insert({
          email: normalizedEmail,
          success: false,
          ip_address: ipAddress || null
        });
        
        return new Response(
          JSON.stringify({ 
            valid: false, 
            locked: true,
            lockedUntil: credentials.locked_until,
            message: `Konto zablokowane. Spróbuj ponownie za ${remainingMinutes} minut.`
          }),
          { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Verify password
      const passwordValid = compareSync(password, credentials.password_hash);

      if (!passwordValid) {
        const newFailedAttempts = (credentials.failed_attempts || 0) + 1;
        const shouldLock = newFailedAttempts >= MAX_FAILED_ATTEMPTS;
        
        const updateData: Record<string, unknown> = {
          failed_attempts: newFailedAttempts
        };
        
        if (shouldLock) {
          const lockUntil = new Date();
          lockUntil.setMinutes(lockUntil.getMinutes() + LOCKOUT_DURATION_MINUTES);
          updateData.locked_until = lockUntil.toISOString();
        }
        
        await supabaseAdmin
          .from('client_credentials')
          .update(updateData)
          .eq('id', credentials.id);
        
        await supabaseAdmin.from('login_attempts').insert({
          email: normalizedEmail,
          success: false,
          ip_address: ipAddress || null
        });
        
        const remainingAttempts = MAX_FAILED_ATTEMPTS - newFailedAttempts;
        
        return new Response(
          JSON.stringify({ 
            valid: false, 
            message: shouldLock 
              ? `Konto zablokowane na ${LOCKOUT_DURATION_MINUTES} minut.`
              : `Nieprawidłowe hasło. Pozostało prób: ${Math.max(0, remainingAttempts)}`,
            remainingAttempts: Math.max(0, remainingAttempts),
            locked: shouldLock
          }),
          { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Password correct!
      // If must_change_password, skip device check — go straight to password change
      if (credentials.must_change_password) {
        await supabaseAdmin
          .from('client_credentials')
          .update({
            failed_attempts: 0,
            locked_until: null,
            last_login: new Date().toISOString()
          })
          .eq('id', credentials.id);
        
        await supabaseAdmin.from('login_attempts').insert({
          email: normalizedEmail,
          success: true,
          ip_address: ipAddress || null
        });

        const sessionToken = generateSessionToken();
        const expiresAt = new Date();
        expiresAt.setHours(expiresAt.getHours() + 4);

        return new Response(
          JSON.stringify({ 
            valid: true,
            mustChangePassword: true,
            clientName: credentials.client_name,
            sessionToken,
            expiresAt: expiresAt.toISOString()
          }),
          { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // --- DEVICE CHECK for active accounts ---
      if (deviceFingerprint) {
        const { data: device } = await supabaseAdmin
          .from('client_devices')
          .select('*')
          .eq('client_email', normalizedEmail)
          .eq('device_fingerprint', deviceFingerprint)
          .maybeSingle();

        if (device && device.is_trusted) {
          // Known trusted device — login directly
          await supabaseAdmin
            .from('client_devices')
            .update({ last_seen_at: new Date().toISOString() })
            .eq('id', device.id);

          await supabaseAdmin
            .from('client_credentials')
            .update({
              failed_attempts: 0,
              locked_until: null,
              last_login: new Date().toISOString()
            })
            .eq('id', credentials.id);
          
          await supabaseAdmin.from('login_attempts').insert({
            email: normalizedEmail,
            success: true,
            ip_address: ipAddress || null
          });

          const sessionToken = generateSessionToken();
          const expiresAt = new Date();
          expiresAt.setHours(expiresAt.getHours() + 4);

          return new Response(
            JSON.stringify({ 
              valid: true,
              mustChangePassword: false,
              clientName: credentials.client_name,
              sessionToken,
              expiresAt: expiresAt.toISOString()
            }),
            { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        // New device — send OTP code
        const otpCodeValue = generateOtpCode();
        const otpExpiry = new Date();
        otpExpiry.setMinutes(otpExpiry.getMinutes() + OTP_EXPIRY_MINUTES);

        // Invalidate old unused codes
        await supabaseAdmin
          .from('client_otp_codes')
          .update({ used: true })
          .eq('client_email', normalizedEmail)
          .eq('used', false);

        // Insert new code
        await supabaseAdmin.from('client_otp_codes').insert({
          client_email: normalizedEmail,
          code: otpCodeValue,
          device_fingerprint: deviceFingerprint,
          expires_at: otpExpiry.toISOString(),
        });

        // Send OTP via email
        const emailSent = await sendEmail(
          normalizedEmail,
          'RAWI-NET — Kod weryfikacyjny',
          getOtpEmailHtml(otpCodeValue)
        );

        return new Response(
          JSON.stringify({ 
            valid: false,
            requiresOtp: true,
            emailSent,
            message: emailSent 
              ? 'Wykryto nowe urządzenie. Kod weryfikacyjny został wysłany na Twój email.'
              : 'Nie udało się wysłać kodu weryfikacyjnego. Spróbuj ponownie.'
          }),
          { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // No device fingerprint provided (fallback — e.g. external API client)
      await supabaseAdmin
        .from('client_credentials')
        .update({
          failed_attempts: 0,
          locked_until: null,
          last_login: new Date().toISOString()
        })
        .eq('id', credentials.id);
      
      await supabaseAdmin.from('login_attempts').insert({
        email: normalizedEmail,
        success: true,
        ip_address: ipAddress || null
      });

      const sessionToken = generateSessionToken();
      const expiresAt = new Date();
      expiresAt.setHours(expiresAt.getHours() + 4);

      return new Response(
        JSON.stringify({ 
          valid: true,
          mustChangePassword: credentials.must_change_password,
          clientName: credentials.client_name,
          sessionToken,
          expiresAt: expiresAt.toISOString()
        }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // ============= OTP Verification =============
    if (action === 'verifyOtp') {
      if (!email || !otpCode || !deviceFingerprint) {
        return new Response(
          JSON.stringify({ error: 'Email, kod i identyfikator urządzenia są wymagane' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      const normalizedEmail = email.toLowerCase().trim();

      // Get latest unused OTP for this email
      const { data: otpRecord, error: otpError } = await supabaseAdmin
        .from('client_otp_codes')
        .select('*')
        .eq('client_email', normalizedEmail)
        .eq('used', false)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (otpError || !otpRecord) {
        return new Response(
          JSON.stringify({ valid: false, message: 'Brak aktywnego kodu weryfikacyjnego. Zaloguj się ponownie.' }),
          { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Check expiry
      if (new Date(otpRecord.expires_at) < new Date()) {
        await supabaseAdmin
          .from('client_otp_codes')
          .update({ used: true })
          .eq('id', otpRecord.id);

        return new Response(
          JSON.stringify({ valid: false, expired: true, message: 'Kod wygasł. Zaloguj się ponownie, aby otrzymać nowy kod.' }),
          { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Check attempts
      if ((otpRecord.attempts || 0) >= MAX_OTP_ATTEMPTS) {
        await supabaseAdmin
          .from('client_otp_codes')
          .update({ used: true })
          .eq('id', otpRecord.id);

        return new Response(
          JSON.stringify({ valid: false, message: 'Zbyt wiele prób. Zaloguj się ponownie.' }),
          { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Verify code
      if (otpRecord.code !== otpCode.trim()) {
        await supabaseAdmin
          .from('client_otp_codes')
          .update({ attempts: (otpRecord.attempts || 0) + 1 })
          .eq('id', otpRecord.id);

        const remaining = MAX_OTP_ATTEMPTS - (otpRecord.attempts || 0) - 1;
        return new Response(
          JSON.stringify({ 
            valid: false, 
            message: `Nieprawidłowy kod. Pozostało prób: ${remaining}`,
            remainingAttempts: remaining
          }),
          { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // OTP valid! Mark as used
      await supabaseAdmin
        .from('client_otp_codes')
        .update({ used: true })
        .eq('id', otpRecord.id);

      // Register this device as trusted
      await supabaseAdmin.from('client_devices').upsert({
        client_email: normalizedEmail,
        device_fingerprint: deviceFingerprint,
        device_name: body.deviceName || null,
        last_seen_at: new Date().toISOString(),
        is_trusted: true,
      }, { onConflict: 'client_email,device_fingerprint' });

      // Get credentials for session
      const { data: credentials } = await supabaseAdmin
        .from('client_credentials')
        .select('*')
        .eq('email', normalizedEmail)
        .maybeSingle();

      // Update login
      if (credentials) {
        await supabaseAdmin
          .from('client_credentials')
          .update({
            failed_attempts: 0,
            locked_until: null,
            last_login: new Date().toISOString()
          })
          .eq('id', credentials.id);
      }

      await supabaseAdmin.from('login_attempts').insert({
        email: normalizedEmail,
        success: true,
        ip_address: ipAddress || null
      });

      const sessionToken = generateSessionToken();
      const expiresAt = new Date();
      expiresAt.setHours(expiresAt.getHours() + 4);

      return new Response(
        JSON.stringify({ 
          valid: true,
          mustChangePassword: false,
          clientName: credentials?.client_name || null,
          sessionToken,
          expiresAt: expiresAt.toISOString()
        }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // ============= Resend OTP =============
    if (action === 'resendOtp') {
      if (!email || !deviceFingerprint) {
        return new Response(
          JSON.stringify({ error: 'Email i identyfikator urządzenia są wymagane' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      const normalizedEmail = email.toLowerCase().trim();

      // Check rate limit — max 1 resend per 60 seconds
      const { data: recentOtp } = await supabaseAdmin
        .from('client_otp_codes')
        .select('created_at')
        .eq('client_email', normalizedEmail)
        .eq('used', false)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (recentOtp) {
        const timeSince = Date.now() - new Date(recentOtp.created_at).getTime();
        if (timeSince < 60000) {
          const waitSeconds = Math.ceil((60000 - timeSince) / 1000);
          return new Response(
            JSON.stringify({ success: false, message: `Poczekaj ${waitSeconds}s przed ponownym wysłaniem.` }),
            { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }
      }

      // Invalidate old codes
      await supabaseAdmin
        .from('client_otp_codes')
        .update({ used: true })
        .eq('client_email', normalizedEmail)
        .eq('used', false);

      const otpCodeValue = generateOtpCode();
      const otpExpiry = new Date();
      otpExpiry.setMinutes(otpExpiry.getMinutes() + OTP_EXPIRY_MINUTES);

      await supabaseAdmin.from('client_otp_codes').insert({
        client_email: normalizedEmail,
        code: otpCodeValue,
        device_fingerprint: deviceFingerprint,
        expires_at: otpExpiry.toISOString(),
      });

      const emailSent = await sendEmail(
        normalizedEmail,
        'RAWI-NET — Nowy kod weryfikacyjny',
        getOtpEmailHtml(otpCodeValue)
      );

      return new Response(
        JSON.stringify({ 
          success: emailSent, 
          message: emailSent ? 'Nowy kod został wysłany.' : 'Nie udało się wysłać kodu.' 
        }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (action === 'changePassword') {
      if (!email || !password || !newPassword) {
        return new Response(
          JSON.stringify({ error: 'Wszystkie pola są wymagane' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      const normalizedEmail = email.toLowerCase().trim();

      const validation = validatePasswordStrength(newPassword);
      if (!validation.valid) {
        return new Response(
          JSON.stringify({ success: false, message: validation.message }),
          { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      const { data: credentials, error: credError } = await supabaseAdmin
        .from('client_credentials')
        .select('*')
        .eq('email', normalizedEmail)
        .maybeSingle();

      if (credError || !credentials) {
        return new Response(
          JSON.stringify({ success: false, message: 'Nie znaleziono konta' }),
          { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      const passwordValid = compareSync(password, credentials.password_hash);
      if (!passwordValid) {
        return new Response(
          JSON.stringify({ success: false, message: 'Nieprawidłowe aktualne hasło' }),
          { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      const newPasswordHash = hashSync(newPassword);

      const { error: updateError } = await supabaseAdmin
        .from('client_credentials')
        .update({
          password_hash: newPasswordHash,
          must_change_password: false,
          temp_password: null,
        })
        .eq('id', credentials.id);

      if (updateError) {
        console.error('Update error:', updateError);
        return new Response(
          JSON.stringify({ success: false, message: 'Błąd podczas zmiany hasła' }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // After password change, register the current device as trusted if fingerprint provided
      if (deviceFingerprint) {
        await supabaseAdmin.from('client_devices').upsert({
          client_email: normalizedEmail,
          device_fingerprint: deviceFingerprint,
          device_name: body.deviceName || null,
          last_seen_at: new Date().toISOString(),
          is_trusted: true,
        }, { onConflict: 'client_email,device_fingerprint' });
      }

      return new Response(
        JSON.stringify({ success: true, message: 'Hasło zostało zmienione' }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (action === 'setClientPassword') {
      if (!email) {
        return new Response(
          JSON.stringify({ error: 'Email jest wymagany' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      const normalizedEmail = email.toLowerCase().trim();
      const generatedPassword = generateSecurePassword();
      const passwordHash = hashSync(generatedPassword);

      const { error: upsertError } = await supabaseAdmin
        .from('client_credentials')
        .upsert({
          email: normalizedEmail,
          password_hash: passwordHash,
          client_name: clientName || null,
          must_change_password: true,
          failed_attempts: 0,
          locked_until: null,
          temp_password: generatedPassword
        }, {
          onConflict: 'email'
        });

      if (upsertError) {
        console.error('Upsert error:', upsertError);
        return new Response(
          JSON.stringify({ success: false, error: 'Błąd podczas zapisywania' }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Send password via email
      const emailSent = await sendEmail(
        normalizedEmail,
        'RAWI-NET — Twoje hasło do Panelu Klienta',
        getPasswordEmailHtml(generatedPassword)
      );

      return new Response(
        JSON.stringify({ 
          success: true, 
          generatedPassword,
          emailSent,
          message: emailSent 
            ? 'Hasło wygenerowane i wysłane na email klienta.'
            : 'Hasło wygenerowane, ale nie udało się wysłać emaila. Przekaż hasło ręcznie.'
        }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (action === 'getClientInvoicesAdmin') {
      if (!FAKTUROWNIA_API_TOKEN || !FAKTUROWNIA_DOMAIN) {
        return new Response(
          JSON.stringify({ error: 'Fakturownia credentials not configured' }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      if (!email) {
        return new Response(
          JSON.stringify({ error: 'Email jest wymagany' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      let domain = FAKTUROWNIA_DOMAIN.replace(/^https?:\/\//, '');
      if (!domain.includes('.fakturownia.pl')) {
        domain = `${domain}.fakturownia.pl`;
      }
      const baseUrl = `https://${domain}`;
      const apiTokenParam = encodeURIComponent(FAKTUROWNIA_API_TOKEN);

      const clientUrl = `${baseUrl}/clients.json?api_token=${apiTokenParam}&email=${encodeURIComponent(email)}`;
      const clientResponse = await fetch(clientUrl, { 
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
      });
      const clients = await safeJsonParse(clientResponse, clientUrl.replace(apiTokenParam, '***'));

      if (!clients || clients.length === 0) {
        return new Response(
          JSON.stringify({ invoices: [], client: null }),
          { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      const client = clients[0];
      const invoicesUrl = `${baseUrl}/invoices.json?api_token=${apiTokenParam}&client_id=${client.id}`;
      const invoicesResponse = await fetch(invoicesUrl, { 
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
      });
      const invoices = await safeJsonParse(invoicesResponse, invoicesUrl.replace(apiTokenParam, '***'));

      return new Response(
        JSON.stringify({ invoices, client }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (action === 'getClientTempPassword') {
      if (!email) {
        return new Response(
          JSON.stringify({ error: 'Email jest wymagany' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      const normalizedEmail = email.toLowerCase().trim();

      const { data: credentials, error } = await supabaseAdmin
        .from('client_credentials')
        .select('temp_password, must_change_password')
        .eq('email', normalizedEmail)
        .maybeSingle();

      if (error || !credentials) {
        return new Response(
          JSON.stringify({ tempPassword: null }),
          { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      return new Response(
        JSON.stringify({ 
          tempPassword: credentials.must_change_password ? credentials.temp_password : null,
          mustChangePassword: credentials.must_change_password
        }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (action === 'unlockAccount') {
      if (!email) {
        return new Response(
          JSON.stringify({ error: 'Email jest wymagany' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      const normalizedEmail = email.toLowerCase().trim();

      const { error: updateError } = await supabaseAdmin
        .from('client_credentials')
        .update({ failed_attempts: 0, locked_until: null })
        .eq('email', normalizedEmail);

      if (updateError) {
        return new Response(
          JSON.stringify({ success: false, error: 'Błąd podczas odblokowywania' }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      return new Response(
        JSON.stringify({ success: true, message: 'Konto zostało odblokowane' }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (action === 'verifyAdminPassword') {
      if (!email || !password) {
        return new Response(
          JSON.stringify({ error: 'Email i hasło są wymagane' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      const normalizedEmail = email.toLowerCase().trim();

      const { data: credentials, error: credError } = await supabaseAdmin
        .from('admin_credentials')
        .select('*')
        .eq('email', normalizedEmail)
        .maybeSingle();

      if (credError) {
        console.error('Database error:', credError);
        return new Response(
          JSON.stringify({ error: 'Błąd serwera' }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      if (!credentials) {
        return new Response(
          JSON.stringify({ valid: false, message: 'Nieprawidłowy email lub hasło' }),
          { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      if (credentials.locked_until && new Date(credentials.locked_until) > new Date()) {
        const remainingMinutes = Math.ceil(
          (new Date(credentials.locked_until).getTime() - Date.now()) / 60000
        );
        
        return new Response(
          JSON.stringify({ 
            valid: false, 
            locked: true,
            message: `Konto zablokowane. Spróbuj ponownie za ${remainingMinutes} minut.`
          }),
          { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      const passwordValid = compareSync(password, credentials.password_hash);

      if (!passwordValid) {
        const newFailedAttempts = (credentials.failed_attempts || 0) + 1;
        const shouldLock = newFailedAttempts >= MAX_FAILED_ATTEMPTS;
        
        const updateData: Record<string, unknown> = { failed_attempts: newFailedAttempts };
        
        if (shouldLock) {
          const lockUntil = new Date();
          lockUntil.setMinutes(lockUntil.getMinutes() + LOCKOUT_DURATION_MINUTES);
          updateData.locked_until = lockUntil.toISOString();
        }
        
        await supabaseAdmin
          .from('admin_credentials')
          .update(updateData)
          .eq('id', credentials.id);
        
        const remainingAttempts = MAX_FAILED_ATTEMPTS - newFailedAttempts;
        
        return new Response(
          JSON.stringify({ 
            valid: false, 
            message: shouldLock 
              ? `Konto zablokowane na ${LOCKOUT_DURATION_MINUTES} minut.`
              : `Nieprawidłowe hasło. Pozostało prób: ${Math.max(0, remainingAttempts)}`,
            remainingAttempts: Math.max(0, remainingAttempts),
            locked: shouldLock
          }),
          { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      await supabaseAdmin
        .from('admin_credentials')
        .update({
          failed_attempts: 0,
          locked_until: null,
          last_login: new Date().toISOString()
        })
        .eq('id', credentials.id);

      const sessionToken = generateSessionToken();
      const expiresAt = new Date();
      expiresAt.setHours(expiresAt.getHours() + 4);

      return new Response(
        JSON.stringify({ 
          valid: true,
          sessionToken,
          expiresAt: expiresAt.toISOString()
        }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (action === 'initializeAdminAccount') {
      if (!email || !password) {
        return new Response(
          JSON.stringify({ error: 'Email i hasło są wymagane' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      const normalizedEmail = email.toLowerCase().trim();

      const { data: existing } = await supabaseAdmin
        .from('admin_credentials')
        .select('id')
        .eq('email', normalizedEmail)
        .maybeSingle();

      if (existing) {
        return new Response(
          JSON.stringify({ success: false, message: 'Admin już istnieje' }),
          { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      const passwordHash = hashSync(password);

      const { error: insertError } = await supabaseAdmin
        .from('admin_credentials')
        .insert({ email: normalizedEmail, password_hash: passwordHash });

      if (insertError) {
        console.error('Insert error:', insertError);
        return new Response(
          JSON.stringify({ success: false, error: 'Błąd podczas tworzenia konta' }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      return new Response(
        JSON.stringify({ success: true, message: 'Konto admina utworzone' }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (action === 'getAllClients') {
      if (!FAKTUROWNIA_API_TOKEN || !FAKTUROWNIA_DOMAIN) {
        return new Response(
          JSON.stringify({ error: 'Fakturownia credentials not configured' }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      let domain = FAKTUROWNIA_DOMAIN.replace(/^https?:\/\//, '');
      if (!domain.includes('.fakturownia.pl')) {
        domain = `${domain}.fakturownia.pl`;
      }
      const baseUrl = `https://${domain}`;
      const apiTokenParam = encodeURIComponent(FAKTUROWNIA_API_TOKEN);

      let allClients: Array<{ email: string; id: number; name: string }> = [];
      let page = 1;
      const perPage = 100;
      
      while (true) {
        const url = `${baseUrl}/clients.json?api_token=${apiTokenParam}&page=${page}&per_page=${perPage}`;
        const response = await fetch(url, { 
          headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
        });
        const pageData = await safeJsonParse(response, url.replace(apiTokenParam, '***'));
        
        if (!pageData || pageData.length === 0) break;
        allClients = allClients.concat(pageData);
        if (pageData.length < perPage) break;
        page++;
        if (page > 100) {
          console.warn('Reached maximum page limit (100) for clients');
          break;
        }
      }

      console.log(`Fetched ${allClients.length} clients from Fakturownia (${page} pages)`);

      const emails = allClients.map((c) => c.email?.toLowerCase()).filter(Boolean);
      const { data: credentials } = await supabaseAdmin
        .from('client_credentials')
        .select('email, must_change_password, failed_attempts, locked_until, last_login')
        .in('email', emails);

      const credMap = new Map(credentials?.map(c => [c.email, c]) || []);

      const clientsWithStatus = allClients.map((client) => ({
        ...client,
        hasCredentials: credMap.has(client.email?.toLowerCase()),
        credentialStatus: credMap.get(client.email?.toLowerCase()) || null
      }));

      return new Response(
        JSON.stringify(clientsWithStatus),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (action === 'getClientCredentialsList') {
      const { data: credentials, error } = await supabaseAdmin
        .from('client_credentials')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        return new Response(
          JSON.stringify({ error: 'Błąd pobierania danych' }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      return new Response(
        JSON.stringify(credentials),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (action === 'getLoginHistory') {
      const { data: attempts, error } = await supabaseAdmin
        .from('login_attempts')
        .select('*')
        .order('attempted_at', { ascending: false })
        .limit(100);

      if (error) {
        return new Response(
          JSON.stringify({ error: 'Błąd pobierania historii' }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      return new Response(
        JSON.stringify(attempts),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // ============= Fakturownia API Actions =============

    if (!FAKTUROWNIA_API_TOKEN || !FAKTUROWNIA_DOMAIN) {
      return new Response(
        JSON.stringify({ error: 'Fakturownia credentials not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    let domain = FAKTUROWNIA_DOMAIN.replace(/^https?:\/\//, '');
    if (!domain.includes('.fakturownia.pl')) {
      domain = `${domain}.fakturownia.pl`;
    }
    const baseUrl = `https://${domain}`;
    const apiTokenParam = encodeURIComponent(FAKTUROWNIA_API_TOKEN);
    
    console.log(`Fakturownia request: action=${action}, baseUrl=${baseUrl}`);
    
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    };

    let response;
    let data;
    let url: string;

    switch (action) {
      case 'getClientByEmail':
        url = `${baseUrl}/clients.json?api_token=${apiTokenParam}&email=${encodeURIComponent(email)}`;
        response = await fetch(url, { headers });
        data = await safeJsonParse(response, url.replace(apiTokenParam, '***'));
        break;

      case 'getClient':
        url = `${baseUrl}/clients/${clientId}.json?api_token=${apiTokenParam}`;
        response = await fetch(url, { headers });
        data = await safeJsonParse(response, url.replace(apiTokenParam, '***'));
        break;

      case 'getClientInvoices':
        url = `${baseUrl}/invoices.json?api_token=${apiTokenParam}&client_id=${clientId}`;
        response = await fetch(url, { headers });
        const allInvoices = await safeJsonParse(response, url.replace(apiTokenParam, '***'));
        data = allInvoices.filter((invoice: { issue_date?: string; sell_date?: string }) => {
          const invoiceDate = invoice.issue_date || invoice.sell_date;
          if (!invoiceDate) return false;
          const year = new Date(invoiceDate).getFullYear();
          return year >= 2026;
        });
        break;

      case 'getInvoice':
        url = `${baseUrl}/invoices/${invoiceId}.json?api_token=${apiTokenParam}`;
        response = await fetch(url, { headers });
        data = await safeJsonParse(response, url.replace(apiTokenParam, '***'));
        break;

      case 'getInvoicePdf':
        url = `${baseUrl}/invoices/${invoiceId}.json?api_token=${apiTokenParam}`;
        response = await fetch(url, { headers });
        const invoice = await safeJsonParse(response, url.replace(apiTokenParam, '***'));
        data = {
          pdfUrl: `${baseUrl}/invoices/${invoiceId}.pdf?api_token=${apiTokenParam}`,
          invoice
        };
        break;

      case 'getClientPayments':
        url = `${baseUrl}/banking/payments.json?api_token=${apiTokenParam}&client_id=${clientId}`;
        response = await fetch(url, { headers });
        data = await safeJsonParse(response, url.replace(apiTokenParam, '***'));
        break;

      case 'getProducts':
        url = `${baseUrl}/products.json?api_token=${apiTokenParam}`;
        response = await fetch(url, { headers });
        data = await safeJsonParse(response, url.replace(apiTokenParam, '***'));
        break;

      default:
        return new Response(
          JSON.stringify({ error: 'Unknown action' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
    }

    return new Response(
      JSON.stringify(data),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error: unknown) {
    console.error('Fakturownia API error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
