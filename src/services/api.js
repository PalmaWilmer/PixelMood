import { supabase } from '../lib/supabase';

export const getEntries = async (userId) => {
  const { data, error } = await supabase
    .from('entries')
    .select('*')
    .eq('user_id', userId)
    .order('date', { ascending: true });

  if (error) throw error;
  return data;
};

export const upsertEntry = async (entry) => {
  // entry: { date: 'YYYY-MM-DD', mood: 'rad|happy|meh|sad|bad', note: '...', user_id: '...' }
  const { data, error } = await supabase
    .from('entries')
    .upsert(entry, { onConflict: 'user_id, date' })
    .select();

  if (error) throw error;
  return data[0];
};
