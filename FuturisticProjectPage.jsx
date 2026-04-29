import React, { useState, useEffect } from 'react';

export default function FuturisticProjectPage({ project, onBack, isDarkMode, toggleTheme }) {
  const [isVisible, setIsVisible] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  
  const fullText = project.description || "Descrição não disponível.";

  useEffect(() => {
    const visibilityTimeout = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    // Lógica da Animação de Digitação do texto do projeto
    let i = 0;
    let typingInterval;
    
    const typingDelay = setTimeout(() => {
      typingInterval = setInterval(() => {
        if (i < fullText.length) {
          setDisplayedText(fullText.slice(0, i + 1));
          i++;
        } else {
          clearInterval(typingInterval);
        }
      }, 15); // 15ms por letra para maior fluidez
    }, 800); // 800ms de atraso antes de começar a digitar

    return () => {
      clearTimeout(visibilityTimeout);
      clearTimeout(typingDelay);
      clearInterval(typingInterval);
    };
  }, []);

  return (
    <div className="min-h-screen font-sans bg-[#070b14] text-white flex flex-col items-center selection:bg-cyan-400 selection:text-slate-900">
      
      {/* Navbar do Projeto */}
      <nav className="w-full max-w-7xl mx-auto px-6 py-6 flex justify-between items-center border-b border-cyan-500/20">
        <div className="text-xl md:text-2xl font-extrabold tracking-tighter text-white">
          Dantas<span className="text-cyan-400">.</span> <span className="text-cyan-400/50 font-light text-sm sm:text-lg ml-1 md:ml-2">| Project Details</span>
        </div>
        <div className="hidden md:flex space-x-8 items-center font-medium">
          {/* Ícone de Estrela com Glow */}
          <svg className="w-5 h-5 text-yellow-400 hover:text-yellow-300 cursor-pointer transition-colors drop-shadow-[0_0_10px_rgba(250,204,21,0.6)] hover:scale-110" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </div>
      </nav>

      <main className="w-full max-w-7xl mx-auto px-6 py-10 flex-grow flex flex-col">
        
        {/* Botão Voltar para o Portfólio */}
        <button onClick={onBack} className="flex items-center text-cyan-400 hover:text-cyan-300 transition-colors font-bold mb-12 self-start group">
          <svg className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
          Voltar para o Portfólio
        </button>

        <div 
          className={`flex flex-col lg:flex-row gap-8 lg:gap-12 items-start transform transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0 scale-100 blur-0' : 'opacity-0 translate-y-12 scale-95 blur-sm'}`}
        >
          
          {/* Lado Esquerdo: Mídia e Tecnologias */}
          <div className="w-full lg:w-3/5 flex flex-col gap-6">
            
            {/* Mídia do Projeto */}
            <div className="w-full rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(34,211,238,0.15)] border border-cyan-500/30 flex justify-center items-center bg-[#0a0f1c]/80 backdrop-blur-xl aspect-video relative group">
              {(() => {
                const midiaList = Array.isArray(project.media) ? project.media : [project.media];
                const mediaUrl = midiaList[currentMediaIndex] ? midiaList[currentMediaIndex].trim() : '';
                if (mediaUrl.match(/\.(mp4|webm|ogg|mov)([?#].*)?$/i)) {
                  return <video key={mediaUrl} src={mediaUrl} controls autoPlay loop muted playsInline className="w-full h-full object-contain"></video>;
                } else if (mediaUrl.match(/(youtube\.com\/watch\?.*v=|youtu\.be\/)([^&]+)/i)) {
                  const ytId = mediaUrl.match(/(youtube\.com\/watch\?.*v=|youtu\.be\/)([^&]+)/i)[2];
                  return <iframe key={mediaUrl} src={`https://www.youtube.com/embed/${ytId}`} className="w-full h-full" allowFullScreen></iframe>;
                } else {
                  return <img key={mediaUrl} src={mediaUrl} alt={project.title} onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/800x600/0b1221/06b6d4?text=SEM+SINAL'; }} className="w-full h-full object-contain" />;
                }
              })()}
              
              {Array.isArray(project.media) && project.media.length > 1 && (
                <>
                  <button onClick={() => setCurrentMediaIndex((prev) => (prev - 1 + project.media.length) % project.media.length)} className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-cyan-500 text-white w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full backdrop-blur-sm transition-all z-10 font-bold text-xl md:text-2xl opacity-100 lg:opacity-0 group-hover:opacity-100 shadow-lg">&#10094;</button>
                  <button onClick={() => setCurrentMediaIndex((prev) => (prev + 1) % project.media.length)} className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-cyan-500 text-white w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full backdrop-blur-sm transition-all z-10 font-bold text-xl md:text-2xl opacity-100 lg:opacity-0 group-hover:opacity-100 shadow-lg">&#10095;</button>
                  <div className="absolute bottom-4 flex gap-2 z-10">
                    {project.media.map((_, i) => (
                      <div key={i} className={`w-2.5 h-2.5 md:w-3 md:h-3 rounded-full transition-colors ${i === currentMediaIndex ? 'bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]' : 'bg-white/50'}`}></div>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Card de Tecnologias (Exclusivo para E-commerce) */}
            {(project.title.toLowerCase().includes('e-commerce') || project.title.toLowerCase().includes('ecommerce')) && (
              <div className="w-full rounded-2xl bg-[#0a0f1c]/60 backdrop-blur-xl border border-cyan-500/30 p-5 sm:p-6 shadow-[0_0_20px_rgba(34,211,238,0.1)] flex flex-col items-center justify-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-transparent to-blue-500/5 opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
                <h3 className="text-cyan-400/80 font-mono text-xs sm:text-sm tracking-widest mb-5 uppercase drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]">Tecnologias Utilizadas</h3>
                <div className="flex flex-wrap justify-center gap-8 sm:gap-12 relative z-10">
                  <div className="flex flex-col items-center gap-2 group/icon cursor-default" title="HTML5">
                    <svg className="w-8 h-8 sm:w-10 sm:h-10 text-slate-400 group-hover/icon:text-cyan-400 transition-all drop-shadow-[0_0_8px_rgba(34,211,238,0)] group-hover/icon:drop-shadow-[0_0_12px_rgba(34,211,238,0.8)] group-hover/icon:-translate-y-2 group-hover/icon:scale-110 duration-300" viewBox="0 0 384 512" fill="currentColor"><path d="M0 32l34.9 395.8L191.5 480l157.6-52.2L384 32H0zm308.2 127.9H124.4l4.1 49.4h175.6l-13.6 148.4-97.9 27v.3h-1.1l-98.7-27.3-6-75.8h47.7L138 320l53.5 14.5 53.7-14.5 6-62.2H84.3L71.5 112.2h241.1l-4.4 47.7z"/></svg>
                    <span className="text-xs font-semibold text-slate-500 group-hover/icon:text-cyan-300 transition-colors tracking-wide">HTML</span>
                  </div>
                  <div className="flex flex-col items-center gap-2 group/icon cursor-default" title="React">
                  <svg className="w-8 h-8 sm:w-10 sm:h-10 text-slate-400 group-hover/icon:text-cyan-400 transition-all drop-shadow-[0_0_8px_rgba(34,211,238,0)] group-hover/icon:drop-shadow-[0_0_12px_rgba(34,211,238,0.8)] group-hover/icon:-translate-y-2 group-hover/icon:scale-110 duration-300" viewBox="-11.5 -10.23174 23 20.46348" fill="none" stroke="currentColor" strokeWidth="1">
                    <circle cx="0" cy="0" r="2.05" fill="currentColor" stroke="none" />
                    <ellipse rx="11" ry="4.2" />
                    <ellipse rx="11" ry="4.2" transform="rotate(60)" />
                    <ellipse rx="11" ry="4.2" transform="rotate(120)" />
                  </svg>
                    <span className="text-xs font-semibold text-slate-500 group-hover/icon:text-cyan-300 transition-colors tracking-wide">React</span>
                  </div>
                  <div className="flex flex-col items-center gap-2 group/icon cursor-default" title="PHP">
                  <svg className="w-8 h-8 sm:w-10 sm:h-10 text-slate-400 group-hover/icon:text-cyan-400 transition-all drop-shadow-[0_0_8px_rgba(34,211,238,0)] group-hover/icon:drop-shadow-[0_0_12px_rgba(34,211,238,0.8)] group-hover/icon:-translate-y-2 group-hover/icon:scale-110 duration-300" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 1.25C5.373 1.25 0 6.262 0 12.5s5.373 11.25 12 11.25 12-5.012 12-11.25S18.627 1.25 12 1.25zM6.924 16.48H5.215l1.106-6.18h2.12c1.674 0 2.515.766 2.21 2.21-.253 1.422-1.105 2.088-2.63 2.088h-.946l-.336 1.882zM12.983 10.3h-1.503l.972-5.438h1.865c1.472 0 2.213.674 1.944 1.943-.223 1.25-.972 1.837-2.314 1.837h-.832l-.296 1.658zm3.504 6.18h-1.503l.972-5.438h1.504l-.48 2.684h1.493l.48-2.684h1.503l-.973 5.438h-1.503l-.47-2.628H15.54l-.47 2.628zm-2.258-9.675c-.223 1.25-.972 1.837-2.314 1.837h-.832l-.296 1.658h-1.503l.972-5.438h1.865c1.472 0 2.213.674 1.944 1.943z"/>
                  </svg>
                    <span className="text-xs font-semibold text-slate-500 group-hover/icon:text-cyan-300 transition-colors tracking-wide">PHP</span>
                  </div>
                  <div className="flex flex-col items-center gap-2 group/icon cursor-default" title="MySQL">
                    <svg className="w-8 h-8 sm:w-10 sm:h-10 text-slate-400 group-hover/icon:text-cyan-400 transition-all drop-shadow-[0_0_8px_rgba(34,211,238,0)] group-hover/icon:drop-shadow-[0_0_12px_rgba(34,211,238,0.8)] group-hover/icon:-translate-y-2 group-hover/icon:scale-110 duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/><path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3"/></svg>
                    <span className="text-xs font-semibold text-slate-500 group-hover/icon:text-cyan-300 transition-colors tracking-wide">MySQL</span>
                  </div>
                </div>
              </div>
            )}

            {/* Card de Tecnologias (Exclusivo para Bot LinkedIn) */}
            {(project.title.toLowerCase().includes('linkedin') || project.title.toLowerCase().includes('assistente')) && (
              <div className="w-full rounded-2xl bg-[#0a0f1c]/60 backdrop-blur-xl border border-cyan-500/30 p-5 sm:p-6 shadow-[0_0_20px_rgba(34,211,238,0.1)] flex flex-col items-center justify-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-transparent to-blue-500/5 opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
                <h3 className="text-cyan-400/80 font-mono text-xs sm:text-sm tracking-widest mb-5 uppercase drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]">Tecnologias Utilizadas</h3>
                <div className="flex flex-wrap justify-center gap-8 sm:gap-12 relative z-10">
                  <div className="flex flex-col items-center gap-2 group/icon cursor-default" title="Python">
                    <svg className="w-8 h-8 sm:w-10 sm:h-10 text-slate-400 group-hover/icon:text-cyan-400 transition-all drop-shadow-[0_0_8px_rgba(34,211,238,0)] group-hover/icon:drop-shadow-[0_0_12px_rgba(34,211,238,0.8)] group-hover/icon:-translate-y-2 group-hover/icon:scale-110 duration-300" viewBox="0 0 448 512" fill="currentColor"><path d="M439.8 200.5c-7.7-30.9-22.3-54.2-53.4-54.2h-40.1v47.4c0 36.8-31.2 67.8-66.8 67.8H172.7c-29.2 0-53.4 25-53.4 54.3v101.8c0 29 25.2 46 53.4 54.3 33.8 9.9 66.3 11.7 106.8 0 26.9-7.8 53.4-23.5 53.4-54.3v-40.7H226.2v-13.6h160.2c31.1 0 42.6-21.7 53.4-54.2 11.2-33.5 10.7-65.7 0-108.6zM286.2 404c11.1 0 20.1 9.1 20.1 20.3 0 11.3-9 20.4-20.1 20.4-11 0-20.1-9.2-20.1-20.4.1-11.3 9.1-20.3 20.1-20.3zM167.8 248.1h106.8c29.7 0 53.4-25.1 53.4-54.3V91.9c0-29-23.1-54.3-53.4-54.3H167.8c-44.8 0-80.8 17.3-106.8 54.3-27.1 38.5-22.8 91.9 0 127.6 19.3 30.1 49.3 28.6 106.8 28.6zm45.9-135.5c-11.1 0-20.1-9.1-20.1-20.3 0-11.3 9-20.4 20.1-20.4 11 0 20.1 9.2 20.1 20.4.1 11.3-9.1 20.3-20.1 20.3z"/></svg>
                    <span className="text-xs font-semibold text-slate-500 group-hover/icon:text-cyan-300 transition-colors tracking-wide">Python</span>
                  </div>
                  <div className="flex flex-col items-center gap-2 group/icon cursor-default" title="Selenium">
                    <svg className="w-8 h-8 sm:w-10 sm:h-10 text-slate-400 group-hover/icon:text-cyan-400 transition-all drop-shadow-[0_0_8px_rgba(34,211,238,0)] group-hover/icon:drop-shadow-[0_0_12px_rgba(34,211,238,0.8)] group-hover/icon:-translate-y-2 group-hover/icon:scale-110 duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/><path d="M2 12h20"/><path d="M9 12l2 2 4-4"/></svg>
                    <span className="text-xs font-semibold text-slate-500 group-hover/icon:text-cyan-300 transition-colors tracking-wide">Selenium</span>
                  </div>
                  <div className="flex flex-col items-center gap-2 group/icon cursor-default" title="MySQL">
                    <svg className="w-8 h-8 sm:w-10 sm:h-10 text-slate-400 group-hover/icon:text-cyan-400 transition-all drop-shadow-[0_0_8px_rgba(34,211,238,0)] group-hover/icon:drop-shadow-[0_0_12px_rgba(34,211,238,0.8)] group-hover/icon:-translate-y-2 group-hover/icon:scale-110 duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/><path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3"/></svg>
                    <span className="text-xs font-semibold text-slate-500 group-hover/icon:text-cyan-300 transition-colors tracking-wide">MySQL</span>
                  </div>
                  <div className="flex flex-col items-center gap-2 group/icon cursor-default" title="Discord Webhook">
                    <svg className="w-8 h-8 sm:w-10 sm:h-10 text-slate-400 group-hover/icon:text-cyan-400 transition-all drop-shadow-[0_0_8px_rgba(34,211,238,0)] group-hover/icon:drop-shadow-[0_0_12px_rgba(34,211,238,0.8)] group-hover/icon:-translate-y-2 group-hover/icon:scale-110 duration-300" viewBox="0 0 640 512" fill="currentColor"><path d="M524.531,69.836a1.5,1.5,0,0,0-.764-.7A485.065,485.065,0,0,0,404.081,32.03a1.816,1.816,0,0,0-1.923.91,337.461,337.461,0,0,0-14.9,30.6,447.848,447.848,0,0,0-134.426,0,309.541,309.541,0,0,0-15.135-30.6,1.89,1.89,0,0,0-1.924-.91A483.689,483.689,0,0,0,116.085,69.137a1.712,1.712,0,0,0-.788.676C39.068,183.651,18.186,294.69,28.43,404.354a2.016,2.016,0,0,0,.765,1.375A487.666,487.666,0,0,0,176.02,479.918a1.9,1.9,0,0,0,2.063-.276c8.3-11.39,15.3-23.32,21.573-35.6a1.88,1.88,0,0,0-1.025-2.61c-19.145-7.25-37.456-16.14-55.01-26.33a1.86,1.86,0,0,1-.137-3.13c4.13-3.11,8.21-6.3,12.16-9.59a1.87,1.87,0,0,1,1.95-.29c83.1,37.81,173.23,37.81,255.45,0a1.87,1.87,0,0,1,1.95.29c3.95,3.29,8.03,6.48,12.16,9.59a1.85,1.85,0,0,1-.14,3.13c-17.55,10.2-35.86,19.08-55.01,26.33a1.88,1.88,0,0,0-1.025,2.61c6.27,12.28,13.27,24.21,21.57,35.6a1.9,1.9,0,0,0,2.06.276A487.666,487.666,0,0,0,611.534,405.729a2.016,2.016,0,0,0,.765-1.375C624.4,281.341,598.665,172.3,524.531,69.836ZM222.491,337.58c-28.97,0-52.84-26.58-52.84-59.23s23.42-59.23,52.84-59.23c29.65,0,53.306,26.82,52.84,59.23C275.331,311,251.921,337.58,222.491,337.58Zm195.38,0c-28.97,0-52.84-26.58-52.84-59.23s23.42-59.23,52.84-59.23c29.65,0,53.306,26.82,52.84,59.23C471.171,311,447.601,337.58,417.871,337.58Z"/></svg>
                    <span className="text-xs font-semibold text-slate-500 group-hover/icon:text-cyan-300 transition-colors tracking-wide">Discord</span>
                  </div>
                </div>
              </div>
            )}
          </div>
          </div>

          {/* Lado Direito: Textos e Animação */}
          <div className="w-full lg:w-2/5 text-left flex flex-col justify-center">
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-extrabold tracking-tight mb-4 lg:mb-6 text-white drop-shadow-[0_0_10px_rgba(34,211,238,0.3)]">
              {project.title}
            </h1>
            <div className="w-20 h-1.5 bg-cyan-400 mb-8 rounded-full shadow-[0_0_10px_rgba(34,211,238,0.8)]"></div>
            
            <div className="bg-[#0a0f1c]/60 backdrop-blur-xl border border-cyan-500/30 p-5 lg:p-8 rounded-2xl shadow-[0_0_20px_rgba(34,211,238,0.1)]">
              <p className="text-base md:text-lg lg:text-xl font-light leading-relaxed text-slate-300 whitespace-pre-wrap relative">
                {displayedText}
                <span className="animate-pulse inline-block w-[2px] h-[1em] bg-cyan-400 align-middle ml-1"></span>
              </p>
            </div>
          </div>

        </div>

      </main>
    </div>
  );
}
