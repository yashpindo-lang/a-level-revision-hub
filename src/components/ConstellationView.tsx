import { Canvas } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import { motion } from 'framer-motion';
import useStore from '../store';
import { SUBJECTS } from '../data/subjects';
import { Star, ArrowRight } from 'lucide-react';

function ConstellationView() {
  const { setCurrentSubject, setCurrentView } = useStore();

  const handleSubjectClick = (subjectId: string) => {
    setCurrentSubject(subjectId);
    setCurrentView('subject');
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Header */}
      <motion.div
        className="absolute top-20 z-20 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-5xl font-bold text-white mb-4">
          A-LEVEL REVISION HUB
        </h1>
        <p className="text-accent-cyan text-lg">
          Turn what you know into a constellation
        </p>
      </motion.div>

      {/* Constellation Grid */}
      <div className="w-full h-full flex items-center justify-center">
        <div className="relative w-full max-w-4xl aspect-square">
          {/* SVG Lines connecting subjects */}
          <svg className="absolute inset-0 w-full h-full">
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(124, 58, 237, 0.3)" />
                <stop offset="100%" stopColor="rgba(6, 182, 212, 0.3)" />
              </linearGradient>
            </defs>
            {/* Connecting lines between subjects */}
            <motion.line
              x1="25%" y1="25%" x2="75%" y2="25%"
              stroke="url(#lineGradient)" strokeWidth="1"
              initial={{ strokeDasharray: 1000 }}
              animate={{ strokeDasharray: 0 }}
              transition={{ duration: 2 }}
            />
            <motion.line
              x1="25%" y1="25%" x2="25%" y2="75%"
              stroke="url(#lineGradient)" strokeWidth="1"
              initial={{ strokeDasharray: 1000 }}
              animate={{ strokeDasharray: 0 }}
              transition={{ duration: 2 }}
            />
            <motion.line
              x1="75%" y1="25%" x2="75%" y2="75%"
              stroke="url(#lineGradient)" strokeWidth="1"
              initial={{ strokeDasharray: 1000 }}
              animate={{ strokeDasharray: 0 }}
              transition={{ duration: 2 }}
            />
            <motion.line
              x1="25%" y1="75%" x2="75%" y2="75%"
              stroke="url(#lineGradient)" strokeWidth="1"
              initial={{ strokeDasharray: 1000 }}
              animate={{ strokeDasharray: 0 }}
              transition={{ duration: 2 }}
            />
          </svg>

          {/* Subject Nodes */}
          <div className="absolute inset-0">
            {SUBJECTS.map((subject, index) => {
              const positions = [
                { top: '10%', left: '25%' },
                { top: '10%', right: '25%' },
                { bottom: '10%', left: '25%' },
                { bottom: '10%', right: '25%' },
              ];
              const pos = positions[index];

              return (
                <motion.div
                  key={subject.id}
                  className="absolute"
                  style={pos}
                  whileHover={{ scale: 1.2 }}
                  onClick={() => handleSubjectClick(subject.id)}
                >
                  <motion.button
                    className="group relative w-32 h-32 flex items-center justify-center cursor-pointer"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    {/* Outer ring */}
                    <motion.div
                      className="absolute inset-0 rounded-full border-2 border-accent-violet"
                      animate={{
                        boxShadow: [
                          '0 0 20px rgba(124, 58, 237, 0.3)',
                          '0 0 40px rgba(124, 58, 237, 0.6)',
                          '0 0 20px rgba(124, 58, 237, 0.3)',
                        ],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />

                    {/* Inner star */}
                    <motion.div
                      className="w-16 h-16 rounded-full bg-gradient-to-br from-accent-violet to-accent-cyan flex items-center justify-center"
                      animate={{
                        scale: [1, 1.1, 1],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Star className="w-8 h-8 text-white" fill="white" />
                    </motion.div>

                    {/* Subject label */}
                    <div className="absolute -bottom-12 text-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <p className="text-white font-bold text-lg">{subject.name}</p>
                      <p className="text-accent-cyan text-sm">{subject.code}</p>
                    </div>
                  </motion.button>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom info */}
      <motion.div
        className="absolute bottom-8 text-center text-gray-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <p className="flex items-center justify-center gap-2">
          Click a star to begin <ArrowRight className="w-4 h-4" />
        </p>
      </motion.div>
    </div>
  );
}

export default ConstellationView;