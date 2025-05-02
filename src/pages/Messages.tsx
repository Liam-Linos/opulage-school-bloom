
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mockMessages, mockUsers } from '@/data/mockData';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { format, isToday, isYesterday } from 'date-fns';
import { Send, Search } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Messages = () => {
  const { user } = useAuth();
  
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
  
  const contacts = mockUsers.filter(u => u.id !== user?.id);
  
  return (
    <Layout>
      <div className="h-[calc(100vh-12rem)] flex flex-col md:flex-row border rounded-md overflow-hidden">
        {/* Contacts sidebar */}
        <div className="w-full md:w-80 border-r bg-white">
          <div className="p-4 border-b">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input placeholder="Search messages..." className="pl-10" />
            </div>
          </div>
          <div className="overflow-y-auto h-full">
            {contacts.map(contact => {
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
                  className={`flex items-center gap-3 p-4 hover:bg-gray-50 cursor-pointer ${unread ? 'bg-forest-50' : ''}`}
                >
                  <Avatar>
                    <AvatarImage src={contact.avatar} />
                    <AvatarFallback className="bg-forest-100 text-forest-700">
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
                    <div className="w-2 h-2 bg-forest-500 rounded-full"></div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Messages content */}
        <div className="flex-1 flex flex-col bg-gray-50">
          <div className="p-4 border-b bg-white">
            <h2 className="font-medium">Select a conversation to start messaging</h2>
          </div>
          
          <div className="flex-1 p-4">
            {/* Empty state */}
            <div className="h-full flex flex-col items-center justify-center text-center text-gray-500">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
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
        </div>
      </div>
    </Layout>
  );
};

export default Messages;
