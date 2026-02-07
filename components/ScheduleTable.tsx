import React from 'react';
import { CalendarDays, Clock, CheckCircle2, AlertCircle, Bookmark } from 'lucide-react';

const scheduleData = [
  { item: "考試報名", status: "pending", time: "待簡章公布", note: "", icon: "📝" },
  { item: "應考資訊查詢", status: "pending", time: "待簡章公布", note: "考前開放", icon: "🔍" },
  { item: "考場查詢", status: "pending", time: "待簡章公布", note: "考前開放", icon: "🏫" },
  { item: "分科測驗", status: "upcoming", time: "2027/07/10 – 07/11", highlight: true, icon: "🔥" },
  { item: "放榜日期", status: "future", time: "待簡章公布", note: "", icon: "🎉" },
  { item: "志願選填", status: "future", time: "待簡章公布", note: "線上", icon: "💻" },
];

const day1Schedule = [
  { time: "08:40 - 10:00", subject: "物理", type: "理科", duration: "80 min" },
  { time: "10:50 - 12:10", subject: "化學", type: "理科", duration: "80 min" },
  { time: "14:00 - 15:20", subject: "數學甲", type: "理科", duration: "80 min" },
  { time: "16:10 - 17:30", subject: "生物", type: "理科", duration: "80 min" },
];

const day2Schedule = [
  { time: "08:40 - 10:00", subject: "歷史", type: "文科", duration: "80 min" },
  { time: "10:50 - 12:10", subject: "地理", type: "文科", duration: "80 min" },
  { time: "14:00 - 15:20", subject: "數學乙", type: "文科", duration: "80 min" },
  { time: "16:10 - 17:30", subject: "公民與社會", type: "文科", duration: "80 min" },
];

const ScheduleTable: React.FC = () => {
  return (
    <div className="grid lg:grid-cols-12 gap-10">
      
      {/* Timeline Section */}
      <div className="lg:col-span-5">
        <div className="sticky top-24">
            <div className="flex items-center gap-3 mb-8">
                <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-indigo-100 text-indigo-600 shadow-sm border border-indigo-200">
                    <CalendarDays className="w-5 h-5" />
                </span>
                <div>
                    <h3 className="text-xl font-bold text-slate-800">重要日程追蹤</h3>
                    <p className="text-sm text-slate-500">Key Dates Timeline</p>
                </div>
            </div>
            
            <div className="glass-card rounded-3xl p-6 sm:p-8">
                <div className="relative pl-2">
                    {/* Vertical Line */}
                    <div className="absolute left-[19px] top-4 bottom-4 w-0.5 bg-gradient-to-b from-indigo-200 via-slate-200 to-transparent"></div>

                    {scheduleData.map((row, index) => (
                        <div key={index} className="relative flex items-start gap-4 mb-8 last:mb-0 group">
                            {/* Dot */}
                            <div className={`relative z-10 w-10 h-10 rounded-full border-4 flex items-center justify-center text-sm shadow-sm transition-all duration-300
                                ${row.highlight 
                                    ? 'bg-indigo-600 border-indigo-100 text-white scale-110 shadow-indigo-200' 
                                    : 'bg-white border-slate-100 text-slate-400 group-hover:border-indigo-100 group-hover:scale-105'
                                }`}>
                                {row.icon}
                            </div>
                            
                            {/* Card */}
                            <div className={`flex-1 p-4 rounded-2xl border transition-all duration-300 
                                ${row.highlight 
                                    ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-lg shadow-indigo-200 border-transparent translate-x-1' 
                                    : 'bg-white/50 hover:bg-white border-slate-200 hover:border-indigo-200 hover:shadow-md'
                                }`}>
                                <div className="flex justify-between items-start mb-1">
                                    <span className={`font-bold text-base ${row.highlight ? 'text-white' : 'text-slate-800'}`}>{row.item}</span>
                                    {row.status === 'upcoming' && (
                                        <span className="text-[10px] bg-white/20 backdrop-blur-md text-white px-2 py-0.5 rounded-full font-bold uppercase tracking-wide">Soon</span>
                                    )}
                                </div>
                                <div className={`font-mono text-sm ${row.highlight ? 'text-indigo-100' : 'text-indigo-600 font-semibold'}`}>
                                    {row.time}
                                </div>
                                {row.note && (
                                    <div className={`mt-2 text-xs flex items-center gap-1.5 ${row.highlight ? 'text-indigo-200' : 'text-slate-400'}`}>
                                        <AlertCircle className="w-3 h-3" />
                                        {row.note}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </div>

      {/* Exam Days Grid */}
      <div className="lg:col-span-7 space-y-8">
         <div className="glass-card p-8 rounded-[2.5rem]">
             <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                    <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-pink-100 text-pink-600 shadow-sm border border-pink-200">
                        <Clock className="w-5 h-5" />
                    </span>
                    <div>
                        <h3 className="text-xl font-bold text-slate-800">考試流程</h3>
                        <p className="text-sm text-slate-500">2027 Schedule</p>
                    </div>
                </div>
                <div className="px-3 py-1 bg-slate-100 rounded-full text-xs font-semibold text-slate-500">
                    每節 80 分鐘
                </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
                {/* Day 1 */}
                <DayCard 
                    day="01" 
                    date="7/10 (六)" 
                    schedule={day1Schedule} 
                    color="indigo" 
                />

                {/* Day 2 */}
                <DayCard 
                    day="02" 
                    date="7/11 (日)" 
                    schedule={day2Schedule} 
                    color="pink" 
                />
            </div>

            <div className="mt-8 flex items-start gap-3 text-sm text-slate-500 bg-slate-50/80 p-4 rounded-2xl border border-slate-100">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                    請於每節考試 <span className="text-slate-800 font-bold">預備鈴響時入場</span> (考前5分鐘)。<br/>
                    考試開始 <span className="text-red-500 font-bold">20 分鐘後</span> 不得入場，<span className="text-red-500 font-bold">60 分鐘內</span> 不得離場。
                </p>
            </div>
         </div>
      </div>
    </div>
  );
};

const DayCard = ({ day, date, schedule, color }: any) => {
    const isIndigo = color === 'indigo';
    
    return (
        <div className={`relative overflow-hidden rounded-3xl p-6 border transition-all duration-300 hover:shadow-lg bg-white/60
            ${isIndigo ? 'border-indigo-100 hover:border-indigo-200' : 'border-pink-100 hover:border-pink-200'}
        `}>
            {/* Header */}
            <div className="relative z-10 flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
                <div>
                     <div className={`text-sm font-bold uppercase tracking-wider ${isIndigo ? 'text-indigo-500' : 'text-pink-500'}`}>Day {day}</div>
                     <div className="text-2xl font-black text-slate-800">{date}</div>
                </div>
                <div className={`text-4xl font-black opacity-10 absolute right-0 top-0 ${isIndigo ? 'text-indigo-600' : 'text-pink-600'}`}>
                    {day}
                </div>
            </div>
            
            {/* Schedule Items */}
            <div className="space-y-3 relative z-10">
                {schedule.map((s: any, i: number) => (
                    <div key={i} className="group flex items-center gap-3 p-2 rounded-xl hover:bg-white transition-colors">
                        <div className={`w-1.5 h-8 rounded-full ${isIndigo ? 'bg-indigo-100 group-hover:bg-indigo-500' : 'bg-pink-100 group-hover:bg-pink-500'} transition-colors`}></div>
                        <div className="flex-1">
                            <div className="flex justify-between items-center">
                                <span className="font-bold text-slate-700">{s.subject}</span>
                                <span className="text-xs text-slate-400 font-mono">{s.time}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ScheduleTable;