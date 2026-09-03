import { motion } from 'framer-motion'
import useStore from '../store'
import { SUBJECTS } from '../data/subjects'
import { BarChart3, Zap, Target } from 'lucide-react'

function SubjectDashboard() {
  const { currentSubject } = useStore()
  const subject = SUBJECTS.find((s) => s.id === currentSubject)

  if (!subject) return null

  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="text-4xl">{subject.icon}</div>
            <div>
              <h1 className="text-4xl font-bold text-white">{subject.name}</h1>
              <p className="text-accent-cyan text-lg">{subject.code}</p>
            </div>
          </div>
          <p className="text-gray-400 text-lg">{subject.description}</p>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1 }}
        >
          {[
            { icon: BarChart3, label: 'Progress', value: '72%' },
            { icon: Zap, label: 'Study Streak', value: '7 days' },
            { icon: Target, label: 'Topics Mastered', value: '8/24' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              className="glass-light rounded-lg p-6"
              whileHover={{ translateY: -4 }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                </div>
                <stat.icon className="w-8 h-8 text-accent-violet opacity-50" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Level Selector */}
        <motion.div className="mb-12" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="flex gap-4 mb-6">
            {(['AS', 'A'] as const).map((level) => (
              <motion.button
                key={level}
                className="px-6 py-3 bg-accent-violet text-white font-bold rounded-lg hover:bg-accent-violet/90 transition-colors"
                whileHover={{ scale: 1.05 }}
              >
                {level} Level
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Topics Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.05 }}
        >
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="glass-light rounded-lg p-6 hover:bg-white/10 transition-colors cursor-pointer"
              whileHover={{ scale: 1.02, translateY: -4 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-accent-cyan font-bold text-sm">Topic {i + 1}</p>
                  <h3 className="text-white font-bold text-lg">Topic Title</h3>
                </div>
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold ${
                  i % 3 === 0 ? 'bg-accent-violet/20 text-accent-violet' :
                  i % 3 === 1 ? 'bg-accent-cyan/20 text-accent-cyan' :
                  'bg-accent-pink/20 text-accent-pink'
                }`}>
                  {i * 8}%
                </div>
              </div>
              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className={`h-full rounded-full ${
                    i % 3 === 0 ? 'bg-accent-violet' :
                    i % 3 === 1 ? 'bg-accent-cyan' :
                    'bg-accent-pink'
                  }`}
                  initial={{ width: 0 }}
                  animate={{ width: `${i * 8}%` }}
                  transition={{ duration: 1, delay: i * 0.05 }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

export default SubjectDashboard