import React from 'react'
import { motion } from 'motion/react'

const Tutorial: React.FC = () => (
  <div className="mt-4 text-white flex flex-col items-center justify-center px-4">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
      <motion.div
        className="card bg-base-300 shadow-md"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="card-body">
          <h2 className="text-2xl font-bold mb-2">Explore</h2>
          <p>
            Move in four directions to uncover new dungeon rooms. Each room may
            contain empty hallways, treasures, or dangerous enemies.
          </p>
        </div>
      </motion.div>
      <motion.div
        className="card bg-base-300 shadow-md"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="card-body">
          <h2 className="text-2xl font-bold mb-2">Fight</h2>
          <p>
            Engage in battles using dice rolls. Win to gain loot or lose a life
            and retreat.
          </p>
        </div>
      </motion.div>
      <motion.div
        className="card bg-base-300 shadow-md"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="card-body">
          <h2 className="text-2xl font-bold mb-2">Collect</h2>
          <p>
            Find keys to unlock chests and gather treasures. The player with
            the most treasures wins!
          </p>
        </div>
      </motion.div>
    </div>
  </div>
)

export default Tutorial
