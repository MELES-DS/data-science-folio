import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Maximize2, 
  ExternalLink, 
  Download,
  Music,
  FileBox,
  FileText
} from 'lucide-react';
import { FileData } from '../context/PortfolioContext';

interface FileViewerProps {
  file: FileData | null;
  onClose: () => void;
  translate: (val: any) => string;
}

const FileViewer: React.FC<FileViewerProps> = ({ file, onClose, translate }) => {
  if (!file) return null;

  const renderContent = () => {
    switch (file.type) {
      case 'image':
        return <img src={file.url} alt={translate(file.name)} className="max-w-full max-h-[70vh] object-contain rounded-xl shadow-2xl" />;
      case 'video':
        return <video src={file.url} controls className="max-w-full max-h-[70vh] rounded-xl shadow-2xl" autoPlay />;
      case 'audio':
        return (
          <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-2xl flex flex-col items-center gap-6 w-full max-w-md">
            <div className="w-24 h-24 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 animate-pulse">
               <Music size={48} />
            </div>
            <div className="text-center">
                <h3 className="text-xl font-bold mb-2">{translate(file.name)}</h3>
                <p className="text-slate-500 text-sm mb-4 uppercase tracking-widest font-bold">Audio Resource</p>
            </div>
            <audio src={file.url} controls className="w-full" />
          </div>
        );
      case 'pdf':
        return <iframe src={file.url} title="PDF Preview" className="w-full h-[70vh] rounded-xl bg-white" />;
      default:
        return (
          <div className="bg-white dark:bg-slate-900 p-12 rounded-2xl shadow-2xl flex flex-col items-center gap-6 max-w-sm w-full">
            <div className="w-20 h-20 rounded-2xl bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600">
               <FileBox size={40} />
            </div>
            <div className="text-center">
                <h3 className="text-xl font-bold mb-2">{translate(file.name)}</h3>
                <p className="text-slate-500 text-sm mb-6">Preview not available for this file type ({file.type}). You can download it to view.</p>
            </div>
            <a 
                href={file.url} 
                download 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg"
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
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8"
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
            className="absolute -top-12 right-0 text-white/70 hover:text-white transition-colors flex items-center gap-2 text-sm font-bold bg-white/10 px-4 py-2 rounded-xl"
        >
            <X size={20} /> Close
        </button>
        <div className="w-full flex justify-center">
            {renderContent()}
        </div>
        <div className="mt-6 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl px-6 py-4 flex items-center gap-4 text-white w-full max-w-2xl">
            <div className="bg-white/20 p-2 rounded-lg shrink-0">
                <Maximize2 size={16} />
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">Full Resource View</p>
                <p className="font-bold truncate">{translate(file.name)}</p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
                <a href={file.url} target="_blank" rel="noreferrer" className="p-2 hover:bg-white/20 rounded-lg transition-colors" title="Open in new tab">
                    <ExternalLink size={18} />
                </a>
                <a href={file.url} download className="p-2 hover:bg-white/20 rounded-lg transition-colors" title="Download">
                    <Download size={18} />
                </a>
            </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default FileViewer;