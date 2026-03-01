import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  Database, 
  BarChart2, 
  BrainCircuit, 
  GraduationCap, 
  MapPin, 
  Award, 
  Info, 
  Code2, 
  BarChart, 
  Layers,
  FileBox,
  Music,
  Video,
  FileText,
  FilePlus,
  X,
  Maximize2,
  ExternalLink,
  Download
} from 'lucide-react';
import { usePortfolio, FileData } from '../context/PortfolioContext';
import { translations } from '../lib/translations';

const iconMap: Record<string, any> = {
  GraduationCap,
  MapPin,
  Award,
  Database,
  BarChart2,
  BrainCircuit,
  Info,
  Code2,
  BarChart,
  Layers
};

const fileIconMap: Record<string, any> = {
  image: FileBox,
  audio: Music,
  video: Video,
  pdf: FileText,
  doc: FileText,
  ppt: FilePlus,
  other: FileBox
};

const Hero = () => {
  const { data, language, translate } = usePortfolio();
  const t = translations[language] || translations['en'];
  const [selectedFile, setSelectedFile] = useState<FileData | null>(null);

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <div className="absolute inset-0 z-0 opacity-10">
        <img
          src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/352ba05b-54ab-4e3b-859b-744af1c95fe2/hero-bg-14f1323d-1772192609847.webp"
          alt="Data Background"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <span className="inline-block py-1 px-4 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-sm font-bold mb-6 tracking-wide">
            {t.available}
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 dark:text-white leading-tight mb-6">
            Hi, I'm <span className="text-blue-600">{translate(data.hero.name)}</span> <br />
            {translate(data.hero.title)}
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 mb-10 max-w-lg leading-relaxed">
            {translate(data.hero.description)}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <a
              href="#projects"
              className="flex items-center justify-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-500/25 active:scale-95 group"
            >
              {t.viewWork}
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#contact"
              className="flex items-center justify-center gap-2 bg-white dark:bg-slate-900 text-slate-900 dark:text-white border-2 border-slate-200 dark:border-slate-800 px-8 py-4 rounded-xl font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all active:scale-95"
            >
              {t.contactMe}
            </a>
          </div>

          {data.hero.files && data.hero.files.length > 0 && (
            <div className="flex flex-wrap gap-3 mt-8">
              {data.hero.files.map((file) => {
                const FileIcon = fileIconMap[file.type] || FileBox;
                return (
                  <button
                    key={file.id}
                    onClick={() => setSelectedFile(file)}
                    className="flex items-center gap-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-4 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-200 transition-all"
                  >
                    <FileIcon size={14} />
                    {translate(file.name)}
                  </button>
                );
              })}
            </div>
          )}

          <div className="mt-12 flex items-center gap-8 text-slate-400">
            <div className="flex flex-col items-center gap-1">
              <BrainCircuit size={24} className="text-blue-500" />
              <span className="text-xs font-medium uppercase tracking-tighter">ML</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Database size={24} className="text-indigo-500" />
              <span className="text-xs font-medium uppercase tracking-tighter">Data Eng</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <BarChart2 size={24} className="text-cyan-500" />
              <span className="text-xs font-medium uppercase tracking-tighter">Analysis</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative flex justify-center"
        >
          <div className="relative z-10 w-full max-w-md aspect-[3/4] sm:aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-8 border-white dark:border-slate-800 bg-white dark:bg-slate-900">
            <img
              src={data.hero.photo}
              alt={translate(data.hero.name)}
              className="w-full h-full object-contain"
            />
          </div>
          
          <div className="absolute -top-6 -right-6 w-32 h-32 bg-blue-100 dark:bg-blue-900/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-indigo-100 dark:bg-indigo-900/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          
          {data.hero.homeItems.length > 0 && (
            <div className="absolute bottom-10 -right-4 bg-white dark:bg-slate-900 p-4 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800 max-w-[200px] hidden sm:block">
              <div className="flex items-center gap-3">
                <div className="bg-green-100 dark:bg-green-900/30 text-green-600 p-2 rounded-lg">
                  {React.createElement(iconMap[data.hero.homeItems[0].icon] || Database, { size: 20 })}
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{translate(data.hero.homeItems[0].label)}</p>
                  <p className="text-xs font-bold text-slate-800 dark:text-slate-200">{translate(data.hero.homeItems[0].value)}</p>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedFile && (
          <FileViewerModal 
            file={selectedFile} 
            onClose={() => setSelectedFile(null)} 
            translate={translate} 
          />
        )}
      </AnimatePresence>
    </section>
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
        <div className="mt-6 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl px-6 py-4 flex items-center gap-4 text-white">
            <div className="bg-white/20 p-2 rounded-lg">
                <Maximize2 size={16} />
            </div>
            <div>
                <p className="text-xs font-bold uppercase tracking-widest opacity-60">Maximized View</p>
                <p className="font-bold">{translate(file.name)}</p>
            </div>
            <div className="ml-8 flex items-center gap-2">
                <a href={file.url} target="_blank" rel="noreferrer" className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                    <ExternalLink size={18} />
                </a>
                <a href={file.url} download className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                    <Download size={18} />
                </a>
            </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Hero;