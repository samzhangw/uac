import React, { useState, useEffect } from 'react';
import Countdown from './components/Countdown';
import ScheduleTable from './components/ScheduleTable';
import Checklist from './components/Checklist';
import { GraduationCap, Menu, X, ExternalLink, Mail, ArrowRight, BookOpen, ChevronRight, Info, Shield, AlertTriangle, Sparkles, ClipboardList, Target } from 'lucide-react';

interface ExamEvent {
  id: string;
  title: string;
  date: Date;
  info: string;
}

const EVENTS: ExamEvent[] = [
  { 
    id: 'exam_day', 
    title: '116 分科測驗', 
    date: new Date('2027-07-10T00:00:00'), 
    info: '2027/07/10 (六) – 07/11 (日)' 
  }
];

type ModalType = 'about' | 'privacy' | 'disclaimer' | 'checklist' | null;

const MODAL_CONTENT = {
  about: {
    title: "關於本站",
    icon: <Info className="w-6 h-6 text-indigo-500" />,
    content: (
      <div className="space-y-4 text-slate-600 leading-relaxed">
        <p>
          歡迎來到 <strong>116 年分科測驗倒數計時</strong>。這是一個專為 2027 年考生打造的備考輔助工具。
        </p>
        <p>
          我們的使命是提供一個簡潔、美觀且充滿儀式感的空間，幫助考生在漫長的備考過程中掌握時間、穩定心態。
        </p>
      </div>
    )
  },
  privacy: {
    title: "隱私政策",
    icon: <Shield className="w-6 h-6 text-emerald-500" />,
    content: (
      <div className="space-y-4 text-slate-600 leading-relaxed">
        <p>
          我們非常重視您的隱私權。在此向您說明本網站如何處理您的資料：
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>不收集個人資料：</strong> 本網站為純靜態資訊展示與倒數計時工具，我們不會要求您註冊帳號。</li>
          <li><strong>持久化數據：</strong> 本站的「檢查清單」功能會將您的勾選進度儲存在您瀏覽器的 LocalStorage 中。</li>
        </ul>
      </div>
    )
  },
  disclaimer: {
    title: "免責聲明",
    icon: <AlertTriangle className="w-6 h-6 text-amber-500" />,
    content: (
      <div className="space-y-4 text-slate-600 leading-relaxed">
        <p className="font-bold text-amber-700 bg-amber-50 p-3 rounded-lg border border-amber-100">
          注意：本網站為民間開發的輔助工具，並非政府或官方機構之網站。
        </p>
        <p>
          1. <strong>資料來源：</strong> 本站所列之考試日期、時間表與相關規定，皆整理自「財團法人大學入學考試中心基金會」與「大學考試入學分發委員會」之公開資訊。
        </p>
        <p>
          2. <strong>準確性：</strong> 考試政策與日程可能因突發狀況而有所變動。<strong>所有正式資訊請務必以官方簡章與公告為準。</strong>
        </p>
      </div>
    )
  },
  checklist: {
    title: "考前最後檢查",
    icon: <ClipboardList className="w-6 h-6 text-indigo-500" />,
    content: <Checklist inModal={true} />
  }
};

const NavLink = ({ href, children }: { href: string, children?: React.ReactNode }) => (
    <a href={href} className="px-5 py-2 text-sm font-semibold text-slate-600 hover:text-indigo-600 hover:bg-white rounded-full transition-all duration-300">
        {children}
    </a>
);

const FooterLink = ({ onClick, children }: { onClick: () => void, children?: React.ReactNode }) => (
    <button onClick={onClick} className="text-sm text-slate-500 hover:text-indigo-600 font-medium transition-colors relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-indigo-600 hover:after:w-full after:transition-all">
        {children}
    </button>
);

