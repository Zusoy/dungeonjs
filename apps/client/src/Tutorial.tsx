import React from 'react'
import { motion } from 'motion/react'

const Tutorial: React.FC = () => {
  const [expandedSection, setExpandedSection] = React.useState<string | null>(null)

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section)
  }

  return (
    <div className="mt-8 w-full max-w-6xl mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <h2 className="text-3xl font-bold mb-4">🎮 How to Play Dungeon JS</h2>
        <p className="text-lg opacity-90">Master the dungeon, defeat the Golem, and claim victory!</p>
      </motion.div>
      <div className="space-y-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="collapse collapse-plus bg-base-300 shadow-lg"
        >
          <input
            type="checkbox"
            checked={expandedSection === 'overview'}
            onChange={() => toggleSection('overview')}
            className="peer"
          />
          <div className="collapse-title text-xl font-bold peer-checked:bg-primary peer-checked:text-primary-content">
            🎯 Game Overview
          </div>
          <div className="collapse-content peer-checked:bg-primary peer-checked:text-primary-content">
            <div className="pt-4">
              <p className="mb-3">
                Dungeon JS is a <strong>turn-based multiplayer dungeon crawler</strong> where strategy meets adventure!
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-base-100/20 p-4 rounded-lg">
                  <h4 className="font-bold mb-2">🏆 Victory Conditions</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Defeat the mighty <strong>Golem boss</strong></li>
                    <li>• Collect the <strong>most treasures</strong> to win</li>
                  </ul>
                </div>
                <div className="bg-base-100/20 p-4 rounded-lg">
                  <h4 className="font-bold mb-2">⚡ Game Features</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Real-time multiplayer action</li>
                    <li>• Procedurally generated rooms</li>
                    <li>• Dice-based combat system</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="collapse collapse-plus bg-base-300 shadow-lg"
        >
          <input
            type="checkbox"
            checked={expandedSection === 'heroes'}
            onChange={() => toggleSection('heroes')}
            className="peer"
          />
          <div className="collapse-title text-xl font-bold peer-checked:bg-secondary peer-checked:text-secondary-content">
            ⚔️ Choose Your Hero
          </div>
          <div className="collapse-content peer-checked:bg-secondary peer-checked:text-secondary-content">
            <div className="pt-4">
              <p className="mb-4">Select from 4 unique hero classes, each with their own strengths:</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-base-100/20 p-4 rounded-lg text-center">
                  <div className="mb-2">🗡️</div>
                  <h4 className="font-bold">Knight</h4>
                  <p className="text-sm">Balanced warrior</p>
                </div>
                <div className="bg-base-100/20 p-4 rounded-lg text-center">
                  <div className="mb-2">🏹</div>
                  <h4 className="font-bold">Rogue</h4>
                  <p className="text-sm">Swift & stealthy</p>
                </div>
                <div className="bg-base-100/20 p-4 rounded-lg text-center">
                  <div className="mb-2">🧙</div>
                  <h4 className="font-bold">Mage</h4>
                  <p className="text-sm">Magical prowess</p>
                </div>
                <div className="bg-base-100/20 p-4 rounded-lg text-center">
                  <div className="mb-2">⚔️</div>
                  <h4 className="font-bold">Barbarian</h4>
                  <p className="text-sm">Raw strength</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="collapse collapse-plus bg-base-300 shadow-lg"
        >
          <input
            type="checkbox"
            checked={expandedSection === 'mechanics'}
            onChange={() => toggleSection('mechanics')}
            className="peer"
          />
          <div className="collapse-title text-xl font-bold peer-checked:bg-accent peer-checked:text-accent-content">
            🎮 Core Mechanics
          </div>
          <div className="collapse-content peer-checked:bg-accent peer-checked:text-accent-content">
            <div className="pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold mb-3 flex items-center gap-2">
                    🚶 Movement System
                  </h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Move in 4 directions (up, down, left, right)</li>
                    <li>• Turn-based gameplay - wait for your turn</li>
                    <li>• Explore to discover new rooms automatically</li>
                    <li>• Each room may contain enemies, treasures, or be empty</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold mb-3 flex items-center gap-2">
                    ❤️ Health & Lives
                  </h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Start with full health points</li>
                    <li>• Lose health when defeated in combat</li>
                    <li>• Retreat to safety when health is low</li>
                    <li>• Manage your health strategically</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold mb-3 flex items-center gap-2">
                    🎲 Combat System
                  </h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Dice-based combat mechanics</li>
                    <li>• Your weapon's attack value matters</li>
                    <li>• Win battles to gain experience and loot</li>
                    <li>• Lose battles and retreat with reduced health</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold mb-3 flex items-center gap-2">
                    🎒 Inventory Management
                  </h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Collect and manage treasures 💎</li>
                    <li>• Find keys 🗝️ to unlock treasure chests</li>
                    <li>• Discover powerful weapons ⚔️</li>
                    <li>• Strategic inventory choices matter</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="collapse collapse-plus bg-base-300 shadow-lg"
        >
          <input
            type="checkbox"
            checked={expandedSection === 'equipment'}
            onChange={() => toggleSection('equipment')}
            className="peer"
          />
          <div className="collapse-title text-xl font-bold peer-checked:bg-warning peer-checked:text-warning-content">
            ⚔️ Equipment & Items
          </div>
          <div className="collapse-content peer-checked:bg-warning peer-checked:text-warning-content">
            <div className="pt-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-base-100/20 p-4 rounded-lg">
                  <h4 className="font-bold mb-3">🗡️ Weapons</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>⚔️ Sword</span>
                      <span className="badge badge-neutral">Balanced</span>
                    </div>
                    <div className="flex justify-between">
                      <span>🪓 Axe</span>
                      <span className="badge badge-neutral">Heavy</span>
                    </div>
                    <div className="flex justify-between">
                      <span>🗡️ Dagger</span>
                      <span className="badge badge-neutral">Fast</span>
                    </div>
                  </div>
                </div>
                <div className="bg-base-100/20 p-4 rounded-lg">
                  <h4 className="font-bold mb-3">🗝️ Keys</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Unlock treasure chests</li>
                    <li>• Essential for collecting treasures</li>
                    <li>• Found throughout the dungeon</li>
                  </ul>
                </div>
                <div className="bg-base-100/20 p-4 rounded-lg">
                  <h4 className="font-bold mb-3">💎 Treasures</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Your path to victory</li>
                    <li>• Hidden in locked chests</li>
                    <li>• Player with most wins!</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="collapse collapse-plus bg-base-300 shadow-lg"
        >
          <input
            type="checkbox"
            checked={expandedSection === 'victory'}
            onChange={() => toggleSection('victory')}
            className="peer"
          />
          <div className="collapse-title text-xl font-bold peer-checked:bg-success peer-checked:text-success-content">
            🏆 Path to Victory
          </div>
          <div className="collapse-content peer-checked:bg-success peer-checked:text-success-content">
            <div className="pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-base-100/20 p-6 rounded-lg text-center">
                  <div className="text-4xl mb-3">🔥</div>
                  <h4 className="font-bold text-lg mb-2">Defeat the Golem</h4>
                  <p className="text-sm">
                    The mighty Golem boss awaits! Work together or compete to take down
                    this formidable final enemy and end the game.
                  </p>
                </div>
                <div className="bg-base-100/20 p-6 rounded-lg text-center">
                  <div className="text-4xl mb-3">💎</div>
                  <h4 className="font-bold text-lg mb-2">Collect Most Treasures</h4>
                  <p className="text-sm">
                    Once the Golem falls, the player who collected the most treasures
                    throughout their dungeon adventure claims ultimate victory!
                  </p>
                </div>
              </div>
              <div className="mt-6 p-4 bg-base-100/30 rounded-lg">
                <h4 className="font-bold mb-2">💡 Pro Tips for Victory:</h4>
                <ul className="text-sm space-y-1">
                  <li>• Balance exploration with treasure hunting</li>
                  <li>• Manage your health carefully for the final boss fight</li>
                  <li>• Collect keys whenever possible - they unlock treasure chests</li>
                  <li>• Choose your battles wisely - not every fight is worth it</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Tutorial
