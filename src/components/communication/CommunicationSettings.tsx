
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ThemedButton } from '@/components/ui/themed-button';
import { Phone, MessageSquare, Send } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';

type CommunicationType = 'whatsapp' | 'sms';

export const CommunicationSettings = () => {
  const [activeTab, setActiveTab] = useState<CommunicationType>('whatsapp');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const { sendWhatsAppMessage, sendSMS } = useAuth();
  const { toast } = useToast();

  const handleSend = async () => {
    if (!phoneNumber) {
      toast({
        title: "Error",
        description: "Please enter a phone number",
        variant: "destructive"
      });
      return;
    }

    if (!message) {
      toast({
        title: "Error",
        description: "Please enter a message",
        variant: "destructive"
      });
      return;
    }

    setSending(true);
    try {
      if (activeTab === 'whatsapp') {
        await sendWhatsAppMessage(phoneNumber, message);
      } else {
        await sendSMS(phoneNumber, message);
      }
      setMessage('');
    } finally {
      setSending(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Communication Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex space-x-2 border-b">
          <button
            className={`pb-2 px-4 ${activeTab === 'whatsapp' 
              ? 'border-b-2 border-forest-500 text-forest-700 font-medium' 
              : 'text-gray-500'}`}
            onClick={() => setActiveTab('whatsapp')}
          >
            <div className="flex items-center gap-2">
              <MessageSquare size={16} />
              <span>WhatsApp</span>
            </div>
          </button>
          <button
            className={`pb-2 px-4 ${activeTab === 'sms' 
              ? 'border-b-2 border-forest-500 text-forest-700 font-medium' 
              : 'text-gray-500'}`}
            onClick={() => setActiveTab('sms')}
          >
            <div className="flex items-center gap-2">
              <Phone size={16} />
              <span>SMS</span>
            </div>
          </button>
        </div>

        <div className="space-y-3">
          <div className="space-y-1">
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <Input
              id="phoneNumber"
              placeholder="+254712345678"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              placeholder="Enter your message here"
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>

          <ThemedButton 
            onClick={handleSend} 
            disabled={sending}
            className="w-full"
          >
            <Send className="h-4 w-4 mr-2" />
            {sending ? "Sending..." : `Send ${activeTab === 'whatsapp' ? 'WhatsApp' : 'SMS'}`}
          </ThemedButton>
        </div>

        <div className="text-sm text-muted-foreground">
          <p className="font-medium">Note:</p>
          <p>This is a demonstration of the {activeTab === 'whatsapp' ? 'WhatsApp' : 'SMS'} integration. 
             In a production environment, this would connect to actual messaging services.</p>
        </div>
      </CardContent>
    </Card>
  );
};
