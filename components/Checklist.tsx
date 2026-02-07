import React, { useState, useEffect } from 'react';
import { ClipboardList, Check, RotateCcw, Trophy } from 'lucide-react';

interface ChecklistItem {
  id: string;
  text: string;
  highlight?: boolean;
}

interface ChecklistCategory {
  title: string;
  color: string;
  items: ChecklistItem[];
}

interface ChecklistProps {
  inModal?: boolean;
}

const CHECKLIST_DATA: ChecklistCategory[] = [
  {
    title: "考前準備",
    color: "bg-indigo-500",
    items: [
      { id: "p1", text: "確認已準備好應試有效證件正本（身分證、有照片健保卡、駕照、護照或身心障礙證明）。" },
      { id: "p2", text: "仔細閱讀簡章之「試場規則」及「違規處理辦法」。" },
      { id: "p3", text: "注意身體保健及安全，盡量避免出入公共場所。" },
      { id: "p4", text: "查詢應試號碼與考試地點（預計 116 年 7 月上旬公布）。" },
      { id: "p5", text: "於考試前一天 (7月9日) 下午 2 時至 4 時查看試場及座位。" },
      { id: "p6", text: "熟悉前往考區試場的大眾運輸工具及路線。" },
    ]
  },
  {
    title: "考試當日 - 出門前",
    color: "bg-pink-500",
    items: [
      { id: "d1", text: "再次確認有攜帶「應試有效證件正本」。", highlight: true },
      { id: "d2", text: "檢查文具：黑色 2B 軟心鉛筆、黑色墨水原子筆、橡皮擦、修正帶(液)。" },
      { id: "d3", text: "檢查工具：直尺、三角板、量角器、圓規。" },
      { id: "d4", text: "確認手錶/時鐘無計算、通訊、記憶功能，且不會發出聲響。" },
    ]
  },
  {
    title: "考試當日 - 進試場前",
    color: "bg-purple-500",
    items: [
      { id: "e1", text: "檢查證件正本、文具是否帶在身上。" },
      { id: "e2", text: "確認鐘錶鬧鈴已關閉。" },
      { id: "e3", text: "取下穿戴式裝置（智慧手錶/手環/眼鏡/耳機），放入臨時置物區。" },
      { id: "e4", text: "手機完全關機（含鬧鈴/震動/飛航模式皆不可），放入臨時置物區。", highlight: true },
    ]
  },
  {
    title: "預備鈴響 - 進試場後",
    color: "bg-blue-500",
    items: [
      { id: "r1", text: "除證件與文具外，其餘物品均放置於臨時置物區。" },
      { id: "r2", text: "確認座位標示單（姓名/號碼/科目）正確，有誤舉手反映。" },
      { id: "r3", text: "目視核對答題卷資料，考試開始鈴響前「不可翻閱、不可書寫、不可簽名」。" },
    ]
  },
  {
    title: "作答時注意事項",
    color: "bg-emerald-500",
    items: [
      { id: "w1", text: "考試中不得飲食、喝水、嚼口香糖（除非事先申請）。" },
      { id: "w2", text: "考試開始鈴響後，確認答題卷無誤，並於「確認後考生簽名」欄以正楷簽全名。", highlight: true },
      { id: "w3", text: "保持答題卷清潔，不可破壞條碼或定位點。" },
      { id: "w4", text: "劃記要粗、黑、清晰，且須「方格劃滿」。" },
      { id: "w5", text: "結束鈴響畢，立即停止作答（含擦拭、加黑），雙手離開桌面。" },
    ]
  },
  {
    title: "小叮嚀",
    color: "bg-amber-500",
    items: [
      { id: "t1", text: "確認報名時填寫的手機號碼可接收簡訊，以利收到試務通知。" },
    ]
  }
];

