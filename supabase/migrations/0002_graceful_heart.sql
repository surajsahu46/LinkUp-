/*
  # Enhanced Chat Features Migration

  1. Tables Created:
    - `messages` (base chat messages)
    - `rooms` (chat rooms/channels)
    - `room_members` (room membership)
    - `message_reactions` (emoji reactions)

  2. Security:
    - RLS enabled on all tables
    - Policies for public and private room access
*/

-- Create base messages table if it doesn't exist
CREATE TABLE IF NOT EXISTS messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  content text NOT NULL,
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  created_at timestamptz DEFAULT now(),
  thread_id uuid,
  is_pinned boolean DEFAULT false,
  edited_at timestamptz,
  room_id uuid
);

-- Create rooms table
CREATE TABLE rooms (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  is_private boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES auth.users(id)
);

-- Create room members table
CREATE TABLE room_members (
  room_id uuid REFERENCES rooms(id) ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  role text DEFAULT 'member',
  joined_at timestamptz DEFAULT now(),
  PRIMARY KEY (room_id, user_id)
);

-- Create message reactions table
CREATE TABLE message_reactions (
  message_id uuid REFERENCES messages(id) ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  emoji text NOT NULL,
  created_at timestamptz DEFAULT now(),
  PRIMARY KEY (message_id, user_id, emoji)
);

-- Add foreign key constraints
ALTER TABLE messages 
  ADD CONSTRAINT fk_messages_thread 
  FOREIGN KEY (thread_id) REFERENCES messages(id);

ALTER TABLE messages 
  ADD CONSTRAINT fk_messages_room 
  FOREIGN KEY (room_id) REFERENCES rooms(id);

-- Enable RLS
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE room_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE message_reactions ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Public rooms are viewable by everyone"
  ON rooms
  FOR SELECT
  USING (NOT is_private OR EXISTS (
    SELECT 1 FROM room_members WHERE room_id = rooms.id AND user_id = auth.uid()
  ));

CREATE POLICY "Members can view private rooms"
  ON rooms
  FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM room_members WHERE room_id = rooms.id AND user_id = auth.uid()
  ));