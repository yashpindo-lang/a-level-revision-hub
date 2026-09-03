import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import useStore from './store'
import ConstellationView from './components/ConstellationView'
import SubjectDashboard from './components/SubjectDashboard'
import TopicDetail from './components/TopicDetail'
import Navigation from './components/Navigation'
import SearchBar from './components/SearchBar'
import Settings from './components/Settings'

function App() {
  const { currentView, initializeFromStorage, animationsEnabled } = useStore()
  const [showSettings, setShowSettings] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  useEffect(() => {
    initializeFromStorage()
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'k') {
        e.preventDefault()
        setSearchOpen(!searchOpen)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [searchOpen])

  return (
    <div className="min-h-screen bg-gradient-to-br from-space-black via-space-dark to-space-black overflow-hidden">
      {/* Animated background stars */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full star"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={animationsEnabled ? { opacity: [0.3, 1, 0.3] } : {}}
            transition={{ duration: 3 + Math.random() * 2, repeat: Infinity }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10">
        <Navigation onSettingsClick={() => setShowSettings(!showSettings)} />
        {searchOpen && <SearchBar onClose={() => setSearchOpen(false)} />}
        
        {currentView === 'constellation' && <ConstellationView />}
        {currentView === 'subject' && <SubjectDashboard />}
        {currentView === 'topic' && <TopicDetail />}
        
        {showSettings && <Settings onClose={() => setShowSettings(false)} />}
      </div>
    </div>
  )
}

export default App