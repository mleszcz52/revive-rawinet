-- Add temp_password column to store generated passwords for admin viewing
ALTER TABLE public.client_credentials
ADD COLUMN IF NOT EXISTS temp_password TEXT;