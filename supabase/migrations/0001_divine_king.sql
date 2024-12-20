/*
  # Create messages table for real-time chat

  1. New Tables
    - `messages`
      - `id` (uuid, primary key)
      - `content` (text, message content)
      - `user_id` (uuid, foreign key to auth.users)
      - `created_at` (timestamp)
      - `room_id` (text, for different chat rooms)

  2. Security
    - Enable RLS on `messages` table
    - Add policies for:
      - Anyone can read messages
      - Authenticated users can insert their own messages
*/

CREATE TABLE messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  content text NOT NULL,
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  created_at timestamptz DEFAULT now(),
  room_id text DEFAULT 'general'
);

ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read messages
CREATE POLICY "Messages are viewable by everyone"
  ON messages
  FOR SELECT
  TO public
  USING (true);

-- Allow authenticated users to insert their own messages
CREATE POLICY "Users can insert their own messages"
  ON messages
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);