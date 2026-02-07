import React, { useState, useEffect } from 'react';
import { CheckCircle2, Circle, AlertCircle } from 'lucide-react';

interface ChecklistItem {
  id: string;
  category: string;
  text: string;
  completed: boolean;
}

interface ChecklistProps {
  inModal?: boolean;
}

const Checklist: React.FC<ChecklistProps> = ({ inModal = false }) => {
  const [items, setItems] = useState<ChecklistItem[]>([]);
  const [loading, setLoading] = useState(true);

  const defaultItems: ChecklistItem[] = [
    {
      id: '1',
      category: '文件準備',
      text: '准考證',
      completed: false,
    },
    {
      id: '2',
      category: '文件準備',
      text: '身分證或護照',
      completed: false,
    },
    {
      id: '3',
      category: '文件準備',
      text: '黑色簽字筆（至少 2 支）',
      completed: false,
    },
    {
      id: '4',
      category: '文件準備',
      text: '其他需要的證件或應考憑證',
      completed: false,
    },
    {
      id: '5',
      category: '物品準備',
      text: '橡皮擦（考試用）',
      completed: false,
    },
    {
      id: '6',
      category: '物品準備',
      text: '計算器（經核可）',
      completed: false,
    },
    {
      id: '7',
      category: '物品準備',
      text: '手錶（無計算、儲存等功能）',
      completed: false,
    },
    {
      id: '8',
      category: '物品準備',
      text: '透明墊板',
      completed: false,
    },
    {
      id: '9',
      category: '物品準備',
      text: '清水和毛巾',
      completed: false,
    },
    {
      id: '10',
      category: '衛生健康',
      text: '體溫計（備用）',
      completed: false,
    },
    {
      id: '11',
      category: '衛生健康',
      text: '必要的藥物或醫療用品',
      completed: false,
    },
    {
      id: '12',
      category: '衛生健康',
      text: '感冒藥、胃藥等常用藥',
      completed: false,
    },
    {
      id: '13',
      category: '前一晚',
      text: '檢查天氣並準備適當衣著',
      completed: false,
    },
    {
      id: '14',
      category: '前一晚',
      text: '確認考場地點和交通路線',
      completed: false,
    },
    {
      id: '15',
      category: '前一晚',
      text: '早點睡覺，確保充足睡眠',
      completed: false,
    },
    {
      id: '16',
      category: '考試當天',
      text: '吃好早餐',
      completed: false,
    },
    {
      id: '17',
      category: '考試當天',
      text: '提前 30-45 分鐘到達考場',
      completed: false,
    },
    {
      id: '18',
      category: '考試當天',
      text: '檢查所有必要物品',
      completed: false,
    },
    {
      id: '19',
      category: '考試當天',
      text: '調整心態，深呼吸',
      completed: false,
    },
    {
      id: '20',
      category: '考試當天',
      text: '仔細閱讀題目，檢查答案',
      completed: false,
    },
  ];

  useEffect(() => {
    // 從 localStorage 載入項目
    const saved = localStorage.getItem('examChecklist_116');
    if (saved) {
      setItems(JSON.parse(saved));
    } else {
      setItems(defaultItems);
    }
    setLoading(false);
  }, []);

  const toggleItem = (id: string) => {
    const updated = items.map((item) =>
      item.id === id ? { ...item, completed: !item.completed } : item
    );
    setItems(updated);
    localStorage.setItem('examChecklist_116', JSON.stringify(updated));
  };

  const resetAll = () => {
    if (confirm('確定要重置所有勾選嗎？')) {
      const reset = items.map((item) => ({ ...item, completed: false }));
      setItems(reset);
      localStorage.setItem('examChecklist_116', JSON.stringify(reset));
    }
  };

  if (loading) {
    return <div>載入中...</div>;
  }

  const categories = Array.from(new Set(items.map((item) => item.category)));
  const completedCount = items.filter((item) => item.completed).length;
  const progress = Math.round((completedCount / items.length) * 100);

  return (
    <div className={`space-y-8 ${inModal ? 'max-h-full' : ''}`}>
      {/* Progress Bar */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900">完成進度</h3>
          <span className="text-3xl font-black text-indigo-600">{progress}%</span>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-sm text-slate-500 text-center">
          已完成 {completedCount} / {items.length} 項
        </p>
      </div>

      {/* Warning for those in modal */}
      {inModal && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex gap-3">
          <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-blue-900 mb-1">溫馨提示</p>
            <p className="text-sm text-blue-700">
              考試還有 14 天，現在是最後的準備階段。請逐項檢查，確保萬無一失！
            </p>
          </div>
        </div>
      )}

      {/* Checklist Items */}
      <div className="space-y-6">
        {categories.map((category) => {
          const categoryItems = items.filter((item) => item.category === category);
          const categoryCompleted = categoryItems.filter((item) => item.completed).length;

          return (
            <div key={category}>
              <div className="mb-4 flex items-center justify-between">
                <h4 className="text-base font-bold text-slate-800">
                  {category}
                  <span className="ml-2 text-sm text-slate-400 font-normal">
                    ({categoryCompleted}/{categoryItems.length})
                  </span>
                </h4>
              </div>

              <div className="space-y-2">
                {categoryItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => toggleItem(item.id)}
                    className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left ${
                      item.completed
                        ? 'bg-green-50 border-green-200 hover:border-green-300'
                        : 'bg-white hover:bg-slate-50 border-slate-200 hover:border-indigo-300'
                    }`}
                  >
                    <div className="flex-shrink-0">
                      {item.completed ? (
                        <CheckCircle2 className="w-6 h-6 text-green-600" />
                      ) : (
                        <Circle className="w-6 h-6 text-slate-300 group-hover:text-indigo-400" />
                      )}
                    </div>
                    <span
                      className={`flex-1 font-medium ${
                        item.completed
                          ? 'text-green-700 line-through'
                          : 'text-slate-700'
                      }`}
                    >
                      {item.text}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Reset Button */}
      <div className="flex justify-center pt-4">
        <button
          onClick={resetAll}
          className="px-6 py-2 text-sm font-medium text-slate-500 hover:text-slate-700 border border-slate-200 hover:border-slate-300 rounded-lg transition-colors"
        >
          重置所有進度
        </button>
      </div>
    </div>
  );
};

export default Checklist;
