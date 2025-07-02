import React from 'react'
import { CheckCircle, Crown, Loader2 } from 'lucide-react'
import { motion } from 'framer-motion'
import { useStripe } from '../hooks/useStripe'
import { StripeProduct } from '../stripe-config'
import { formatCurrency } from '../lib/utils'

interface PricingCardProps {
  product: StripeProduct
  currentPlan?: string | null
  isSubscribed?: boolean
}

export default function PricingCard({ product, currentPlan, isSubscribed }: PricingCardProps) {
  const { createCheckoutSession, loading } = useStripe()

  const handleSubscribe = () => {
    if (product.price === 0) {
      // Handle free plan - maybe just redirect to dashboard
      window.location.href = '/dashboard'
      return
    }

    createCheckoutSession({
      priceId: product.priceId,
      mode: product.mode,
      successUrl: `${window.location.origin}/success`,
      cancelUrl: `${window.location.origin}/cancel`
    })
  }

  const isCurrentPlan = currentPlan === product.priceId
  const isFree = product.price === 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`card relative hover:border-primary-500/50 transition-all duration-300 ${
        product.popular ? 'border-primary-500 ring-2 ring-primary-500/20 scale-105' : ''
      } ${isCurrentPlan ? 'bg-primary-500/5' : ''}`}
    >
      {product.popular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <span className="bg-primary-500 text-white px-4 py-1 rounded-full text-sm font-medium">
            Most Popular
          </span>
        </div>
      )}

      {isCurrentPlan && (
        <div className="absolute -top-3 right-4">
          <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center">
            <Crown className="h-3 w-3 mr-1" />
            Current Plan
          </span>
        </div>
      )}
      
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-text mb-2 flex items-center justify-center">
          {product.name}
          {product.popular && <Crown className="h-5 w-5 ml-2 text-primary-500" />}
        </h3>
        <div className="mb-2">
          <span className="text-4xl font-bold text-text">
            {isFree ? 'Free' : formatCurrency(product.price)}
          </span>
          {product.period && !isFree && (
            <span className="text-muted">{product.period}</span>
          )}
        </div>
        <p className="text-muted">{product.description}</p>
      </div>
      
      <ul className="space-y-3 mb-8">
        {product.features.map((feature) => (
          <li key={feature} className="flex items-center">
            <CheckCircle className="h-5 w-5 text-primary-500 mr-3 flex-shrink-0" />
            <span className="text-text">{feature}</span>
          </li>
        ))}
      </ul>
      
      <button
        onClick={handleSubscribe}
        disabled={loading || isCurrentPlan}
        className={`w-full text-center py-3 px-4 rounded-lg font-medium transition-colors ${
          isCurrentPlan
            ? 'bg-green-500/10 text-green-500 cursor-not-allowed'
            : product.popular
            ? 'bg-primary-500 hover:bg-primary-600 text-white disabled:opacity-50'
            : 'bg-slate-700 hover:bg-slate-600 text-text disabled:opacity-50'
        }`}
      >
        {loading ? (
          <div className="flex items-center justify-center">
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            Processing...
          </div>
        ) : isCurrentPlan ? (
          'Current Plan'
        ) : isFree ? (
          'Get Started Free'
        ) : (
          `Subscribe to ${product.name}`
        )}
      </button>
    </motion.div>
  )
}