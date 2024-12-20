import React from 'react';
import { motion } from 'framer-motion';

interface UnreadIndicatorProps {
  count: number;
}

export const UnreadIndicator: React.FC<UnreadIndicatorProps> = ({ count }) => {
  if (count === 0) return null;

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className="bg-red-500 text-white text-xs rounded-full px-2 py-1 absolute -top-2 -right-2"
    >
      {count > 99 ? '99+' : count}
    </motion.div>
  );
};