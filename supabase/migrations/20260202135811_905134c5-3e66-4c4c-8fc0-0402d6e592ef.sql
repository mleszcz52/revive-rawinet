-- Create storage bucket for maps
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('maps', 'maps', false, 52428800, ARRAY['application/vnd.google-earth.kmz', 'application/octet-stream'])
ON CONFLICT (id) DO NOTHING;

-- Only service role can access (via edge function)
CREATE POLICY "Service role can read maps"
ON storage.objects FOR SELECT
USING (bucket_id = 'maps' AND auth.role() = 'service_role');