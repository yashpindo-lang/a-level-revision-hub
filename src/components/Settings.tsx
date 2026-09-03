import { motion } from 'framer-motion'
import { Moon, Sun, Zap } from 'lucide-react'
import useStore from '../store'

function Settings({ onClose }: { onClose: () => void }) {
  const { animationsEnabled, setAnimationsEnabled } = useStore()
  const [theme, setTheme] = motion.useState<'dark' | 'light' | 'auto'>('dark')

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="glass-light rounded-lg p-8 max-w-md w-full mx-4"
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.95 }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold text-white mb-6">Settings</h2>

        {/* Theme */}
        <div className="mb-8">
          <h3 className="text-accent-cyan font-semibold mb-4">Theme</h3>
          <div className="flex gap-3">
            {(['dark', 'light', 'auto'] as const).map((t) => (
              <motion.button
                key={t}
                className={`flex-1 py-2 px-3 rounded-lg font-medium capitalize transition-all ${
                  theme === t
                    ? 'bg-accent-violet text-white'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
                whileHover={{ scale: 1.05 }}
                onClick={() => setTheme(t)}
              >
                {t === 'dark' && <Moon className="w-4 h-4 inline mr-2" />}
                {t === 'light' && <Sun className="w-4 h-4 inline mr-2" />}
                {t}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Animations */}
        <div className="mb-8">
          <h3 className="text-accent-cyan font-semibold mb-4">Animations</h3>
          <motion.button
            className={`w-full py-3 px-4 rounded-lg font-medium transition-all ${
              animationsEnabled
                ? 'bg-accent-violet text-white'
                : 'bg-white/10 text-gray-300'
            }`}
            whileHover={{ scale: 1.05 }}
            onClick={() => setAnimationsEnabled(!animationsEnabled)}
          >
            <Zap className="w-4 h-4 inline mr-2" />
            {animationsEnabled ? 'Enabled' : 'Disabled'}
          </motion.button>
        </div>

        <motion.button
          className="w-full py-3 px-4 bg-accent-cyan text-space-black font-bold rounded-lg hover:bg-accent-cyan/90 transition-colors"
          whileHover={{ scale: 1.02 }}
          onClick={onClose}
        >
          Close
        </motion.button>
      </motion.div>
    </motion.div>
  )
}

export default Settings