const OfficialLinkCard = ({ href, icon, title, subtitle, color }: any) => (
    <a 
        href={href} 
        target="_blank" 
        rel="noopener noreferrer"
        className={`flex flex-col p-4 bg-white/60 hover:bg-white/80 backdrop-blur-md border border-white/60 rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all group h-full`}
    >
        <div className={`p-2.5 rounded-xl w-fit mb-3 transition-colors ${color}`}>
            {React.cloneElement(icon, { className: "w-5 h-5" })}
        </div>
        <span className="text-slate-800 font-bold text-base mb-1 group-hover:text-indigo-600 transition-colors">{title}</span>
        <span className="text-slate-400 text-xs font-medium">{subtitle}</span>
        <div className="mt-auto pt-3 flex items-center text-xs font-bold text-slate-300 group-hover:text-indigo-400 uppercase tracking-wide">
            Visit Website <ArrowRight className="w-3 h-3 ml-1" />
        </div>
    </a>
);

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeModal, setActiveModal] = useState<ModalType>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);

    // 14-Day Checklist Reminder Logic
    const checkReminder = () => {
      const examDate = EVENTS[0].date;
      const now = new Date();
      const diffTime = examDate.getTime() - now.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays <= 14 && diffDays >= -1) {
          const hasSeen = localStorage.getItem('hasSeenChecklistReminder_116');
          if (!hasSeen) {
              setActiveModal('checklist');
              localStorage.setItem('hasSeenChecklistReminder_116', 'true');
          }
      }
    };
    
    const timer = setTimeout(checkReminder, 1000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  const getNearestEvent = (): ExamEvent => {
    const now = new Date();
    const futureEvents = EVENTS.filter(event => event.date.getTime() > now.getTime());
    futureEvents.sort((a, b) => a.date.getTime() - b.date.getTime());
    return futureEvents.length > 0 ? futureEvents[0] : EVENTS[EVENTS.length - 1];
  };

  const nearestEvent = getNearestEvent();

  return (
    <div className="relative min-h-screen pb-12 font-sans selection:bg-indigo-500 selection:text-white">
      
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 border-b ${scrolled ? 'bg-white/70 backdrop-blur-xl border-slate-200/50 py-3' : 'bg-transparent border-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className={`p-2.5 rounded-2xl transition-all duration-500 shadow-sm ${scrolled ? 'bg-indigo-600 text-white rotate-0' : 'bg-white/40 border border-white/50 text-indigo-700 -rotate-3 group-hover:rotate-0'}`}>
                <GraduationCap className="w-5 h-5" />
            </div>
            <span className={`text-xl font-bold tracking-tight transition-colors ${scrolled ? 'text-slate-900' : 'text-slate-800'}`}>
              116 <span className="text-indigo-600">分科測驗</span>
            </span>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center bg-white/40 backdrop-blur-xl rounded-full px-1.5 p-1.5 border border-white/50 shadow-sm ring-1 ring-white/50">
                <NavLink href="#">首頁</NavLink>
                <NavLink href="#resources">資源</NavLink>
                <NavLink href="#schedule">日程</NavLink>
                <NavLink href="#checklist">清單</NavLink>
            </div>
            <button 
                onClick={() => setIsMenuOpen(true)}
                className={`p-3 rounded-full hover:bg-slate-100 transition-all active:scale-95 ${scrolled ? '' : 'bg-white/40 backdrop-blur-sm border border-white/50'}`}
                aria-label="開啟選單"
            >
                <Menu className="w-5 h-5 text-slate-700" />
            </button>
          </div>
        </div>
      </nav>

      {/* Side Drawer Menu */}
      <DrawerMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      {/* Info Modal */}
      <InfoModal 
        isOpen={activeModal !== null} 
        onClose={() => setActiveModal(null)}
        type={activeModal}
      />

      <main className="relative z-10 pt-32 space-y-16 lg:space-y-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        
        {/* HERO SECTION: Split Layout */}
        <section className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            <div className="space-y-8 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50/80 border border-indigo-100 text-indigo-600 text-xs font-bold uppercase tracking-widest animate-fade-in-up">
                    <Sparkles className="w-3 h-3" />
                    每天前進一點，離目標就更近一步
                </div>
                
                <h1 className="text-5xl sm:text-7xl font-black text-slate-900 tracking-tighter leading-[1.1] animate-fade-in-up delay-100">
                    為了夢想，<br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
                        全力以赴
                    </span>
                </h1>
                
                <p className="text-lg text-slate-500 leading-relaxed max-w-xl mx-auto lg:mx-0 animate-fade-in-up delay-200">
                    所有的努力都不會白費。在分科測驗的路上，讓每一個當下都成為未來的基石。
                </p>

                <div className="flex flex-wrap justify-center lg:justify-start gap-4 animate-fade-in-up delay-300">
                    <a href="#schedule" className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold shadow-xl shadow-indigo-100 hover:-translate-y-1 transition-transform flex items-center gap-2">
                        查看考試日程 <ArrowRight className="w-4 h-4" />
                    </a>
                </div>
            </div>

            {/* Floating Glass Countdown Card */}
            <div className="relative animate-fade-in-up delay-200">
                <div className="absolute inset-0 bg-indigo-500/10 blur-[60px] rounded-full"></div>
                <div className="glass-card rounded-[2.5rem] p-6 sm:p-8 relative border-white/60 shadow-2xl hover:shadow-indigo-200/50 transition-shadow duration-500">
                    <Countdown 
                        targetDate={nearestEvent.date} 
                        title={nearestEvent.title}
                        dateInfo={nearestEvent.info}
                    />
                </div>
            </div>
        </section>

        {/* RESOURCES SECTION (Previously Bento Grid) */}
        <section id="resources" className="space-y-8 scroll-mt-32">
             <div className="flex items-center gap-3 mb-2">
                <BookOpen className="w-6 h-6 text-indigo-500" />
                <h2 className="text-2xl font-bold text-slate-900">重要資源</h2>
             </div>

             <div className="grid md:grid-cols-2 gap-6">
                <OfficialLinkCard 
                    href="https://www.uac.edu.tw/" 
                    title="分發委員會"
                    subtitle="查榜單、找簡章"
                    icon={<BookOpen />}
                    color="bg-purple-100 text-purple-600"
                />
                <OfficialLinkCard 
                    href="https://ap.ceec.edu.tw/RegExam/ExamInfo/B" 
                    title="成績查詢"
                    subtitle="大考中心官方入口"
                    icon={<ExternalLink />}
                    color="bg-orange-100 text-orange-600"
                />
             </div>
        </section>

        {/* Schedule Section */}
        <section id="schedule" className="scroll-mt-32">
           <ScheduleTable />
        </section>

        {/* Checklist Section */}
        <section id="checklist" className="scroll-mt-32">
           <div className="mb-12 text-center md:text-left">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">應考檢查清單</h2>
              <p className="text-slate-500 max-w-2xl text-lg">
                逐項檢查，萬無一失。確保你在考試當天處於最佳狀態。<br/>
                <span className="text-sm text-indigo-500">系統會自動儲存您的勾選進度</span>
              </p>
           </div>
           <Checklist />
        </section>

        {/* Footer */}
        <footer className="mt-20 border-t border-slate-200/60 bg-white/40 backdrop-blur-xl rounded-3xl mb-4">
            <div className="px-6 py-12">
               <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                  <div className="text-center md:text-left">
                    <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
                        <GraduationCap className="w-6 h-6 text-indigo-600" />
                        <span className="font-bold text-slate-800 text-lg">116 分科測驗</span>
                    </div>
                    <p className="text-sm text-slate-500">陪伴你走過備考的每一天。</p>
                  </div>
                  
                  <div className="flex gap-8">
                      <FooterLink onClick={() => setActiveModal('about')}>關於本站</FooterLink>
                      <FooterLink onClick={() => setActiveModal('privacy')}>隱私政策</FooterLink>
                      <FooterLink onClick={() => setActiveModal('disclaimer')}>免責聲明</FooterLink>
                  </div>

                  <a 
                    href="mailto:tyctw.analyze@gmail.com" 
                    className="flex items-center gap-3 px-5 py-2.5 bg-white border border-slate-200 hover:border-indigo-300 rounded-xl transition-all hover:shadow-md group"
                  >
                     <div className="bg-indigo-50 p-1.5 rounded-lg group-hover:bg-indigo-100 transition-colors">
                       <Mail className="w-4 h-4 text-indigo-600" />
                     </div>
                     <span className="text-sm font-semibold text-slate-600 group-hover:text-indigo-700">聯絡我們</span>
                  </a>
               </div>
               <div className="mt-8 pt-8 border-t border-slate-200/60 text-center text-xs text-slate-400 font-medium">
                  © 2027 Exam Countdown. Designed with <span className="text-red-400">♥</span> for ambitious students.
               </div>
            </div>
        </footer>
      </main>
    </div>
  );
}

// Info Modal Component
const InfoModal = ({ isOpen, onClose, type }: { isOpen: boolean; onClose: () => void; type: ModalType }) => {
  if (!isOpen || !type) return null;

  const { title, icon, content } = MODAL_CONTENT[type];
  const isWide = type === 'checklist';

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-md transition-opacity animate-fade-in-up"
        onClick={onClose}
      />
      
      <div className={`relative w-full ${isWide ? 'max-w-5xl' : 'max-w-lg'} glass-card rounded-[2rem] shadow-2xl p-8 transform transition-all animate-fade-in-up`}>
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 transition-colors text-slate-400 hover:text-slate-800 z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-4 mb-8">
          <div className="p-3.5 bg-indigo-50 rounded-2xl border border-indigo-100 shadow-sm">
            {icon}
          </div>
          <h3 className="text-2xl font-bold text-slate-800 tracking-tight">{title}</h3>
        </div>
        
        <div className={`max-h-[70vh] overflow-y-auto pr-2 text-base custom-scrollbar ${isWide ? '-mr-2 px-1' : ''}`}>
           {content}
        </div>

        <div className="mt-8 pt-6 border-t border-slate-100 flex justify-end">
          <button 
            onClick={onClose}
            className="px-8 py-3 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-200 hover:-translate-y-0.5"
          >
            {isWide ? '完成檢查' : '關閉視窗'}
          </button>
        </div>
      </div>
    </div>
  );
};


