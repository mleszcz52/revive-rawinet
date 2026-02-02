import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Create Supabase client with service role (to bypass RLS on storage)
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Download file from private storage bucket
    const { data, error } = await supabase.storage
      .from('maps')
      .download('Schemat.kmz');

    if (error) {
      console.error('Storage error:', error);
      // Return fallback flag so client can use public file
      return new Response(
        JSON.stringify({ 
          error: 'Map file not found in storage',
          fallback: true 
        }),
        { 
          status: 200, // Return 200 so client handles fallback
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    const arrayBuffer = await data.arrayBuffer();

    return new Response(arrayBuffer, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/vnd.google-earth.kmz',
        'Cache-Control': 'private, max-age=3600',
      },
    });
  } catch (error) {
    console.error('Error serving map:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error', fallback: true }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});