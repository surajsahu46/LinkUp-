import React from 'react';
import { Message } from '../types';
import { ChatMessage } from './ChatMessage';

interface MessageThreadProps {
  parentMessage: Message;
  replies: Message[];
  currentUserId?: string;
}

export const MessageThread: React.FC<MessageThreadProps> = ({
  parentMessage,
  replies,
  currentUserId,
}) => {
  return (
    <div className="pl-4 border-l-2 border-gray-200 dark:border-gray-700">
      <ChatMessage
        content={parentMessage.content}
        createdAt={parentMessage.created_at}
        username={parentMessage.username}
        isCurrentUser={currentUserId === parentMessage.user_id}
      />
      <div className="ml-8 space-y-4">
        {replies.map((reply) => (
          <ChatMessage
            key={reply.id}
            content={reply.content}
            createdAt={reply.created_at}
            username={reply.username}
            isCurrentUser={currentUserId === reply.user_id}
          />
        ))}
      </div>
    </div>
  );
};