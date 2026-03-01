import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ExternalLink, 
  Github, 
  Database, 
  Layers, 
  BarChart, 
  Code2, 
  FileText, 
  Music, 
  Video, 
  FileBox,
  Download,
  FilePlus,
  X,
  Maximize2
} from 'lucide-react';
import { usePortfolio, FileData } from '../context/PortfolioContext';

const iconMap: Record<string, any> = {
  BarChart,
  Database,
  Layers,
  Code2
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

const Projects = () => {
  const { data, translate } = usePortfolio();
  const [selectedFile, setSelectedFile] = useState<FileData | null>(null);

  const handleFileClick = (file: FileData, e: React.MouseEvent) => {
    e.preventDefault();
    setSelectedFile(file);
  };

  return (
    <section id="projects" className="py-24 bg-white dark:bg-slate-950 transition-colors duration-300">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-sm font-bold text-blue-600 uppercase tracking-[0.2em] mb-4">Portfolio</h2>
            <h3 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Featured Data Projects</h3>
            <p className="text-slate-600 dark:text-slate-400">
              Selected works demonstrating my ability to handle complex data and extract meaningful results.
            </p>
          </div>
          <a
            href="#"
            className="flex items-center gap-2 text-blue-600 font-bold hover:gap-3 transition-all"
          >
            All Projects <ExternalLink size={18} />
          </a>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {data.projects?.map((project, index) => {
            const Icon = (project as any).icon ? iconMap[(project as any).icon] : Code2;
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group flex flex-col"
              >
                <div className="relative h-64 rounded-2xl overflow-hidden mb-6 shadow-md border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
                  <img
                    src={project.image}
                    alt={translate(project.title)}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                    <div className="flex gap-4">
                      {project.github && (
                        <a href={project.github} target="_blank" rel="noreferrer" className="bg-white p-2 rounded-full text-slate-900 hover:bg-blue-600 hover:text-white transition-colors">
                          <Github size={20} />
                        </a>
                      )}
                      {project.link && (
                        <a href={project.link} target="_blank" rel="noreferrer" className="bg-white p-2 rounded-full text-slate-900 hover:bg-blue-600 hover:text-white transition-colors">
                          <ExternalLink size={20} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex gap-4 items-start mb-4">
                  <div className="bg-blue-50 dark:bg-blue-900/30 p-3 rounded-xl text-blue-600 shrink-0">
                    <Icon size={24} />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2 truncate">{translate(project.title)}</h4>
                    <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 leading-relaxed line-clamp-2">
                      {translate(project.description)}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((t) => (
                        <span key={t} className="text-[10px] font-bold uppercase tracking-widest text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {project.files && project.files.length > 0 && (
                  <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-800">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Project Resources</p>
                    <div className="grid grid-cols-2 gap-2">
                      {project.files.map((file) => {
                        const FileIcon = fileIconMap[file.type] || FileBox;
                        return (
                          <button 
                            key={file.id}
                            onClick={(e) => handleFileClick(file, e)}
                            className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 dark:bg-slate-800/50 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-xs text-slate-600 dark:text-slate-400 hover:text-blue-600 transition-colors text-left group/file"
                            title={translate(file.name)}
                          >
                            <FileIcon size={14} className="shrink-0 text-blue-500" />
                            <span className="truncate flex-1 font-medium">{translate(file.name)}</span>
                            <Maximize2 size={10} className="opacity-0 group-hover/file:opacity-100 transition-opacity" />
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
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

export default Projects;