const Checklist: React.FC<ChecklistProps> = ({ inModal = false }) => {
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('examChecklist');
      return saved ? JSON.parse(saved) : {};
    }
    return {};
  });

  useEffect(() => {
    localStorage.setItem('examChecklist', JSON.stringify(checkedItems));
  }, [checkedItems]);

  const toggleItem = (id: string) => {
    setCheckedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const resetChecklist = () => {
    if (window.confirm('確定要清除所有勾選紀錄嗎？')) {
      setCheckedItems({});
    }
  };

  const calculateProgress = () => {
    const totalItems = CHECKLIST_DATA.reduce((acc, cat) => acc + cat.items.length, 0);
    const completedItems = Object.values(checkedItems).filter(Boolean).length;
    return Math.round((completedItems / totalItems) * 100);
  };

  const progress = calculateProgress();

  return (
    <div className="w-full">
      {/* Sticky Header with Progress */}
      <div className={`sticky z-20 mb-6 glass-card rounded-2xl p-4 border-indigo-100 shadow-sm transition-all duration-300 ${inModal ? 'top-0' : 'top-20'}`}>
         <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${progress === 100 ? 'bg-yellow-100 text-yellow-600' : 'bg-indigo-100 text-indigo-600'}`}>
                    {progress === 100 ? <Trophy className="w-5 h-5" /> : <ClipboardList className="w-5 h-5" />}
                </div>
                <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Preparation</div>
                    <div className="text-sm font-bold text-slate-800">檢查進度: {progress}%</div>
                </div>
            </div>
            
            <div className="flex-1 max-w-xs mx-4 hidden sm:block">
                <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                    <div 
                        className={`h-full rounded-full transition-all duration-700 ease-out ${progress === 100 ? 'bg-gradient-to-r from-yellow-400 to-orange-500' : 'bg-gradient-to-r from-indigo-500 to-cyan-400'}`}
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
            </div>

            <button 
                onClick={resetChecklist}
                className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                title="重置清單"
            >
                <RotateCcw className="w-4 h-4" />
            </button>
         </div>
      </div>

      {/* Grid Layout */}
      <div className={`grid gap-6 ${inModal ? 'md:grid-cols-2' : 'md:grid-cols-2 lg:grid-cols-3'}`}>
        {CHECKLIST_DATA.map((category) => (
            <div key={category.title} className="glass-card p-0 rounded-3xl overflow-hidden flex flex-col h-full hover:shadow-xl transition-shadow duration-300">
                <div className="p-5 border-b border-slate-100 bg-white/50 backdrop-blur-sm">
                    <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ring-4 ring-opacity-20 ${category.color.replace('bg-', 'ring-')} ${category.color}`}></div>
                        <h3 className="font-bold text-slate-800">{category.title}</h3>
                    </div>
                </div>
                
                <div className="p-4 space-y-2 flex-1 bg-white/30">
                    {category.items.map((item) => (
                        <div 
                            key={item.id} 
                            onClick={() => toggleItem(item.id)}
                            className={`
                                group relative p-3 rounded-xl cursor-pointer transition-all duration-200 border
                                ${checkedItems[item.id] 
                                    ? 'bg-slate-50 border-transparent' 
                                    : 'bg-white border-white/60 hover:border-indigo-200 hover:shadow-sm'
                                }
                            `}
                        >
                            <div className="flex items-start gap-3 relative z-10">
                                <div className={`
                                    mt-0.5 w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all duration-300
                                    ${checkedItems[item.id] 
                                        ? 'bg-emerald-500 border-emerald-500 rotate-0' 
                                        : 'border-slate-300 bg-white group-hover:border-indigo-400'
                                    }
                                `}>
                                    <Check className={`w-3.5 h-3.5 text-white stroke-[3px] transition-all duration-300 ${checkedItems[item.id] ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`} />
                                </div>
                                
                                <span className={`text-sm leading-relaxed transition-all duration-300 ${
                                    checkedItems[item.id] 
                                        ? 'text-slate-400 line-through decoration-slate-300 opacity-60' 
                                        : item.highlight ? 'text-indigo-900 font-bold' : 'text-slate-700 font-medium'
                                }`}>
                                    {item.text}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        ))}
      </div>
    </div>
  );
};

export default Checklist;