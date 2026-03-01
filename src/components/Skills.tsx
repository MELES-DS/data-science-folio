import React from 'react';
import { motion } from 'framer-motion';
import { 
  MessageSquare, 
  TrendingUp, 
  Cpu, 
  PieChart,
  Code2,
  Terminal
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { translations } from '../lib/translations';

const iconMap: Record<string, any> = {
  'Machine Learning': Cpu,
  'Data Analysis': PieChart,
  'Data Viz & Tools': TrendingUp,
  'Programming': Terminal,
  'Communication': MessageSquare,
  'Default': Code2
};

const colorMap: Record<string, string> = {
  'Machine Learning': 'bg-blue-500',
  'Data Analysis': 'bg-indigo-500',
  'Data Viz & Tools': 'bg-cyan-500',
  'Programming': 'bg-emerald-500',
  'Communication': 'bg-violet-500',
  'Default': 'bg-slate-500'
};

const Skills = () => {
  const { data, language, translate } = usePortfolio();
  const t = translations[language] || translations['en'];

  return (
    <section id="skills" className="py-24 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-sm font-bold text-blue-600 uppercase tracking-[0.2em] mb-4">{t.skills}</h2>
          <h3 className="text-4xl font-bold text-slate-900 dark:text-white mb-6">Technical & Analytical Skills</h3>
          <p className="text-slate-600 dark:text-slate-400">
            I blend technical proficiency with strategic thinking to deliver data-driven solutions.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
          {data.skills.map((category, index) => {
            const catLabel = translate(category.category);
            const Icon = iconMap[catLabel] || iconMap.Default;
            const color = colorMap[catLabel] || colorMap.Default;
            
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-xl transition-shadow group"
              >
                <div className={`${color} w-14 h-14 rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform`}>
                  <Icon size={28} />
                </div>
                <h4 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-6">{catLabel}</h4>
                <ul className="space-y-3">
                  {category.items.map((skill, sIdx) => (
                    <li key={sIdx} className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700"></div>
                      {translate(skill)}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>

        {/* Floating Skill Badges */}
        <div className="mt-20 flex flex-wrap justify-center gap-4">
          {['Python', 'R', 'SQL', 'Pandas', 'NumPy', 'Scikit-Learn', 'TensorFlow', 'NLP', 'Big Data'].map((tech) => (
            <span key={tech} className="px-6 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full text-sm font-semibold text-slate-700 dark:text-slate-300 shadow-sm">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;