import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  Moon, 
  Sun, 
  Globe, 
  ChevronDown, 
  Download,
  FileText,
  ExternalLink,
  GraduationCap,
  MapPin,
  Award,
  Database,
  BarChart2,
  BrainCircuit,
  Info,
  Code2,
  BarChart,
  Layers,
  FilePlus,
  Briefcase
} from 'lucide-react';
import { usePortfolio, Language, FileData } from '../context/PortfolioContext';
import { translations } from '../lib/translations';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

const iconMap: Record<string, any> = {
  GraduationCap, MapPin, Award, Database, BarChart2, BrainCircuit, Info, Code2, BarChart, Layers, FileText, FilePlus, Briefcase
};

const Navbar = () => {
  const { 
    data, language, setLanguage, isDarkMode, toggleDarkMode, translate 
  } = usePortfolio();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [selectedFile, setSelectedFile] = useState<FileData | null>(null);

  const t = translations[language] || translations['en'];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const languageNames: Record<Language, string> = {
    en: 'English',
    am: 'Amharic',
    om: 'Afan Oromo',
    es: 'Spanish',
    ar: 'Arabic',
    el: 'Greek',
    fr: 'French',
    de: 'German',
    zh: 'Chinese',
    ja: 'Japanese'
  };

  const handleLangSelect = (lang: Language) => {
    setLanguage(lang);
    setShowLangMenu(false);
  };

  return (
    <nav 
      className={cn(
        "fixed w-full z-50 transition-all duration-300 border-b",
        isScrolled 
          ? "bg-white/80 dark:bg-slate-950/80 backdrop-blur-md py-3 border-slate-200 dark:border-slate-800 shadow-sm" 
          : "bg-transparent py-5 border-transparent"
      )}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <motion.a 
          href="#home"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-black tracking-tighter text-blue-600 flex items-center gap-2 group"
        >
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white group-hover:rotate-12 transition-transform shadow-lg shadow-blue-500/20">
            M
          </div>
          <span className="hidden sm:inline-block text-slate-900 dark:text-white">MELIS.</span>
        </motion.a>

        <div className="hidden lg:flex items-center gap-8">
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-900 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-800">
             {[
                { label: t.home, href: '#home' },
                { label: t.about, href: '#about' },
                { label: t.skills, href: '#skills' },
                { label: t.experience, href: '#experience' },
                { label: t.projects, href: '#projects' },
                { label: t.contact, href: '#contact' }
             ].map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="px-4 py-2 rounded-xl text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-white dark:hover:bg-slate-800 transition-all"
                >
                  {item.label}
                </a>
             ))}
          </div>

          <div className="h-6 w-px bg-slate-200 dark:bg-slate-800"></div>

          {data.menus.map((menu) => {
             const Icon = iconMap[menu.icon] || FileText;
             const hasFiles = menu.files && menu.files.length > 0;
             
             return (
               <div key={menu.id} className="relative group/menu">
                  <a
                    href={menu.href}
                    target={menu.isExternal ? "_blank" : "_self"}
                    rel={menu.isExternal ? "noreferrer" : ""}
                    className="flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-200 hover:text-blue-600 transition-colors"
                  >
                    <Icon size={18} className="text-blue-600" />
                    {translate(menu.label)}
                    {hasFiles && <ChevronDown size={14} className="opacity-50 group-hover/menu:rotate-180 transition-transform" />}
                  </a>
                  
                  {hasFiles && (
                    <div className="absolute top-full right-0 mt-4 w-56 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl opacity-0 translate-y-2 pointer-events-none group-hover/menu:opacity-100 group-hover/menu:translate-y-0 group-hover/menu:pointer-events-auto transition-all duration-300 overflow-hidden">
                        <div className="p-3 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                           <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Attachments</p>
                        </div>
                        <div className="p-2">
                           {menu.files?.map((file) => (
                              <button 
                                key={file.id} 
                                onClick={() => setSelectedFile(file)} 
                                className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/20 text-left transition-colors group/item"
                              >
                                <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center text-blue-600">
                                   <Download size={14} />
                                </div>
                                <div className="flex-1 min-w-0">
                                   <p className="text-xs font-bold text-slate-700 dark:text-slate-200 truncate">{translate(file.name)}</p>
                                   <p className="text-[9px] text-slate-400 uppercase">{file.type}</p>
                                </div>
                              </button>
                           ))}
                        </div>
                    </div>
                  )}
               </div>
             );
          })}

          <div className="flex items-center gap-3">
             <div className="relative">
                <button 
                    onClick={() => setShowLangMenu(!showLangMenu)}
                    className="flex items-center gap-2 bg-slate-100 dark:bg-slate-900 px-3 py-2 rounded-xl text-xs font-bold border border-slate-200 dark:border-slate-800 hover:border-blue-500 transition-all"
                >
                    <Globe size={16} className="text-blue-500" />
                    <span className="uppercase">{language}</span>
                    <ChevronDown size={14} className={cn("transition-transform", showLangMenu && "rotate-180")} />
                </button>
                
                <AnimatePresence>
                    {showLangMenu && (
                        <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            className="absolute top-full right-0 mt-3 w-48 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden z-[60]"
                        >
                            <div className="p-2 grid grid-cols-1 gap-1">
                                {data.enabledLanguages.map((lang) => (
                                    <button
                                        key={lang}
                                        onClick={() => handleLangSelect(lang)}
                                        className={cn(
                                            "flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-bold transition-all",
                                            language === lang 
                                                ? "bg-blue-600 text-white shadow-lg" 
                                                : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                                        )}
                                    >
                                        {languageNames[lang]}
                                        {language === lang && <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></div>}
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
             </div>

             <button 
                onClick={toggleDarkMode}
                className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-600 dark:text-slate-400 hover:text-blue-600 transition-all shadow-sm"
             >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
             </button>

             <a 
                href="#contact" 
                className="bg-blue-600 text-white px-6 py-3 rounded-xl text-sm font-bold shadow-lg shadow-blue-500/25 hover:bg-blue-700 transition-all active:scale-95"
             >
                {t.hireMe}
             </a>
          </div>
        </div>

        <button 
            className="lg:hidden p-3 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-600 dark:text-slate-400"
            onClick={() => setIsOpen(!isOpen)}
        >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 overflow-hidden shadow-2xl"
          >
            <div className="container mx-auto px-6 py-8 space-y-8">
              <div className="grid grid-cols-2 gap-4">
                 {[t.home, t.about, t.skills, t.experience, t.projects, t.contact].map((label, idx) => (
                   <a 
                    key={label} 
                    href={`#${['home', 'about', 'skills', 'experience', 'projects', 'contact'][idx]}`} 
                    className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-center font-bold text-sm hover:border-blue-500 transition-all"
                    onClick={() => setIsOpen(false)}
                   >
                     {label}
                   </a>
                 ))}
              </div>

              <div className="space-y-4">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Custom Menus</p>
                <div className="grid gap-3">
                    {data.menus.map((menu) => {
                        const Icon = iconMap[menu.icon] || FileText;
                        return (
                            <div key={menu.id} className="space-y-2">
                                <a 
                                    href={menu.href} 
                                    className="flex items-center gap-3 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-bold"
                                    onClick={() => setIsOpen(false)}
                                >
                                    <Icon size={20} className="text-blue-600" />
                                    {translate(menu.label)}
                                    {menu.isExternal && <ExternalLink size={14} className="ml-auto opacity-40" />}
                                </a>
                                {menu.files && menu.files.length > 0 && (
                                    <div className="grid grid-cols-1 gap-2 pl-4">
                                        {menu.files.map(file => (
                                            <button 
                                                key={file.id} 
                                                onClick={() => { setSelectedFile(file); setIsOpen(false); }}
                                                className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 dark:bg-slate-900/40 text-xs font-bold text-slate-500"
                                            >
                                                <Download size={12} /> {translate(file.name)}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
              </div>

              <div className="pt-8 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                 <div className="flex items-center gap-2">
                    <Globe size={20} className="text-blue-500" />
                    <select 
                        value={language} 
                        onChange={(e) => setLanguage(e.target.value as Language)}
                        className="bg-transparent font-bold text-sm outline-none"
                    >
                        {data.enabledLanguages.map(lang => (
                            <option key={lang} value={lang}>{languageNames[lang]}</option>
                        ))}
                    </select>
                 </div>
                 
                 <button 
                    onClick={toggleDarkMode}
                    className="p-4 bg-slate-100 dark:bg-slate-900 rounded-2xl"
                 >
                    {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
                 </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedFile && (
          <FileViewerModal 
            file={selectedFile} 
            onClose={() => setSelectedFile(null)} 
            translate={translate} 
          />
        )}
      </AnimatePresence>
    </nav>
  );
};

const FileViewerModal = ({ file, onClose, translate }: { file: FileData, onClose: () => void, translate: any }) => {
  const renderContent = () => {
    switch (file.type) {
      case 'image':
        return <img src={file.url} alt={translate(file.name)} className="max-w-full max-h-[70vh] object-contain rounded-xl shadow-2xl" />;
      case 'video':
        return <video src={file.url} controls className="max-w-full max-h-[70vh] rounded-xl shadow-2xl" autoPlay />;
      case 'audio':
        return (
          <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-2xl flex flex-col items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 animate-pulse">
               <Music size={48} />
            </div>
            <div className="text-center">
                <h3 className="text-xl font-bold mb-2">{translate(file.name)}</h3>
                <p className="text-slate-500 text-sm mb-4">Audio Resource</p>
            </div>
            <audio src={file.url} controls className="w-full max-w-sm" />
          </div>
        );
      case 'pdf':
        return <iframe src={file.url} title="PDF Preview" className="w-full h-[70vh] rounded-xl" />;
      default:
        return (
          <div className="bg-white dark:bg-slate-900 p-12 rounded-2xl shadow-2xl flex flex-col items-center gap-6 max-w-sm w-full">
            <div className="w-20 h-20 rounded-2xl bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600">
               <FileBox size={40} />
            </div>
            <div className="text-center">
                <h3 className="text-xl font-bold mb-2">{translate(file.name)}</h3>
                <p className="text-slate-500 text-sm mb-6">Preview not available for this file type. You can download it to view.</p>
            </div>
            <a 
                href={file.url} 
                download 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition-all"
            >
                <Download size={20} /> Download File
            </a>
          </div>
        );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
    >
      <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md" onClick={onClose}></div>
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="relative z-10 w-full max-w-5xl flex flex-col items-center"
      >
        <button 
            onClick={onClose}
            className="absolute -top-12 right-0 text-white/70 hover:text-white transition-colors flex items-center gap-2 text-sm font-bold"
        >
            <X size={24} /> Close
        </button>
        <div className="w-full flex justify-center">
            {renderContent()}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Navbar;