// Extracted Drawer Component for cleaner code
const DrawerMenu = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    return (
      <div className={`fixed inset-0 z-50 flex justify-end transition-visibility duration-500 ${isOpen ? 'visible pointer-events-auto' : 'invisible pointer-events-none'}`}>
        <div 
          className={`absolute inset-0 bg-slate-900/20 backdrop-blur-sm transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={onClose}
        />
        
        <div className={`relative w-80 sm:w-96 bg-white/90 backdrop-blur-2xl h-full shadow-2xl flex flex-col transition-transform duration-500 cubic-bezier(0.32, 0.72, 0, 1) ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-white/50">
            <div>
                <h3 className="text-lg font-bold text-slate-800">更多資訊</h3>
                <p className="text-xs text-slate-500">相關資源連結</p>
            </div>
            <button 
              onClick={onClose}
              className="p-2 rounded-full hover:bg-slate-100 transition-colors text-slate-500 hover:text-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-8">
            <section>
                <SectionHeader title="官方資源" icon={<BookOpen className="w-4 h-4" />} />
                <div className="space-y-3">
                    <ExternalLinkItem 
                        href="https://www.uac.edu.tw/" 
                        title="大學考試入學分發委員會" 
                        color="text-purple-700"
                        iconColor="text-purple-400"
                        bgColor="bg-purple-50/50 hover:bg-purple-50"
                        borderColor="border-purple-100"
                    />
                    <ExternalLinkItem 
                        href="https://ap.ceec.edu.tw/RegExam/ExamInfo/B" 
                        title="分科成績查詢" 
                        color="text-orange-700"
                        iconColor="text-orange-400"
                        bgColor="bg-orange-50/50 hover:bg-orange-50"
                        borderColor="border-orange-100"
                    />
                </div>
            </section>

            <section>
                <SectionHeader title="其他考試倒數" icon={<ExternalLink className="w-4 h-4" />} />
                <div className="space-y-3">
                    <ExternalLinkItem 
                        href="https://tyctw.github.io/clock/" 
                        title="會考倒數" 
                        color="text-emerald-700"
                        iconColor="text-emerald-400"
                        bgColor="bg-emerald-50/50 hover:bg-emerald-50"
                        borderColor="border-emerald-100"
                    />
                    <ExternalLinkItem 
                        href="https://ceecc.vercel.app/" 
                        title="學測倒數" 
                        color="text-blue-700"
                        iconColor="text-blue-400"
                        bgColor="bg-blue-50/50 hover:bg-blue-50"
                        borderColor="border-blue-100"
                    />
                    <ExternalLinkItem 
                        href="https://teece.vercel.app/" 
                        title="統測倒數" 
                        color="text-amber-700"
                        iconColor="text-amber-400"
                        bgColor="bg-amber-50/50 hover:bg-amber-50"
                        borderColor="border-amber-100"
                    />
                </div>
            </section>
          </div>
          
          <div className="p-6 border-t border-gray-100 bg-gray-50/50">
             <div className="flex items-center gap-3 p-3 rounded-xl bg-white border border-gray-100 shadow-sm">
                <div className="bg-indigo-100 p-2 rounded-full">
                    <Mail className="w-4 h-4 text-indigo-600" />
                </div>
                <div>
                    <div className="text-xs text-gray-400 font-medium">聯絡我們</div>
                    <a href="mailto:tyctw.analyze@gmail.com" className="text-sm font-semibold text-gray-700 hover:text-indigo-600 transition-colors">
                        tyctw.analyze@gmail.com
                    </a>
                </div>
             </div>
          </div>
        </div>
      </div>
    );
}

const SectionHeader = ({ title, icon }: { title: string, icon: React.ReactNode }) => (
    <div className="flex items-center gap-2 mb-3 px-1">
        <span className="text-slate-400">{icon}</span>
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">{title}</h4>
    </div>
);

const ExternalLinkItem = ({ href, title, color, iconColor, bgColor, borderColor }: any) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer"
    className={`flex items-center justify-between p-4 rounded-xl border transition-all duration-200 group ${bgColor} ${borderColor}`}
  >
    <span className={`font-semibold ${color}`}>{title}</span>
    <div className="flex items-center gap-2">
        <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-xs font-medium text-gray-400">前往</span>
        <ChevronRight className={`w-4 h-4 ${iconColor} group-hover:translate-x-0.5 transition-transform`} />
    </div>
  </a>
);

export default App;
