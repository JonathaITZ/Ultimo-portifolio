import React, { useState, useEffect, useRef } from 'react';
import FuturisticProjectPage from './FuturisticProjectPage';

export default function Portfolio() {
  // Estado para controlar o Dark Mode (iniciando como true, conforme o design)
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [profileImage, setProfileImage] = useState('https://i.postimg.cc/yY5cvK8j/IMG-20260422-220609.jpg');
  
  const [devClicks, setDevClicks] = useState(0);
  const [isDevMode, setIsDevMode] = useState(false);
  
  // =========================================================================
  // DADOS HARDCODED (CÓDIGO-FONTE)
  // Adicione seus projetos diretamente aqui para o GitHub Pages ler corretamente.
  // =========================================================================
  const [projects, setProjects] = useState([
    {
      title: "E-commerce: Plataforma Completa",
      description: "Este projeto é uma solução completa para quem deseja vender pela internet, unindo uma loja visualmente atraente para o cliente a um painel de controle potente para o lojista.\n\nPara o Cliente: Desenvolvi uma vitrine moderna e organizada por categorias (como moda masculina, feminina e eletrônicos), facilitando a busca por produtos e proporcionando uma navegação fluida e intuitiva.\n\nPara o Lojista: Criei um painel administrativo onde é possível gerenciar todo o negócio em um só lugar. É possível cadastrar produtos com fotos e descrições detalhadas, controlar o estoque em tempo real, organizar categorias e acompanhar o desempenho das vendas de forma simples e rápida.",
      media: ["https://rubot-files.softcom.services/ShareX/2026/04/09.04.2026_21.46.50_REC.mp4"]
    },
    {
      title: "Assistente Inteligente de Candidaturas para o LinkedIn",
      description: "Esta ferramenta foi criada para otimizar o processo de busca por emprego, automatizando a parte repetitiva e burocrática. O sistema identifica oportunidades que aceitam a \"Candidatura Simplificada\" e realiza o envio do perfil de forma automática.\n\nO que faz: Varre a rede em busca de vagas que se encaixam no perfil desejado e preenche as candidaturas instantaneamente.\n\nDiferencial: Permite que o profissional foque no que realmente importa — a preparação para entrevistas e o estudo técnico — enquanto a ferramenta cuida do volume de aplicações, garantindo que nenhuma oportunidade seja perdida por falta de tempo.",
      media: ["https://rubot-files.softcom.services/ShareX/2026/04/Z68w2IuF5F.png", "https://rubot-files.softcom.services/ShareX/2026/04/iDXv2ZEcoM.png"]
    }
  ]);
  // =========================================================================

  const [newProject, setNewProject] = useState({ title: '', media: '', description: '' });
  const [selectedProject, setSelectedProject] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);
  
  const clickTimeoutRef = useRef(null);

  useEffect(() => {
    // Inicialização direta pelo código-fonte. O localStorage foi desabilitado 
    // para garantir que os dados funcionem bem estáticos no GitHub Pages.
  }, []);

  // Função de Easter Egg para o Modo Dev
  const handleLogoClick = () => {
    if (isDevMode) return;
    
    const newCount = devClicks + 1;
    setDevClicks(newCount);
    
    if (newCount >= 7) {
      setIsDevMode(true);
      alert('🔓 Modo Desenvolvedor Ativado! Você agora pode alterar sua foto e adicionar projetos.');
    }
    
    clearTimeout(clickTimeoutRef.current);
    clickTimeoutRef.current = setTimeout(() => setDevClicks(0), 2000); // Reseta se demorar mais que 2s
  };

  // Função para salvar novo projeto via Formulário
  const handleAddProject = (e) => {
    e.preventDefault();
    if (!newProject.title || !newProject.description) return;
    
    const mediaUrls = String(newProject.media || '').split('\n').map(s => s.trim()).filter(Boolean);
    
    // Verificação de segurança para links do Lightshot (prnt.sc)
    if (mediaUrls.some(url => url.includes('prnt.sc/') && !url.match(/\.(jpeg|jpg|gif|png|webp)$/i))) {
      alert('⚠️ Link do Lightshot incompleto!\n\nVocê copiou o link da página web. Para a foto aparecer no projeto, acesse esse link no navegador, clique com o botão direito na imagem e escolha "Copiar endereço da imagem".\n\nO link correto deve terminar com .png ou .jpg.');
      return; // Bloqueia o salvamento até o link ser corrigido
    }

    const finalMedia = mediaUrls; // Agora salva sempre como um array de mídias
    let updatedProjects;
    if (editingIndex !== null) {
      updatedProjects = [...projects];
      updatedProjects[editingIndex] = { ...newProject, media: finalMedia };
      setEditingIndex(null);
    } else {
      updatedProjects = [...projects, { ...newProject, media: finalMedia }];
    }
    
    setProjects(updatedProjects);
    setNewProject({ title: '', media: '', description: '' }); // Limpa o formulário
    
    alert("⚠️ PROJETO ADICIONADO VISUALMENTE!\n\nLembre-se: Para salvar de forma permanente para o GitHub Pages, você precisa copiar os dados deste projeto e colar diretamente na variável 'projects' no início do código-fonte do arquivo Portfolio.jsx.");
  };

  const editProject = (idx, e) => {
    e.stopPropagation();
    setEditingIndex(idx);
    const proj = projects[idx];
    setNewProject({ ...proj, media: Array.isArray(proj.media) ? proj.media.join('\n') : (proj.media || '') });
    document.getElementById('projetos').scrollIntoView({ behavior: 'smooth' });
  };

  const deleteProject = (idx, e) => {
    e.stopPropagation();
    if (window.confirm('Tem certeza que deseja excluir este projeto?')) {
      const updatedProjects = projects.filter((_, i) => i !== idx);
      setProjects(updatedProjects);
      
      // Reseta o formulário de edição para evitar conflitos de índice
      if (editingIndex !== null) {
        setEditingIndex(null);
        setNewProject({ title: '', media: '', description: '' });
      }
    }
  };

  // --- RENDERIZAÇÃO DA PÁGINA DO PROJETO ISOLADO ---
  if (selectedProject) {
    return (
      <FuturisticProjectPage 
        project={selectedProject} 
        onBack={() => setSelectedProject(null)} 
        isDarkMode={isDarkMode} 
        toggleTheme={() => setIsDarkMode(!isDarkMode)} 
      />
    );
  }

  // --- RENDERIZAÇÃO DA PÁGINA INICIAL ---
  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 ${isDarkMode ? 'bg-slate-900 text-white' : 'bg-gray-50 text-slate-900'}`}>
      
      {/* Navbar */}
      <nav className="container mx-auto px-6 py-6 flex justify-between items-center">
        <div onClick={handleLogoClick} className="text-2xl font-extrabold tracking-tighter cursor-pointer select-none" title="Clique 7x para Modo Dev">
          Dantas<span className="text-cyan-400">.</span>
        </div>
        
        <div className="flex items-center space-x-4 md:space-x-8 font-medium">
          <div className="hidden md:flex space-x-8 items-center">
            <a href="#" className="hover:text-cyan-400 transition-colors">Home</a>
            <a href="#projetos" className="hover:text-cyan-400 transition-colors">Projetos</a>
          </div>
          
          {/* Toggle de Dark Mode (Agora sempre visível no Mobile) */}
          <button 
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 rounded-full hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400"
            aria-label="Toggle Dark Mode"
          >
            {isDarkMode ? '☀️' : '🌙'}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="container mx-auto px-6 pt-24 pb-32 flex flex-col items-center justify-center text-center">
        
        {/* Foto de Perfil */}
        <div className={`relative mb-8 transition-all ${isDevMode ? 'group cursor-pointer' : ''}`} onClick={() => {
          if (isDevMode) {
            const url = prompt("Insira o link (URL) da nova foto de perfil:");
            if (url) {
              setProfileImage(url);
            }
          }
        }}>
          <img 
            src={profileImage} 
            alt="Foto de Perfil" 
            onError={(e) => { 
              e.target.onerror = null; 
              e.target.src = "data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22200%22%20height%3D%22200%22%3E%3Crect%20width%3D%22200%22%20height%3D%22200%22%20fill%3D%22%230f172a%22%2F%3E%3Ctext%20x%3D%2250%25%22%20y%3D%2250%25%22%20font-family%3D%22sans-serif%22%20font-size%3D%2235%22%20font-weight%3D%22bold%22%20fill%3D%22%2322d3ee%22%20dominant-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%3EPerfil%3C%2Ftext%3E%3C%2Fsvg%3E";
            }}
            className={`w-40 h-40 md:w-48 md:h-48 rounded-full border-4 border-cyan-400 object-cover shadow-[0_0_20px_rgba(34,211,238,0.4)] transition-transform duration-300 ${isDevMode ? 'group-hover:scale-105' : ''}`}
          />
          {isDevMode && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="text-white text-sm font-bold">Alterar Foto</span>
            </div>
          )}
        </div>
        
        {/* Tipografia */}
        <span className="text-sm font-bold tracking-[0.2em] text-cyan-400 mb-4 block">
          HEY THERE,
        </span>
        
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight">
          I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Dantas</span>.
        </h1>
        
        {/* Introdução */}
        <p className={`max-w-xl mx-auto text-lg md:text-xl leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
          Sou um desenvolvedor Front-end especializado em construir experiências web excepcionais. 
          Focado em aliar design limpo com código de alta performance, criando produtos que os usuários amam.
        </p>

        <a href="https://drive.google.com/file/d/11D7m-Ud1K5ti5qkpV5xEtcR9O0hXGSAL/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex items-center gap-2 px-8 py-3 rounded-full bg-cyan-500/10 border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-slate-900 transition-all duration-300 font-bold tracking-widest shadow-[0_0_15px_rgba(34,211,238,0.2)] hover:shadow-[0_0_30px_rgba(34,211,238,0.6)] hover:-translate-y-1 hover:scale-105 group">
          <svg className="w-5 h-5 group-hover:-translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
          VER CURRÍCULO
        </a>

      </main>

      {/* Seção de Projetos */}
      <section id="projetos" className="container mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold mb-10 text-center">Meus Projetos</h2>
        
        {/* Formulário Modo Dev */}
        {isDevMode && (
          <form onSubmit={handleAddProject} className={`max-w-4xl mx-auto mb-12 p-6 rounded-2xl shadow-lg border transition-all duration-300 ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-100'}`}>
            <h3 className="text-xl font-bold mb-4 text-cyan-400">
              {editingIndex !== null ? '✏️ Editar Projeto (Modo Dev)' : '➕ Adicionar Novo Projeto (Modo Dev)'}
            </h3>
            
            <input type="text" placeholder="Título do Projeto" required value={newProject.title} onChange={(e) => setNewProject({...newProject, title: e.target.value})} className={`w-full mb-4 p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-colors ${isDarkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-gray-50 border-gray-200 text-slate-900'}`} />
            
            <textarea 
              placeholder="URLs de imagens ou vídeos (uma por linha)" 
              required 
              rows="4" 
              value={newProject.media} 
              onChange={(e) => setNewProject({...newProject, media: e.target.value})} 
              className={`w-full p-3 mb-4 rounded-lg border focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-colors ${isDarkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-gray-50 border-gray-200 text-slate-900'}`}
            ></textarea>
            
            <textarea placeholder="Descrição do projeto..." required rows="3" value={newProject.description} onChange={(e) => setNewProject({...newProject, description: e.target.value})} className={`w-full p-3 mb-4 rounded-lg border focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-colors ${isDarkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-gray-50 border-gray-200 text-slate-900'}`}></textarea>
            <button type="submit" className="w-full bg-cyan-400 hover:bg-cyan-500 text-slate-900 font-bold py-3 px-4 rounded-lg transition-colors">
              {editingIndex !== null ? 'Salvar Alterações' : 'Salvar Projeto Localmente'}
            </button>
          </form>
        )}

        {/* Renderização da Lista de Projetos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto text-left">
          {projects.length === 0 ? (
            <p className="text-center col-span-2 text-slate-500">Nenhum projeto adicionado ainda.</p>
          ) : (
            projects.map((proj, idx) => (
              <div 
                key={idx} 
                onClick={() => setSelectedProject(proj)}
                className={`relative cursor-pointer p-6 rounded-2xl shadow-lg border hover:-translate-y-2 hover:scale-[1.02] transition-all duration-300 ${isDarkMode ? 'bg-slate-800 border-slate-700 hover:shadow-[0_0_25px_rgba(34,211,238,0.3)]' : 'bg-white border-gray-100 hover:shadow-2xl'} ${isDevMode ? 'group' : ''}`}
              >
                {(() => {
                  const midiaArray = Array.isArray(proj.media) ? proj.media : [proj.media];
                  const mediaUrl = midiaArray[0] ? midiaArray[0].trim() : '';
                  if (mediaUrl.match(/\.(mp4|webm|ogg|mov)([?#].*)?$/i)) {
                    return <video src={mediaUrl} autoPlay loop muted playsInline className="w-full h-48 object-cover rounded-xl mb-6"></video>;
                  } else if (mediaUrl.match(/(youtube\.com\/watch\?.*v=|youtu\.be\/)([^&]+)/i)) {
                    const ytId = mediaUrl.match(/(youtube\.com\/watch\?.*v=|youtu\.be\/)([^&]+)/i)[2];
                    return <iframe src={`https://www.youtube.com/embed/${ytId}`} className="w-full h-48 object-cover rounded-xl mb-6" allowFullScreen></iframe>;
                  } else {
                    return <img src={mediaUrl} alt={proj.title} onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/600x400/0b1221/06b6d4?text=SEM+SINAL'; }} className="w-full h-48 object-cover rounded-xl mb-6" />;
                  }
                })()}
                <h3 className="text-2xl font-bold mb-3">{proj.title}</h3>
                <p className={`line-clamp-2 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>{proj.description}</p>
                <span className="text-cyan-400 text-sm font-semibold mt-4 inline-block">Ver detalhes &rarr;</span>
                
                {isDevMode && (
                  <div className="absolute top-4 right-4 flex gap-2 transition-opacity opacity-0 group-hover:opacity-100">
                    <button onClick={(e) => editProject(idx, e)} className="bg-slate-900/80 hover:bg-cyan-500 text-white p-2 rounded-lg backdrop-blur-sm transition-colors shadow-lg" title="Editar">✏️</button>
                    <button onClick={(e) => deleteProject(idx, e)} className="bg-slate-900/80 hover:bg-red-500 text-white p-2 rounded-lg backdrop-blur-sm transition-colors shadow-lg" title="Excluir">🗑️</button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
