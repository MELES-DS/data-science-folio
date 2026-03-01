import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, MapPin, Award, BookOpen, Database, Code2, Terminal, Info, FileBox, Music, Video, FileText, FilePlus, X, Maximize2, ExternalLink, Download } from 'lucide-react';
import { usePortfolio, FileData } from '../context/PortfolioContext';
import { translations } from '../lib/translations';

const iconMap: Record<string, any> = {
  GraduationCap,
  MapPin,
  Award,
  Database,
  Code2,
  Terminal,
  Info
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

const About = () => {
  const { data, language, translate } = usePortfolio();
  const t = translations[language] || translations['en'];
  const [selectedFile, setSelectedFile] = useState<FileData | null>(null);

  return (
    <section id="about" className="py-24 bg-white dark:bg-slate-900 relative overflow-hidden transition-colors duration-300">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-sm font-bold text-blue-600 uppercase tracking-[0.2em] mb-4">{t.about}</h2>
            <h3 className="text-4xl font-bold text-slate-900 dark:text-white mb-8 leading-tight">
              {translate(data.about.title)}
            </h3>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
              {translate(data.about.content)}
            </p>
            
            <div className="space-y-6 mb-10">
              {data.hero.homeItems.map((item) => {
                const Icon = iconMap[item.icon] || Info;
                return (
                  <div key={item.id} className="flex items-start gap-4">
                    <div className="mt-1 bg-blue-50 dark:bg-blue-900/30 p-2 rounded-lg text-blue-600">
                      <Icon size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 dark:text-slate-200">{translate(item.label)}</h4>
                      <p className="text-slate-600 dark:text-slate-400">{translate(item.value)}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {data.about.files && data.about.files.length > 0 && (
               <div className="pt-8 border-t border-slate-100 dark:border-slate-800">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Related Resources</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                     {data.about.files.map((file) => {
                        const FileIcon = fileIconMap[file.type] || FileBox;
                        return (
                           <button 
                              key={file.id}
                              onClick={() => setSelectedFile(file)}
                              className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-xs font-bold text-slate-600 dark:text-slate-400 transition-all border border-transparent hover:border-blue-100 dark:hover:border-blue-900/40"
                           >
                              <FileIcon size={16} className="text-blue-500" />
                              <span className="truncate">{translate(file.name)}</span>
                           </button>
                        );
                     })}
                  </div>
               </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="rounded-2xl overflow-hidden shadow-2xl relative z-10 aspect-[4/5]">
              <img
                src={data.about.image}
                alt="Workspace"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
              <div className="absolute bottom-8 left-8 right-8">
                <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20">
                  <BookOpen className="text-white mb-3" size={32} />
                  <p className="text-white font-medium italic">
                    "{translate(data.about.quote)}"
                  </p>
                </div>
              </div>
            </div>
            
            <div className="absolute -bottom-10 -right-10 bg-blue-600 text-white p-8 rounded-2xl shadow-2xl z-20 hidden lg:block">
              <div className="text-center">
                <p className="text-4xl font-bold mb-1">99%</p>
                <p className="text-xs uppercase font-bold tracking-widest opacity-80">Accuracy Focused</p>
              </div>
            </div>
          </motion.div>
        </div>
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

export default About;