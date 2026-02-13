import React, { useState, useEffect } from 'react';

const JarvisCore = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const menuItems = [
    { id: 'dashboard', label: 'Home', icon: (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>) },
    { id: 'crm', label: 'CRM', icon: (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>) },
    { id: 'whatsapp', label: 'Chat', icon: (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>) },
    { id: 'projects', label: 'Tasks', icon: (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>) },
    { id: 'system', label: 'OS', icon: (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>) },
  ];

  return (
    <div className="flex flex-col md:flex-row h-screen w-full bg-[#09090b] text-[#fafafa] selection:bg-zinc-800 antialiased overflow-hidden">
      
      {/* Mobile Header */}
      <div className="md:hidden h-14 border-b border-zinc-900 flex items-center justify-between px-6 bg-[#09090b]/80 backdrop-blur-xl z-[60]">
        <div className="flex items-center space-x-3">
          <div className="w-6 h-6 bg-white text-black flex items-center justify-center font-bold text-[10px] rounded">J</div>
          <span className="font-bold text-[10px] uppercase tracking-widest">Jarvis OS</span>
        </div>
        <div className="text-[10px] mono text-zinc-500">{time}</div>
      </div>

      {/* Sidebar (Hidden on mobile, bottom bar instead) */}
      <aside className="hidden md:flex w-16 hover:w-64 group border-r border-zinc-900 bg-[#09090b] flex-col transition-all duration-300 z-50 overflow-hidden shadow-2xl">
        <div className="p-5 mb-8 flex items-center overflow-hidden">
           <div className="w-6 h-6 bg-[#fafafa] text-black flex items-center justify-center font-bold text-xs rounded shrink-0">J</div>
           <span className="ml-4 font-bold text-xs uppercase tracking-[0.3em] opacity-0 group-hover:opacity-100 transition-opacity text-zinc-100 whitespace-nowrap">Jarvis OS</span>
        </div>
        <nav className="flex-1 px-3 space-y-1">
          {menuItems.map((item) => (
            <div key={item.id} onClick={() => setActiveTab(item.id)} className={`flex items-center p-2 rounded-md cursor-pointer transition-all duration-200 ${activeTab === item.id ? 'bg-zinc-900 text-[#fafafa] border border-zinc-800' : 'text-zinc-500 hover:text-zinc-200 hover:bg-zinc-950'}`}>
              <div className="shrink-0 flex items-center justify-center w-6">{item.icon}</div>
              <span className="ml-4 text-[11px] font-semibold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap uppercase tracking-wider">{item.label}</span>
            </div>
          ))}
        </nav>
      </aside>

      {/* Mobile Bottom Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-[#09090b]/90 border-t border-zinc-900 backdrop-blur-xl flex justify-around items-center px-4 z-[60]">
        {menuItems.map((item) => (
          <div key={item.id} onClick={() => setActiveTab(item.id)} className={`flex flex-col items-center justify-center space-y-1 transition-all ${activeTab === item.id ? 'text-white' : 'text-zinc-600'}`}>
            <div className="scale-90">{item.icon}</div>
            <span className="text-[8px] uppercase font-bold tracking-tighter">{item.label}</span>
          </div>
        ))}
      </nav>

      {/* Main Viewport */}
      <main className="flex-1 flex flex-col min-w-0 bg-[#09090b] relative pb-16 md:pb-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_#18181b_0%,_transparent_60%)] pointer-events-none opacity-50"></div>
        
        {/* Top Header (Desktop only) */}
        <header className="hidden md:flex h-16 border-b border-zinc-900 items-center justify-between px-10 bg-[#09090b]/80 backdrop-blur-xl shrink-0 z-40">
          <div className="flex flex-col">
             <h2 className="text-[10px] font-bold text-zinc-500 tracking-[0.2em] uppercase">{activeTab}</h2>
             <span className="text-xs font-semibold text-zinc-100 tracking-tight">Production_Main</span>
          </div>
          <div className="flex items-center space-x-8">
            <div className="text-2xl font-light font-mono text-zinc-100 tracking-tighter">{time}</div>
            <button className="text-[10px] font-bold uppercase tracking-[0.2em] bg-white text-black px-4 py-2 rounded-sm shadow-lg active:scale-95">Sync_Core</button>
          </div>
        </header>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-6 md:p-12 pt-6 md:pt-10 z-10 relative">
           
           {activeTab === 'dashboard' && (
             <div className="max-w-6xl mx-auto space-y-10 md:space-y-16">
                {/* Visual Stats Section - Real Time Data */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-1">
                  {[
                    { label: 'Obsidian_Leads', val: '24' },
                    { label: 'Global_Revenue', val: '$373.11' },
                    { label: 'Framer_Partner', val: '$51.20' },
                    { label: 'Average_Cpa', val: '2.44' }
                  ].map((stat, i) => (
                    <div key={i} className="bg-zinc-950/40 border border-zinc-900 p-4 md:p-8 hover:bg-zinc-900/40 transition-colors">
                       <p className="text-[8px] md:text-[9px] text-zinc-600 uppercase font-black tracking-[0.2em] mb-2 md:mb-3">{stat.label}</p>
                       <span className="text-xl md:text-4xl font-bold tracking-tighter text-white">{stat.val}</span>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
                   <div className="lg:col-span-2 space-y-10 md:space-y-12">
                      <section>
                        <div className="flex justify-between items-end mb-6">
                           <h3 className="text-[9px] md:text-[10px] font-bold text-zinc-600 uppercase tracking-[0.4em]">Urgent_Directives</h3>
                        </div>
                        <div className="space-y-3">
                           <div className="bg-zinc-950/20 border border-zinc-900 p-5 flex items-center justify-between">
                              <div className="flex items-center space-x-4">
                                 <div className="w-1.5 h-1.5 bg-white"></div>
                                 <div>
                                   <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest block">Wave_Company_Deadline</span>
                                   <p className="text-[8px] md:text-[10px] text-zinc-500 mt-1 uppercase font-medium">Final Deliverables: 21:30</p>
                                 </div>
                              </div>
                              <span className="text-[8px] md:text-[10px] font-mono text-zinc-100 bg-zinc-900 px-2 py-1">2h LEFT</span>
                           </div>
                        </div>
                      </section>

                      <section className="hidden md:block">
                         <div className="flex justify-between items-end mb-6 text-zinc-600">
                            <h3 className="text-[10px] font-bold uppercase tracking-[0.4em]">Core_System_Log</h3>
                         </div>
                         <div className="bg-[#050505] border border-zinc-900 p-6 font-mono text-[10px] text-zinc-500 space-y-2 leading-relaxed h-48 overflow-hidden relative">
                            <p>[19:55:12] Verifying Framer Partner balance... OK</p>
                            <p>[19:55:15] Syncing CRM leads from Obsidian... DONE</p>
                            <p>[19:55:18] Security Alert: Private data filtered. ACTIVE</p>
                            <p>[19:55:21] WhatsApp Gateway: Connection stable.</p>
                            <div className="pt-4 flex items-center space-x-2">
                               <span className="text-white animate-pulse">_</span>
                            </div>
                         </div>
                      </section>
                   </div>

                   <aside className="space-y-10 md:space-y-12">
                      <div className="bg-zinc-950/20 border border-zinc-900 p-6 md:p-8">
                         <h4 className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.4em] mb-8 border-b border-zinc-900 pb-4">Agent_Status</h4>
                         <div className="space-y-8">
                            <div>
                               <div className="flex items-center justify-between mb-2">
                                  <span className="text-[10px] font-bold uppercase tracking-widest">Scrum_Master</span>
                                  <span className="text-[8px] text-zinc-600 font-mono">IDLE</span>
                               </div>
                               <div className="h-[1px] bg-zinc-900 w-full overflow-hidden">
                                  <div className="h-full bg-zinc-600 w-1/3"></div>
                               </div>
                            </div>
                            <div>
                               <div className="flex items-center justify-between mb-2 text-zinc-100">
                                  <span className="text-[10px] font-bold uppercase tracking-widest">Jarvis_CCO</span>
                                  <span className="text-[8px] text-white font-mono animate-pulse">ACTIVE</span>
                               </div>
                               <div className="h-[1px] bg-zinc-900 w-full overflow-hidden">
                                  <div className="h-full bg-white w-full"></div>
                               </div>
                            </div>
                         </div>
                      </div>
                   </aside>
                </div>
             </div>
           )}

           {activeTab === 'crm' && (
             <div className="flex flex-col space-y-8 md:flex-row md:space-y-0 md:space-x-1 h-full md:min-w-max">
                {[
                  { label: 'Backlog', clients: [] },
                  { label: 'Setup', clients: ['Rebeca_Fbo'] },
                  { label: 'Active', clients: ['Otavio_Fbo', 'Lucia_Fbo'] },
                  { label: 'Pending', clients: ['Solange_Fbo'] }
                ].map((col, i) => (
                  <div key={i} className="w-full md:w-80 flex flex-col">
                     <h4 className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.3em] mb-4 md:mb-6 px-2">{col.label}</h4>
                     <div className="bg-zinc-950/20 border border-zinc-900 p-4 space-y-4">
                        {col.clients.length === 0 && <div className="text-[8px] uppercase tracking-widest text-zinc-800 text-center py-4 italic">Empty_Sector</div>}
                        {col.clients.map((c, j) => (
                           <div key={j} className={`bg-zinc-900/40 border border-zinc-900 p-5 ${col.label === 'Pending' ? 'border-l-2 border-white' : ''}`}>
                              <span className="text-[10px] font-bold uppercase tracking-widest block">{c}</span>
                              <div className="mt-4 flex justify-between items-center">
                                <span className="text-[8px] mono text-zinc-600 uppercase tracking-tighter">Status: Processing</span>
                                {col.label === 'Pending' && <button className="text-[8px] font-black uppercase text-white hover:underline underline-offset-4">Send_Notice</button>}
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>
                ))}
             </div>
           )}

           {activeTab === 'whatsapp' && (
             <div className="h-full flex flex-col border border-zinc-900 bg-zinc-950/10 overflow-hidden">
                <div className="p-6 md:p-8 border-b border-zinc-900 flex justify-between items-center bg-[#09090b]">
                   <h4 className="text-[10px] font-black uppercase tracking-[0.4em]">WhatsApp_Control_Center</h4>
                   <span className="text-[8px] mono text-zinc-600 uppercase tracking-widest hidden md:block">Protocol: WhatsApp_Cloud_v18</span>
                </div>
                <div className="flex-1 overflow-y-auto p-4 md:p-10 space-y-6">
                   {[
                     { name: 'Otavio FBO', id: '120363404566261176@g.us', last: 'Jarvis, me dê um exemplo...' },
                     { name: 'Fabiana FBO', id: '120363405079575043@g.us', last: 'Pendente acerto mensal.' },
                     { name: 'Lovable (Grupo)', id: '120363408076696985@g.us', last: '🛒 Lista processada.' },
                     { name: 'Rebeca FBO', id: '120363405979229116@g.us', last: 'AW-17916637812' }
                   ].map((chat, i) => (
                     <div key={i} className="bg-zinc-900/20 border border-zinc-900 p-4 md:p-6 flex justify-between items-center group cursor-pointer hover:border-zinc-500 transition-all">
                        <div className="flex flex-col">
                           <span className="text-xs font-bold uppercase tracking-widest">{chat.name}</span>
                           <span className="text-[8px] mono text-zinc-600 mt-1 uppercase tracking-tighter truncate md:w-auto w-40">{chat.last}</span>
                        </div>
                        <div className="text-[8px] font-black uppercase text-zinc-500 bg-zinc-950 px-2 py-1 border border-zinc-900 group-hover:text-white transition-colors">Open_Chat</div>
                     </div>
                   ))}
                </div>
             </div>
           )}

        </div>
      </main>
    </div>
  );
};

export default JarvisCore;
