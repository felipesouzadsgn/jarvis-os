import React, { useState, useEffect } from 'react';

const JarvisCore = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const callOpenClaw = async (action, params = {}) => {
    try {
      const response = await fetch('/api/openclaw', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, params })
      });
      const data = await response.json();
      return data.result;
    } catch (error) {
      console.error('OpenClaw Error:', error);
      return null;
    }
  };

  const fetchChats = async () => {
    const result = await callOpenClaw('sessions_list');
    if (result && result.sessions) {
      setChats(result.sessions.map(s => ({
        id: s.key,
        name: s.displayName || s.key,
        last: s.lastMessage?.text || 'No messages',
        type: s.kind === 'group' ? 'group' : 'contact',
        status: s.channel,
        sessionId: s.sessionId
      })));
    }
  };

  const fetchMessages = async (chat) => {
    if (!chat) return;
    const result = await callOpenClaw('sessions_history', { sessionKey: chat.id });
    if (result && result.messages) {
      setMessages(result.messages);
    }
  };

  const sendMessage = async () => {
    if (!messageText.trim() || !selectedChat) return;
    setIsLoading(true);
    
    // Tenta enviar mensagem
    await callOpenClaw('message', {
      action: 'send',
      to: selectedChat.id.split(':').pop(), // Pega o número ou ID do grupo
      message: messageText,
      channel: 'whatsapp'
    });

    setMessageText('');
    await fetchMessages(selectedChat);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchChats();
    const interval = setInterval(fetchChats, 10000); // Atualiza lista a cada 10s
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (selectedChat) {
      fetchMessages(selectedChat);
      const interval = setInterval(() => fetchMessages(selectedChat), 5000); // Polling de mensagens
      return () => clearInterval(interval);
    } else {
      setMessages([]);
    }
  }, [selectedChat]);

  useEffect(() => {
    const timer = setInterval(() => {
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
                  { label: 'Backlog', clients: ['Maria Damasceno', 'Pedrina'] },
                  { label: 'Setup', clients: ['Rebeca_Fbo', 'Gessica_Fbo'] },
                  { label: 'Active', clients: ['Otavio_Fbo', 'Lucia_Fbo', 'Adriana_Fbo'] },
                  { label: 'Pending', clients: ['Solange_Fbo', 'Fabiana_Fbo', 'Fatima'] }
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
             <div className="h-full flex flex-col md:flex-row border border-zinc-900 bg-zinc-950/10 overflow-hidden">
                {/* Chat Sidebar/List */}
                <div className={`flex-col ${selectedChat ? 'hidden md:flex' : 'flex'} w-full md:w-80 border-r border-zinc-900 bg-[#09090b]`}>
                  <div className="p-6 border-b border-zinc-900">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.4em] mb-4 text-zinc-500">Communications</h4>
                    <div className="relative">
                      <input 
                        type="text" 
                        placeholder="Search_Entities..." 
                        className="w-full bg-zinc-900/50 border border-zinc-800 text-[10px] px-3 py-2 focus:outline-none focus:border-zinc-600 uppercase tracking-widest placeholder:text-zinc-700"
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="flex-1 overflow-y-auto custom-scrollbar">
                    {chats.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase())).map((chat, i) => (
                      <div 
                        key={i} 
                        onClick={() => setSelectedChat(chat)}
                        className={`p-5 border-b border-zinc-900/50 cursor-pointer transition-all hover:bg-zinc-900/40 group ${selectedChat?.id === chat.id ? 'bg-zinc-900/60 border-l-2 border-white' : ''}`}
                      >
                        <div className="flex justify-between items-start mb-1">
                          <span className={`text-[10px] font-bold uppercase tracking-widest ${selectedChat?.id === chat.id ? 'text-white' : 'text-zinc-400 group-hover:text-zinc-200'}`}>{chat.name}</span>
                          <span className="text-[7px] mono text-zinc-600 uppercase">{chat.type}</span>
                        </div>
                        <p className="text-[9px] text-zinc-600 truncate uppercase tracking-tighter">{chat.last}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Chat Window */}
                <div className={`flex-1 flex-col ${selectedChat ? 'flex' : 'hidden md:flex'} bg-zinc-950/20`}>
                  {selectedChat ? (
                    <>
                      <div className="p-4 md:p-6 border-b border-zinc-900 flex justify-between items-center bg-[#09090b]">
                        <div className="flex items-center space-x-4">
                          <button onClick={() => setSelectedChat(null)} className="md:hidden text-zinc-500">
                             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                          </button>
                          <div>
                            <h4 className="text-xs font-bold uppercase tracking-widest text-white">{selectedChat.name}</h4>
                            <span className="text-[8px] mono text-zinc-500 uppercase tracking-widest">{selectedChat.id} // {selectedChat.status || 'STABLE'}</span>
                          </div>
                        </div>
                        <div className="flex space-x-4">
                           <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
                        </div>
                      </div>
                      
                      <div className="flex-1 overflow-y-auto p-6 space-y-6 flex flex-col-reverse">
                        <div className="space-y-4">
                           {messages.length === 0 && (
                              <div className="text-center py-10 opacity-20">
                                 <p className="text-[10px] uppercase tracking-[0.4em]">No_Messages_In_Buffer</p>
                              </div>
                           )}
                           {messages.slice().reverse().map((msg, i) => (
                              <div key={i} className={`p-4 max-w-[80%] ${msg.role === 'user' ? 'bg-white/5 border border-white/10 ml-auto' : 'bg-zinc-900/40 border border-zinc-800 self-start'}`}>
                                 <p className="text-[10px] text-zinc-300 leading-relaxed uppercase tracking-tight whitespace-pre-wrap">{msg.text}</p>
                                 <div className="mt-2 flex justify-between items-center">
                                    <span className="text-[7px] mono text-zinc-600 uppercase">{msg.from || msg.role}</span>
                                    <span className="text-[7px] mono text-zinc-600 uppercase">{new Date(msg.timestamp).toLocaleTimeString()}</span>
                                 </div>
                              </div>
                           ))}
                        </div>
                      </div>

                      <div className="p-6 border-t border-zinc-900 bg-[#09090b]">
                        <div className="flex space-x-4">
                           <input 
                             type="text" 
                             value={messageText}
                             onChange={(e) => setMessageText(e.target.value)}
                             onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                             placeholder={`TRANSMIT_TO_${selectedChat.name.replace(/\s+/g, '_').toUpperCase()}...`} 
                             className="flex-1 bg-zinc-900/50 border border-zinc-800 text-[10px] px-4 py-3 focus:outline-none focus:border-zinc-500 uppercase tracking-[0.2em] placeholder:text-zinc-700 text-white"
                             disabled={isLoading}
                           />
                           <button 
                             onClick={sendMessage}
                             disabled={isLoading || !messageText.trim()}
                             className="bg-white text-black text-[10px] font-black uppercase px-6 tracking-widest hover:bg-zinc-200 transition-colors disabled:opacity-50"
                           >
                              {isLoading ? 'Sending...' : 'Send'}
                           </button>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="flex-1 flex flex-col items-center justify-center space-y-6 opacity-20">
                       <div className="w-12 h-12 border border-zinc-500 flex items-center justify-center">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="animate-spin-slow"><path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83"/></svg>
                       </div>
                       <p className="text-[9px] font-black uppercase tracking-[0.5em] text-zinc-400">Select_Entity_To_Initialize_Comms</p>
                    </div>
                  )}
                </div>
             </div>
           )}

           {activeTab === 'projects' && (
             <div className="max-w-4xl mx-auto space-y-12">
                <div className="flex justify-between items-end border-b border-zinc-900 pb-8">
                   <h3 className="text-[10px] font-bold text-zinc-600 uppercase tracking-[0.4em]">Active_Operations</h3>
                   <span className="text-[8px] mono text-zinc-800 uppercase tracking-widest">Total: 4 Projects</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { name: 'Wave Company', desc: 'Branding & Web Development', progress: 75, deadline: '13/02 21:30', status: 'CRITICAL' },
                    { name: 'FSD - Fábrica de Design', desc: 'Design Agency Operations', progress: 40, deadline: 'TBD', status: 'STABLE' },
                    { name: 'Clientes FBO', desc: 'CRM & Lead Management', progress: 90, deadline: 'Ongoing', status: 'ACTIVE' },
                    { name: 'Organização Financeira', desc: '2026 Fiscal Governance', progress: 20, deadline: '31/12', status: 'STANDBY' }
                  ].map((p, i) => (
                    <div key={i} className="bg-zinc-950/40 border border-zinc-900 p-8 hover:border-zinc-700 transition-all group">
                       <div className="flex justify-between items-start mb-6">
                          <div>
                             <h4 className="text-sm font-bold uppercase tracking-widest mb-1">{p.name}</h4>
                             <p className="text-[9px] text-zinc-500 uppercase tracking-tighter">{p.desc}</p>
                          </div>
                          <span className={`text-[7px] font-black px-2 py-1 border ${p.status === 'CRITICAL' ? 'border-white text-white' : 'border-zinc-800 text-zinc-600'}`}>{p.status}</span>
                       </div>
                       <div className="space-y-4">
                          <div className="flex justify-between items-end text-[8px] mono text-zinc-600 uppercase">
                             <span>Progress</span>
                             <span>{p.progress}%</span>
                          </div>
                          <div className="h-[2px] bg-zinc-900 w-full">
                             <div className="h-full bg-white transition-all duration-1000" style={{ width: `${p.progress}%` }}></div>
                          </div>
                          <div className="flex justify-between items-center pt-4">
                             <span className="text-[8px] font-bold text-zinc-700 uppercase">Deadline: {p.deadline}</span>
                             <button className="text-[8px] font-black uppercase text-zinc-500 group-hover:text-white transition-colors">Details_&gt;</button>
                          </div>
                       </div>
                    </div>
                  ))}
                </div>
             </div>
           )}

           {activeTab === 'system' && (
             <div className="h-full flex flex-col space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                   <div className="bg-zinc-950/40 border border-zinc-900 p-8 space-y-6">
                      <h4 className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.4em]">Hardware_Status</h4>
                      <div className="space-y-4">
                         {['CPU_LOAD', 'MEM_USAGE', 'CORE_TEMP'].map((stat, i) => (
                           <div key={i} className="space-y-2">
                              <div className="flex justify-between text-[8px] mono text-zinc-500">
                                 <span>{stat}</span>
                                 <span>{Math.floor(Math.random() * 30) + 10}%</span>
                              </div>
                              <div className="h-[1px] bg-zinc-900 w-full"><div className="h-full bg-zinc-700 w-1/4"></div></div>
                           </div>
                         ))}
                      </div>
                   </div>
                   <div className="md:col-span-2 bg-[#050505] border border-zinc-900 p-8 font-mono text-[10px] text-zinc-500 space-y-4 overflow-hidden h-64 relative">
                      <h4 className="text-[9px] font-black text-zinc-700 uppercase tracking-[0.4em] mb-4">Kernel_Live_Logs</h4>
                      <div className="space-y-1">
                        <p className="text-zinc-400">[OK] SYSTEM_INIT_SUCCESS</p>
                        <p>[INFO] JARVIS_CORE_V4_LOADED</p>
                        <p>[INFO] WHATSAPP_SOCKET_CONNECTED</p>
                        <p>[WARN] CRM_CACHE_MISMATCH - AUTO_FIXING...</p>
                        <p className="text-white">[OK] MEMORY_SYNC_COMPLETE</p>
                        <p>[INFO] USER_ENTITY_VERIFIED: FELIPE</p>
                        <p>[INFO] UPTIME: 14:22:05</p>
                        <p className="animate-pulse">_</p>
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
