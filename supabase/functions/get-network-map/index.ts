import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Simple token to prevent direct access (not bulletproof, but adds a layer)
const ACCESS_TOKEN = "rn_map_2024_secure";

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const token = url.searchParams.get('token');

    // Simple token validation
    if (token !== ACCESS_TOKEN) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { 
          status: 401, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Fetch the KMZ file from the public URL
    // In production, this could be stored in Supabase Storage with private access
    const kmzUrl = Deno.env.get('SUPABASE_URL')?.replace('/rest/v1', '') + '/storage/v1/object/public/maps/Schemat.kmz';
    
    // For now, we'll serve a base64 encoded version or you can upload to storage
    // This is a placeholder - you'll need to upload the KMZ to Supabase Storage
    
    // Alternative: Read from a publicly hosted but obscured location
    const response = await fetch('https://cqbwkhhefnurmddwazsk.supabase.co/storage/v1/object/public/maps/Schemat.kmz');
    
    if (!response.ok) {
      // Fallback to the original public path for now
      return new Response(
        JSON.stringify({ 
          error: 'Map file not found in storage. Please upload Schemat.kmz to Supabase Storage bucket "maps".',
          fallback: true 
        }),
        { 
          status: 404, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    const kmzData = await response.arrayBuffer();

    return new Response(kmzData, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/vnd.google-earth.kmz',
        'Cache-Control': 'private, max-age=3600',
      },
    });
  } catch (error) {
    console.error('Error serving map:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});