import React, { useState, useEffect } from 'react';

const JarvisCore = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [chatMessage, setChatMessage] = useState('');
  const [activeChat, setActiveChat] = useState('Otávio FBO');
  const [messages, setMessages] = useState([
    { id: 1, sender: 'Otávio FBO', text: 'Jarvis, me dê um exemplo de mensagens para enviar para clientes.', time: '14:17', type: 'user' },
    { id: 2, sender: 'Jarvis', text: 'Com certeza, Otávio! Aqui estão três modelos...', time: '14:17', type: 'agent' },
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;
    
    const newMsg = {
      id: Date.now(),
      sender: 'You',
      text: chatMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'user'
    };
    
    setMessages([...messages, newMsg]);
    setChatMessage('');
  };

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>
    )},
    { id: 'crm', label: 'CRM Leads', icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
    )},
    { id: 'projects', label: 'Projects', icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
    )},
    { id: 'whatsapp', label: 'WhatsApp', icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
    )},
    { id: 'agents', label: 'Settings', icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
    )},
  ];

  return (
    <div className="flex h-screen w-full bg-[#09090b] text-[#fafafa] selection:bg-zinc-800 antialiased overflow-hidden">
      
      {/* Sidebar - Pro Workspace */}
      <aside className="w-16 hover:w-64 group border-r border-zinc-900 bg-[#09090b] flex flex-col transition-all duration-300 z-50 overflow-hidden shadow-2xl">
        <div className="p-5 mb-8 flex items-center overflow-hidden">
           <div className="w-6 h-6 bg-[#fafafa] text-black flex items-center justify-center font-bold text-xs rounded shrink-0">J</div>
           <span className="ml-4 font-bold text-xs uppercase tracking-[0.3em] opacity-0 group-hover:opacity-100 transition-opacity text-zinc-100">Jarvis OS</span>
        </div>

        <nav className="flex-1 px-3 space-y-1">
          {menuItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center p-2 rounded-md cursor-pointer transition-all duration-200 ${
                activeTab === item.id ? 'bg-zinc-900 text-[#fafafa] shadow-inner border border-zinc-800' : 'text-zinc-500 hover:text-zinc-200 hover:bg-zinc-950'
              }`}
            >
              <div className="shrink-0 flex items-center justify-center w-6">{item.icon}</div>
              <span className="ml-4 text-[11px] font-semibold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap uppercase tracking-wider">{item.label}</span>
            </div>
          ))}
        </nav>

        <div className="p-5 border-t border-zinc-900 flex flex-col items-center group-hover:items-start transition-all">
          <div className="flex items-center space-x-3 text-[10px] text-zinc-600">
            <div className="w-1.5 h-1.5 rounded-full bg-zinc-700 animate-pulse shadow-[0_0_8px_#3f3f46]"></div>
            <span className="opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap mono uppercase tracking-widest">Core.v2.Active</span>
          </div>
        </div>
      </aside>

      {/* Main Viewport */}
      <main className="flex-1 flex flex-col min-w-0 bg-[#09090b] relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_#18181b_0%,_transparent_50%)] pointer-events-none opacity-50"></div>
        
        {/* Top Header */}
        <header className="h-16 border-b border-zinc-900 flex items-center justify-between px-10 bg-[#09090b]/80 backdrop-blur-xl shrink-0 z-40">
          <div className="flex items-center space-x-6">
             <div className="flex flex-col">
               <h2 className="text-[10px] font-bold text-zinc-500 tracking-[0.2em] uppercase">{activeTab}</h2>
               <div className="flex items-center space-x-2 mt-1">
                 <span className="text-xs font-semibold text-zinc-100 tracking-tight">Production_Main</span>
                 <div className="w-1 h-1 rounded-full bg-zinc-700"></div>
                 <span className="text-[10px] text-zinc-600 font-mono italic">Ssh://felipe@jarvis</span>
               </div>
             </div>
          </div>
          <div className="flex items-center space-x-8">
            <div className="text-2xl font-light font-mono text-zinc-100 tracking-tighter" id="current-time">
              {time}
            </div>
            <button className="text-[10px] font-bold uppercase tracking-[0.2em] bg-[#fafafa] text-black px-4 py-2 rounded-sm hover:bg-white transition-all shadow-lg active:scale-95">
              Sync Project
            </button>
          </div>
        </header>

        {/* Content Container */}
        <div className="flex-1 overflow-y-auto p-12 pt-10 z-10 relative">
           
           {activeTab === 'dashboard' && (
             <div className="max-w-6xl mx-auto space-y-16">
                {/* Visual Stats Section */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-1">
                  {[
                    { label: 'Obsidian_Leads', val: '24', color: 'text-white' },
                    { label: 'Global_Revenue', val: '$373.11', color: 'text-white' },
                    { label: 'Framer_Partner', val: '$51.20', color: 'text-zinc-500' },
                    { label: 'Average_Cpa', val: '2.44', color: 'text-white' }
                  ].map((stat, i) => (
                    <div key={i} className="bg-zinc-950/40 border border-zinc-900 p-8 hover:bg-zinc-900/40 transition-colors border-r-0 last:border-r">
                       <p className="text-[9px] text-zinc-600 uppercase font-black tracking-[0.3em] mb-3">{stat.label}</p>
                       <div className="flex items-baseline space-x-3">
                          <span className={`text-4xl font-bold tracking-tighter ${stat.color}`}>{stat.val}</span>
                       </div>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                   <div className="lg:col-span-2 space-y-12">
                      <section>
                        <div className="flex justify-between items-end mb-6">
                           <h3 className="text-[10px] font-bold text-zinc-600 uppercase tracking-[0.4em]">Urgent_Directives</h3>
                           <div className="h-[1px] flex-1 bg-zinc-900 ml-6 mb-1.5"></div>
                        </div>
                        <div className="space-y-4">
                           <div className="group bg-zinc-950/20 border border-zinc-900 p-6 flex items-center justify-between hover:border-zinc-500 transition-all cursor-pointer">
                              <div className="flex items-center space-x-6">
                                 <div className="w-1.5 h-1.5 bg-white group-hover:scale-125 transition-transform"></div>
                                 <div>
                                   <span className="text-xs font-bold uppercase tracking-widest block">Wave_Company_Launch</span>
                                   <p className="text-[10px] text-zinc-500 mt-1 uppercase font-medium tracking-wider">Final Deliverables: 21:30</p>
                                 </div>
                              </div>
                              <span className="text-[10px] font-mono text-zinc-100 bg-zinc-900 px-3 py-1">2h REMAINING</span>
                           </div>
                           <div className="bg-zinc-950/20 border border-zinc-900 p-6 flex items-center justify-between opacity-60 hover:opacity-100 transition-opacity">
                              <div className="flex items-center space-x-6 text-zinc-500">
                                 <div className="w-1.5 h-1.5 bg-zinc-800"></div>
                                 <span className="text-xs font-bold uppercase tracking-widest">Rebeca_Fbo_Setup</span>
                              </div>
                              <button className="text-[10px] font-black uppercase text-white tracking-widest hover:underline">Execute_Task</button>
                           </div>
                        </div>
                      </section>

                      <section>
                         <div className="flex justify-between items-end mb-6 text-zinc-600">
                            <h3 className="text-[10px] font-bold uppercase tracking-[0.4em]">Core_System_Log</h3>
                            <div className="h-[1px] flex-1 bg-zinc-900 ml-6 mb-1.5"></div>
                         </div>
                         <div className="bg-[#050505] border border-zinc-900 p-8 font-mono text-[11px] text-zinc-500 space-y-3 leading-relaxed shadow-2xl overflow-hidden relative group">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-zinc-900 via-white/20 to-zinc-900"></div>
                            <p><span className="text-zinc-800">01.</span> [19:55:12] <span className="text-zinc-400">Verifying Framer Partner balance...</span> OK</p>
                            <p><span className="text-zinc-800">02.</span> [19:55:15] <span className="text-zinc-400">Syncing CRM leads from Obsidian/FBO-Kanban...</span> DONE</p>
                            <p><span className="text-zinc-800">03.</span> [19:55:18] <span className="text-zinc-100 font-bold tracking-tight uppercase">Security Alert: Private data filtered in WhatsApp groups.</span></p>
                            <p><span className="text-zinc-800">04.</span> [19:55:21] <span className="text-zinc-400">Scrum Master calculating weekly velocity...</span> 88%</p>
                            <div className="pt-6 flex items-center space-x-3">
                               <span className="text-white animate-pulse">_</span>
                               <span className="text-[9px] uppercase font-black tracking-widest text-zinc-800">Active_Listener_Enabled</span>
                            </div>
                         </div>
                      </section>
                   </div>

                   <aside className="space-y-12">
                      <div className="bg-zinc-950/20 border border-zinc-900 p-8">
                         <h4 className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.4em] mb-10 border-b border-zinc-900 pb-4">Agent_Status</h4>
                         <div className="space-y-10">
                            <div>
                               <div className="flex items-center justify-between mb-3">
                                  <span className="text-[11px] font-bold uppercase tracking-widest">Scrum_Master</span>
                                  <span className="text-[9px] text-zinc-700 font-mono">IDLE</span>
                               </div>
                               <div className="h-[2px] bg-zinc-900 w-full overflow-hidden">
                                  <div className="h-full bg-zinc-600 w-1/3"></div>
                               </div>
                            </div>
                            <div>
                               <div className="flex items-center justify-between mb-3 text-zinc-100">
                                  <span className="text-[11px] font-bold uppercase tracking-widest tracking-tighter">Jarvis_CCO</span>
                                  <span className="text-[9px] text-white font-mono animate-pulse">OPTIMIZING</span>
                               </div>
                               <div className="h-[2px] bg-zinc-900 w-full overflow-hidden">
                                  <div className="h-full bg-white w-full animate-progress-indefinite"></div>
                               </div>
                            </div>
                         </div>
                      </div>
                   </aside>
                </div>
             </div>
           )}

           {activeTab === 'crm' && (
             <div className="flex space-x-1 h-full min-w-max pb-16">
                {['Pipeline_Backlog', 'System_Setup', 'Operational_Live', 'Payment_Pending'].map((col, i) => (
                  <div key={i} className="w-80 flex flex-col">
                     <h4 className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.3em] mb-6 px-4">{col}</h4>
                     <div className="flex-1 bg-zinc-950/20 border border-zinc-900 p-4 space-y-4 overflow-y-auto">
                        {i === 1 && (
                          <div className="bg-zinc-900/20 border border-zinc-800 p-6 hover:bg-zinc-900/50 transition-all border-l-2 border-white group cursor-pointer">
                             <div className="text-xs font-bold uppercase tracking-widest mb-2">Rebeca_Fbo</div>
                             <div className="text-[9px] text-zinc-600 font-mono uppercase tracking-widest">Status: Deployment_Waiting</div>
                          </div>
                        )}
                        {i === 2 && (
                          <>
                            <div className="bg-zinc-900/20 border border-zinc-800 p-6 border-l-2 border-zinc-700 group cursor-pointer hover:border-white transition-all">
                               <div className="text-xs font-bold uppercase tracking-widest mb-2 flex justify-between">
                                  <span>Otavio_Fbo</span>
                                  <span className="text-[9px] text-white">ACTIVE</span>
                               </div>
                               <div className="text-[9px] text-zinc-500 font-mono uppercase">Cpa_Metric: 1.72 BRL</div>
                            </div>
                          </>
                        )}
                        {i === 3 && (
                          <div className="bg-zinc-900/10 border border-zinc-900 p-6 border-l-2 border-white">
                             <div className="text-xs font-bold uppercase tracking-widest mb-1 text-white">Solange_Fbo</div>
                             <div className="text-[9px] text-zinc-500 mb-6 font-mono uppercase">Arrears: 72_Hours</div>
                             <button className="w-full bg-white text-black py-2.5 text-[9px] font-black uppercase tracking-widest hover:invert transition-all">Trigger_Notice</button>
                          </div>
                        )}
                     </div>
                  </div>
                ))}
             </div>
           )}

           {activeTab === 'whatsapp' && (
             <div className="h-full flex flex-col max-w-5xl mx-auto border border-zinc-900 bg-zinc-950/10 overflow-hidden shadow-3xl">
                {/* Chat Header */}
                <div className="p-8 border-b border-zinc-900 flex justify-between items-center bg-[#09090b]">
                   <div className="flex items-center space-x-5">
                      <div className="w-12 h-12 bg-zinc-900 flex items-center justify-center font-bold border border-zinc-800 text-sm">
                        {activeChat.charAt(0)}
                      </div>
                      <div>
                         <h4 className="text-xs font-black uppercase tracking-widest">{activeChat}</h4>
                         <div className="flex items-center space-x-2 mt-1">
                           <div className="w-1 h-1 rounded-full bg-white"></div>
                           <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Secure_Link_Established</span>
                         </div>
                      </div>
                   </div>
                   <div className="flex space-x-8 text-zinc-600 font-mono text-[10px]">
                      <span className="hover:text-white cursor-pointer uppercase">History_Logs</span>
                      <span className="hover:text-white cursor-pointer uppercase">Encryption: AES_256</span>
                   </div>
                </div>

                {/* Chat Messages */}
                <div className="flex-1 overflow-y-auto p-10 space-y-8 flex flex-col bg-[#070708]">
                   {messages.map((m) => (
                     <div key={m.id} className={`max-w-[75%] ${m.type === 'user' ? 'self-end' : 'self-start'}`}>
                        <div className={`p-5 text-sm leading-relaxed ${
                          m.type === 'user' 
                          ? 'bg-zinc-100 text-black font-medium border border-white' 
                          : 'bg-zinc-900/50 text-zinc-300 border border-zinc-800'
                        }`}>
                           <p className="tracking-tight">{m.text}</p>
                        </div>
                        <div className={`mt-2 flex items-center space-x-3 text-[9px] text-zinc-600 mono uppercase tracking-widest ${m.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                           <span>{m.sender}</span>
                           <span>//</span>
                           <span>{m.time}</span>
                        </div>
                     </div>
                   ))}
                </div>

                {/* Chat Input */}
                <form onSubmit={handleSendMessage} className="p-8 bg-[#09090b] border-t border-zinc-900">
                   <div className="flex items-center space-x-6">
                      <input 
                        type="text" 
                        value={chatMessage}
                        onChange={(e) => setChatMessage(e.target.value)}
                        placeholder="TYPE_STRATEGIC_DIRECTIVE..." 
                        className="flex-1 bg-transparent border-b border-zinc-900 py-3 text-xs focus:outline-none focus:border-zinc-500 placeholder:text-zinc-800 mono transition-all uppercase tracking-widest"
                      />
                      <button type="submit" className="text-[10px] font-black uppercase tracking-[0.3em] hover:text-white transition-colors text-zinc-500">
                        Transmit_Data →
                      </button>
                   </div>
                </form>
             </div>
           )}

           {activeTab === 'projects' && (
             <div className="max-w-4xl mx-auto bg-zinc-950/20 border border-zinc-900 p-12 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8">
                  <div className="text-[10px] font-black text-zinc-800 uppercase tracking-[0.5em] origin-right transform rotate-90 translate-x-12 translate-y-12">Project_Manifest</div>
                </div>
                <div className="flex justify-between items-start mb-16">
                    <div>
                        <h3 className="text-4xl font-bold tracking-tighter uppercase italic">Wave_Company</h3>
                        <p className="text-[10px] text-zinc-500 mt-2 font-bold uppercase tracking-[0.4em]">Status: High_Intensity_Design_Phase</p>
                    </div>
                    <div className="bg-white text-black px-6 py-2 text-[10px] font-black uppercase tracking-widest shadow-xl">
                       Deadline: 21:30
                    </div>
                </div>
                
                <div className="space-y-12">
                   <div className="grid grid-cols-2 gap-16">
                      <div className="space-y-6">
                         {[
                           { label: 'Branding_Logo', status: 'COMPLETE', check: true },
                           { label: 'Landing_Page', status: 'POLISHING', check: false },
                           { label: 'Insta_Blueprint', status: 'QUEUE', check: false }
                         ].map((task, i) => (
                           <div key={i} className={`flex items-center justify-between text-xs border-b border-zinc-900/50 pb-3 ${task.check ? 'text-zinc-100' : 'text-zinc-600'}`}>
                             <span className="font-bold uppercase tracking-widest">{task.label}</span>
                             <span className="mono text-[9px]">{task.status}</span>
                           </div>
                         ))}
                      </div>
                      <div className="bg-zinc-900/20 border border-zinc-800 p-8 space-y-6">
                         <p className="text-[9px] text-zinc-500 uppercase font-black tracking-widest">Active_Jarvis_Tasks</p>
                         <div className="space-y-4">
                           <button className="w-full text-left text-[10px] font-bold text-zinc-400 hover:text-white transition-colors uppercase tracking-widest border-l border-zinc-800 pl-4">
                             Generate_Bio_Architecture
                           </button>
                           <button className="w-full text-left text-[10px] font-bold text-zinc-400 hover:text-white transition-colors uppercase tracking-widest border-l border-zinc-800 pl-4">
                             Map_Grid_9_Layout
                           </button>
                         </div>
                      </div>
                   </div>

                   <div className="space-y-4">
                      <div className="flex justify-between text-[10px] font-black uppercase tracking-widest mb-2">
                        <span>Project_Optimization_Progress</span>
                        <span className="mono">65%</span>
                      </div>
                      <div className="h-[1px] bg-zinc-900 w-full overflow-hidden">
                        <div className="h-full bg-white w-[65%]"></div>
                      </div>
                   </div>
                </div>
             </div>
           )}

        </div>
      </main>
    </div>
  );
};

export default JarvisCore;
