
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card } from '@/components/ui/card';
import { mockMessages, mockUsers } from '@/data/mockData';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { format, isToday, isYesterday } from 'date-fns';
import { Send, Search, MessageSquare } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

const Messages = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedContact, setSelectedContact] = useState<string | null>(null);
  const [messageInput, setMessageInput] = useState('');
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };
  
  const formatMessageDate = (dateString: string) => {
    const date = new Date(dateString);
    if (isToday(date)) {
      return format(date, 'h:mm a');
    } else if (isYesterday(date)) {
      return 'Yesterday';
    } else {
      return format(date, 'MMM d');
    }
  };
  
  // Get all contacts except current user
  const contacts = mockUsers.filter(u => u.id !== user?.id);
  
  // Filter contacts based on search query
  const filteredContacts = searchQuery.trim() === '' 
    ? contacts
    : contacts.filter(contact => 
        contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contact.email.toLowerCase().includes(searchQuery.toLowerCase())
      );

  // Get messages between current user and selected contact
  const selectedContactMessages = selectedContact
    ? mockMessages
        .filter(msg => 
          (msg.senderId === selectedContact && msg.recipientId === user?.id) || 
          (msg.senderId === user?.id && msg.recipientId === selectedContact)
        )
        .sort((a, b) => new Date(a.sentAt).getTime() - new Date(b.sentAt).getTime())
    : [];
  
  // Get selected contact details
  const selectedContactDetails = contacts.find(contact => contact.id === selectedContact);
  
  const handleSendMessage = () => {
    if (!messageInput.trim() || !selectedContact) return;
    
    // In a real app, this would send a message to the API
    // For now, we just clear the input
    setMessageInput('');
  };

  return (
    <Layout>
      <div className="h-[calc(100vh-12rem)] flex flex-col md:flex-row border rounded-md overflow-hidden bg-white animate-fade-in">
        {/* Contacts sidebar */}
        <div className="w-full md:w-80 border-r bg-white">
          <div className="p-4 border-b">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input 
                placeholder="Search messages..." 
                className="pl-10" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="overflow-y-auto h-full">
            {filteredContacts.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-32 text-center p-4">
                <MessageSquare className="h-8 w-8 text-muted-foreground mb-2 opacity-50" />
                <p className="text-muted-foreground">No contacts found</p>
              </div>
            ) : (
              filteredContacts.map(contact => {
                const lastMessage = mockMessages.filter(msg => 
                  (msg.senderId === contact.id && msg.recipientId === user?.id) || 
                  (msg.senderId === user?.id && msg.recipientId === contact.id)
                ).sort((a, b) => 
                  new Date(b.sentAt).getTime() - new Date(a.sentAt).getTime()
                )[0];
                
                const unread = lastMessage && 
                  lastMessage.senderId === contact.id && 
                  !lastMessage.readAt;
                
                return (
                  <div 
                    key={contact.id} 
                    className={`flex items-center gap-3 p-4 hover:bg-forest-50 cursor-pointer transition-colors ${
                      selectedContact === contact.id ? 'bg-forest-50' : unread ? 'bg-forest-50/50' : ''
                    }`}
                    onClick={() => setSelectedContact(contact.id)}
                  >
                    <Avatar>
                      <AvatarImage src={contact.avatar} />
                      <AvatarFallback className={`${
                        unread ? 'bg-forest-200 text-forest-800' : 'bg-muted text-muted-foreground'
                      }`}>
                        {getInitials(contact.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className={`font-medium truncate ${unread ? 'text-forest-700' : ''}`}>
                          {contact.name}
                        </p>
                        {lastMessage && (
                          <span className="text-xs text-gray-500">
                            {formatMessageDate(lastMessage.sentAt)}
                          </span>
                        )}
                      </div>
                      {lastMessage && (
                        <p className={`text-sm truncate ${unread ? 'font-medium text-forest-600' : 'text-gray-500'}`}>
                          {lastMessage.senderId === user?.id ? 'You: ' : ''}
                          {lastMessage.content}
                        </p>
                      )}
                    </div>
                    {unread && (
                      <Badge variant="default" className="bg-forest-600 hover:bg-forest-700">New</Badge>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
        
        {/* Messages content */}
        <div className="flex-1 flex flex-col bg-gray-50">
          {selectedContact && selectedContactDetails ? (
            <>
              <div className="p-4 border-b bg-white">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={selectedContactDetails.avatar} />
                    <AvatarFallback className="bg-forest-100 text-forest-700">
                      {getInitials(selectedContactDetails.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="font-medium">{selectedContactDetails.name}</h2>
                    <p className="text-xs text-muted-foreground">{selectedContactDetails.email}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex-1 p-4 overflow-y-auto">
                {selectedContactMessages.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center">
                    <div className="w-16 h-16 rounded-full bg-forest-100 flex items-center justify-center mb-4">
                      <MessageSquare className="h-8 w-8 text-forest-600" />
                    </div>
                    <h3 className="text-lg font-medium mb-1">No messages yet</h3>
                    <p className="text-muted-foreground max-w-xs">Start a conversation with {selectedContactDetails.name}</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {selectedContactMessages.map((message) => {
                      const isCurrentUser = message.senderId === user?.id;
                      
                      return (
                        <div key={message.id} className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
                          <div className={`max-w-[80%] ${isCurrentUser ? 'bg-forest-500 text-white' : 'bg-white'} rounded-lg p-3 shadow-sm`}>
                            <p>{message.content}</p>
                            <p className={`text-xs mt-1 ${isCurrentUser ? 'text-forest-100' : 'text-gray-500'}`}>
                              {format(new Date(message.sentAt), 'h:mm a')}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
              
              <div className="p-4 border-t bg-white">
                <div className="flex gap-2">
                  <Input 
                    placeholder="Type a message..." 
                    value={messageInput} 
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                  <Button 
                    onClick={handleSendMessage}
                    disabled={!messageInput.trim()} 
                    className="bg-forest-600 hover:bg-forest-700"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="p-4 border-b bg-white">
                <h2 className="font-medium">Select a conversation to start messaging</h2>
              </div>
              
              <div className="flex-1 p-4">
                {/* Empty state */}
                <div className="h-full flex flex-col items-center justify-center text-center text-gray-500">
                  <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                    <MessageSquare className="h-8 w-8 text-gray-400" />
                  </div>
                  <p className="mb-2 text-lg font-medium">No conversation selected</p>
                  <p className="max-w-xs">Select a contact from the sidebar to start a conversation</p>
                </div>
              </div>
              
              <div className="p-4 border-t bg-white">
                <div className="flex gap-2">
                  <Input placeholder="Type a message..." disabled />
                  <Button disabled size="icon">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Messages;
