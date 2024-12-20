import React from 'react';
import { motion } from 'framer-motion';
import { Room } from '../types';

interface RoomListProps {
  rooms: Room[];
  currentRoomId: string;
  onRoomSelect: (roomId: string) => void;
}

export const RoomList: React.FC<RoomListProps> = ({
  rooms,
  currentRoomId,
  onRoomSelect,
}) => {
  return (
    <div className="space-y-2">
      {rooms.map((room) => (
        <motion.button
          key={room.id}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onRoomSelect(room.id)}
          className={`w-full p-3 rounded-lg transition-colors ${
            room.id === currentRoomId
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="flex-1 text-left">
              <p className="font-medium">{room.name}</p>
              {room.description && (
                <p className="text-sm opacity-75">{room.description}</p>
              )}
            </div>
            {room.is_private && (
              <span className="text-xs">🔒</span>
            )}
          </div>
        </motion.button>
      ))}
    </div>
  );
};