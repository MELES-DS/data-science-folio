import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Briefcase,
  Calendar,
  Building2,
  FileText, 
  Music, 
  Video, 
  FileBox,
  Download,
  FilePlus,
  X,
  Maximize2,
  ExternalLink
} from 'lucide-react';
import { usePortfolio, FileData } from '../context/PortfolioContext';
import { translations } from '../lib/translations';

const fileIconMap: Record<string, any> = {
  image: FileBox,
  audio: Music,
  video: Video,
  pdf: FileText,
  doc: FileText,
  ppt: FilePlus,
  other: FileBox
};

const Experience = () => {
  const { data, language, translate } = usePortfolio();
  const t = translations[language] || translations['en'];
  const [selectedFile, setSelectedFile] = useState<FileData | null>(null);

  if (!data.experiences || data.experiences.length === 0) return null;

  return (
    <section id="experience" className="py-24 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold text-blue-600 uppercase tracking-[0.2em] mb-4">{t.experience}</h2>
            <h3 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Professional Journey</h3>
            <p className="text-slate-600 dark:text-slate-400">
              My track record of contribution and professional growth.
            </p>
          </div>

          <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent dark:before:via-slate-700">
            {data.experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-blue-600 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                  <Briefcase size={18} />
                </div>

                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-xl transition-all duration-300">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                    <div className="font-bold text-xl text-slate-900 dark:text-white">{translate(exp.company)}</div>
                    <time className="font-medium text-xs text-blue-600 bg-blue-50 dark:bg-blue-900/30 px-3 py-1 rounded-full flex items-center gap-2">
                        <Calendar size={12} /> {translate(exp.period)}
                    </time>
                  </div>
                  <div className="text-blue-600 font-bold text-sm mb-4 flex items-center gap-2">
                    <Building2 size={16} /> {translate(exp.role)}
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6">
                    {translate(exp.description)}
                  </p>

                  {exp.files && exp.files.length > 0 && (
                    <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Supporting Documents</p>
                      <div className="flex flex-wrap gap-2">
                        {exp.files.map((file) => {
                          const FileIcon = fileIconMap[file.type] || FileBox;
                          return (
                            <button 
                              key={file.id}
                              onClick={() => setSelectedFile(file)}
                              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/50 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-xs text-slate-600 dark:text-slate-400 hover:text-blue-600 transition-colors border border-transparent hover:border-blue-100"
                            >
                              <FileIcon size={14} className="shrink-0" />
                              <span className="max-w-[120px] truncate">{translate(file.name)}</span>
                              <Maximize2 size={10} className="opacity-40" />
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
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

export default Experience;