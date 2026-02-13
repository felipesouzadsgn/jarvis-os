import React, { useState, useEffect } from 'react';

const JarvisCore = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>
    )},
    { id: 'crm', label: 'CRM', icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
    )},
    { id: 'projects', label: 'Projects', icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
    )},
    { id: 'whatsapp', label: 'Messages', icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
    )},
    { id: 'agents', label: 'System', icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
    )},
  ];

  return (
    <div className="flex h-screen w-full bg-[#09090b] text-zinc-100 selection:bg-zinc-800">
      
      {/* Sidebar - Workspace Style */}
      <aside className="w-14 hover:w-64 group border-r border-zinc-800/50 bg-[#09090b] flex flex-col transition-all duration-300 z-50 overflow-hidden">
        <div className="p-4 mb-8 flex items-center overflow-hidden">
           <div className="w-6 h-6 bg-zinc-100 text-black flex items-center justify-center font-bold text-xs rounded shrink-0">J</div>
           <span className="ml-4 font-semibold text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Jarvis OS</span>
        </div>

        <nav className="flex-1 px-2 space-y-1">
          {menuItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center p-2.5 rounded-md cursor-pointer transition-all duration-200 ${
                activeTab === item.id ? 'bg-zinc-800/50 text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-200 hover:bg-zinc-900'
              }`}
            >
              <div className="shrink-0">{item.icon}</div>
              <span className="ml-4 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">{item.label}</span>
            </div>
          ))}
        </nav>

        <div className="p-4 border-t border-zinc-800/50 flex flex-col items-center group-hover:items-start transition-all">
          <div className="flex items-center space-x-2 text-[10px] text-zinc-600">
            <div className="w-1.5 h-1.5 rounded-full bg-zinc-600 animate-pulse"></div>
            <span className="opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Core Sync: 100%</span>
          </div>
        </div>
      </aside>

      {/* Main Panel */}
      <main className="flex-1 flex flex-col min-w-0 bg-[#09090b]">
        
        {/* Workspace Header */}
        <header className="h-14 border-b border-zinc-800/50 flex items-center justify-between px-8 bg-[#09090b]/50 backdrop-blur-sm shrink-0">
          <div className="flex items-center space-x-4">
             <h2 className="text-xs font-medium text-zinc-400 tracking-tight uppercase">{activeTab}</h2>
             <span className="text-zinc-800">/</span>
             <span className="text-xs text-zinc-600 italic">Production Environment</span>
          </div>
          <div className="flex items-center space-x-6">
            <div className="text-[10px] font-mono text-zinc-500 bg-zinc-900/50 px-2 py-1 rounded border border-zinc-800/30">
              {time}
            </div>
            <button className="text-[10px] font-bold uppercase tracking-wider bg-zinc-100 text-black px-3 py-1.5 rounded hover:bg-white transition-colors">
              Deploy Info
            </button>
          </div>
        </header>

        {/* Workspace Content */}
        <div className="flex-1 overflow-y-auto p-12 pt-8">
           {activeTab === 'dashboard' && (
             <div className="max-w-7xl mx-auto space-y-12">
                {/* Statistics - Grayscale Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {[
                    { label: 'Leads', val: '24', detail: '+12%' },
                    { label: 'Revenue', val: '$373.11', detail: 'Total' },
                    { label: 'Balance', val: '$51.20', detail: 'Framer' },
                    { label: 'CPA', val: '2.44', detail: 'BRL' }
                  ].map((stat, i) => (
                    <div key={i} className="bg-zinc-900/30 border border-zinc-800/50 p-6 rounded-lg group hover:border-zinc-700 transition-all">
                       <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest mb-1">{stat.label}</p>
                       <div className="flex items-baseline space-x-2">
                          <span className="text-2xl font-semibold tracking-tighter">{stat.val}</span>
                          <span className="text-[10px] text-zinc-600 font-mono">{stat.detail}</span>
                       </div>
                    </div>
                  ))}
                </div>

                {/* Main View Area */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                   <div className="lg:col-span-2 space-y-8">
                      <section>
                        <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] mb-4">Urgent Operations</h3>
                        <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-lg overflow-hidden">
                           <div className="p-4 border-b border-zinc-800/50 flex items-center justify-between hover:bg-zinc-900/80 transition-colors">
                              <div className="flex items-center space-x-3">
                                 <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                                 <span className="text-xs font-medium">Wave Company Launch</span>
                              </div>
                              <span className="text-[10px] font-mono text-zinc-500">21:30 Deadline</span>
                           </div>
                           <div className="p-4 flex items-center justify-between hover:bg-zinc-900/80 transition-colors">
                              <div className="flex items-center space-x-3">
                                 <div className="w-1.5 h-1.5 rounded-full bg-zinc-600"></div>
                                 <span className="text-xs font-medium text-zinc-400">Rebeca FBO Setup</span>
                              </div>
                              <button className="text-[10px] text-zinc-100 hover:underline">Execute →</button>
                           </div>
                        </div>
                      </section>

                      <section>
                         <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] mb-4">System Console</h3>
                         <div className="bg-[#0c0c0e] border border-zinc-800/50 rounded-lg p-6 font-mono text-xs text-zinc-400 space-y-2 leading-relaxed">
                            <p className="text-zinc-600">[19:40:12] <span className="text-zinc-400">Jarvis OS initialized...</span></p>
                            <p className="text-zinc-600">[19:40:15] <span className="text-zinc-400">Agile Governor linked to Obsidian.</span></p>
                            <p className="text-zinc-600">[19:40:18] <span className="text-zinc-100">CPA Monitoring: Optimal performance detected on "Otavio" campaign.</span></p>
                            <div className="pt-4 flex items-center space-x-2">
                               <span className="text-white animate-pulse">_</span>
                            </div>
                         </div>
                      </section>
                   </div>

                   <aside className="space-y-8">
                      <div className="bg-zinc-900/30 border border-zinc-800/50 rounded-lg p-6">
                         <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] mb-6">Agentes</h4>
                         <div className="space-y-6">
                            <div className="flex items-center justify-between">
                               <span className="text-xs font-medium">Scrum Master</span>
                               <span className="text-[10px] text-zinc-600 font-mono">IDLE</span>
                            </div>
                            <div className="flex items-center justify-between">
                               <span className="text-xs font-medium">Main CCO</span>
                               <span className="text-[10px] text-zinc-100 font-mono">ACTIVE</span>
                            </div>
                         </div>
                      </div>
                   </aside>
                </div>
             </div>
           )}

           {activeTab === 'crm' && (
             <div className="flex space-x-6 h-full min-w-max pb-12">
                {['Backlog', 'Processing', 'Active', 'Settlement'].map((col, i) => (
                  <div key={i} className="w-80 flex flex-col space-y-4">
                     <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] px-2">{col}</h4>
                     <div className="flex-1 bg-zinc-900/10 border border-zinc-800/30 rounded-lg p-3 space-y-3 overflow-y-auto">
                        {i === 1 && (
                          <div className="bg-zinc-900/50 border border-zinc-800/80 p-4 rounded border-l-2 border-white group cursor-pointer">
                             <div className="text-xs font-bold mb-1">Rebeca FBO</div>
                             <div className="text-[10px] text-zinc-500 font-mono uppercase">Setup: LP + Tags</div>
                          </div>
                        )}
                        {i === 2 && (
                          <>
                            <div className="bg-zinc-900/50 border border-zinc-800/80 p-4 rounded group cursor-pointer">
                               <div className="text-xs font-bold mb-1">Otavio FBO</div>
                               <div className="text-[10px] text-zinc-100 font-mono uppercase flex justify-between">
                                  <span>CPA 1.72</span>
                                  <span>PAGO</span>
                               </div>
                            </div>
                            <div className="bg-zinc-900/50 border border-zinc-800/80 p-4 rounded group cursor-pointer opacity-60 hover:opacity-100 transition-opacity">
                               <div className="text-xs font-bold mb-1">Lucia FBO</div>
                               <div className="text-[10px] text-zinc-500 font-mono uppercase">Performance: OK</div>
                            </div>
                          </>
                        )}
                        {i === 3 && (
                          <div className="bg-zinc-900/50 border border-zinc-800/80 p-4 rounded border-l-2 border-zinc-600">
                             <div className="text-xs font-bold mb-1">Solange FBO</div>
                             <div className="text-[10px] text-zinc-400 mb-3 font-mono">PENDING SETTLEMENT</div>
                             <button className="w-full bg-zinc-100 text-black py-2 rounded text-[10px] font-bold uppercase hover:bg-white transition-all">Send Notice</button>
                          </div>
                        )}
                     </div>
                  </div>
                ))}
             </div>
           )}
        </div>
      </main>
    </div>
  );
};

export default JarvisCore;
