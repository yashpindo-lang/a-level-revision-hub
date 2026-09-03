import { motion } from 'framer-motion'
import { ChevronLeft, Settings } from 'lucide-react'
import useStore from '../store'

function Navigation({ onSettingsClick }: { onSettingsClick: () => void }) {
  const { currentView, setCurrentView, currentSubject } = useStore()

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 glass-light backdrop-blur-md border-b border-accent-violet/20"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo and title */}
        <div className="flex items-center gap-3">
          {currentView !== 'constellation' && (
            <motion.button
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              whileHover={{ scale: 1.1 }}
              onClick={() => setCurrentView('constellation')}
            >
              <ChevronLeft className="w-5 h-5 text-accent-cyan" />
            </motion.button>
          )}
          <div>
            <h1 className="text-white font-bold text-lg">Revision Hub</h1>
            {currentSubject && (
              <p className="text-xs text-accent-cyan">Cambridge A-Level</p>
            )}
          </div>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-4">
          <motion.button
            className="px-4 py-2 text-sm text-gray-300 hover:text-white transition-colors"
            whileHover={{ scale: 1.05 }}
          >
            Ctrl + K
          </motion.button>
          <motion.button
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            whileHover={{ scale: 1.1 }}
            onClick={onSettingsClick}
          >
            <Settings className="w-5 h-5 text-accent-cyan" />
          </motion.button>
        </div>
      </div>
    </motion.nav>
  )
}

export default Navigation