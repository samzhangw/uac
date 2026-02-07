import React, { useState, useEffect } from 'react';
import { TimeLeft } from '../types';
import { Calendar, ArrowRight, Timer } from 'lucide-react';

interface CountdownProps {
  targetDate: Date;
  title: string;
  dateInfo: string;
}

const Countdown: React.FC<CountdownProps> = ({ targetDate, title, dateInfo }) => {
  const calculateTimeLeft = (): TimeLeft => {
    const difference = +targetDate - +new Date();
    let timeLeft: TimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (!mounted) return null;

  return (
    <div className="w-full h-full flex flex-col justify-between">
      {/* Main Countdown Container */}
      <div className="relative">
        {/* Header Label */}
        <div className="flex justify-center lg:justify-start mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/40 backdrop-blur-md border border-white/50 rounded-full shadow-sm animate-fade-in-up">
                <Timer className="w-4 h-4 text-indigo-600" />
                <span className="text-sm font-semibold text-slate-600 tracking-wide">距離 <span className="text-indigo-600">{title}</span> 破曉</span>
            </div>
        </div>

        {/* Timer Grid */}
        <div className="grid grid-cols-4 gap-2 sm:gap-4">
            <TimeUnit value={timeLeft.days} label="天" delay="0" color="from-indigo-500 to-purple-600" />
            <TimeUnit value={timeLeft.hours} label="時" delay="100" color="from-purple-500 to-pink-600" />
            <TimeUnit value={timeLeft.minutes} label="分" delay="200" color="from-pink-500 to-rose-500" />
            <TimeUnit value={timeLeft.seconds} label="秒" delay="300" color="from-rose-500 to-orange-500" isSeconds={true} />
        </div>

        {/* Date Info Footer */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 animate-fade-in-up delay-300">
           <div className="flex items-center gap-3 bg-white/40 backdrop-blur-md px-4 py-2 rounded-xl border border-white/40 shadow-sm w-full sm:w-auto">
                <div className="bg-indigo-100 p-1.5 rounded-lg text-indigo-600">
                    <Calendar className="w-4 h-4" />
                </div>
                <div>
                    <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Exam Date</div>
                    <div className="text-sm font-bold text-slate-800 tabular-nums">{dateInfo}</div>
                </div>
           </div>

           <a href="#schedule" className="group flex items-center gap-2 px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl transition-all w-full sm:w-auto justify-center shadow-lg shadow-slate-200">
              <span className="font-medium text-sm">查看日程</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
           </a>
        </div>
      </div>
    </div>
  );
};

const TimeUnit: React.FC<{ value: number; label: string; delay: string; color: string; isSeconds?: boolean }> = ({ value, label, delay, color, isSeconds }) => (
  <div 
    className="group relative bg-white/50 backdrop-blur-xl rounded-2xl p-2 sm:p-4 border border-white/50 shadow-sm hover:shadow-md transition-all duration-500 hover:-translate-y-1 overflow-hidden animate-fade-in-up flex flex-col items-center justify-center min-h-[100px] sm:min-h-[120px]"
    style={{ animationDelay: `${delay}ms` }}
  >
    {/* Gradient Orb Background */}
    <div className={`absolute -top-6 -right-6 w-20 h-20 bg-gradient-to-br ${color} opacity-10 rounded-full blur-2xl group-hover:opacity-20 transition-opacity duration-500`}></div>
    
    <div className="relative z-10 flex flex-col items-center justify-center">
        {/* Value */}
        <div className="relative">
            <span className={`block text-3xl sm:text-5xl lg:text-5xl font-black tracking-tighter leading-none text-slate-800 tabular-nums`}>
            {value.toString().padStart(2, '0')}
            </span>
        </div>
        
        {/* Label */}
        <div className="mt-2 flex items-center gap-1.5">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{label}</span>
        </div>
    </div>

    {/* Bottom Line */}
    <div className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r ${color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
  </div>
);

export default Countdown;