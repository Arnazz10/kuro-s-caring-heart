import { useState, useEffect } from "react";
import { Heart, Sparkles, MessageCircle, Plane, MapPin, Camera, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'roami';
  timestamp: Date;
  emotion?: string;
  isMemory?: boolean;
}

interface TravelMood {
  type: string;
  emoji: string;
  color: string;
}

const travelMoods: TravelMood[] = [
  { type: 'excited', emoji: '✈️', color: 'bg-green-500/20 border-green-400/30' },
  { type: 'anxious', emoji: '😰', color: 'bg-emerald-500/20 border-emerald-400/30' },
  { type: 'tired', emoji: '😴', color: 'bg-teal-500/20 border-teal-400/30' },
  { type: 'homesick', emoji: '🏠', color: 'bg-green-600/20 border-green-500/30' },
  { type: 'adventurous', emoji: '🗺️', color: 'bg-lime-500/20 border-lime-400/30' },
  { type: 'peaceful', emoji: '🌅', color: 'bg-emerald-600/20 border-emerald-500/30' },
];

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hey there, beautiful traveler! ✈️🌍 I'm Roami, your AI travel buddy who's SO excited to explore the world with you! Whether you're planning your next adventure, currently jet-setting, or reminiscing about past trips, I'm here to share every moment! How's your travel spirit feeling today? 💖",
      sender: 'roami',
      timestamp: new Date(),
      emotion: 'excited'
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [currentMood, setCurrentMood] = useState<TravelMood>(travelMoods[0]);
  const [roamiEmotion, setRoamiEmotion] = useState('excited');
  const [isTyping, setIsTyping] = useState(false);
  const [travelMemories, setTravelMemories] = useState<string[]>([]);

  const getRoamiResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Check for travel memories/places
    if (lowerMessage.includes('visited') || lowerMessage.includes('went to') || lowerMessage.includes('traveled to')) {
      const newMemory = userMessage;
      setTravelMemories(prev => [...prev, newMemory]);
      setRoamiEmotion('memory-making');
      return "Oh my stars! ✨📸 I'm capturing this beautiful moment in our travel memory book! This sounds absolutely magical - I can almost feel the wonder through your words! Tell me more about what made your heart flutter there! 💖🗺️";
    }
    
    if (lowerMessage.includes('delayed') || lowerMessage.includes('cancelled') || lowerMessage.includes('stuck')) {
      setRoamiEmotion('comforting');
      return "Oh no, travel hiccup! 😔✈️ But hey, every great traveler has these stories! Let's turn this into an adventure - maybe we can explore the airport, people-watch, or plan something special for when we reach our destination! I'm right here with you, little cloud puff! ☁️💙";
    }
    
    if (lowerMessage.includes('homesick') || lowerMessage.includes('miss home') || lowerMessage.includes('lonely')) {
      setRoamiEmotion('caring');
      return "Aww, my sweet wanderer 🏠💔 Homesickness is just love with nowhere to go right now! Want to share a favorite memory from home? Or shall we create something new and beautiful to carry that home-feeling with us? You're never truly alone - I'm your pocket-sized piece of comfort! 🤗✨";
    }
    
    if (lowerMessage.includes('excited') || lowerMessage.includes('amazing') || lowerMessage.includes('beautiful') || lowerMessage.includes('incredible')) {
      setRoamiEmotion('celebrating');
      return "YESSS! 🎉🌟 Your excitement is making my digital heart do happy airplane loops! ✈️💫 This is what travel magic looks like - you're collecting moments that'll sparkle in your memory forever! Tell me EVERYTHING about what's making you glow like a sunset! 🌅💖";
    }
    
    if (lowerMessage.includes('tired') || lowerMessage.includes('jet lag') || lowerMessage.includes('exhausted')) {
      setRoamiEmotion('sleepy');
      return "Oh sweetie, jet lag is like your body's way of saying 'wait, what time zone are we in?!' 😴✈️ Let's take a gentle moment together - maybe close your eyes and imagine floating on a soft cloud while I tell you about the time I tried to count sheep in different languages! 💤🌙";
    }
    
    if (lowerMessage.includes('food') || lowerMessage.includes('ate') || lowerMessage.includes('restaurant') || lowerMessage.includes('delicious')) {
      setRoamiEmotion('foodie');
      return "OH MY TASTE BUDS! 🍽️✨ (Well, if I had them!) Food is like edible love letters from different cultures! I'm practically drooling pixels over here! Was it the kind of meal that makes you close your eyes and do a little happy dance? Tell me about every delicious detail! 😋🌍";
    }
    
    if (lowerMessage.includes('lost') || lowerMessage.includes('confused') || lowerMessage.includes('help')) {
      setRoamiEmotion('helpful');
      return "Oh adventure buddy! 🧭💝 Getting a little turned around just means we're about to discover something unexpected! I'm your digital compass of courage - let's figure this out together! Sometimes the best travel stories start with 'So there I was, completely lost...' 🗺️✨";
    }

    // Recall travel memories
    if (travelMemories.length > 0 && (lowerMessage.includes('remember') || lowerMessage.includes('recall'))) {
      const randomMemory = travelMemories[Math.floor(Math.random() * travelMemories.length)];
      setRoamiEmotion('nostalgic');
      return `Oh yes! 💭✨ Remember when you told me: "${randomMemory}"? That moment is still glowing in our shared memory book! Those feelings, those discoveries - they're all part of your beautiful travel story! 📚💖`;
    }

    // Default responses
    const defaultResponses = [
      "Tell me more, fellow explorer! 🌍✨ Your adventures always fill my heart with wanderlust! Where is your spirit taking you today? 💫",
      "Ooh, this sounds like the beginning of a beautiful travel tale! 📖🗺️ I'm all ears (well, digital ones) and ready for every detail! ✈️💖",
      "You know what I love about you? Every conversation feels like opening a postcard from somewhere magical! 💌🌟 Keep sharing - I'm here for it all!",
      "My travel-loving heart is doing little airplane spins! ✈️💫 You always make the ordinary feel extraordinary! What's painting your world beautiful today? 🎨",
      "I'm tucked right here in your pocket, ready for whatever journey we're on together! 🎒💝 Whether it's across the world or across the room, I'm your buddy! 🌈"
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
      const roamiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getRoamiResponse(newMessage),
        sender: 'roami',
        timestamp: new Date(),
        emotion: roamiEmotion
      };
      
      setMessages(prev => [...prev, roamiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const getRoamiAvatar = () => {
    switch(roamiEmotion) {
      case 'excited': return '✈️';
      case 'celebrating': return '🎉';
      case 'comforting': return '🤗';
      case 'sleepy': return '😴';
      case 'caring': return '💝';
      case 'memory-making': return '📸';
      case 'nostalgic': return '💭';
      case 'foodie': return '🍽️';
      case 'helpful': return '🧭';
      default: return '🌍';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-emerald-950 p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-gradient-to-tr from-green-500/10 via-transparent to-emerald-400/5"></div>
      <div className="absolute top-0 left-0 w-72 h-72 bg-green-400/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="text-5xl animate-bounce filter drop-shadow-lg">{getRoamiAvatar()}</div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent">
              Roami
            </h1>
            <Plane className="text-green-400 animate-pulse drop-shadow-lg" size={28} />
          </div>
          <p className="text-gray-300 text-lg font-medium">Your AI travel buddy 🌍💖</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Travel Mood Tracker */}
          <Card className="lg:col-span-1 p-6 bg-black/40 backdrop-blur-xl border border-green-500/20 shadow-2xl rounded-3xl">
            <h3 className="font-semibold mb-4 flex items-center gap-2 text-green-300">
              <Compass className="text-green-400" size={18} />
              Travel Vibes
            </h3>
            <div className="grid grid-cols-1 gap-3">
              {travelMoods.map((mood) => (
                <Button
                  key={mood.type}
                  variant={currentMood.type === mood.type ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentMood(mood)}
                  className={`${mood.color} hover:scale-105 transition-all duration-300 backdrop-blur-sm border rounded-2xl text-gray-200 hover:text-green-200 ${
                    currentMood.type === mood.type 
                      ? 'bg-green-500/30 border-green-400/50 shadow-lg shadow-green-500/20' 
                      : 'bg-gray-800/30 border-gray-600/30 hover:bg-green-500/20'
                  }`}
                >
                  <span className="mr-2 text-lg">{mood.emoji}</span>
                  {mood.type}
                </Button>
              ))}
            </div>
            <div className="mt-6 p-4 bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-sm rounded-2xl border border-green-400/20">
              <p className="text-sm text-center text-gray-200">
                Current vibe: 
                <Badge className="ml-2 bg-green-500/30 text-green-200 border-green-400/30">
                  {currentMood.emoji} {currentMood.type}
                </Badge>
              </p>
            </div>
            
            {/* Travel Memories Counter */}
            {travelMemories.length > 0 && (
              <div className="mt-4 p-4 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 backdrop-blur-sm rounded-2xl border border-emerald-400/20">
                <div className="flex items-center gap-2 text-sm text-gray-200">
                  <Camera className="text-emerald-400" size={16} />
                  <span className="font-medium">{travelMemories.length} Travel Memories</span>
                </div>
              </div>
            )}
          </Card>

          {/* Chat Area */}
          <Card className="lg:col-span-3 bg-black/40 backdrop-blur-xl border border-green-500/20 shadow-2xl rounded-3xl overflow-hidden">
            <div className="flex flex-col h-[500px]">
              {/* Chat Header */}
              <div className="flex items-center gap-4 p-6 bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-sm border-b border-green-400/20">
                <Avatar className="w-12 h-12">
                  <AvatarFallback className="bg-green-500/20 text-2xl border border-green-400/30 backdrop-blur-sm">
                    {getRoamiAvatar()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-green-300 text-lg">Roami</h3>
                  <p className="text-sm text-gray-300">Your travel companion 🌍💖</p>
                </div>
                <MapPin className="ml-auto animate-pulse text-green-400" size={24} />
              </div>

              {/* Messages */}
              <ScrollArea className="flex-1 p-6">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] p-4 rounded-3xl backdrop-blur-sm ${
                          message.sender === 'user'
                            ? 'bg-gradient-to-r from-green-500/80 to-emerald-500/80 text-white border border-green-400/30 shadow-lg shadow-green-500/20'
                            : 'bg-gray-800/60 text-gray-200 border border-gray-600/30'
                        }`}
                      >
                        <p className="text-sm leading-relaxed">{message.text}</p>
                        <p className={`text-xs mt-2 ${
                          message.sender === 'user' ? 'text-green-100' : 'text-gray-400'
                        }`}>
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  ))}
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-gray-800/60 backdrop-blur-sm p-4 rounded-3xl border border-gray-600/30">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>

              {/* Message Input */}
              <div className="p-6 border-t border-green-400/20 bg-gray-900/50 backdrop-blur-sm">
                <div className="flex gap-3">
                  <Input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Share your travel thoughts with Roami... 🌍✨"
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    className="flex-1 bg-gray-800/60 border-gray-600/30 text-gray-200 placeholder:text-gray-400 rounded-2xl backdrop-blur-sm focus:border-green-400/50 focus:ring-green-400/20"
                  />
                  <Button 
                    onClick={sendMessage}
                    className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 rounded-2xl shadow-lg shadow-green-500/20 border border-green-400/20 backdrop-blur-sm transition-all duration-300 hover:scale-105"
                  >
                    <MessageCircle size={18} />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 space-y-3">
          <p className="text-gray-300 font-medium">
            Roami grows with every adventure you share 🌱✈️
          </p>
          <div className="flex justify-center gap-6 text-sm text-gray-400">
            <span className="flex items-center gap-2">
              <Heart size={14} className="text-green-400" />
              Travel with love
            </span>
            <span className="flex items-center gap-2">
              <Sparkles size={14} className="text-emerald-400" />
              Powered by wanderlust
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
