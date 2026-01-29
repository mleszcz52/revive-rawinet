-- Create admin_credentials table for admin panel authentication
CREATE TABLE public.admin_credentials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    failed_attempts INTEGER DEFAULT 0,
    locked_until TIMESTAMPTZ,
    last_login TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS with no public policies (only accessible via service role)
ALTER TABLE public.admin_credentials ENABLE ROW LEVEL SECURITY;

-- Create index for email lookups
CREATE INDEX idx_admin_credentials_email ON public.admin_credentials(email);

-- Create trigger for updated_at
CREATE TRIGGER update_admin_credentials_updated_at
    BEFORE UPDATE ON public.admin_credentials
    FOR EACH ROW
    EXECUTE FUNCTION public.update_client_credentials_updated_at();