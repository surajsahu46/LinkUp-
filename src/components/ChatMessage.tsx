import React from 'react';
import { formatDistanceToNow } from 'date-fns';

interface ChatMessageProps {
  content: string;
  createdAt: string;
  username?: string;
  isCurrentUser: boolean;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({
  content,
  createdAt,
  username,
  isCurrentUser
}) => {
  return (
    <div className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'} mb-4 group`}>
      <div
        className={`max-w-xs md:max-w-md rounded-lg px-4 py-2 ${
          isCurrentUser 
            ? 'bg-blue-500 text-white' 
            : 'bg-white border border-gray-200'
        }`}
      >
        {!isCurrentUser && username && (
          <p className={`text-xs font-medium mb-1 ${
            isCurrentUser ? 'text-white' : 'text-gray-600'
          }`}>
            {username}
          </p>
        )}
        <p className="text-sm break-words">{content}</p>
        <p className={`text-xs mt-1 ${
          isCurrentUser ? 'text-white/75' : 'text-gray-500'
        } opacity-0 group-hover:opacity-100 transition-opacity`}>
          {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
        </p>
      </div>
    </div>
  );
};