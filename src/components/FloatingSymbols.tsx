import React from 'react'
import { motion } from 'framer-motion'
import { 
  DollarSign, 
  TrendingUp, 
  PieChart, 
  CreditCard, 
  Coins, 
  Calculator,
  BarChart3,
  Target,
  Wallet,
  Receipt,
  Banknote,
  LineChart,
  CircleDollarSign,
  TrendingDown,
  Percent
} from 'lucide-react'

const financialIcons = [
  DollarSign,
  TrendingUp,
  PieChart,
  CreditCard,
  Coins,
  Calculator,
  BarChart3,
  Target,
  Wallet,
  Receipt,
  Banknote,
  LineChart,
  CircleDollarSign,
  TrendingDown,
  Percent
]

// Generate random positions and animation properties
const generateSymbols = (count: number) => {
  return Array.from({ length: count }, (_, i) => {
    const IconComponent = financialIcons[i % financialIcons.length]
    return {
      id: i,
      Icon: IconComponent,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 16 + 16, // 16-32px
      duration: Math.random() * 20 + 20, // 20-40s
      delay: Math.random() * 10,
      rotationDuration: Math.random() * 15 + 10, // 10-25s
      opacity: Math.random() * 0.03 + 0.01, // 0.01-0.04
    }
  })
}

const symbols = generateSymbols(35)

export default function FloatingSymbols() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {symbols.map((symbol) => (
        <motion.div
          key={symbol.id}
          className="absolute text-primary-500"
          style={{
            left: `${symbol.x}%`,
            top: `${symbol.y}%`,
            opacity: symbol.opacity,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.sin(symbol.id) * 20, 0],
            rotate: [0, 360],
          }}
          transition={{
            y: {
              duration: symbol.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: symbol.delay,
            },
            x: {
              duration: symbol.duration * 0.8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: symbol.delay * 0.5,
            },
            rotate: {
              duration: symbol.rotationDuration,
              repeat: Infinity,
              ease: "linear",
              delay: symbol.delay,
            },
          }}
        >
          <symbol.Icon size={symbol.size} />
        </motion.div>
      ))}
    </div>
  )
}