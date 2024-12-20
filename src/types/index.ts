export interface Message {
  id: string;
  content: string;
  created_at: string;
  user_id: string;
  username?: string;
  thread_id?: string;
  is_pinned?: boolean;
  edited_at?: string;
  room_id: string;
}

export interface User {
  id: string;
  email: string;
  username?: string;
}

export interface Room {
  id: string;
  name: string;
  description?: string;
  is_private: boolean;
  created_at: string;
  created_by: string;
}

export interface MessageReaction {
  message_id: string;
  user_id: string;
  emoji: string;
  created_at: string;
}

export interface RoomMember {
  room_id: string;
  user_id: string;
  role: 'owner' | 'admin' | 'member';
  joined_at: string;
}