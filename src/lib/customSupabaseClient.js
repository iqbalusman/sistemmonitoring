import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://dvetxfuojpppobgygwbe.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR2ZXR4ZnVvanBwcG9iZ3lnd2JlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI0MTg2ODcsImV4cCI6MjA2Nzk5NDY4N30.sTl22lv6Yr_0AziaB9Kf6znrDOKnM10Jb_jK8o8Y5eo';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);