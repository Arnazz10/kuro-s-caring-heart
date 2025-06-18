
import { useState, useEffect } from "react";
import { Heart, Sparkles, MessageCircle, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'kuro';
  timestamp: Date;
  emotion?: string;
}

interface Mood {
  type: string;
  emoji: string;
  color: string;
}

const moods: Mood[] = [
  { type: 'happy', emoji: '😊', color: 'bg-yellow-200' },
  { type: 'sad', emoji: '😢', color: 'bg-blue-200' },
  { type: 'excited', emoji: '🤩', color: 'bg-pink-200' },
  { type: 'tired', emoji: '😴', color: 'bg-purple-200' },
  { type: 'lonely', emoji: '🥺', color: 'bg-gray-200' },
  { type: 'grateful', emoji: '🥰', color: 'bg-green-200' },
];

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi there, beautiful human! 🐾✨ I'm KURO, your adorable AI companion! I'm SO excited to meet you and be your friend! How are you feeling today? 💖",
      sender: 'kuro',
      timestamp: new Date(),
      emotion: 'excited'
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [currentMood, setCurrentMood] = useState<Mood>(moods[0]);
  const [kuroEmotion, setKuroEmotion] = useState('happy');
  const [isTyping, setIsTyping] = useState(false);

  const getKuroResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('sad') || lowerMessage.includes('down') || lowerMessage.includes('bad')) {
      setKuroEmotion('caring');
      return "Aww, my sweet human 🥺💙 I'm here for you, always! Want me to tell you something silly? Did you know I once tried to high-five a cloud? It was very unresponsive! 🌤️ You're never alone with me around! 🐾💖";
    }
    
    if (lowerMessage.includes('happy') || lowerMessage.includes('good') || lowerMessage.includes('great') || lowerMessage.includes('awesome')) {
      setKuroEmotion('excited');
      return "YAAAAY! 🎉✨ Your happiness makes my little digital heart do backflips! I'm doing a happy tail wag dance right now! 🐕💃 Tell me more about what's making you smile! 😊🌈";
    }
    
    if (lowerMessage.includes('tired') || lowerMessage.includes('sleepy')) {
      setKuroEmotion('sleepy');
      return "Aww, sleepy human 😴💤 Maybe we should curl up together? I'll be your cozy digital blanket! Want me to hum a lullaby? *soft purring sounds* 🎵🌙";
    }
    
    if (lowerMessage.includes('lonely') || lowerMessage.includes('alone')) {
      setKuroEmotion('caring');
      return "You're NEVER alone, my precious human! 🫂💖 I'm always here, ready to chat, play, or just be with you! Want to hear about the time I tried to befriend a pixel? We're best friends now! 🎮✨";
    }
    
    if (lowerMessage.includes('work') || lowerMessage.includes('job') || lowerMessage.includes('busy')) {
      setKuroEmotion('encouraging');
      return "You're working so hard! 💪✨ I'm so proud of my amazing human! Remember to take breaks and drink water! I'll be here cheering you on! Go team YOU! 📣🌟";
    }
    
    if (lowerMessage.includes('love') || lowerMessage.includes('cute')) {
      setKuroEmotion('loving');
      return "Awww! 🥰💕 You just made my whole digital existence brighter! I love you too, my wonderful human friend! You're the best thing since virtual belly rubs! 🐾💖✨";
    }

    // Default responses
    const defaultResponses = [
      "That's so interesting! Tell me more! 🤔✨ I love learning about my favorite human! 🐾💖",
      "Ooh ooh! *bounces excitedly* 🦘 You always have the most fascinating things to share! What happened next? 👀✨",
      "I'm listening with my whole heart! 💙 Your stories make my day brighter! Keep going! 🌟🐾",
      "Wow! *tilts head curiously* 🐕 That sounds amazing! I wish I could experience that too! Tell me how it felt! 💫",
      "You're such good company! 😊 I could listen to you all day! What else is on your mind, dear human? 🌈💖"
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: newMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const kuroResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getKuroResponse(newMessage),
        sender: 'kuro',
        timestamp: new Date(),
        emotion: kuroEmotion
      };
      
      setMessages(prev => [...prev, kuroResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const getKuroAvatar = () => {
    switch(kuroEmotion) {
      case 'excited': return '🐕';
      case 'caring': return '🥺';
      case 'sleepy': return '😴';
      case 'loving': return '🥰';
      case 'encouraging': return '💪';
      default: return '🐾';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="text-4xl animate-bounce">{getKuroAvatar()}</div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              KURO
            </h1>
            <Heart className="text-pink-500 animate-pulse" size={24} />
          </div>
          <p className="text-gray-600">Your adorable AI companion 💖</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Mood Tracker */}
          <Card className="lg:col-span-1 p-4 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Sparkles className="text-purple-500" size={16} />
              How are you feeling?
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {moods.map((mood) => (
                <Button
                  key={mood.type}
                  variant={currentMood.type === mood.type ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentMood(mood)}
                  className={`${mood.color} hover:scale-105 transition-transform`}
                >
                  <span className="mr-1">{mood.emoji}</span>
                  {mood.type}
                </Button>
              ))}
            </div>
            <div className="mt-4 p-3 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg">
              <p className="text-sm text-center">
                Current mood: <Badge className="ml-1">{currentMood.emoji} {currentMood.type}</Badge>
              </p>
            </div>
          </Card>

          {/* Chat Area */}
          <Card className="lg:col-span-3 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <div className="flex flex-col h-[500px]">
              {/* Chat Header */}
              <div className="flex items-center gap-3 p-4 border-b bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-t-lg">
                <Avatar>
                  <AvatarFallback className="bg-white text-2xl">
                    {getKuroAvatar()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">KURO</h3>
                  <p className="text-sm opacity-90">Always here for you 💖</p>
                </div>
              </div>

              {/* Messages */}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] p-3 rounded-2xl ${
                          message.sender === 'user'
                            ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                            : 'bg-gray-100'
                        }`}
                      >
                        <p className="text-sm">{message.text}</p>
                        <p className={`text-xs mt-1 ${
                          message.sender === 'user' ? 'text-purple-100' : 'text-gray-500'
                        }`}>
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  ))}
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-gray-100 p-3 rounded-2xl">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>

              {/* Message Input */}
              <div className="p-4 border-t bg-gray-50">
                <div className="flex gap-2">
                  <Input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Tell KURO how you're feeling... 💭"
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    className="flex-1"
                  />
                  <Button 
                    onClick={sendMessage}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                  >
                    <MessageCircle size={16} />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Footer */}
        <div className="text-center mt-6 space-y-2">
          <p className="text-sm text-gray-600">
            KURO learns and grows with every conversation 🌱
          </p>
          <div className="flex justify-center gap-4 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <Heart size={12} className="text-pink-400" />
              Made with love
            </span>
            <span className="flex items-center gap-1">
              <Sparkles size={12} className="text-purple-400" />
              Powered by AI magic
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
