import React, { useState } from 'react';
import { ArrowLeft, Send, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/automarket/Navbar';
import Footer from '../components/automarket/Footer';

export default function Messages() {
  const [conversations, setConversations] = useState([
    {
      id: 1,
      name: 'John Dealer',
      avatar: 'J',
      lastMessage: 'Is this car still available?',
      timestamp: '5 min ago',
      unread: true,
    },
    {
      id: 2,
      name: 'Sarah Collins',
      avatar: 'S',
      lastMessage: 'Great, I can come by tomorrow at 2 PM',
      timestamp: '1 hour ago',
      unread: false,
    },
    {
      id: 3,
      name: 'Mike Motors',
      avatar: 'M',
      lastMessage: 'Thanks for the details about the vehicle',
      timestamp: 'Yesterday',
      unread: false,
    },
  ]);

  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messageText, setMessageText] = useState('');
  const [messages, setMessages] = useState({
    1: [
      { id: 1, sender: 'John Dealer', text: 'Is this car still available?', timestamp: '5 min ago', isOwn: false },
    ],
    2: [
      { id: 1, sender: 'You', text: 'Hi Sarah, yes the car is available', timestamp: '2 hours ago', isOwn: true },
      { id: 2, sender: 'Sarah Collins', text: 'Great, I can come by tomorrow at 2 PM', timestamp: '1 hour ago', isOwn: false },
    ],
    3: [
      { id: 1, sender: 'You', text: 'Thanks for your interest', timestamp: '1 day ago', isOwn: true },
      { id: 2, sender: 'Mike Motors', text: 'Thanks for the details about the vehicle', timestamp: 'Yesterday', isOwn: false },
    ],
  });

  const handleSendMessage = () => {
    if (!messageText.trim() || !selectedConversation) return;

    const newMessage = {
      id: (messages[selectedConversation.id]?.length || 0) + 1,
      sender: 'You',
      text: messageText,
      timestamp: 'now',
      isOwn: true,
    };

    setMessages(prev => ({
      ...prev,
      [selectedConversation.id]: [...(prev[selectedConversation.id] || []), newMessage],
    }));

    setMessageText('');
  };

  return (
    <div className="min-h-screen bg-[#f4f5f6]">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
          <button onClick={() => window.history.back()} className="flex items-center gap-1 hover:text-primary transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" /> Back
          </button>
          <span>›</span>
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <span>›</span>
          <span className="text-foreground font-medium">Messages</span>
        </div>

        <h1 className="text-3xl font-bold text-foreground mb-8">Messages</h1>

        {conversations.length === 0 ? (
          <div className="bg-white rounded-xl border border-border shadow-sm p-12 text-center">
            <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-lg font-medium text-foreground mb-2">No messages yet</p>
            <p className="text-sm text-muted-foreground">Start a conversation with buyers or sellers</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[600px]">
            {/* Conversations List */}
            <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden flex flex-col">
              <div className="border-b border-border p-4">
                <h2 className="font-semibold text-foreground">Conversations</h2>
              </div>
              <div className="flex-1 overflow-y-auto">
                {conversations.map(conv => (
                  <button
                    key={conv.id}
                    onClick={() => setSelectedConversation(conv)}
                    className={`w-full text-left p-4 border-b border-border hover:bg-secondary transition-colors ${
                      selectedConversation?.id === conv.id ? 'bg-secondary' : ''
                    }`}>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <span className="font-bold text-primary">{conv.avatar}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-medium text-foreground truncate ${conv.unread ? 'font-bold' : ''}`}>
                          {conv.name}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">{conv.lastMessage}</p>
                      </div>
                      {conv.unread && <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />}
                    </div>
                    <p className="text-xs text-muted-foreground">{conv.timestamp}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Chat Area */}
            <div className="md:col-span-2 bg-white rounded-xl border border-border shadow-sm overflow-hidden flex flex-col">
              {selectedConversation ? (
                <>
                  <div className="border-b border-border p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="font-bold text-primary">{selectedConversation.avatar}</span>
                      </div>
                      <p className="font-semibold text-foreground">{selectedConversation.name}</p>
                    </div>
                  </div>

                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {(messages[selectedConversation.id] || []).map(msg => (
                      <div key={msg.id} className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-xs px-4 py-2 rounded-lg ${
                          msg.isOwn 
                            ? 'bg-primary text-primary-foreground' 
                            : 'bg-secondary text-foreground'
                        }`}>
                          <p className="text-sm">{msg.text}</p>
                          <p className={`text-xs mt-1 ${msg.isOwn ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                            {msg.timestamp}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-border p-4">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        placeholder="Type a message..."
                        className="flex-1 px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/40 bg-white text-foreground placeholder:text-muted-foreground"
                      />
                      <button
                        onClick={handleSendMessage}
                        className="bg-primary text-primary-foreground p-2.5 rounded-lg hover:bg-primary/90 transition-colors">
                        <Send className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <p className="text-muted-foreground text-sm">Select a conversation to view messages</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}