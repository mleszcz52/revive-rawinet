import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, x-supabase-client-platform, apikey, content-type',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
};

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

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const FAKTUROWNIA_API_TOKEN = Deno.env.get('FAKTUROWNIA_API_TOKEN');
    const FAKTUROWNIA_DOMAIN = Deno.env.get('FAKTUROWNIA_DOMAIN');

    if (!FAKTUROWNIA_API_TOKEN || !FAKTUROWNIA_DOMAIN) {
      return new Response(
        JSON.stringify({ error: 'Fakturownia credentials not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { action, clientId, email, invoiceId } = await req.json();

    // Clean domain - remove https:// or http:// prefix if present, and handle .fakturownia.pl suffix
    let domain = FAKTUROWNIA_DOMAIN.replace(/^https?:\/\//, '');
    if (!domain.includes('.fakturownia.pl')) {
      domain = `${domain}.fakturownia.pl`;
    }
    const baseUrl = `https://${domain}`;
    
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
        url = `${baseUrl}/clients.json?api_token=${FAKTUROWNIA_API_TOKEN}&email=${encodeURIComponent(email)}`;
        response = await fetch(url, { headers });
        data = await safeJsonParse(response, url.replace(FAKTUROWNIA_API_TOKEN, '***'));
        break;

      case 'getClient':
        // Get client details by ID
        url = `${baseUrl}/clients/${clientId}.json?api_token=${FAKTUROWNIA_API_TOKEN}`;
        response = await fetch(url, { headers });
        data = await safeJsonParse(response, url.replace(FAKTUROWNIA_API_TOKEN, '***'));
        break;

      case 'getClientInvoices':
        // Get all invoices for a client
        url = `${baseUrl}/invoices.json?api_token=${FAKTUROWNIA_API_TOKEN}&client_id=${clientId}`;
        response = await fetch(url, { headers });
        data = await safeJsonParse(response, url.replace(FAKTUROWNIA_API_TOKEN, '***'));
        break;

      case 'getInvoice':
        // Get single invoice details
        url = `${baseUrl}/invoices/${invoiceId}.json?api_token=${FAKTUROWNIA_API_TOKEN}`;
        response = await fetch(url, { headers });
        data = await safeJsonParse(response, url.replace(FAKTUROWNIA_API_TOKEN, '***'));
        break;

      case 'getInvoicePdf':
        // Get invoice PDF URL
        url = `${baseUrl}/invoices/${invoiceId}.json?api_token=${FAKTUROWNIA_API_TOKEN}`;
        response = await fetch(url, { headers });
        const invoice = await safeJsonParse(response, url.replace(FAKTUROWNIA_API_TOKEN, '***'));
        data = {
          pdfUrl: `${baseUrl}/invoices/${invoiceId}.pdf?api_token=${FAKTUROWNIA_API_TOKEN}`,
          invoice
        };
        break;

      case 'getClientPayments':
        // Get payments for client
        url = `${baseUrl}/payments.json?api_token=${FAKTUROWNIA_API_TOKEN}&client_id=${clientId}`;
        response = await fetch(url, { headers });
        data = await safeJsonParse(response, url.replace(FAKTUROWNIA_API_TOKEN, '***'));
        break;

      case 'getProducts':
        // Get all products/services
        url = `${baseUrl}/products.json?api_token=${FAKTUROWNIA_API_TOKEN}`;
        response = await fetch(url, { headers });
        data = await safeJsonParse(response, url.replace(FAKTUROWNIA_API_TOKEN, '***'));
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
