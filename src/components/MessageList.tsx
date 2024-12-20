import React, { useEffect, useRef } from 'react';
import { ChatMessage } from './ChatMessage';
import type { Message } from '../types';

interface MessageListProps {
  messages: Message[];
  currentUserId?: string;
  loading?: boolean;
}

export const MessageList: React.FC<MessageListProps> = ({ 
  messages, 
  currentUserId,
  loading 
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="h-[500px] overflow-y-auto mb-4 p-4 border rounded-lg bg-gray-50">
      {messages.map((message) => (
        <ChatMessage
          key={message.id}
          content={message.content}
          createdAt={message.created_at}
          username={message.username}
          isCurrentUser={currentUserId === message.user_id}
        />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};