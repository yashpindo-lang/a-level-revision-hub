import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X } from 'lucide-react'
import { SUBJECTS } from '../data/subjects'
import useStore from '../store'

function SearchBar({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState('')
  const { setCurrentSubject, setCurrentView } = useStore()

  const results = SUBJECTS.filter(
    (s) =>
      s.name.toLowerCase().includes(query.toLowerCase()) ||
      s.code.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-start justify-center pt-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="w-full max-w-xl glass-light rounded-lg p-4 shadow-2xl"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 mb-4">
          <Search className="w-5 h-5 text-accent-cyan" />
          <input
            type="text"
            placeholder="Search subjects, topics..."
            className="flex-1 bg-transparent text-white placeholder-gray-400 outline-none"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <AnimatePresence>
          {results.length > 0 && (
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {results.map((subject) => (
                <motion.button
                  key={subject.id}
                  className="w-full text-left p-3 hover:bg-white/10 rounded-lg transition-colors"
                  onClick={() => {
                    setCurrentSubject(subject.id)
                    setCurrentView('subject')
                    onClose()
                  }}
                  whileHover={{ x: 4 }}
                >
                  <p className="text-white font-medium">{subject.name}</p>
                  <p className="text-xs text-accent-cyan">{subject.code}</p>
                </motion.button>
              ))}
            </div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}

export default SearchBar