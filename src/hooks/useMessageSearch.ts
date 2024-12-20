import { useState, useMemo } from 'react';
import type { Message } from '../types';

export function useMessageSearch(messages: Message[]) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMessages = useMemo(() => {
    if (!searchQuery.trim()) return messages;

    return messages.filter(message =>
      message.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.username?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [messages, searchQuery]);

  return {
    searchQuery,
    setSearchQuery,
    filteredMessages
  };
}