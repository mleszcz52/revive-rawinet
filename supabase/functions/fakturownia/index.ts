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

// Helper function to safely parse JSON response
async function safeJsonParse(response: Response, url: string) {
  const text = await response.text();
  
  if (!response.ok) {
    console.error(`Fakturownia API error: ${response.status} ${response.statusText}`);
    console.error(`URL: ${url}`);
    console.error(`Response: ${text.substring(0, 500)}`);
    throw new Error(`Fakturownia API error: ${response.status} ${response.statusText}`);
  }
  
  // Check if response is HTML (error page)
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
  
  // Add 6 random alphanumeric characters
  for (let i = 0; i < 6; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  
  // Add 1 special character
  password += specialChars.charAt(Math.floor(Math.random() * specialChars.length));
  
  // Add 1 more random character
  password += chars.charAt(Math.floor(Math.random() * chars.length));
  
  return password;
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

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const FAKTUROWNIA_API_TOKEN = Deno.env.get('FAKTUROWNIA_API_TOKEN');
    const FAKTUROWNIA_DOMAIN = Deno.env.get('FAKTUROWNIA_DOMAIN');
    const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    // Create Supabase admin client for credential operations
    const supabaseAdmin = createClient(
      SUPABASE_URL!,
      SUPABASE_SERVICE_ROLE_KEY!
    );

    const body = await req.json();
    const { action, clientId, email, invoiceId, password, newPassword, clientName, ipAddress } = body;

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

      if (!credentials) {
        // Log failed attempt for non-existent account (don't reveal if account exists)
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

      // Password correct - reset failed attempts and update last login
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

      // Generate session token
      const sessionToken = generateSessionToken();
      const expiresAt = new Date();
      expiresAt.setHours(expiresAt.getHours() + 4); // 4 hour session

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

    if (action === 'changePassword') {
      if (!email || !password || !newPassword) {
        return new Response(
          JSON.stringify({ error: 'Wszystkie pola są wymagane' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      const normalizedEmail = email.toLowerCase().trim();

      // Validate new password strength
      const validation = validatePasswordStrength(newPassword);
      if (!validation.valid) {
        return new Response(
          JSON.stringify({ success: false, message: validation.message }),
          { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Get current credentials
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

      // Verify current password
      const passwordValid = compareSync(password, credentials.password_hash);
      if (!passwordValid) {
        return new Response(
          JSON.stringify({ success: false, message: 'Nieprawidłowe aktualne hasło' }),
          { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Hash new password with cost 12
      const newPasswordHash = hashSync(newPassword);

      // Update password
      const { error: updateError } = await supabaseAdmin
        .from('client_credentials')
        .update({
          password_hash: newPasswordHash,
          must_change_password: false
        })
        .eq('id', credentials.id);

      if (updateError) {
        console.error('Update error:', updateError);
        return new Response(
          JSON.stringify({ success: false, message: 'Błąd podczas zmiany hasła' }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      return new Response(
        JSON.stringify({ success: true, message: 'Hasło zostało zmienione' }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (action === 'setClientPassword') {
      // Admin action - generate and set password for client
      if (!email) {
        return new Response(
          JSON.stringify({ error: 'Email jest wymagany' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      const normalizedEmail = email.toLowerCase().trim();
      const generatedPassword = generateSecurePassword();
      const passwordHash = hashSync(generatedPassword);

      // Upsert client credentials - store the generated password temporarily for admin viewing
      const { error: upsertError } = await supabaseAdmin
        .from('client_credentials')
        .upsert({
          email: normalizedEmail,
          password_hash: passwordHash,
          client_name: clientName || null,
          must_change_password: true,
          failed_attempts: 0,
          locked_until: null,
          temp_password: generatedPassword // Store temporarily for admin viewing
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

      return new Response(
        JSON.stringify({ 
          success: true, 
          generatedPassword,
          message: 'Hasło zostało wygenerowane. Przekaż je klientowi bezpiecznie.'
        }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (action === 'getClientInvoicesAdmin') {
      // Admin action - get invoices for a client by email
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

      // First find the client by email
      const clientUrl = `${baseUrl}/clients.json?api_token=${apiTokenParam}&email=${encodeURIComponent(email)}`;
      const clientResponse = await fetch(clientUrl, { 
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      });
      const clients = await safeJsonParse(clientResponse, clientUrl.replace(apiTokenParam, '***'));

      if (!clients || clients.length === 0) {
        return new Response(
          JSON.stringify({ invoices: [], client: null }),
          { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      const client = clients[0];

      // Get invoices for this client
      const invoicesUrl = `${baseUrl}/invoices.json?api_token=${apiTokenParam}&client_id=${client.id}`;
      const invoicesResponse = await fetch(invoicesUrl, { 
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      });
      const invoices = await safeJsonParse(invoicesResponse, invoicesUrl.replace(apiTokenParam, '***'));

      return new Response(
        JSON.stringify({ invoices, client }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (action === 'getClientTempPassword') {
      // Admin action - get temp password for a client
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

      // Only return temp password if must_change_password is true (hasn't been changed yet)
      return new Response(
        JSON.stringify({ 
          tempPassword: credentials.must_change_password ? credentials.temp_password : null,
          mustChangePassword: credentials.must_change_password
        }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (action === 'unlockAccount') {
      // Admin action - unlock a locked account
      if (!email) {
        return new Response(
          JSON.stringify({ error: 'Email jest wymagany' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      const normalizedEmail = email.toLowerCase().trim();

      const { error: updateError } = await supabaseAdmin
        .from('client_credentials')
        .update({
          failed_attempts: 0,
          locked_until: null
        })
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

      // Get admin credentials
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

      // Check if account is locked
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

      // Password correct - reset failed attempts
      await supabaseAdmin
        .from('admin_credentials')
        .update({
          failed_attempts: 0,
          locked_until: null,
          last_login: new Date().toISOString()
        })
        .eq('id', credentials.id);

      // Generate session token
      const sessionToken = generateSessionToken();
      const expiresAt = new Date();
      expiresAt.setHours(expiresAt.getHours() + 4); // 4 hour session

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
      // One-time action to initialize admin account
      if (!email || !password) {
        return new Response(
          JSON.stringify({ error: 'Email i hasło są wymagane' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      const normalizedEmail = email.toLowerCase().trim();

      // Check if admin already exists
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

      // Hash password with bcrypt
      const passwordHash = hashSync(password);

      // Insert admin
      const { error: insertError } = await supabaseAdmin
        .from('admin_credentials')
        .insert({
          email: normalizedEmail,
          password_hash: passwordHash
        });

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
      // Get all clients from Fakturownia
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

      const page = body.page || 1;
      const url = `${baseUrl}/clients.json?api_token=${apiTokenParam}&page=${page}&per_page=50`;
      
      const response = await fetch(url, { 
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      });
      
      const data = await safeJsonParse(response, url.replace(apiTokenParam, '***'));

      // Get credential status from database
      const emails = data.map((c: { email: string }) => c.email?.toLowerCase()).filter(Boolean);
      const { data: credentials } = await supabaseAdmin
        .from('client_credentials')
        .select('email, must_change_password, failed_attempts, locked_until, last_login')
        .in('email', emails);

      const credMap = new Map(credentials?.map(c => [c.email, c]) || []);

      const clientsWithStatus = data.map((client: { email: string; id: number; name: string }) => ({
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
      // Get all client credentials from database
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
      // Get login attempts history
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

    // Clean domain - remove https:// or http:// prefix if present, and handle .fakturownia.pl suffix
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
        // Search for client by email
        url = `${baseUrl}/clients.json?api_token=${apiTokenParam}&email=${encodeURIComponent(email)}`;
        response = await fetch(url, { headers });
        data = await safeJsonParse(response, url.replace(apiTokenParam, '***'));
        break;

      case 'getClient':
        // Get client details by ID
        url = `${baseUrl}/clients/${clientId}.json?api_token=${apiTokenParam}`;
        response = await fetch(url, { headers });
        data = await safeJsonParse(response, url.replace(apiTokenParam, '***'));
        break;

      case 'getClientInvoices':
        // Get all invoices for a client
        url = `${baseUrl}/invoices.json?api_token=${apiTokenParam}&client_id=${clientId}`;
        response = await fetch(url, { headers });
        data = await safeJsonParse(response, url.replace(apiTokenParam, '***'));
        break;

      case 'getInvoice':
        // Get single invoice details
        url = `${baseUrl}/invoices/${invoiceId}.json?api_token=${apiTokenParam}`;
        response = await fetch(url, { headers });
        data = await safeJsonParse(response, url.replace(apiTokenParam, '***'));
        break;

      case 'getInvoicePdf':
        // Get invoice PDF URL
        url = `${baseUrl}/invoices/${invoiceId}.json?api_token=${apiTokenParam}`;
        response = await fetch(url, { headers });
        const invoice = await safeJsonParse(response, url.replace(apiTokenParam, '***'));
        data = {
          pdfUrl: `${baseUrl}/invoices/${invoiceId}.pdf?api_token=${apiTokenParam}`,
          invoice
        };
        break;

      case 'getClientPayments':
        // Get payments for client
        // NOTE: Fakturownia exposes payments under /banking/payments
        url = `${baseUrl}/banking/payments.json?api_token=${apiTokenParam}&client_id=${clientId}`;
        response = await fetch(url, { headers });
        data = await safeJsonParse(response, url.replace(apiTokenParam, '***'));
        break;

      case 'getProducts':
        // Get all products/services
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
