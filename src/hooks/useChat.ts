import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { Message } from '../types';

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMessages();
    subscribeToMessages();
  }, []);

  const fetchMessages = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('messages')
      .select('*, profiles(username)')
      .order('created_at', { ascending: true });

    if (!error && data) {
      setMessages(data.map(message => ({
        ...message,
        username: message.profiles?.username
      })));
    }
    setLoading(false);
  };

  const subscribeToMessages = () => {
    const channel = supabase
      .channel('public:messages')
      .on('postgres_changes', 
        { event: 'INSERT', schema: 'public', table: 'messages' },
        async (payload) => {
          const { data: userData } = await supabase
            .from('profiles')
            .select('username')
            .eq('id', payload.new.user_id)
            .single();

          const newMessage = {
            ...payload.new as Message,
            username: userData?.username
          };
          setMessages(prev => [...prev, newMessage]);
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  };

  const sendMessage = async (content: string, userId: string) => {
    const { error } = await supabase
      .from('messages')
      .insert([{ content, user_id: userId }]);
    return { error };
  };

  return { messages, loading, sendMessage };
}