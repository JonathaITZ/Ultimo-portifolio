const { useState } = React;
const { motion, AnimatePresence } = window.Motion || window.FramerMotion;

function Dashboard() {
  const [activeTab, setActiveTab] = useState('skills');

  // Competências voltadas para QA
  const skills = [
    { name: 'Quality Assurance', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 md:w-12 md:h-12 text-teal-400 drop-shadow-[0_0_8px_rgba(45,212,191,0.8)]"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg> },
    { name: 'Testes Manuais', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 md:w-12 md:h-12 text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/><path d="M9 14l2 2 4-4"/></svg> },
    { name: 'Casos de Teste', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 md:w-12 md:h-12 text-blue-400 drop-shadow-[0_0_8px_rgba(96,165,250,0.8)]"><path d="M11 18H3"/><path d="M11 6H3"/><path d="M11 12H3"/><path d="M15 6h6"/><path d="M19 10l2 2-2 2"/><path d="M15 18h6"/><path d="M19 14l2 2-2 2"/></svg> },
    { name: 'Automação (Python/Selenium)', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 md:w-12 md:h-12 text-green-400 drop-shadow-[0_0_8px_rgba(74,222,128,0.8)]"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg> },
    { name: 'Testes de API (Postman)', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 md:w-12 md:h-12 text-orange-400 drop-shadow-[0_0_8px_rgba(251,146,60,0.8)]"><path d="M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 1-2 2 2 2 0 0 1 2 2v5a2 2 0 0 0 2 2h1"/><path d="M16 21h1a2 2 0 0 0 2-2v-5a2 2 0 0 1 2-2 2 2 0 0 1-2-2V5a2 2 0 0 0-2-2h-1"/></svg> },
    { name: 'SQL (Validação de Dados)', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 md:w-12 md:h-12 text-indigo-400 drop-shadow-[0_0_8px_rgba(129,140,248,0.8)]"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5"/><path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3"/></svg> },
    { name: 'Smoke & Regressão', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 md:w-12 md:h-12 text-purple-400 drop-shadow-[0_0_8px_rgba(192,132,252,0.8)]"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 16h5v5"/></svg> },
    { name: 'Reporte de Bugs', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 md:w-12 md:h-12 text-red-400 drop-shadow-[0_0_8px_rgba(248,113,113,0.8)]"><path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/><path d="M13 5v2"/><path d="M13 17v2"/><path d="M13 11v2"/></svg> },
    { name: 'Atenção a Detalhes', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 md:w-12 md:h-12 text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.8)]"><circle cx="12" cy="12" r="3"/><path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/></svg> }
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
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg>
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
