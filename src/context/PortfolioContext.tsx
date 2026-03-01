import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'am' | 'om' | 'es' | 'ar' | 'el' | 'fr' | 'de' | 'zh' | 'ja';

export type TranslatedString = Partial<Record<Language, string>>;

export interface SkillCategory {
  id: string;
  category: TranslatedString;
  items: TranslatedString[];
}

export interface SocialLink {
  id: string;
  platform: string;
  url: string;
  username: string;
  color?: string;
}

export interface FileData {
  id: string;
  name: TranslatedString;
  url: string;
  type: 'image' | 'audio' | 'video' | 'pdf' | 'doc' | 'ppt' | 'other';
  size?: number;
}

export interface Experience {
  id: string;
  company: TranslatedString;
  role: TranslatedString;
  period: TranslatedString;
  description: TranslatedString;
  files: FileData[];
}

export interface Project {
  id: string;
  title: TranslatedString;
  description: TranslatedString;
  tech: string[];
  image: string;
  github?: string;
  link?: string;
  icon?: string;
  files: FileData[];
}

export interface HomeItem {
  id: string;
  label: TranslatedString;
  value: TranslatedString;
  icon: string;
}

export interface MenuItem {
  id: string;
  label: TranslatedString;
  href: string;
  icon: string;
  isExternal?: boolean;
  files?: FileData[];
}

export interface PortfolioData {
  hero: {
    name: TranslatedString;
    title: TranslatedString;
    description: TranslatedString;
    photo: string;
    homeItems: HomeItem[];
    files: FileData[];
  };
  about: {
    title: TranslatedString;
    content: TranslatedString;
    image: string;
    quote: TranslatedString;
    files: FileData[];
  };
  skills: SkillCategory[];
  socials: SocialLink[];
  projects: Project[];
  experiences: Experience[];
  menus: MenuItem[];
  enabledLanguages: Language[];
}

interface PortfolioContextType {
  data: PortfolioData;
  setData: React.Dispatch<React.SetStateAction<PortfolioData>>;
  saveData: (newData: PortfolioData) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  isAdmin: boolean;
  login: (email: string, pass: string) => boolean;
  logout: () => void;
  translate: (val: TranslatedString | string | undefined) => string;
}

