-- Table for tracking known devices per client
CREATE TABLE public.client_devices (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_email text NOT NULL,
  device_fingerprint text NOT NULL,
  device_name text,
  first_seen_at timestamptz DEFAULT now(),
  last_seen_at timestamptz DEFAULT now(),
  is_trusted boolean DEFAULT true,
  UNIQUE(client_email, device_fingerprint)
);

ALTER TABLE public.client_devices ENABLE ROW LEVEL SECURITY;

-- Table for OTP codes
CREATE TABLE public.client_otp_codes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_email text NOT NULL,
  code text NOT NULL,
  device_fingerprint text,
  created_at timestamptz DEFAULT now(),
  expires_at timestamptz NOT NULL,
  used boolean DEFAULT false,
  attempts integer DEFAULT 0
);

ALTER TABLE public.client_otp_codes ENABLE ROW LEVEL SECURITY;

-- Index for fast lookups
CREATE INDEX idx_client_devices_email ON public.client_devices(client_email);
CREATE INDEX idx_client_otp_codes_email ON public.client_otp_codes(client_email, used, expires_at);