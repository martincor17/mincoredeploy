import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://vudinlmnkcutopebueja.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ1ZGlubG1ua2N1dG9wZWJ1ZWphIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODgzMzQzNDEsImV4cCI6MjAwMzkxMDM0MX0.wz-AAS_l1HKkCp5I8SMAuGTWKCTrhqt9mRw-tk11bI0';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
