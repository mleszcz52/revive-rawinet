import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, x-supabase-client-platform, apikey, content-type',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
};

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
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    };

    let response;
    let data;

    switch (action) {
      case 'getClientByEmail':
        // Search for client by email
        response = await fetch(
          `${baseUrl}/clients.json?api_token=${FAKTUROWNIA_API_TOKEN}&email=${encodeURIComponent(email)}`,
          { headers }
        );
        data = await response.json();
        break;

      case 'getClient':
        // Get client details by ID
        response = await fetch(
          `${baseUrl}/clients/${clientId}.json?api_token=${FAKTUROWNIA_API_TOKEN}`,
          { headers }
        );
        data = await response.json();
        break;

      case 'getClientInvoices':
        // Get all invoices for a client
        response = await fetch(
          `${baseUrl}/invoices.json?api_token=${FAKTUROWNIA_API_TOKEN}&client_id=${clientId}`,
          { headers }
        );
        data = await response.json();
        break;

      case 'getInvoice':
        // Get single invoice details
        response = await fetch(
          `${baseUrl}/invoices/${invoiceId}.json?api_token=${FAKTUROWNIA_API_TOKEN}`,
          { headers }
        );
        data = await response.json();
        break;

      case 'getInvoicePdf':
        // Get invoice PDF URL
        response = await fetch(
          `${baseUrl}/invoices/${invoiceId}.json?api_token=${FAKTUROWNIA_API_TOKEN}`,
          { headers }
        );
        const invoice = await response.json();
        data = {
          pdfUrl: `${baseUrl}/invoices/${invoiceId}.pdf?api_token=${FAKTUROWNIA_API_TOKEN}`,
          invoice
        };
        break;

      case 'getClientPayments':
        // Get payments for client
        response = await fetch(
          `${baseUrl}/payments.json?api_token=${FAKTUROWNIA_API_TOKEN}&client_id=${clientId}`,
          { headers }
        );
        data = await response.json();
        break;

      case 'getProducts':
        // Get all products/services
        response = await fetch(
          `${baseUrl}/products.json?api_token=${FAKTUROWNIA_API_TOKEN}`,
          { headers }
        );
        data = await response.json();
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
