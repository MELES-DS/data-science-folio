import React, { useState, useEffect, useCallback } from 'react';
import { 
  Settings, 
  X, 
  LogIn, 
  LogOut, 
  Plus, 
  Trash2, 
  Save, 
  Image as ImageIcon,
  User,
  Layout,
  Briefcase,
  Share2,
  Globe,
  PlusCircle,
  Link as LinkIcon,
  Quote,
  Upload,
  Link,
  FileText,
  Music,
  Video,
  FileBox,
  FilePlus,
  ExternalLink,
  ChevronRight,
  ChevronDown,
  Code2,
  Check,
  Maximize2,
  Calendar,
  Building2,
  Download
} from 'lucide-react';
import { usePortfolio, PortfolioData, Language, HomeItem, SocialLink, Project, SkillCategory, MenuItem, TranslatedString, FileData, Experience } from '../context/PortfolioContext';
import { translations } from '../lib/translations';
import { toast } from 'sonner';
import { useDropzone } from 'react-dropzone';
import { cn } from '../lib/utils';

const updateTS = (ts: TranslatedString | undefined, lang: Language, val: string): TranslatedString => {
  return { ...ts, [lang]: val };
};

const iconOptions = [
  'GraduationCap', 'MapPin', 'Award', 'Database', 'BarChart2', 'BrainCircuit', 'Info', 'Code2', 'BarChart', 'Layers',
  'Github', 'Linkedin', 'Twitter', 'Facebook', 'Youtube', 'Instagram', 'Send', 'MessageCircle', 'MailIcon', 'FileText', 'Music', 'Video', 'FilePlus'
];