const defaultData: PortfolioData = {
  hero: {
    name: { en: "Melis" },
    title: { en: "Data Scientist" },
    description: { en: "Final-year Data Science student at Debre Berhan University. I transform complex data into actionable insights using Machine Learning and advanced statistical analysis." },
    photo: "https://storage.googleapis.com/dala-prod-public-storage/attachments/9b71a796-63bf-4402-bfa3-9f779f293884/1772348243700_image.png",
    homeItems: [
      { id: 'h1', label: { en: 'Education' }, value: { en: 'B.Sc. in Data Science - Debre Berhan University' }, icon: 'GraduationCap' },
      { id: 'h2', label: { en: 'Location' }, value: { en: 'Debre Berhan, Ethiopia' }, icon: 'MapPin' },
      { id: 'h3', label: { en: 'Mission' }, value: { en: 'To leverage data science for societal development in Ethiopia and beyond.' }, icon: 'Award' }
    ],
    files: []
  },
  about: {
    title: { en: "A Passionate Data Science Enthusiast from Ethiopia" },
    content: { en: "I am Melis Melakie Shiferaw, currently pursuing my degree in Data Science at Debre Berhan University. My journey in technology is driven by a fascination with how data can solve real-world problems and drive strategic decisions." },
    image: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/352ba05b-54ab-4e3b-859b-744af1c95fe2/about-bg-ac1d239c-1772192611156.webp",
    quote: { en: "Data is the new oil, but only if you know how to refine it." },
    files: []
  },
  skills: [
    { id: '1', category: { en: 'Machine Learning' }, items: [{ en: 'Supervised Learning' }, { en: 'Unsupervised Learning' }, { en: 'Neural Networks' }, { en: 'Predictive Modeling' }] },
    { id: '2', category: { en: 'Data Analysis' }, items: [{ en: 'Statistical Analysis' }, { en: 'Data Cleaning' }, { en: 'A/B Testing' }, { en: 'EDA' }] }
  ],
  socials: [
    { id: '1', platform: 'Telegram', url: 'https://t.me/melismelakie', username: '@melismelakie', color: '#0088cc' },
    { id: '6', platform: 'GitHub', url: 'https://github.com/melismelakie', username: 'melismelakie', color: '#333' }
  ],
  projects: [
    {
      id: 'p1',
      title: { en: 'Predictive Sales Analysis' },
      description: { en: 'Used time-series forecasting to predict retail sales trends with 94% accuracy.' },
      tech: ['Python', 'Scikit-Learn', 'Prophet'],
      image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/352ba05b-54ab-4e3b-859b-744af1c95fe2/project-bg-1-53b58f13-1772192610770.webp',
      icon: 'BarChart',
      files: []
    }
  ],
  experiences: [],
  menus: [
    { id: 'm1', label: { en: 'My CV' }, href: '#contact', icon: 'FileText', files: [] },
    { id: 'm2', label: { en: 'My Works' }, href: '#projects', icon: 'Code2', files: [] }
  ],
  enabledLanguages: ['en', 'am', 'om', 'es', 'ar', 'el']
};

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<PortfolioData>(() => {
    const saved = localStorage.getItem('portfolio_data_v3');
    if (saved) {
      return JSON.parse(saved);
    }
    
    const oldSaved = localStorage.getItem('portfolio_data_v2') || localStorage.getItem('portfolio_data');
    if (oldSaved) {
      const old = JSON.parse(oldSaved);
      const migrate = (str: any) => typeof str === 'string' ? { en: str } : str;
      
      const migrated: PortfolioData = {
        hero: {
          ...old.hero,
          name: migrate(old.hero?.name),
          title: migrate(old.hero?.title),
          description: migrate(old.hero?.description),
          homeItems: (old.hero?.homeItems || []).map((hi: any) => ({
            ...hi,
            label: migrate(hi.label),
            value: migrate(hi.value)
          })),
          files: old.hero?.files || []
        },
        about: {
          ...old.about,
          title: migrate(old.about?.title),
          content: migrate(old.about?.content),
          quote: migrate(old.about?.quote),
          files: old.about?.files || []
        },
        skills: (old.skills || []).map((s: any) => ({
          ...s,
          category: migrate(s.category),
          items: (s.items || []).map((i: any) => migrate(i))
        })),
        socials: old.socials || [],
        projects: (old.projects || []).map((p: any) => ({
          ...p,
          title: migrate(p.title),
          description: migrate(p.description),
          files: p.files || []
        })),
        experiences: old.experiences || [],
        menus: (old.menus || defaultData.menus).map((m: any) => ({
          ...m,
          label: migrate(m.label),
          files: m.files || []
        })),
        enabledLanguages: old.enabledLanguages || defaultData.enabledLanguages
      };
      return migrated;
    }
    
    return defaultData;
  });

  const [language, setLanguage] = useState<Language>(() => {
    return (localStorage.getItem('portfolio_lang') as Language) || 'en';
  });

  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('portfolio_dark') === 'true';
  });

  const [isAdmin, setIsAdmin] = useState(() => {
    return sessionStorage.getItem('portfolio_admin') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('portfolio_lang', language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem('portfolio_dark', isDarkMode.toString());
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const login = (email: string, pass: string) => {
    if (email === 'melismelakie27@gmail.com' && pass === 'mm43456851#') {
      setIsAdmin(true);
      sessionStorage.setItem('portfolio_admin', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdmin(false);
    sessionStorage.removeItem('portfolio_admin');
  };

  const saveData = (newData: PortfolioData) => {
    setData(newData);
    localStorage.setItem('portfolio_data_v3', JSON.stringify(newData));
  };

  const translate = (val: TranslatedString | string | undefined): string => {
    if (!val) return '';
    if (typeof val === 'string') return val;
    return val[language] || val['en'] || Object.values(val)[0] || '';
  };

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  return (
    <PortfolioContext.Provider value={{
      data, setData, saveData,
      language, setLanguage, isDarkMode, toggleDarkMode, isAdmin, login, logout,
      translate
    }}>
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) throw new Error('usePortfolio must be used within a PortfolioProvider');
  return context;
};