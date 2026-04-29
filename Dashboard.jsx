const { useState } = React;
const { motion, AnimatePresence } = window.Motion || window.FramerMotion;

function Dashboard() {
  const [activeTab, setActiveTab] = useState('skills');

  // Lista de competências solicitadas
  const skills = [
    { name: 'Desenvolvimento Web', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 md:w-12 md:h-12 text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg> },
    { name: 'QA (Aprendendo)', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 md:w-12 md:h-12 text-teal-400 drop-shadow-[0_0_8px_rgba(45,212,191,0.8)]"><path d="M10 2v7.527a2 2 0 0 1-.211.896L4.72 20.55a1 1 0 0 0 .9 1.45h12.76a1 1 0 0 0 .9-1.45l-5.069-10.127A2 2 0 0 1 14 9.527V2"/><path d="M8.5 2h7"/><path d="M14 16H5.5"/></svg> },
    { name: 'UX Design (Aprendendo)', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 md:w-12 md:h-12 text-purple-400 drop-shadow-[0_0_8px_rgba(192,132,252,0.8)]"><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.586 7.586"/><circle cx="11" cy="11" r="2"/></svg> },
    { name: 'SQL', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 md:w-12 md:h-12 text-blue-400 drop-shadow-[0_0_8px_rgba(96,165,250,0.8)]"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5"/><path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3"/></svg> },
    { name: 'Automação com Python', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 md:w-12 md:h-12 text-green-400 drop-shadow-[0_0_8px_rgba(74,222,128,0.8)]"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg> },
    { name: 'Criatividade', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 md:w-12 md:h-12 text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.8)]"><path d="M9 18h6"/><path d="M10 22h4"/><path d="M12 2a7 7 0 0 0-7 7c0 2 1.5 3.5 2 5h10c.5-1.5 2-3 2-5a7 7 0 0 0-7-7z"/></svg> },
    { name: 'Proatividade', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 md:w-12 md:h-12 text-orange-400 drop-shadow-[0_0_8px_rgba(251,146,60,0.8)]"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg> },
    { name: 'Otimização com IA', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 md:w-12 md:h-12 text-fuchsia-400 drop-shadow-[0_0_8px_rgba(232,121,249,0.8)]"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4M3 5h4"/></svg> },
    { name: 'Análise de Dados (Excel/IA)', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 md:w-12 md:h-12 text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.8)]"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg> }
  ];

  // Classe utilitária reutilizável para o efeito Glassmorphism Neon
  const glassClass = "bg-[#0a0f1c]/60 backdrop-blur-xl border border-cyan-500/30 rounded-2xl shadow-[0_0_20px_rgba(34,211,238,0.15)]";

  return (
    <div className="min-h-screen relative overflow-hidden p-6 md:p-12">
      {/* Elementos de Brilho Neon no Fundo */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-cyan-500/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Cabeçalho do Dashboard */}
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 drop-shadow-[0_0_15px_rgba(34,211,238,0.4)]">
            DANTAS<span className="text-cyan-400">.SYS</span>
          </h1>
          <p className="text-cyan-400/80 tracking-[0.2em] text-sm mt-2 font-mono">PORTFOLIO DASHBOARD v2.0</p>
          
          <a href="https://drive.google.com/file/d/11D7m-Ud1K5ti5qkpV5xEtcR9O0hXGSAL/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-cyan-500/10 border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-slate-900 transition-all duration-300 font-bold tracking-widest shadow-[0_0_15px_rgba(34,211,238,0.2)] hover:shadow-[0_0_25px_rgba(34,211,238,0.6)] hover:-translate-y-1 hover:scale-105 group">
            <svg className="w-5 h-5 group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
            VER CURRÍCULO
          </a>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* 1. CARD PRINCIPAL DE PROJETOS (Interativo) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, type: "spring" }}
            className={`${glassClass} p-8 flex flex-col justify-between group hover:shadow-[0_0_40px_rgba(34,211,238,0.6)] hover:border-cyan-400/80 transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] cursor-pointer relative overflow-hidden`}
          >
            <div>
              <div className="w-16 h-16 mb-6 rounded-xl bg-gradient-to-br from-cyan-400/20 to-blue-500/20 border border-cyan-400/30 flex items-center justify-center text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.2)] group-hover:scale-110 transition-transform">
                {/* Ícone de Desenvolvimento */}
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>
              </div>
              <h2 className="text-3xl font-bold text-white mb-2 tracking-wide group-hover:text-cyan-400 transition-colors drop-shadow-[0_0_8px_rgba(34,211,238,0.3)]">PROJETOS</h2>
              <p className="text-slate-400 text-sm">Explore a galeria para conferir meus principais projetos e sistemas desenvolvidos.</p>
            </div>
            
            <div className="mt-8 flex items-center text-cyan-400 font-mono text-sm tracking-widest drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]">
              INICIAR MÓDULO <span className="ml-2 group-hover:translate-x-2 transition-transform">→</span>
            </div>
          </motion.div>

          {/* 2. SISTEMA DE ABAS (Skills e Experiência) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2 flex flex-col"
          >
            {/* Navegação das Abas */}
            <div className="flex justify-start md:justify-center lg:justify-start space-x-4 md:space-x-6 mb-6 border-b border-cyan-500/20 pb-2 overflow-x-auto snap-x">
              <button 
                onClick={() => setActiveTab('skills')}
                className={`pb-2 text-lg font-bold tracking-wide transition-all ${activeTab === 'skills' ? 'text-cyan-400 border-b-2 border-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]' : 'text-slate-500 hover:text-slate-300'}`}
              >
                SKILLS
              </button>
              <button 
                onClick={() => setActiveTab('experience')}
                className={`pb-2 text-lg font-bold tracking-wide transition-all ${activeTab === 'experience' ? 'text-cyan-400 border-b-2 border-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]' : 'text-slate-500 hover:text-slate-300'}`}
              >
                EXPERIÊNCIA
              </button>
            </div>

            {/* Conteúdo Dinâmico das Abas */}
            <div className={`${glassClass} p-8 flex-grow relative overflow-hidden min-h-[300px]`}>
              <AnimatePresence mode="wait">
                <motion.div 
                  key={activeTab} 
                  initial={{ opacity: 0, x: -20 }} 
                  animate={{ opacity: 1, x: 0 }} 
                  exit={{ opacity: 0, x: 20 }} 
                  transition={{ duration: 0.3 }}
                  className="w-full"
                >
                
                {/* ABA 1: SKILLS */}
                {activeTab === 'skills' && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    {skills.map((skill, idx) => (
                      <div key={`skill-${idx}`} className="flex flex-col items-center justify-center p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/20 hover:border-cyan-400/60 hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] hover:-translate-y-2 hover:scale-105 transition-all duration-300 group">
                    <span className="text-3xl md:text-4xl mb-3 group-hover:scale-110 group-hover:drop-shadow-[0_0_10px_rgba(34,211,238,0.8)] transition-all">{skill.icon}</span>
                        <span className="text-sm font-semibold text-slate-200 text-center tracking-wide">{skill.name}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* ABA 2: EXPERIÊNCIA */}
                {activeTab === 'experience' && (
                  <div className="space-y-6">
                    {/* Linha do Tempo Estilizada */}
                    <div className="relative pl-8 before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-0.5 before:bg-gradient-to-b before:from-cyan-400 before:to-transparent hover:translate-x-2 transition-transform duration-300 group">
                      <div className="absolute left-[-4.5px] top-2 w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]"></div>
                      <h3 className="text-2xl font-bold text-white tracking-wide">Analista de Sistemas / Suporte</h3>
                      <h4 className="text-cyan-400 font-mono text-sm mb-4 tracking-widest drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]">SOFTCOM TECNOLOGIA</h4>
                      
                      <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-6">
                        Atuação direta na resolução de problemas sistêmicos, análise de requisitos e suporte técnico avançado. Manipulação constante e manutenção de banco de dados relacionais para correções em lote.
                      </p>
                      
                      {/* Badges Neon de Banco de Dados */}
                      <div className="flex gap-3 flex-wrap">
                        <span className="px-4 py-1.5 text-xs font-mono font-bold rounded-md bg-blue-900/40 text-blue-300 border border-blue-500/50 shadow-[0_0_10px_rgba(59,130,246,0.2)]">UPDATE</span>
                        <span className="px-4 py-1.5 text-xs font-mono font-bold rounded-md bg-red-900/40 text-red-300 border border-red-500/50 shadow-[0_0_10px_rgba(239,68,68,0.2)]">DELETE</span>
                        <span className="px-4 py-1.5 text-xs font-mono font-bold rounded-md bg-green-900/40 text-green-300 border border-green-500/50 shadow-[0_0_10px_rgba(34,197,94,0.2)]">SELECT</span>
                      </div>
                    </div>
                  </div>
                )}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>

    </div>
  );
}

// Inicializa o React diretamente na div root do index.html
const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<Dashboard />);
}
