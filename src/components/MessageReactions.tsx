import React from 'react';
import { motion } from 'framer-motion';

interface Reaction {
  emoji: string;
  count: number;
  users: string[];
}

interface MessageReactionsProps {
  reactions: Reaction[];
  onReact: (emoji: string) => void;
  currentUserId: string;
}

export const MessageReactions: React.FC<MessageReactionsProps> = ({
  reactions,
  onReact,
  currentUserId
}) => {
  return (
    <div className="flex gap-1 mt-1">
      {reactions.map((reaction) => (
        <motion.button
          key={reaction.emoji}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onReact(reaction.emoji)}
          className={`px-2 py-1 rounded-full text-xs ${
            reaction.users.includes(currentUserId)
              ? 'bg-blue-100 text-blue-600'
              : 'bg-gray-100 hover:bg-gray-200'
          }`}
        >
          <span>{reaction.emoji}</span>
          <span className="ml-1">{reaction.count}</span>
        </motion.button>
      ))}
    </div>
  );
};