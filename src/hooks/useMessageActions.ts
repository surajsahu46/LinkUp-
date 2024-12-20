import { useState } from 'react';
import { Message } from '../types';

export function useMessageActions() {
  const [replyingTo, setReplyingTo] = useState<Message | null>(null);

  const handleReply = (message: Message) => {
    setReplyingTo(message);
  };

  const handleCopy = (content: string) => {
    navigator.clipboard.writeText(content);
  };

  const clearReply = () => {
    setReplyingTo(null);
  };

  return {
    replyingTo,
    handleReply,
    handleCopy,
    clearReply
  };
}