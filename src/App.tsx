import React from 'react';
import { Header } from './components/Header';
import { MessageList } from './components/MessageList';
import { ChatInput } from './components/ChatInput';
import { useAuth } from './hooks/useAuth';
import { useChat } from './hooks/useChat';

function App() {
  const { user, signIn, signOut } = useAuth();
  const { messages, loading, sendMessage } = useChat();

  const handleSignIn = async () => {
    const { error } = await signIn('test@example.com', 'password123');
    if (error) {
      console.error('Error signing in:', error);
    }
  };

  const handleSendMessage = async (content: string) => {
    if (!user) {
      alert('Please sign in to send messages');
      return;
    }

    const { error } = await sendMessage(content, user.id);
    if (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-6">
        <Header
          isAuthenticated={!!user}
          onSignIn={handleSignIn}
          onSignOut={signOut}
        />
        
        <MessageList
          messages={messages}
          currentUserId={user?.id}
          loading={loading}
        />

        <ChatInput 
          onSendMessage={handleSendMessage}
          disabled={!user}
        />
      </div>
    </div>
  );
}

export default App;