import React from 'react';
import { Github, Linkedin, Twitter, Mail, ArrowUp, Facebook, Youtube, Instagram, Send, MessageCircle, MessageSquare } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

const iconMap: Record<string, any> = {
  'GitHub': Github,
  'Linkedin': Linkedin,
  'Twitter': Twitter,
  'Facebook': Facebook,
  'YouTube': Youtube,
  'Instagram': Instagram,
  'Email': Mail,
  'Telegram': Send,
  'WhatsApp': MessageSquare
};

const Footer = () => {
  const { data, translate } = usePortfolio();
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 py-16 border-t border-slate-800 transition-colors duration-300">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div className="mb-8 md:mb-0 text-center md:text-left">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent mb-2">
              {translate(data.hero.name)} Melakie Shiferaw
            </h2>
            <p className="text-slate-500 max-w-sm">
              Empowering decision-making through data science and intelligent analytics.
            </p>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors text-sm font-bold group"
          >
            Back to Top
            <div className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center group-hover:-translate-y-1 transition-transform">
              <ArrowUp size={16} />
            </div>
          </button>
        </div>

        <div className="pt-8 border-t border-slate-900 flex flex-col items-center gap-8">
          {/* Social Icons positioned ONLY above copyright */}
          <div className="flex flex-wrap justify-center gap-4">
            {data.socials.map(social => {
              const Icon = iconMap[social.platform] || Github;
              return (
                <a 
                  key={social.id}
                  href={social.url} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-2xl border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-blue-600 hover:bg-blue-600 transition-all hover:scale-110 active:scale-95 group"
                  style={{ '--hover-color': social.color } as any}
                  title={social.platform}
                >
                  <Icon size={20} className="group-hover:scale-110 transition-transform" />
                </a>
              );
            })}
          </div>

          <p className="text-slate-600 text-sm font-medium tracking-wide text-center">
            \u00a9 {new Date().getFullYear()} {translate(data.hero.name)} Melakie. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;