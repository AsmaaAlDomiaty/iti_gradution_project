import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://rjtbshnfspmbbtrlhblv.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJqdGJzaG5mc3BtYmJ0cmxoYmx2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg2MjMwODAsImV4cCI6MjEwNDE5OTA4MH0.oLCkpDAtCvaiKoftbcjP1fCfxsnqHQGq-YDQV9Z4oeI'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)