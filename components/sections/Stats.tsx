import React from 'react';
import { motion } from 'framer-motion';
import { Users, Calendar, Award, Briefcase } from 'lucide-react';

interface StatItemProps {
  icon: React.ReactNode;
  value: string;
  label: string;
}

const StatItem: React.FC<StatItemProps> = ({ icon, value, label }) => {
  return (
    <div className="flex flex-col items-center">
      <motion.div 
        className="bg-purple-500/10 p-3 rounded-full mb-4"
        initial={{ scale: 0, rotate: -180 }}
        whileInView={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        whileHover={{ 
          scale: 1.2, 
          boxShadow: "0 0 15px rgba(167, 139, 250, 0.5)",
          backgroundColor: "rgba(167, 139, 250, 0.3)"
        }}
      >
        {icon}
      </motion.div>
      <motion.span 
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ 
          duration: 0.5,
          type: "spring",
          stiffness: 100
        }}
        viewport={{ once: true }}
        className="text-4xl font-bold text-white mb-2"
        whileHover={{ 
          scale: 1.1, 
          color: "#A78BFA",
          textShadow: "0 0 8px rgba(167, 139, 250, 0.5)" 
        }}
      >
        {value}
      </motion.span>
      <motion.span 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        viewport={{ once: true }}
        className="text-gray-400"
        whileHover={{ color: "#E9D5FF" }}
      >
        {label}
      </motion.span>
    </div>
  );
};

const Stats: React.FC = () => {
  const stats = [
    {
      icon: <Calendar className="h-6 w-6 text-purple-400" />,
      value: "5+",
      label: "Years Experience"
    },
    {
      icon: <Briefcase className="h-6 w-6 text-purple-400" />,
      value: "100+",
      label: "Projects Completed"
    },
    {
      icon: <Users className="h-6 w-6 text-purple-400" />,
      value: "50+",
      label: "Happy Clients"
    },
    {
      icon: <Award className="h-6 w-6 text-purple-400" />,
      value: "99%",
      label: "Client Satisfaction"
    }
  ];

  return (
    <section className="py-16 px-4 bg-gray-900/50 relative overflow-hidden">
      <motion.div 
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        style={{
          background: "radial-gradient(circle at center, rgba(139, 92, 246, 0.15), transparent 70%)"
        }}
      />
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2
              }
            }
          }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ 
                y: -10, 
                filter: "drop-shadow(0 10px 15px rgba(167, 139, 250, 0.3))"
              }}
            >
              <StatItem
                icon={stat.icon}
                value={stat.value}
                label={stat.label}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Stats;