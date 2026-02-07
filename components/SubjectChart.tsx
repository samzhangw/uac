import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { ChartData, SubjectType } from '../types';
import { PieChart as PieChartIcon } from 'lucide-react';

const data: ChartData[] = [
  { name: SubjectType.MATH_A, value: 30, color: '#6366f1' }, // Indigo
  { name: SubjectType.PHYSICS, value: 25, color: '#ec4899' }, // Pink
  { name: SubjectType.CHEMISTRY, value: 25, color: '#8b5cf6' }, // Violet
  { name: SubjectType.BIOLOGY, value: 20, color: '#10b981' }, // Emerald
];

const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name }: any) => {
    // Hidden on small charts to avoid clutter
    return null;
};

const SubjectChart: React.FC = () => {
  return (
    <div className="h-full">
      <div className="glass-card rounded-3xl p-6 shadow-sm h-full flex flex-col">
        <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-indigo-50 rounded-lg">
                <PieChartIcon className="w-5 h-5 text-indigo-600" />
            </div>
            <h2 className="text-lg font-bold text-slate-800">複習比重建議</h2>
        </div>
        
        <div className="flex-1 min-h-[220px] w-full relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomLabel}
                outerRadius={80}
                innerRadius={50}
                fill="#8884d8"
                dataKey="value"
                paddingAngle={4}
                cornerRadius={6}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', fontSize: '12px' }}
                itemStyle={{ color: '#1e293b' }}
              />
              <Legend 
                verticalAlign="bottom" 
                height={36}
                iconType="circle"
                wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }}
              />
            </PieChart>
          </ResponsiveContainer>
          
          {/* Center Text */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] text-center pointer-events-none">
             <div className="text-xs text-slate-400 font-medium">理組</div>
             <div className="text-lg font-black text-slate-700">配置</div>
          </div>
        </div>
        
        <p className="text-center text-[10px] text-slate-400 mt-2">
            *僅供參考，請依個人狀況調整
        </p>
      </div>
    </div>
  );
};

export default SubjectChart;