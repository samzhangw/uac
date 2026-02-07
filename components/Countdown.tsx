import React, { useState, useEffect } from 'react';
import { TimeLeft } from '../types';

interface CountdownProps {
  targetDate: Date;
  title: string;
  dateInfo: string;
}

const Countdown: React.FC<CountdownProps> = ({ targetDate, title, dateInfo }) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="w-full space-y-8">
      <div>
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">
          {title}
        </h3>
        <p className="text-slate-500 font-medium text-sm">{dateInfo}</p>
      </div>

      <div className="grid grid-cols-4 gap-3 sm:gap-4">
        {[
          { label: '天', value: timeLeft.days },
          { label: '小時', value: timeLeft.hours },
          { label: '分鐘', value: timeLeft.minutes },
          { label: '秒', value: timeLeft.seconds },
        ].map((item) => (
          <div key={item.label} className="text-center">
            <div className="relative mb-2">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-400/20 to-purple-400/20 rounded-2xl blur-xl"></div>
              <div className="relative bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-4 sm:p-6 border border-indigo-100/50 shadow-lg">
                <div className="text-3xl sm:text-5xl font-black text-indigo-600 tabular-nums">
                  {String(item.value).padStart(2, '0')}
                </div>
              </div>
            </div>
            <p className="text-xs sm:text-sm font-bold text-slate-400 uppercase tracking-widest">
              {item.label}
            </p>
          </div>
        ))}
      </div>

      <div className="pt-4 border-t border-white/20">
        <p className="text-xs text-slate-400 text-center font-medium">
          ✨ 每一秒都在為夢想加油 ✨
        </p>
      </div>
    </div>
  );
};

export default Countdown;
