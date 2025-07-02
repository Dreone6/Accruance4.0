import React from 'react'
import { Heart, Loader2 } from 'lucide-react'
import { motion } from 'framer-motion'
import { useStripe } from '../hooks/useStripe'
import { stripeProducts } from '../stripe-config'
import { formatCurrency } from '../lib/utils'

export default function DonationCard() {
  const { createCheckoutSession, loading } = useStripe()
  
  const donationProduct = stripeProducts.find(product => product.name === 'Donations')

  if (!donationProduct) {
    return null
  }

  const handleDonate = () => {
    createCheckoutSession({
      priceId: donationProduct.priceId,
      mode: donationProduct.mode,
      successUrl: `${window.location.origin}/success`,
      cancelUrl: `${window.location.origin}/cancel`
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="card hover:border-primary-500/50 transition-all duration-300"
    >
      <div className="flex items-center space-x-3 mb-4">
        <div className="h-12 w-12 bg-red-500/10 rounded-lg flex items-center justify-center">
          <Heart className="h-6 w-6 text-red-500" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-text">{donationProduct.name}</h3>
          <p className="text-sm text-muted">Make a difference today</p>
        </div>
      </div>

      <p className="text-muted mb-6 leading-relaxed">
        {donationProduct.description}
      </p>

      <div className="flex items-center justify-between mb-6">
        <div>
          <span className="text-2xl font-bold text-text">
            {donationProduct.price ? formatCurrency(donationProduct.price) : 'Custom Amount'}
          </span>
          <p className="text-sm text-muted">One-time donation</p>
        </div>
        <div className="text-right">
          <div className="bg-green-500/10 text-green-400 px-3 py-1 rounded-full text-xs font-medium">
            Tax Deductible
          </div>
        </div>
      </div>

      <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 mb-6">
        <h4 className="font-medium text-blue-400 mb-2">Your Impact</h4>
        <ul className="text-sm text-muted space-y-1">
          <li>• Provides emergency relief supplies</li>
          <li>• Supports local community programs</li>
          <li>• Helps rebuild infrastructure</li>
          <li>• Funds educational initiatives</li>
        </ul>
      </div>

      <button
        onClick={handleDonate}
        disabled={loading}
        className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (
          <div className="flex items-center justify-center">
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            Processing...
          </div>
        ) : (
          <div className="flex items-center justify-center">
            <Heart className="h-4 w-4 mr-2" />
            Donate Now
          </div>
        )}
      </button>

      <p className="text-xs text-muted text-center mt-4">
        Secure payment powered by Stripe. Your donation is processed safely and securely.
      </p>
    </motion.div>
  )
}