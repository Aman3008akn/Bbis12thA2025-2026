-- Activity Logs Table for Supabase
CREATE TABLE activity_logs (
  id BIGSERIAL PRIMARY KEY,
  action TEXT NOT NULL,
  user_ip TEXT,
  user_agent TEXT,
  device_type TEXT,
  browser TEXT,
  os TEXT,
  page_visited TEXT,
  timestamp TIMESTAMP DEFAULT NOW(),
  session_id TEXT,
  referrer TEXT,
  status_code INT
);

-- Create index for faster queries
CREATE INDEX idx_activity_logs_timestamp ON activity_logs(timestamp DESC);
CREATE INDEX idx_activity_logs_device_type ON activity_logs(device_type);
CREATE INDEX idx_activity_logs_session_id ON activity_logs(session_id);

-- Enable RLS
ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;

-- Create policy for public insert (logging from website)
CREATE POLICY "Allow public insert for activity logs"
  ON activity_logs FOR INSERT
  WITH CHECK (true);

-- Create policy for admin read
CREATE POLICY "Allow read activity logs"
  ON activity_logs FOR SELECT
  USING (true);
