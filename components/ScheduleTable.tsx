import React from 'react';
import { Calendar, Clock, MapPin } from 'lucide-react';

interface ExamSchedule {
  day: string;
  date: string;
  sessions: {
    time: string;
    description: string;
  }[];
}

const ScheduleTable: React.FC = () => {
  const schedules: ExamSchedule[] = [
    {
      day: '第一天',
      date: '2027 年 7 月 10 日 (六)',
      sessions: [
        {
          time: '08:20 - 10:20',
          description: '中文科',
        },
        {
          time: '11:00 - 13:00',
          description: '英文科',
        },
        {
          time: '14:00 - 16:00',
          description: '數學科',
        },
      ],
    },
    {
      day: '第二天',
      date: '2027 年 7 月 11 日 (日)',
      sessions: [
        {
          time: '08:20 - 09:40',
          description: '自然科 (物理、化學)',
        },
        {
          time: '10:20 - 12:00',
          description: '自然科 (生物、地球科學)',
        },
        {
          time: '13:00 - 14:40',
          description: '社會科 (歷史、地理、公民)',
        },
      ],
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-slate-900 mb-2">考試時程</h2>
        <p className="text-slate-500">116 年分科測驗的完整日程安排</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {schedules.map((schedule) => (
          <div 
            key={schedule.day}
            className="group glass-card rounded-2xl p-6 border-white/60 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-indigo-100 rounded-xl group-hover:bg-indigo-200 transition-colors">
                <Calendar className="w-5 h-5 text-indigo-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">{schedule.day}</h3>
                <p className="text-sm text-slate-500">{schedule.date}</p>
              </div>
            </div>

            <div className="space-y-4">
              {schedule.sessions.map((session, index) => (
                <div 
                  key={index}
                  className="p-4 bg-white/50 hover:bg-white/80 backdrop-blur rounded-xl border border-white/40 transition-all"
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-indigo-50 rounded-lg mt-0.5">
                      <Clock className="w-4 h-4 text-indigo-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-slate-900">{session.time}</p>
                      <p className="text-sm text-slate-600 mt-1">{session.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 flex gap-4">
        <div className="flex-shrink-0">
          <MapPin className="w-6 h-6 text-amber-600 mt-0.5" />
        </div>
        <div>
          <h4 className="font-bold text-amber-900 mb-2">考試地點</h4>
          <p className="text-sm text-amber-700">
            考場將由考試中心另行公告。考生請於規定時間內持准考證至指定考場報到。
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4 text-sm">
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
          <p className="text-blue-600 font-bold mb-1">座位編號公告</p>
          <p className="text-blue-700">將於考試前一週公告在大考中心網站</p>
        </div>
        <div className="bg-green-50 border border-green-100 rounded-xl p-4">
          <p className="text-green-600 font-bold mb-1">說明會</p>
          <p className="text-green-700">請提前 30 分鐘到達考場，聽取監考老師說明</p>
        </div>
        <div className="bg-purple-50 border border-purple-100 rounded-xl p-4">
          <p className="text-purple-600 font-bold mb-1">准考證</p>
          <p className="text-purple-700">必須攜帶准考證和身分證件進入考場</p>
        </div>
      </div>
    </div>
  );
};

export default ScheduleTable;
