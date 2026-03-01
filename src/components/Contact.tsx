import React from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  MessageCircle, 
  Github, 
  Linkedin, 
  Twitter, 
  Facebook, 
  Youtube, 
  MessageSquare, 
  Instagram 
} from 'lucide-react';
import { toast, Toaster } from 'sonner';
import { usePortfolio } from '../context/PortfolioContext';
import { translations } from '../lib/translations';

const Contact = () => {
  const { data, language, translate } = usePortfolio();
  const t = translations[language] || translations['en'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(t.messageSent);
  };

  const emailSocial = data.socials.find(s => s.platform === 'Email');
  const whatsappSocial = data.socials.find(s => s.platform === 'WhatsApp');
  const locationItem = data.hero.homeItems.find(item => translate(item.label).toLowerCase().includes('location'));

  return (
    <section id="contact" className="py-24 bg-slate-900 text-white relative overflow-hidden">
      {/* Decorative Orbs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] -mr-48 -mt-48 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-600/5 rounded-full blur-[120px] -ml-48 -mb-48 pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-sm font-bold text-blue-400 uppercase tracking-[0.2em] mb-4">{t.contact}</h2>
              <h3 className="text-5xl font-extrabold mb-8 leading-tight">
                Let's turn your <span className="text-blue-400">data</span> into stories.
              </h3>
              <p className="text-slate-400 text-lg mb-12 max-w-md">
                I'm currently looking for internships and entry-level data science roles. 
                Whether you have a question or just want to connect, my inbox is always open.
              </p>

              <div className="space-y-8">
                {emailSocial && (
                  <a href={emailSocial.url} className="flex items-center gap-6 group max-w-fit">
                    <div className="bg-slate-800 p-4 rounded-2xl group-hover:bg-blue-600 transition-all duration-300">
                      <Mail className="text-blue-400 group-hover:text-white" size={24} />
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em]">{t.yourEmail}</p>
                      <p className="text-xl font-semibold group-hover:text-blue-400 transition-colors">{emailSocial.username}</p>
                    </div>
                  </a>
                )}
                
                {whatsappSocial && (
                  <a href={whatsappSocial.url} className="flex items-center gap-6 group max-w-fit">
                    <div className="bg-slate-800 p-4 rounded-2xl group-hover:bg-indigo-600 transition-all duration-300">
                      <Phone className="text-indigo-400 group-hover:text-white" size={24} />
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em]">WhatsApp</p>
                      <p className="text-xl font-semibold group-hover:text-indigo-400 transition-colors">{whatsappSocial.username}</p>
                    </div>
                  </a>
                )}

                {locationItem && (
                  <div className="flex items-center gap-6 group">
                    <div className="bg-slate-800 p-4 rounded-2xl">
                      <MapPin className="text-cyan-400" size={24} />
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em]">{t.location}</p>
                      <p className="text-xl font-semibold">{translate(locationItem.value)}</p>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Follow Me section REMOVED from here as per user request to have it only above footer copyright */}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-slate-800/40 backdrop-blur-md p-10 rounded-3xl border border-slate-700/50 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
              <MessageCircle size={120} />
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 ml-1">{t.yourName}</label>
                  <input
                    type="text"
                    required
                    className="w-full bg-slate-900/50 border border-slate-700 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Enter your name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 ml-1">{t.yourEmail}</label>
                  <input
                    type="email"
                    required
                    className="w-full bg-slate-900/50 border border-slate-700 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Email address"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 ml-1">{t.message}</label>
                <textarea
                  required
                  rows={5}
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                  placeholder="How can I help you today?"
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="w-full bg-blue-600 text-white font-bold py-5 rounded-2xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20 active:scale-[0.98] flex items-center justify-center gap-3 group"
              >
                {t.sendMessage} 
                <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
      <Toaster position="bottom-right" richColors />
    </section>
  );
};

export default Contact;