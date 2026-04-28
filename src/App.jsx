import React, { useState, useEffect } from 'react'
import { Calendar, MapPin, Clock, CheckCircle2, Circle, Star, Coffee, Utensils, Camera, Train, Info, ChevronDown, ChevronUp, ExternalLink, Ticket, Heart } from 'lucide-react'
import confetti from 'canvas-confetti'
import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Ticket, 
  MapPin, 
  Clock, 
  ExternalLink, 
  CheckCircle2, 
  Circle, 
  ChevronRight, 
  Heart,
  Camera,
  Star,
  ShoppingBag,
  TrainFront,
  Navigation
} from 'lucide-react';

const App = () => {
  // 狀態管理：分頁、日期、預約狀態
  const [activeTab, setActiveTab] = useState('itinerary'); // 'itinerary' | 'booking'
  const [selectedDay, setSelectedDay] = useState(1);
  const [bookingState, setBookingState] = useState({});
  const [showConfetti, setShowConfetti] = useState(false);

  // 初始化資料與 LocalStorage
  useEffect(() => {
    const saved = localStorage.getItem('tokyo_2026_bookings');
    if (saved) setBookingState(JSON.parse(saved));
  }, []);

  const updateBooking = (id) => {
    const newState = { ...bookingState, [id]: !bookingState[id] };
    setBookingState(newState);
    localStorage.setItem('tokyo_2026_bookings', JSON.stringify(newState));
    
    if (!bookingState[id]) {
      triggerConfetti();
    }
  };

  const triggerConfetti = () => {
    if (window.confetti) {
      window.confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.7 },
        colors: ['#FFC0CB', '#BDFCC9', '#FFFFFF']
      });
    }
  };

  // 10 天完整行程數據
  const itinerary = [
    { day: 1, date: "5/20 (三)", title: "抵達成田：展望首航", items: [
      { time: "14:45", desc: "抵達成田機場 (NRT)", type: "transport" },
      { time: "16:30", desc: "船堀 Check-in 飯店手續", type: "hotel" },
      { time: "19:30", desc: "船堀塔展望台 - 免費欣賞東京都夜景", type: "spot" }
    ]},
    { day: 2, date: "5/21 (四)", title: "湘南海岸與逗子花火", items: [
      { time: "10:00", desc: "江之島/鎌倉周邊散策", type: "spot" },
      { time: "13:00", desc: "鎌倉高校前、七里濱巡禮", type: "spot" },
      { time: "17:00", desc: "逗子海岸花火大會 (年度盛事)", type: "event" }
    ]},
    { day: 3, date: "5/22 (五)", title: "迪士尼樂園極致攻略", hasBooking: true, items: [
      { time: "05:11", desc: "搭乘首班車前往舞濱 (必爭之地)", type: "transport" },
      { time: "08:15", desc: "入園首搶「美女與野獸」DPA", type: "star" },
      { time: "10:00", desc: "搶購「小熊維尼」優先券 (PP)", type: "activity" }
    ]},
    { day: 4, date: "5/23 (六)", title: "平成回憶與澀谷之巔", hasBooking: true, items: [
      { time: "13:00", desc: "【六本木 Museum】平成戀愛展", type: "booking" },
      { time: "17:00", desc: "【SHIBUYA SKY】拍攝白晝/黃昏/黑夜極致美景", type: "star" },
      { time: "19:30", desc: "澀谷周邊晚餐與逛街", type: "food" }
    ]},
    { day: 5, date: "5/24 (日)", title: "品川水族藝術與新宿貓", hasBooking: true, items: [
      { time: "13:30", desc: "【Maxell Aqua Park 品川】數位水族表演", type: "booking" },
      { time: "17:00", desc: "品川周邊散策", type: "spot" },
      { time: "20:00", desc: "新宿東口觀賞 3D 三色貓 😸", type: "spot" }
    ]},
    { day: 6, date: "5/25 (一)", title: "築地美食與高級板前", hasBooking: true, items: [
      { time: "08:30", desc: "築地外市場豪華早餐", type: "food" },
      { time: "11:00", desc: "皇居及丸之內周邊巡禮", type: "spot" },
      { time: "17:30", desc: "【まんてん鮨】享受 Omakase 晚餐", type: "booking" },
      { time: "20:00", desc: "芝公園拍攝東京鐵塔夜景", type: "camera" }
    ]},
    { day: 7, date: "5/26 (二)", title: "秋葉原與淺草和服夢", hasBooking: true, items: [
      { time: "09:00", desc: "秋葉原車站買牛奶 (經典體驗)", type: "food" },
      { time: "10:00", desc: "【梨花和服】換裝 (淺草店)", type: "booking" },
      { time: "13:00", desc: "淺草寺/晴空塔拍照紀錄", type: "camera" },
      { time: "16:00", desc: "秋葉原探索動漫文化", type: "shopping" }
    ]},
    { day: 8, date: "5/27 (三)", title: "迪士尼海洋 25 週年", hasBooking: true, items: [
      { time: "05:00", desc: "出發前往迪士尼海洋 (DS)", type: "transport" },
      { time: "08:30", desc: "搶搶「安娜與艾莎」DPA / 「海底兩萬哩」PP", type: "star" },
      { time: "15:15", desc: "樂佩天燈活動 DPA", type: "event" }
    ]},
    { day: 9, date: "5/28 (四)", title: "數位感官與哆啦A夢", hasBooking: true, items: [
      { time: "09:00", desc: "豐洲市場海鮮饗宴", type: "food" },
      { time: "11:00", desc: "【teamLab Planets】光影體驗", type: "booking" },
      { time: "14:00", desc: "【100% 哆啦A夢展】回味童心", type: "booking" },
      { time: "18:00", desc: "台場夕陽與鋼彈模型", type: "spot" }
    ]},
    { day: 10, date: "5/29 (五)", title: "恐龍特展與歸途", hasBooking: true, items: [
      { time: "11:00", desc: "【2026 恐龍博覽會】(國立科學博物館)", type: "booking" },
      { time: "14:30", desc: "上野阿美橫丁最後採買", type: "shopping" },
      { time: "18:40", desc: "搭乘 Skyliner 前往機場", type: "transport" },
      { time: "21:35", desc: "CX521 航班返港", type: "transport" }
    ]}
  ];

  // 預約項目數據
  const bookings = [
    { id: 'disney_l', name: '東京迪士尼樂園', date: '5/22 (D3)', url: 'https://www.tokyodisneyresort.jp/tc/ticket/index.html' },
    { id: 'heisei', name: '平成戀愛展 (六本木)', date: '5/23 (D4)', url: 'https://roppongimuseum.jp/' },
    { id: 'sky', name: 'SHIBUYA SKY (17:00)', date: '5/23 (D4)', url: 'https://www.shibuya-scramble-square.com/sky/ticket/' },
    { id: 'aqua', name: '品川水族館 Maxell', date: '5/24 (D5)', url: 'https://www.aqua-park.jp/aqua/' },
    { id: 'sushi', name: 'まんてん鮨 (板前)', date: '5/25 (D6)', url: 'https://www.manten-sushi.com/' },
    { id: 'kimono', name: '梨花和服 (淺草)', date: '5/26 (D7)', url: 'https://ewha-yifu.com/' },
    { id: 'disney_s', name: '東京迪士尼海洋', date: '5/27 (D8)', url: 'https://www.tokyodisneyresort.jp/tc/ticket/index.html' },
    { id: 'teamlab', name: 'teamLab Planets', date: '5/28 (D9)', url: 'https://planets.teamlab.art/tokyo/zh-hant/' },
    { id: 'doraemon', name: '100% 哆啦A夢展', date: '5/28 (D9)', url: 'https://doraemon100japan.com/' },
    { id: 'dino', name: '2026 恐龍博覽會', date: '5/29 (D10)', url: 'https://www.kahaku.go.jp' },
  ];

  const currentDayData = itinerary.find(d => d.day === selectedDay);

  return (
    <div className="min-h-screen bg-[#FFF5F8] text-slate-800 font-sans pb-24">
      {/* 引用 Confetti 庫 */}
      <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js"></script>

      {/* 頂部主分頁切換 */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-pink-100 shadow-sm">
        <div className="max-w-xl mx-auto flex p-2">
          <button 
            onClick={() => setActiveTab('itinerary')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl font-bold transition-all ${activeTab === 'itinerary' ? 'bg-pink-400 text-white shadow-md' : 'text-slate-400 hover:bg-pink-50'}`}
          >
            <Calendar size={18} /> 詳細行程
          </button>
          <button 
            onClick={() => setActiveTab('booking')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl font-bold transition-all ${activeTab === 'booking' ? 'bg-pink-400 text-white shadow-md' : 'text-slate-400 hover:bg-pink-50'}`}
          >
            <Ticket size={18} /> 預訂管理
          </button>
        </div>
      </nav>

      {/* 詳細行程頁面內容 */}
      {activeTab === 'itinerary' && (
        <div className="max-w-xl mx-auto px-4 mt-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {/* 日期選擇拉軸 */}
          <div className="flex gap-3 overflow-x-auto no-scrollbar py-2 mb-6">
            {itinerary.map(d => (
              <button 
                key={d.day}
                onClick={() => setSelectedDay(d.day)}
                className={`flex-shrink-0 w-14 h-20 rounded-3xl flex flex-col items-center justify-center gap-1 transition-all border-2 ${selectedDay === d.day ? 'bg-white border-pink-400 scale-105 shadow-pink-100 shadow-lg' : 'bg-pink-50/50 border-transparent text-pink-300'}`}
              >
                <span className="text-[10px] font-black uppercase">Day</span>
                <span className="text-xl font-black">{d.day}</span>
              </button>
            ))}
          </div>

          {/* 當日標題 */}
          <div className="mb-8">
            <h1 className="text-3xl font-black text-slate-800 leading-tight">{currentDayData.title}</h1>
            <p className="text-pink-400 font-bold mt-2 flex items-center gap-2">
              <Navigation size={16} /> 2026 年 {currentDayData.date}
            </p>
          </div>

          {/* 前往預訂按鈕 (如果當天有預約) */}
          {currentDayData.hasBooking && (
            <button 
              onClick={() => setActiveTab('booking')}
              className="w-full mb-8 bg-white border border-pink-200 p-4 rounded-3xl flex items-center justify-between shadow-sm hover:shadow-md transition-shadow group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center text-pink-400 group-hover:scale-110 transition-transform">
                  <Ticket size={24} />
                </div>
                <div className="text-left">
                  <h4 className="font-black text-slate-700">本日有預約項目</h4>
                  <p className="text-xs text-pink-400 font-bold">前往預訂頁面查看詳情</p>
                </div>
              </div>
              <ChevronRight className="text-pink-200" />
            </button>
          )}

          {/* 行程時間軸 */}
          <div className="space-y-6 relative border-l-2 border-pink-100 ml-4 pl-8">
            {currentDayData.items.map((item, idx) => (
              <div key={idx} className="relative">
                {/* 時間點圖示 */}
                <div className="absolute -left-[41px] top-1 w-6 h-6 rounded-full bg-white border-2 border-pink-300 flex items-center justify-center">
                  <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                </div>
                
                <div className="bg-white p-5 rounded-[2rem] shadow-sm border border-pink-50 hover:border-pink-200 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-black bg-pink-50 text-pink-400 px-3 py-1 rounded-full flex items-center gap-1">
                      <Clock size={12} /> {item.time}
                    </span>
                    <div className="flex gap-1">
                      {item.type === 'star' && <Star size={14} className="text-yellow-400 fill-current" />}
                      {item.type === 'camera' && <Camera size={14} className="text-blue-400" />}
                      {item.type === 'food' && <Heart size={14} className="text-rose-400" />}
                    </div>
                  </div>
                  <p className="font-bold text-slate-700 leading-relaxed text-lg">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 預約管理頁面內容 */}
      {activeTab === 'booking' && (
        <div className="max-w-xl mx-auto px-4 mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 bg-pink-400 rounded-3xl flex items-center justify-center text-white shadow-lg shadow-pink-200">
              <Ticket size={28} />
            </div>
            <div>
              <h1 className="text-2xl font-black text-slate-800">預約管理中心</h1>
              <p className="text-slate-400 text-sm font-bold">集中處理 10 天內的所有預約項目</p>
            </div>
          </div>

          <div className="space-y-4">
            {bookings.map((item) => (
              <div key={item.id} className={`p-5 rounded-[2.5rem] border-2 transition-all flex flex-col gap-4 ${bookingState[item.id] ? 'bg-emerald-50/30 border-emerald-100 shadow-none' : 'bg-white border-pink-50 shadow-md shadow-pink-100/30'}`}>
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <span className="text-[10px] font-black uppercase text-pink-300 border border-pink-100 px-2 py-0.5 rounded-lg inline-block mb-1">
                      {item.date}
                    </span>
                    <h3 className={`text-lg font-black transition-all ${bookingState[item.id] ? 'text-emerald-700 line-through opacity-50' : 'text-slate-800'}`}>
                      {item.name}
                    </h3>
                  </div>
                  <a 
                    href={item.url} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="w-12 h-12 bg-pink-50 text-pink-400 rounded-2xl flex items-center justify-center hover:bg-pink-400 hover:text-white transition-all shadow-sm"
                  >
                    <ExternalLink size={20} />
                  </a>
                </div>

                <div className="flex items-center justify-between border-t border-slate-50 pt-4">
                  <span className={`text-xs font-bold ${bookingState[item.id] ? 'text-emerald-600' : 'text-amber-500'}`}>
                    {bookingState[item.id] ? '預約完成，準備出發！' : '尚未預約，請點擊右側開關'}
                  </span>
                  
                  <button 
                    onClick={() => updateBooking(item.id)}
                    className={`flex items-center gap-2 px-5 py-2 rounded-2xl font-black text-sm transition-all shadow-sm ${bookingState[item.id] ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-400'}`}
                  >
                    {bookingState[item.id] ? (
                      <><CheckCircle2 size={16} /> 已預訂</>
                    ) : (
                      <><Circle size={16} /> 待預約</>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center text-slate-300 px-8">
            <p className="text-xs font-bold leading-relaxed">
              * 貼心提醒：SHIBUYA SKY 預約 17:00 時段最美；迪士尼樂園需提早入園搶 DPA。
            </p>
          </div>
        </div>
      )}

      {/* 底部導航欄 (快速切換日期) */}
      {activeTab === 'itinerary' && (
        <div className="fixed bottom-6 left-0 right-0 px-6 pointer-events-none">
          <div className="max-w-sm mx-auto bg-white/90 backdrop-blur-xl border border-pink-100 p-2 rounded-full shadow-2xl flex items-center justify-around pointer-events-auto">
            <button 
              disabled={selectedDay === 1}
              onClick={() => setSelectedDay(prev => prev - 1)}
              className="w-12 h-12 flex items-center justify-center text-pink-400 disabled:opacity-20 transition-opacity"
            >
              <ChevronRight className="rotate-180" size={24} />
            </button>
            <div className="flex items-center gap-1">
              <span className="text-lg font-black text-slate-800">DAY {selectedDay}</span>
              <span className="text-xs font-bold text-slate-300">/ 10</span>
            </div>
            <button 
              disabled={selectedDay === 10}
              onClick={() => setSelectedDay(prev => prev + 1)}
              className="w-12 h-12 flex items-center justify-center text-pink-400 disabled:opacity-20 transition-opacity"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slide-in-from-bottom { 
          from { transform: translateY(1rem); } 
          to { transform: translateY(0); } 
        }
        .animate-in { animation: fade-in 0.3s ease-out, slide-in-from-bottom 0.3s ease-out; }
      `}} />
    </div>
  );
};

export default App;
