import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Lead {
  id?: string;
  created_at?: string;
  parent_name: string;
  student_name: string;
  email: string;
  phone: string;
  country: string;
  grade: string;
  subject_interest: string;
  message: string;
  source: string;
}

export interface ConsultationBooking {
  id?: string;
  created_at?: string;
  parent_name: string;
  student_name: string;
  email: string;
  phone: string;
  country: string;
  grade: string;
  preferred_time: string;
  notes: string;
}

export async function submitLead(lead: Lead) {
  const { data, error } = await supabase.from('leads').insert([lead]).select();

  if (error) throw error;
  return data;
}

export async function submitConsultationBooking(
  booking: ConsultationBooking
) {
  const { data, error } = await supabase
    .from('consultation_bookings')
    .insert([booking])
    .select();

  if (error) throw error;
  return data;
}
