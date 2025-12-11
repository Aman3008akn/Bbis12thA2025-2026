// Supabase Configuration
const SUPABASE_URL = 'https://wrvqjjhkmibfntdzkdna.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndydnFqamhrbWliZm50ZHprZG5hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU0NzEwNTcsImV4cCI6MjA4MTA0NzA1N30.a4tfXfsmhpLskpsWDZdQl5YXBs2zxgQ-OQ_SMWYG4FE';
const SUPABASE_SERVICE_ROLE = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndydnFqamhrbWliZm50ZHprZG5hIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NTQ3MTA1NywiZXhwIjoyMDgxMDQ3MDU3fQ.3jzHiXDDRLbuGK0bwufKIvbQj2ymQI4vsQlzjtmw1zg';

// Initialize Supabase Client
const supabaseClient = {
    url: SUPABASE_URL,
    anonKey: SUPABASE_ANON_KEY,
    serviceRole: SUPABASE_SERVICE_ROLE
};

console.log('Supabase configured successfully');
