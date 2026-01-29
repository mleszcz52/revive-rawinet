-- Tabela przechowująca dane uwierzytelniania klientów
CREATE TABLE public.client_credentials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    client_name TEXT,
    must_change_password BOOLEAN DEFAULT true,
    failed_attempts INTEGER DEFAULT 0,
    locked_until TIMESTAMPTZ,
    last_login TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Włącz RLS - brak polityk = dostęp tylko przez service role
ALTER TABLE public.client_credentials ENABLE ROW LEVEL SECURITY;

-- Tabela logów prób logowania (audit)
CREATE TABLE public.login_attempts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT NOT NULL,
    success BOOLEAN NOT NULL,
    ip_address TEXT,
    user_agent TEXT,
    attempted_at TIMESTAMPTZ DEFAULT now()
);

-- Włącz RLS dla login_attempts
ALTER TABLE public.login_attempts ENABLE ROW LEVEL SECURITY;

-- Indeks dla szybkiego wyszukiwania po email
CREATE INDEX idx_client_credentials_email ON public.client_credentials(email);
CREATE INDEX idx_login_attempts_email_time ON public.login_attempts(email, attempted_at DESC);

-- Trigger do aktualizacji updated_at
CREATE OR REPLACE FUNCTION public.update_client_credentials_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER trigger_update_client_credentials_updated_at
    BEFORE UPDATE ON public.client_credentials
    FOR EACH ROW
    EXECUTE FUNCTION public.update_client_credentials_updated_at();