import { Heart, Users, Briefcase, GraduationCap, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

export function ActionButtons() {
  const actions = [
    { icon: Heart, label: 'Make a Donation', variant: 'primary' },
    { icon: Users, label: 'Become a Mentor', variant: 'secondary' },
    { icon: Briefcase, label: 'Provide Internship', variant: 'secondary' },
    { icon: GraduationCap, label: 'Hire a Graduate', variant: 'secondary' },
  ];

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h3 className="text-2xl text-gray-900 font-semibold tracking-tight">Expand your impact.</h3>
          <p className="text-gray-400 text-sm mt-1">
            Choose a pathway to support our mission and students.
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {actions.map((action) => (
          <motion.button 
            key={action.label}
            whileHover={{ y: -4 }}
            className={`
              flex items-center gap-4 px-6 py-5 rounded-xl transition-all duration-300 group text-left
              ${action.variant === 'primary' 
                ? 'bg-[#0747A1] text-white shadow-xl shadow-blue-900/10 hover:bg-[#063b87]' 
                : 'bg-white text-gray-700 border border-gray-100 hover:border-gray-200'}
            `}
          >
            <div className={`
              p-2.5 rounded-lg transition-colors duration-300 shrink-0
              ${action.variant === 'primary' ? 'bg-white/10' : 'bg-gray-50 text-[#0747A1]'}
            `}>
              <action.icon className="w-5 h-5" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-bold tracking-tight leading-tight">{action.label}</span>
              <div className="flex items-center gap-1 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-[10px] font-bold tracking-[1px] uppercase">Get Started</span>
                <ChevronRight className="w-3 h-3" />
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
