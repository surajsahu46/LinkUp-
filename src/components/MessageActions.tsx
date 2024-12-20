import React from 'react';
import { motion } from 'framer-motion';

interface MessageActionsProps {
  onReply: () => void;
  onCopy: () => void;
  isVisible: boolean;
}

export const MessageActions: React.FC<MessageActionsProps> = ({
  onReply,
  onCopy,
  isVisible
}) => {
  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="absolute right-0 top-0 -translate-y-1/2 flex gap-2 bg-white shadow-lg rounded-lg p-1"
    >
      <button
        onClick={onReply}
        className="p-1 hover:bg-gray-100 rounded"
        title="Reply"
      >
        ↩️
      </button>
      <button
        onClick={onCopy}
        className="p-1 hover:bg-gray-100 rounded"
        title="Copy"
      >
        📋
      </button>
    </motion.div>
  );
};