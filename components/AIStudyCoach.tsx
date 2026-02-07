import React, { useState } from 'react';
import { getStudyAdvice } from '../services/geminiService';
import { Sparkles, MessageSquareQuote, Loader2, BookOpen } from 'lucide-react';

const AIStudyCoach: React.FC = () => {
  const [advice, setAdvice] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [lastTopic, setLastTopic] = useState<string>("");

  const handleGetAdvice = async (topic: string) => {
    if (loading) return;
    setLoading(true);
    setLastTopic(topic);
    const result = await getStudyAdvice(topic);
    setAdvice(result);
    setLoading(false);
  };

  const topics = [
    "讀書動力", "時間管理", "物理複習", "數甲解題技巧", "考前焦慮", "作息調整"
  ];

  return (
    <div className="h-full">
      <div className="h-full bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl p-6 sm:p-8 shadow-xl text-white relative overflow-hidden flex flex-col">
        {/* Decorative background circles */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-white opacity-10 blur-2xl"></div>
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-48 h-48 rounded-full bg-pink-500 opacity-10 blur-2xl"></div>

        <div className="relative z-10 flex flex-col h-full">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
                <Sparkles className="w-5 h-5 text-yellow-300" />
            </div>
            <h2 className="text-xl font-bold">AI 智慧陪讀教練</h2>
          </div>
          
          <p className="text-indigo-100 mb-6 text-sm leading-relaxed opacity-90">
            感到迷惘？點擊下方主題，讓 Gemini AI 給你專屬建議。
          </p>

          <div className="flex flex-wrap gap-2 mb-6">
            {topics.map((topic) => (
              <button
                key={topic}
                onClick={() => handleGetAdvice(topic)}
                disabled={loading}
                className="px-3 py-1.5 bg-white/10 hover:bg-white/20 hover:scale-105 active:scale-95 backdrop-blur-md rounded-lg text-xs font-medium transition-all duration-200 border border-white/10 flex items-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <BookOpen className="w-3 h-3 opacity-70" />
                {topic}
              </button>
            ))}
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10 flex-1 flex flex-col justify-center items-center text-center transition-all duration-300 min-h-[140px]">
            {loading ? (
              <div className="flex flex-col items-center animate-pulse">
                <Loader2 className="w-8 h-8 animate-spin mb-3 text-indigo-200" />
                <span className="text-indigo-200 text-sm">正在思考最佳建議...</span>
              </div>
            ) : advice ? (
              <div className="animate-fade-in w-full text-left">
                <div className="flex items-center gap-2 mb-2 text-yellow-300 opacity-90">
                  <MessageSquareQuote className="w-5 h-5" />
                  <span className="text-sm font-semibold">{lastTopic}</span>
                </div>
                <p className="text-white leading-relaxed text-sm md:text-base font-medium">{advice}</p>
              </div>
            ) : (
              <div className="text-indigo-200 flex flex-col items-center">
                 <Sparkles className="w-6 h-6 mb-2 opacity-50" />
                 <p className="text-sm">選擇上方主題，獲取今日的學習能量！</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIStudyCoach;