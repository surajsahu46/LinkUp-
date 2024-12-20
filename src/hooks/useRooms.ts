import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { Room } from '../types';

export function useRooms() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRooms();
    subscribeToRooms();
  }, []);

  const fetchRooms = async () => {
    const { data, error } = await supabase
      .from('rooms')
      .select('*')
      .order('created_at', { ascending: true });

    if (!error && data) {
      setRooms(data);
    }
    setLoading(false);
  };

  const subscribeToRooms = () => {
    const channel = supabase
      .channel('public:rooms')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'rooms' },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setRooms(prev => [...prev, payload.new as Room]);
          } else if (payload.eventType === 'DELETE') {
            setRooms(prev => prev.filter(room => room.id !== payload.old.id));
          }
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  };

  const createRoom = async (name: string, isPrivate: boolean = false) => {
    const { error } = await supabase
      .from('rooms')
      .insert([{ name, is_private: isPrivate }]);
    return { error };
  };

  return { rooms, loading, createRoom };
}