const AdminDashboard = () => {
  const { 
    isAdmin, login, logout, data, saveData, language: currentSiteLang
  } = usePortfolio();

  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'hero' | 'about' | 'skills' | 'projects' | 'experience' | 'socials' | 'languages' | 'menus'>('hero');
  
  const [editLang, setEditLang] = useState<Language>('en');
  const [editData, setEditData] = useState<PortfolioData>(data);
  const [hasChanges, setHasChanges] = useState(false);

  const t = translations[currentSiteLang] || translations['en'];

  useEffect(() => {
    if (isOpen) {
      setEditData(data);
      setHasChanges(false);
    }
  }, [isOpen, data]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(email, password)) {
      toast.success('Login successful!');
    } else {
      toast.error('Invalid credentials');
    }
  };

  const handleSave = () => {
    saveData(editData);
    setHasChanges(false);
    toast.success('All changes saved successfully!');
  };

  const updateEditData = (updater: (prev: PortfolioData) => PortfolioData) => {
    setEditData(prev => {
      const next = updater(prev);
      setHasChanges(true);
      return next;
    });
  };

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

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-[100] bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-2xl transition-all hover:scale-110 active:scale-95 group"
      >
        <Settings className="group-hover:rotate-90 transition-transform duration-500" size={24} />
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 w-full max-w-6xl max-h-[95vh] rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden transition-colors duration-300">
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/50">
          <div className="flex items-center gap-4">
            <div className="bg-blue-100 dark:bg-blue-900/50 p-2 rounded-xl text-blue-600">
              <Settings size={20} />
            </div>
            <div>
              <h2 className="text-lg font-bold">{t.adminTitle}</h2>
              {isAdmin && hasChanges && <span className="text-[10px] text-orange-500 font-bold uppercase tracking-wider">{t.unsavedChanges}</span>}
            </div>
          </div>

          {isAdmin && (
            <div className="hidden md:flex items-center gap-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-full px-2 py-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase ml-2 mr-1">{t.editingLang}:</span>
                {editData.enabledLanguages.map(lang => (
                    <button
                        key={lang}
                        onClick={() => setEditLang(lang)}
                        className={cn(
                            "px-3 py-1 rounded-full text-xs font-bold transition-all",
                            editLang === lang 
                                ? "bg-blue-600 text-white shadow-md" 
                                : "text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                        )}
                    >
                        {languageNames[lang]}
                    </button>
                ))}
            </div>
          )}

          <div className="flex items-center gap-3">
            {isAdmin && hasChanges && (
              <button 
                onClick={handleSave}
                className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-lg transition-all active:scale-95"
              >
                <Save size={16} /> <span className="hidden sm:inline">{t.saveChanges}</span>
              </button>
            )}
            <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-2">
              <X size={24} />
            </button>
          </div>
        </div>

        {!isAdmin ? (
          <div className="flex-1 flex items-center justify-center p-12">
            <form onSubmit={handleLogin} className="w-full max-w-sm space-y-6">
              <div className="text-center space-y-2 mb-8">
                <h3 className="text-2xl font-bold">Welcome back</h3>
                <p className="text-slate-500 text-sm">Sign in to manage your portfolio</p>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Email</label>
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    placeholder="admin@example.com"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Password</label>
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>
              <button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <LogIn size={18} />
                {t.signIn}
              </button>
            </form>
          </div>
        ) : (
          <div className="flex-1 flex flex-col md:flex-row h-full overflow-hidden">
            <div className="w-full md:w-64 bg-slate-50 dark:bg-slate-800/50 p-4 border-r border-slate-100 dark:border-slate-800 space-y-1 flex md:flex-col overflow-x-auto md:overflow-y-auto">
              {[ 
                { id: 'hero', icon: Layout, label: t.heroSettings },
                { id: 'about', icon: User, label: t.aboutSettings },
                { id: 'skills', icon: Briefcase, label: t.skillsMgmt },
                { id: 'projects', icon: Code2, label: t.projectsMgmt },
                { id: 'experience', icon: Calendar, label: t.experienceMgmt },
                { id: 'menus', icon: LinkIcon, label: t.menusMgmt },
                { id: 'socials', icon: Share2, label: t.socialLinks },
                { id: 'languages', icon: Globe, label: t.langMgmt }
              ].map((tab) => (
                <button 
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex-shrink-0 md:flex-none flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all text-sm ${
                    activeTab === tab.id ? 'bg-blue-600 text-white shadow-lg' : 'hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  <tab.icon size={18} /> <span className="hidden md:inline">{tab.label}</span>
                </button>
              ))}
              <div className="hidden md:block flex-1"></div>
              <button 
                onClick={logout}
                className="hidden md:flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
              >
                <LogOut size={18} /> <span>{t.signOut}</span>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 lg:p-10 bg-white dark:bg-slate-950">
              <div className="md:hidden mb-6 flex flex-wrap gap-2 items-center bg-slate-50 dark:bg-slate-900 p-3 rounded-2xl">
                 <span className="text-[10px] font-bold text-slate-400 uppercase">{t.editingLang}:</span>
                 {editData.enabledLanguages.map(lang => (
                    <button
                        key={lang}
                        onClick={() => setEditLang(lang)}
                        className={cn(
                            "px-2 py-1 rounded-lg text-xs font-bold",
                            editLang === lang ? "bg-blue-600 text-white" : "bg-white dark:bg-slate-800"
                        )}
                    >
                        {lang.toUpperCase()}
                    </button>
                 ))}
              </div>

              {activeTab === 'hero' && (
                <div className="space-y-8 animate-in fade-in duration-300">
                  <h3 className="text-2xl font-bold">{t.heroSettings} ({languageNames[editLang]})</h3>
                  <div className="grid gap-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-500">Name</label>
                        <input 
                          className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                          value={editData.hero.name[editLang] || ''}
                          onChange={(e) => updateEditData(p => ({ ...p, hero: { ...p.hero, name: updateTS(p.hero.name, editLang, e.target.value) } }))}
                          placeholder="Enter name..."
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-500">Title</label>
                        <input 
                          className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                          value={editData.hero.title[editLang] || ''}
                          onChange={(e) => updateEditData(p => ({ ...p, hero: { ...p.hero, title: updateTS(p.hero.title, editLang, e.target.value) } }))}
                          placeholder="Enter job title..."
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-500">Description</label>
                      <textarea 
                        rows={3}
                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                        value={editData.hero.description[editLang] || ''}
                        onChange={(e) => updateEditData(p => ({ ...p, hero: { ...p.hero, description: updateTS(p.hero.description, editLang, e.target.value) } }))}
                        placeholder="Short bio..."
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-500">Profile Photo URL</label>
                      <div className="flex gap-4">
                        <input 
                          className="flex-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                          value={editData.hero.photo}
                          onChange={(e) => updateEditData(p => ({ ...p, hero: { ...p.hero, photo: e.target.value } }))}
                        />
                        <div className="w-12 h-12 rounded-xl bg-slate-200 dark:bg-slate-800 overflow-hidden flex items-center justify-center border border-slate-200 dark:border-slate-700">
                           {editData.hero.photo ? <img src={editData.hero.photo} className="w-full h-full object-cover" alt="Profile" /> : <ImageIcon size={20} />}
                        </div>
                      </div>
                    </div>

                    <SectionFileManager 
                        title="Home & Profile Resources"
                        files={editData.hero.files || []}
                        editLang={editLang}
                        onFilesAdded={(newFiles: FileData[]) => updateEditData(p => ({ ...p, hero: { ...p.hero, files: [...(p.hero.files || []), ...newFiles] } }))}
                        onFileDeleted={(id: string) => updateEditData(p => ({ ...p, hero: { ...p.hero, files: (p.hero.files || []).filter(f => f.id !== id) } }))}
                        onFileNameUpdate={(id: string, val: string) => updateEditData(p => ({ ...p, hero: { ...p.hero, files: (p.hero.files || []).map(f => f.id === id ? { ...f, name: updateTS(f.name, editLang, val) } : f) } }))}
                        onFileTypeUpdate={(id: string, val: string) => updateEditData(p => ({ ...p, hero: { ...p.hero, files: (p.hero.files || []).map(f => f.id === id ? { ...f, type: val as any } : f) } }))}
                        t={t}
                    />

                    <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold">Home Info Items</h4>
                        <button 
                          onClick={() => updateEditData(p => ({
                            ...p,
                            hero: { ...p.hero, homeItems: [...p.hero.homeItems, { id: Date.now().toString(), label: {}, value: {}, icon: 'Info' }] }
                          }))}
                          className="flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700"
                        >
                          <Plus size={14} /> {t.addItem}
                        </button>
                      </div>
                      <div className="space-y-3">
                        {editData.hero.homeItems.map((item) => (
                          <div key={item.id} className="flex flex-wrap md:flex-nowrap gap-3 items-end bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-100 dark:border-slate-700">
                            <div className="w-full md:w-32 space-y-1">
                              <label className="text-[10px] font-bold text-slate-400 uppercase">Label</label>
                              <input 
                                className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-1.5 text-xs"
                                value={item.label[editLang] || ''}
                                onChange={(e) => updateEditData(p => ({
                                  ...p,
                                  hero: { ...p.hero, homeItems: p.hero.homeItems.map(hi => hi.id === item.id ? { ...hi, label: updateTS(hi.label, editLang, e.target.value) } : hi) }
                                }))}
                                placeholder="e.g. Education"
                              />
                            </div>
                            <div className="flex-1 space-y-1">
                              <label className="text-[10px] font-bold text-slate-400 uppercase">Value</label>
                              <input 
                                className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-1.5 text-xs"
                                value={item.value[editLang] || ''}
                                onChange={(e) => updateEditData(p => ({
                                  ...p,
                                  hero: { ...p.hero, homeItems: p.hero.homeItems.map(hi => hi.id === item.id ? { ...hi, value: updateTS(hi.value, editLang, e.target.value) } : hi) }
                                }))}
                                placeholder="e.g. University Name"
                              />
                            </div>
                            <div className="w-32 space-y-1">
                              <label className="text-[10px] font-bold text-slate-400 uppercase">Icon</label>
                              <select 
                                className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-1.5 text-xs"
                                value={item.icon}
                                onChange={(e) => updateEditData(p => ({
                                  ...p,
                                  hero: { ...p.hero, homeItems: p.hero.homeItems.map(hi => hi.id === item.id ? { ...hi, icon: e.target.value } : hi) }
                                }))}
                              >
                                {['GraduationCap', 'MapPin', 'Award', 'Info'].map(icon => <option key={icon} value={icon}>{icon}</option>)}
                              </select>
                            </div>
                            <button 
                              onClick={() => updateEditData(p => ({ ...p, hero: { ...p.hero, homeItems: p.hero.homeItems.filter(hi => hi.id !== item.id) } }))}
                              className="text-red-500 hover:text-red-600 p-2"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'about' && (
                <div className="space-y-8 animate-in fade-in duration-300">
                  <h3 className="text-2xl font-bold">{t.aboutSettings} ({languageNames[editLang]})</h3>
                  <div className="grid gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-500">Headline</label>
                      <input 
                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                        value={editData.about.title[editLang] || ''}
                        onChange={(e) => updateEditData(p => ({ ...p, about: { ...p.about, title: updateTS(p.about.title, editLang, e.target.value) } }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-500">Bio Content</label>
                      <textarea 
                        rows={6}
                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                        value={editData.about.content[editLang] || ''}
                        onChange={(e) => updateEditData(p => ({ ...p, about: { ...p.about, content: updateTS(p.about.content, editLang, e.target.value) } }))}
                      />
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-500">Quote</label>
                        <div className="flex gap-2">
                          <Quote size={16} className="text-slate-400 mt-3 flex-shrink-0" />
                          <input 
                            className="flex-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                            value={editData.about.quote[editLang] || ''}
                            onChange={(e) => updateEditData(p => ({ ...p, about: { ...p.about, quote: updateTS(p.about.quote, editLang, e.target.value) } }))}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-500">Section Image URL</label>
                        <div className="flex gap-4">
                          <input 
                            className="flex-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                            value={editData.about.image}
                            onChange={(e) => updateEditData(p => ({ ...p, about: { ...p.about, image: e.target.value } }))}
                          />
                          <div className="w-12 h-12 rounded-xl bg-slate-200 dark:bg-slate-800 overflow-hidden border border-slate-200 dark:border-slate-700">
                             <img src={editData.about.image} className="w-full h-full object-cover" alt="About" />
                          </div>
                        </div>
                      </div>
                    </div>

                    <SectionFileManager 
                        title="About Me Resources"
                        files={editData.about.files || []}
                        editLang={editLang}
                        onFilesAdded={(newFiles: FileData[]) => updateEditData(p => ({ ...p, about: { ...p.about, files: [...(p.about.files || []), ...newFiles] } }))}
                        onFileDeleted={(id: string) => updateEditData(p => ({ ...p, about: { ...p.about, files: (p.about.files || []).filter(f => f.id !== id) } }))}
                        onFileNameUpdate={(id: string, val: string) => updateEditData(p => ({ ...p, about: { ...p.about, files: (p.about.files || []).map(f => f.id === id ? { ...f, name: updateTS(f.name, editLang, val) } : f) } }))}
                        onFileTypeUpdate={(id: string, val: string) => updateEditData(p => ({ ...p, about: { ...p.about, files: (p.about.files || []).map(f => f.id === id ? { ...f, type: val as any } : f) } }))}
                        t={t}
                    />
                  </div>
                </div>
              )}

              {activeTab === 'skills' && (
                <div className="space-y-8 animate-in fade-in duration-300">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-bold">{t.skillsMgmt} ({languageNames[editLang]})</h3>
                    <button 
                      onClick={() => {
                        updateEditData(p => ({
                          ...p,
                          skills: [...p.skills, { id: Math.random().toString(36).substr(2, 9), category: {}, items: [] }]
                        }));
                      }}
                      className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-md hover:bg-blue-700"
                    >
                      <Plus size={16} /> {t.addCategory}
                    </button>
                  </div>
                  <div className="space-y-6">
                    {editData.skills.map((cat) => (
                      <div key={cat.id} className="bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 p-6 rounded-2xl transition-all">
                        <div className="flex items-center justify-between mb-4">
                          <input 
                            className="bg-transparent border-none font-bold text-lg focus:ring-0 w-1/2"
                            value={cat.category[editLang] || ''}
                            onChange={(e) => updateEditData(p => ({
                              ...p,
                              skills: p.skills.map(s => s.id === cat.id ? { ...s, category: updateTS(s.category, editLang, e.target.value) } : s)
                            }))}
                            placeholder="Category Name..."
                          />
                          <button 
                            onClick={() => updateEditData(p => ({ ...p, skills: p.skills.filter(s => s.id !== cat.id) }))} 
                            className="text-red-500 hover:text-red-600 p-2"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {cat.items.map((skill, idx) => (
                            <span key={idx} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-2">
                              {skill[editLang] || '(no translation)'}
                              <button 
                                onClick={() => updateEditData(p => ({
                                  ...p,
                                  skills: p.skills.map(s => s.id === cat.id ? { ...s, items: s.items.filter((_, i) => i !== idx) } : s)
                                }))} 
                                className="text-slate-400 hover:text-red-500 transition-colors"
                              >
                                <X size={12} />
                              </button>
                            </span>
                          ))}
                        </div>
                        <div className="flex gap-2">
                          <input 
                            placeholder="Add skill..."
                            className="flex-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                const val = (e.target as HTMLInputElement).value.trim();
                                if (val) {
                                  updateEditData(p => ({
                                    ...p,
                                    skills: p.skills.map(s => s.id === cat.id ? { ...s, items: [...s.items, { [editLang]: val }] } : s)
                                  }));
                                  (e.target as HTMLInputElement).value = '';
                                }
                              }
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'projects' && (
                <div className="space-y-8 animate-in fade-in duration-300">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-bold">{t.projectsMgmt} ({languageNames[editLang]})</h3>
                    <button 
                      onClick={() => updateEditData(p => ({
                        ...p,
                        projects: [...(p.projects || []), { id: Date.now().toString(), title: {}, description: {}, tech: [], image: '', github: '', link: '', files: [] }]
                      }))}
                      className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-md hover:bg-blue-700 transition-all active:scale-95"
                    >
                      <Plus size={16} /> {t.addProject}
                    </button>
                  </div>
                  <div className="grid gap-8">
                    {editData.projects.map((proj) => (
                      <CardEditor 
                        key={proj.id} 
                        item={proj} 
                        editLang={editLang} 
                        onDelete={() => updateEditData(p => ({ ...p, projects: p.projects.filter(pr => pr.id !== proj.id) }))}
                        onUpdate={(updated) => updateEditData(p => ({ ...p, projects: p.projects.map(pr => pr.id === proj.id ? updated : pr) }))}
                        t={t}
                        type="project"
                      />
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'experience' && (
                <div className="space-y-8 animate-in fade-in duration-300">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-bold">{t.experienceMgmt} ({languageNames[editLang]})</h3>
                    <button 
                      onClick={() => updateEditData(p => ({
                        ...p,
                        experiences: [...(p.experiences || []), { id: Date.now().toString(), company: {}, role: {}, period: {}, description: {}, files: [] }]
                      }))}
                      className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-md hover:bg-blue-700 transition-all active:scale-95"
                    >
                      <Plus size={16} /> {t.addExperience}
                    </button>
                  </div>
                  <div className="grid gap-8">
                    {editData.experiences?.map((exp) => (
                      <CardEditor 
                        key={exp.id} 
                        item={exp} 
                        editLang={editLang} 
                        onDelete={() => updateEditData(p => ({ ...p, experiences: p.experiences.filter(e => e.id !== exp.id) }))}
                        onUpdate={(updated) => updateEditData(p => ({ ...p, experiences: p.experiences.map(e => e.id === exp.id ? updated : e) }))}
                        t={t}
                        type="experience"
                      />
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'menus' && (
                <div className="space-y-8 animate-in fade-in duration-300">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-bold">{t.menusMgmt} ({languageNames[editLang]})</h3>
                    <button 
                      onClick={() => updateEditData(p => ({
                        ...p,
                        menus: [...p.menus, { id: Date.now().toString(), label: {}, href: '#', icon: 'Code2', isExternal: false, files: [] }]
                      }))}
                      className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-md hover:bg-blue-700"
                    >
                      <Plus size={16} /> {t.addMenu}
                    </button>
                  </div>
                  <div className="grid gap-4">
                    {editData.menus.map((menu) => (
                      <div key={menu.id} className="bg-slate-50 dark:bg-slate-800/40 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 transition-all">
                        <div className="grid md:grid-cols-4 gap-4 items-end">
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-500 uppercase">Label</label>
                            <input 
                              className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-xs"
                              value={menu.label[editLang] || ''}
                              onChange={(e) => updateEditData(p => ({
                                ...p,
                                menus: p.menus.map(m => m.id === menu.id ? { ...m, label: updateTS(m.label, editLang, e.target.value) } : m)
                              }))}
                              placeholder="Menu name..."
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-500 uppercase">Href / Link</label>
                            <input 
                              className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-xs"
                              value={menu.href}
                              onChange={(e) => updateEditData(p => ({
                                ...p,
                                menus: p.menus.map(m => m.id === menu.id ? { ...m, href: e.target.value } : m)
                              }))}
                              placeholder="#about or https://..."
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-500 uppercase">Icon</label>
                            <select 
                              className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-xs"
                              value={menu.icon}
                              onChange={(e) => updateEditData(p => ({
                                ...p,
                                menus: p.menus.map(m => m.id === menu.id ? { ...m, icon: e.target.value } : m)
                              }))}
                            >
                              {iconOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                            </select>
                          </div>
                          <div className="flex gap-2 items-center">
                             <label className="flex items-center gap-2 cursor-pointer">
                                <input 
                                    type="checkbox"
                                    checked={menu.isExternal}
                                    className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                                    onChange={(e) => updateEditData(p => ({
                                        ...p,
                                        menus: p.menus.map(m => m.id === menu.id ? { ...m, isExternal: e.target.checked } : m)
                                    }))}
                                />
                                <span className="text-xs font-bold text-slate-500">External Link</span>
                             </label>
                            <button 
                                onClick={() => updateEditData(p => ({ ...p, menus: p.menus.filter(m => m.id !== menu.id) }))}
                                className="ml-auto bg-red-50 dark:bg-red-900/20 text-red-500 p-2 rounded-lg hover:bg-red-100 transition-colors"
                            >
                                <Trash2 size={16} />
                            </button>
                          </div>
                        </div>

                        <div className="mt-4">
                             <SectionFileManager 
                                title="Menu Attachments (e.g. CV)"
                                files={menu.files || []}
                                editLang={editLang}
                                onFilesAdded={(newFiles: FileData[]) => updateEditData(p => ({ ...p, menus: p.menus.map(m => m.id === menu.id ? { ...m, files: [...(m.files || []), ...newFiles] } : m) }))}
                                onFileDeleted={(id: string) => updateEditData(p => ({ ...p, menus: p.menus.map(m => m.id === menu.id ? { ...m, files: (m.files || []).filter(f => f.id !== id) } : m) }))}
                                onFileNameUpdate={(id: string, val: string) => updateEditData(p => ({ ...p, menus: p.menus.map(m => m.id === menu.id ? { ...m, files: (m.files || []).map(f => f.id === id ? { ...f, name: updateTS(f.name, editLang, val) } : f) } : m) }))}
                                onFileTypeUpdate={(id: string, val: string) => updateEditData(p => ({ ...p, menus: p.menus.map(m => m.id === menu.id ? { ...m, files: (m.files || []).map(f => f.id === id ? { ...f, type: val as any } : f) } : m) }))}
                                t={t}
                                compact
                            />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'socials' && (
                <div className="space-y-8 animate-in fade-in duration-300">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-bold">{t.socialLinks}</h3>
                    <button 
                      onClick={() => updateEditData(p => ({
                        ...p,
                        socials: [...p.socials, { id: Date.now().toString(), platform: 'GitHub', url: '#', username: '@user', color: '#666666' }]
                      }))}
                      className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-md hover:bg-blue-700"
                    >
                      <Plus size={16} /> {t.addSocial}
                    </button>
                  </div>
                  <div className="grid gap-4">
                    {editData.socials.map((social) => (
                      <div key={social.id} className="bg-slate-50 dark:bg-slate-800/40 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 transition-all">
                        <div className="grid md:grid-cols-4 gap-4 items-end">
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-500 uppercase">Platform</label>
                            <select 
                                className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-xs"
                                value={social.platform}
                                onChange={(e) => updateEditData(p => ({
                                  ...p,
                                  socials: p.socials.map(s => s.id === social.id ? { ...s, platform: e.target.value } : s)
                                }))}
                            >
                                {['GitHub', 'Linkedin', 'Twitter', 'Facebook', 'YouTube', 'Instagram', 'Telegram', 'WhatsApp', 'Email'].map(p => <option key={p} value={p}>{p}</option>)}
                                <option value="Other">Other</option>
                            </select>
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-500 uppercase">Handle / Username</label>
                            <input 
                              className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-xs"
                              value={social.username}
                              onChange={(e) => updateEditData(p => ({
                                ...p,
                                socials: p.socials.map(s => s.id === social.id ? { ...s, username: e.target.value } : s)
                              }))}
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-500 uppercase">Brand Color (Hex)</label>
                            <div className="flex gap-2">
                                <input 
                                    type="color"
                                    className="w-8 h-8 rounded border-none cursor-pointer p-0 bg-transparent"
                                    value={social.color || '#666666'}
                                    onChange={(e) => updateEditData(p => ({
                                        ...p,
                                        socials: p.socials.map(s => s.id === social.id ? { ...s, color: e.target.value } : s)
                                    }))}
                                />
                                <input 
                                    className="flex-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-xs font-mono"
                                    value={social.color || ''}
                                    placeholder="#HEX"
                                    onChange={(e) => updateEditData(p => ({
                                        ...p,
                                        socials: p.socials.map(s => s.id === social.id ? { ...s, color: e.target.value } : s)
                                    }))}
                                />
                            </div>
                          </div>
                          <div className="flex gap-2 items-end">
                            <button 
                                onClick={() => updateEditData(p => ({ ...p, socials: p.socials.filter(s => s.id !== social.id) }))}
                                className="w-full bg-red-50 dark:bg-red-900/20 text-red-500 p-2 rounded-lg hover:bg-red-100 transition-colors flex items-center justify-center"
                            >
                                <Trash2 size={18} />
                            </button>
                          </div>
                        </div>
                        <div className="mt-3 space-y-1">
                           <label className="text-[10px] font-bold text-slate-500 uppercase">Direct URL</label>
                           <input 
                             className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-xs"
                             value={social.url}
                             onChange={(e) => updateEditData(p => ({
                               ...p,
                               socials: p.socials.map(s => s.id === social.id ? { ...s, url: e.target.value } : s)
                             }))}
                             placeholder="https://..."
                           />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'languages' && (
                <div className="space-y-8 animate-in fade-in duration-300">
                   <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-bold">{t.langMgmt}</h3>
                    <p className="text-xs text-slate-500">Enable/Disable languages for your visitors.</p>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { code: 'en', name: 'English' },
                      { code: 'am', name: 'Amharic' },
                      { code: 'om', name: 'Afan Oromo' },
                      { code: 'es', name: 'Spanish' },
                      { code: 'ar', name: 'Arabic' },
                      { code: 'el', name: 'Greek' },
                      { code: 'fr', name: 'French' },
                      { code: 'de', name: 'German' },
                      { code: 'zh', name: 'Chinese' },
                      { code: 'ja', name: 'Japanese' }
                    ].map((lang) => {
                      const isEnabled = editData.enabledLanguages.includes(lang.code as Language);
                      return (
                        <button 
                          key={lang.code}
                          onClick={() => {
                            const code = lang.code as Language;
                            updateEditData(p => ({
                              ...p,
                              enabledLanguages: isEnabled 
                                ? (p.enabledLanguages.length > 1 ? p.enabledLanguages.filter(l => l !== code) : p.enabledLanguages)
                                : [...p.enabledLanguages, code]
                            }));
                          }}
                          className={cn(
                            "p-4 rounded-2xl border flex flex-col items-center gap-2 transition-all",
                            isEnabled 
                              ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-600'
                              : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-400 opacity-50 shadow-inner'
                          )}
                        >
                          <Globe size={24} className={isEnabled ? 'animate-pulse' : ''} />
                          <span className="font-bold text-xs">{lang.name}</span>
                          <span className="text-[10px] uppercase tracking-widest font-bold">{isEnabled ? 'Enabled' : 'Disabled'}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const CardEditor = ({ item, editLang, onDelete, onUpdate, t, type }: { 
    item: Project | Experience, 
    editLang: Language, 
    onDelete: () => void, 
    onUpdate: (item: any) => void,
    t: any,
    type: 'project' | 'experience'
}) => {
  const isProj = type === 'project';
  const p = item as Project;
  const e = item as Experience;

  return (
    <div className="bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 p-6 rounded-3xl transition-all hover:shadow-lg">
      <div className="flex justify-between items-start mb-6">
        <div className="flex-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{isProj ? 'Project Title' : 'Company Name'}</label>
            <input 
                className="w-full bg-transparent border-none font-bold text-xl focus:ring-0 px-0 placeholder:text-slate-300 dark:placeholder:text-slate-700"
                value={(isProj ? p.title[editLang] : e.company[editLang]) || ''}
                onChange={(ev) => onUpdate(isProj ? { ...p, title: updateTS(p.title, editLang, ev.target.value) } : { ...e, company: updateTS(e.company, editLang, ev.target.value) })}
                placeholder={isProj ? "Untitled Project..." : "Company Name..."}
            />
        </div>
        <button onClick={onDelete} className="text-red-500 hover:text-red-600 p-2 bg-red-50 dark:bg-red-900/20 rounded-xl transition-all">
          <Trash2 size={20} />
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
         <div className="space-y-2">
           <label className="text-xs font-bold text-slate-500 uppercase">{t.description} ({editLang})</label>
           <textarea 
              rows={4}
              className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none"
              value={item.description[editLang] || ''}
              onChange={(ev) => onUpdate({ ...item, description: updateTS(item.description, editLang, ev.target.value) })}
              placeholder="Describe..."
           />
         </div>
         <div className="space-y-4">
            {!isProj ? (
               <>
                 <div>
                    <label className="text-xs font-bold text-slate-500 uppercase">{t.role}</label>
                    <input 
                        className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2 text-sm mt-1"
                        value={e.role[editLang] || ''}
                        onChange={(ev) => onUpdate({ ...e, role: updateTS(e.role, editLang, ev.target.value) })}
                        placeholder="Lead Developer..."
                    />
                 </div>
                 <div>
                    <label className="text-xs font-bold text-slate-500 uppercase">{t.period}</label>
                    <input 
                        className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2 text-sm mt-1"
                        value={e.period[editLang] || ''}
                        onChange={(ev) => onUpdate({ ...e, period: updateTS(e.period, editLang, ev.target.value) })}
                        placeholder="2022 - Present..."
                    />
                 </div>
               </>
            ) : (
                <>
                    <div>
                        <label className="text-xs font-bold text-slate-500 uppercase">Display Image URL</label>
                        <div className="flex gap-3 mt-1">
                            <input 
                                className="flex-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                                value={p.image}
                                onChange={(ev) => onUpdate({ ...p, image: ev.target.value })}
                                placeholder="https://..."
                            />
                            <div className="w-10 h-10 rounded-lg bg-slate-200 dark:bg-slate-800 overflow-hidden border border-slate-300 dark:border-slate-700 shrink-0">
                                {p.image && <img src={p.image} className="w-full h-full object-cover" alt="Project" />}
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-xs font-bold text-slate-500 uppercase">GitHub</label>
                            <input 
                                className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2 text-xs mt-1"
                                value={p.github || ''}
                                onChange={(ev) => onUpdate({ ...p, github: ev.target.value })}
                            />
                        </div>
                        <div>
                            <label className="text-xs font-bold text-slate-500 uppercase">Demo</label>
                            <input 
                                className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2 text-xs mt-1"
                                value={p.link || ''}
                                onChange={(ev) => onUpdate({ ...p, link: ev.target.value })}
                            />
                        </div>
                    </div>
                </>
            )}
         </div>
      </div>

      {isProj && (
        <div className="mb-4">
             <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Tech Stack</label>
             <input 
                className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2 text-xs focus:ring-2 focus:ring-blue-500 outline-none mt-1"
                value={p.tech.join(', ')}
                onChange={(ev) => onUpdate({ ...p, tech: ev.target.value.split(',').map(t => t.trim()).filter(t => t) })}
                placeholder="React, Tailwind, etc."
            />
        </div>
      )}

      <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
          <SectionFileManager 
            title={isProj ? "Project Files" : "Experience Resources"}
            files={item.files || []}
            editLang={editLang}
            onFilesAdded={(newFiles: FileData[]) => onUpdate({ ...item, files: [...(item.files || []), ...newFiles] })}
            onFileDeleted={(id: string) => onUpdate({ ...item, files: (item.files || []).filter(f => f.id !== id) })}
            onFileNameUpdate={(id: string, val: string) => onUpdate({ ...item, files: (item.files || []).map(f => f.id === id ? { ...f, name: updateTS(f.name, editLang, val) } : f) })}
            onFileTypeUpdate={(id: string, val: string) => onUpdate({ ...item, files: (item.files || []).map(f => f.id === id ? { ...f, type: val as any } : f) })}
            t={t}
            compact
          />
      </div>
    </div>
  );
};

const SectionFileManager = ({ title, files, onFilesAdded, onFileDeleted, onFileNameUpdate, onFileTypeUpdate, editLang, t, compact = false }: any) => {
    const [isOpen, setIsOpen] = useState(false);
    const [previewFile, setPreviewFile] = useState<FileData | null>(null);

    return (
        <div className={cn("space-y-4", !compact && "pt-4 border-t border-slate-100 dark:border-slate-800")}>
            <div className="flex items-center justify-between">
                <h4 className={cn("font-bold text-slate-700 dark:text-slate-300", compact ? "text-xs" : "text-sm")}>{title}</h4>
                <button 
                    onClick={() => setIsOpen(!isOpen)}
                    className={cn(
                        "flex items-center gap-2 px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all",
                        isOpen ? "bg-blue-600 text-white shadow-md" : "bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 text-slate-700 dark:text-slate-200"
                    )}
                >
                    {isOpen ? <ChevronDown size={14} /> : <FilePlus size={14} />}
                    {t.uploadFiles} ({files?.length || 0})
                </button>
            </div>

            {isOpen && (
                <div className="space-y-6 animate-in slide-in-from-top-2 duration-200">
                    <FileUpload 
                        onFilesAdded={onFilesAdded}
                        t={t}
                        editLang={editLang}
                    />
                    
                    {files && files.length > 0 && (
                        <div className="grid gap-2">
                            {files.map((file: any) => (
                                <div key={file.id} className="flex items-center gap-3 bg-white dark:bg-slate-900/50 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 group/item">
                                    <div 
                                        className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 shrink-0 cursor-pointer hover:bg-blue-100 transition-colors"
                                        onClick={() => setPreviewFile(file)}
                                    >
                                        {file.type === 'image' && <ImageIcon size={20} />}
                                        {file.type === 'audio' && <Music size={20} />}
                                        {file.type === 'video' && <Video size={20} />}
                                        {file.type === 'pdf' && <FileText size={20} />}
                                        {['doc', 'ppt'].includes(file.type) && <FilePlus size={20} />}
                                        {!['image', 'audio', 'video', 'pdf', 'doc', 'ppt'].includes(file.type) && <FileBox size={20} />}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <input 
                                            className="w-full bg-transparent border-none text-xs font-bold p-0 focus:ring-0 placeholder:text-slate-300"
                                            value={file.name[editLang] || ''}
                                            onChange={(e) => onFileNameUpdate(file.id, e.target.value)}
                                            placeholder="File Name..."
                                        />
                                        <p className="text-[9px] text-slate-400 truncate mt-0.5 font-mono">{file.url}</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <select 
                                            className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[9px] font-bold uppercase rounded-lg p-1 outline-none"
                                            value={file.type}
                                            onChange={(e) => onFileTypeUpdate(file.id, e.target.value)}
                                        >
                                            {['image', 'audio', 'video', 'pdf', 'doc', 'ppt', 'other'].map(type => <option key={type} value={type}>{type}</option>)}
                                        </select>
                                        <button 
                                            onClick={() => onFileDeleted(file.id)}
                                            className="text-red-500 hover:text-red-600 p-1.5 bg-red-50 dark:bg-red-900/20 rounded-lg"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {previewFile && (
                <FilePreviewModal file={previewFile} onClose={() => setPreviewFile(null)} editLang={editLang} />
            )}
        </div>
    );
};

const FileUpload = ({ onFilesAdded, t, editLang }: any) => {
    const [urlInput, setUrlInput] = useState('');
    const [isUrlMode, setIsUrlMode] = useState(false);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const newFiles: FileData[] = acceptedFiles.map(file => {
            const type: any = file.type.split('/')[0];
            let mappedType: FileData['type'] = 'other';
            if (type === 'image') mappedType = 'image';
            else if (type === 'audio') mappedType = 'audio';
            else if (type === 'video') mappedType = 'video';
            else if (file.type === 'application/pdf') mappedType = 'pdf';
            else if (file.name.endsWith('.doc') || file.name.endsWith('.docx')) mappedType = 'doc';
            else if (file.name.endsWith('.ppt') || file.name.endsWith('.pptx')) mappedType = 'ppt';

            return {
                id: Math.random().toString(36).substr(2, 9),
                name: { [editLang]: file.name },
                url: URL.createObjectURL(file), 
                type: mappedType,
                size: file.size
            };
        });
        onFilesAdded(newFiles);
        toast.info(`Note: Locally uploaded files are temporary previews. Use a public URL for permanent storage.`);
    }, [onFilesAdded, editLang]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    const handleAddUrl = () => {
        if (!urlInput.trim()) return;
        
        let type: FileData['type'] = 'other';
        const ext = urlInput.split('?')[0].split('.').pop()?.toLowerCase();
        if (['jpg', 'jpeg', 'png', 'webp', 'gif', 'svg'].includes(ext!)) type = 'image';
        else if (['mp3', 'wav', 'ogg', 'm4a'].includes(ext!)) type = 'audio';
        else if (['mp4', 'webm', 'mov'].includes(ext!)) type = 'video';
        else if (ext === 'pdf') type = 'pdf';
        else if (['doc', 'docx'].includes(ext!)) type = 'doc';
        else if (['ppt', 'pptx'].includes(ext!)) type = 'ppt';

        const newFile: FileData = {
            id: Date.now().toString(),
            name: { [editLang]: 'Remote File' },
            url: urlInput,
            type
        };
        
        onFilesAdded([newFile]);
        setUrlInput('');
        toast.success('URL resource added!');
    };

    return (
        <div className="space-y-4">
            <div className="flex bg-slate-100 dark:bg-slate-900 p-1 rounded-xl">
                <button 
                    onClick={() => setIsUrlMode(false)}
                    className={cn("flex-1 py-2 rounded-lg font-bold text-[10px] transition-all", !isUrlMode ? "bg-white dark:bg-slate-800 shadow-sm" : "text-slate-500")}
                >
                    Upload File
                </button>
                <button 
                    onClick={() => setIsUrlMode(true)}
                    className={cn("flex-1 py-2 rounded-lg font-bold text-[10px] transition-all", isUrlMode ? "bg-white dark:bg-slate-800 shadow-sm" : "text-slate-500")}
                >
                    Paste URL
                </button>
            </div>

            {isUrlMode ? (
                <div className="flex gap-2">
                    <input 
                        className="flex-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2 text-xs outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="https://example.com/file.pdf"
                        value={urlInput}
                        onChange={(e) => setUrlInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleAddUrl()}
                    />
                    <button onClick={handleAddUrl} className="bg-blue-600 text-white px-4 py-2 rounded-xl font-bold text-xs">Add</button>
                </div>
            ) : (
                <div {...getRootProps()} className={cn("border-2 border-dashed rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer transition-all", isDragActive ? "border-blue-500 bg-blue-900/10" : "border-slate-200 dark:border-slate-800 hover:border-slate-300")}>
                    <input {...getInputProps()} />
                    <Upload size={24} className="text-slate-400 mb-2" />
                    <p className="text-[10px] text-slate-500 font-bold text-center">Drag & drop or click</p>
                </div>
            )}
        </div>
    );
};

const FilePreviewModal = ({ file, onClose, editLang }: { file: FileData, onClose: () => void, editLang: Language }) => {
    return (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md">
           <div className="absolute inset-0" onClick={onClose}></div>
           <div className="relative z-10 w-full max-w-4xl flex flex-col items-center">
              <button onClick={onClose} className="absolute -top-12 right-0 text-white flex items-center gap-2 font-bold bg-white/10 px-4 py-2 rounded-xl">
                  <X size={20} /> Close
              </button>
              <div className="w-full flex justify-center bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-white/10 min-h-[300px]">
                 {file.type === 'image' && <img src={file.url} className="max-h-[70vh] object-contain" alt="Preview" />}
                 {file.type === 'video' && <video src={file.url} controls className="max-h-[70vh] w-full" autoPlay />}
                 {file.type === 'audio' && <div className="p-20 flex flex-col items-center gap-6 w-full"><Music size={64} className="text-blue-500" /><audio src={file.url} controls className="w-full max-w-md" /></div>}
                 {(['pdf', 'doc', 'ppt', 'other'].includes(file.type)) && (
                    <div className="p-20 flex flex-col items-center gap-6 text-center text-white w-full">
                        <FileBox size={64} className="text-blue-400" />
                        <h3 className="text-2xl font-bold">{file.name[editLang] || Object.values(file.name)[0]}</h3>
                        <a href={file.url} target="_blank" rel="noreferrer" className="bg-blue-600 px-8 py-3 rounded-xl font-bold flex items-center gap-2 mt-4">
                            <ExternalLink size={18} /> Open File
                        </a>
                    </div>
                 )}
              </div>
           </div>
        </div>
    );
};

export default AdminDashboard;