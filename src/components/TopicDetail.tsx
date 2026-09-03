import { motion } from 'framer-motion'

function TopicDetail() {
  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="glass-light rounded-lg p-8"
        >
          <h1 className="text-4xl font-bold text-white mb-4">Topic Title</h1>
          <p className="text-accent-cyan mb-8">Syllabus 1.1</p>
          
          <div className="space-y-8">
            {/* Core Knowledge */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                📚 Core Knowledge
              </h2>
              <div className="space-y-3">
                {['Concept 1', 'Concept 2', 'Concept 3'].map((item, i) => (
                  <motion.div
                    key={i}
                    className="glass p-4 rounded-lg"
                    whileHover={{ translateX: 4 }}
                  >
                    <p className="text-gray-200">{item}</p>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Key Terms */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                🔑 Key Terms
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {['Term 1', 'Term 2', 'Term 3', 'Term 4'].map((term, i) => (
                  <motion.div
                    key={i}
                    className="glass p-4 rounded-lg"
                    whileHover={{ scale: 1.02 }}
                  >
                    <p className="text-accent-cyan font-bold mb-1">{term}</p>
                    <p className="text-gray-300 text-sm">Definition goes here</p>
                  </motion.div>
                ))}
              </div>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default TopicDetail