import React, { useEffect, useState } from 'react'
import { Crown, Check, X } from 'lucide-react'
import { motion } from 'framer-motion'
import PricingCard from '../components/PricingCard'
import { stripeProducts } from '../stripe-config'
import { useStripe } from '../hooks/useStripe'

export default function PricingPage() {
  const { getSubscription } = useStripe()
  const [currentSubscription, setCurrentSubscription] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSubscription = async () => {
      try {
        const subscription = await getSubscription()
        setCurrentSubscription(subscription)
      } catch (error) {
        console.error('Error fetching subscription:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchSubscription()
  }, [getSubscription])

  const features = [
    {
      name: 'Account Connections',
      starter: '2 accounts',
      pro: 'Unlimited',
      business: 'Unlimited',
    },
    {
      name: 'FINN AI Assistant',
      starter: false,
      pro: 'Unlimited',
      business: 'Unlimited + Priority',
    },
    {
      name: 'Transaction Tracking',
      starter: 'Basic',
      pro: 'Advanced',
      business: 'Advanced + Bulk Import',
    },
    {
      name: 'Budgeting Tools',
      starter: 'Simple',
      pro: 'Advanced',
      business: 'Advanced + Team Budgets',
    },
    {
      name: 'Reports & Analytics',
      starter: false,
      pro: 'Custom Reports',
      business: 'Advanced Business Reports',
    },
    {
      name: 'Goal Tracking',
      starter: false,
      pro: 'Personal Goals',
      business: 'Team & Business Goals',
    },
    {
      name: 'Support',
      starter: 'Email',
      pro: 'Priority Email',
      business: 'Dedicated Account Manager',
    },
    {
      name: 'Team Members',
      starter: '1 user',
      pro: '1 user',
      business: 'Up to 10 users',
    },
    {
      name: 'API Access',
      starter: false,
      pro: false,
      business: 'Full API Access',
    },
    {
      name: 'Custom Integrations',
      starter: false,
      pro: false,
      business: 'Available',
    },
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl lg:text-5xl font-bold text-text mb-4"
          >
            Choose Your Plan
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl text-muted max-w-2xl mx-auto"
          >
            Start free and upgrade as you grow. All plans include our core financial tracking features.
          </motion.p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {stripeProducts.map((product, index) => (
            <motion.div
              key={product.priceId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <PricingCard
                product={product}
                currentPlan={currentSubscription?.price_id}
                isSubscribed={!!currentSubscription}
              />
            </motion.div>
          ))}
        </div>

        {/* Feature Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="card"
        >
          <h2 className="text-2xl font-bold text-text mb-8 text-center">Feature Comparison</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left py-4 px-4 text-text font-semibold">Features</th>
                  <th className="text-center py-4 px-4 text-text font-semibold">Starter</th>
                  <th className="text-center py-4 px-4 text-text font-semibold">
                    <div className="flex items-center justify-center">
                      Pro
                      <Crown className="h-4 w-4 ml-1 text-primary-500" />
                    </div>
                  </th>
                  <th className="text-center py-4 px-4 text-text font-semibold">Business</th>
                </tr>
              </thead>
              <tbody>
                {features.map((feature, index) => (
                  <tr key={feature.name} className="border-b border-slate-700/50">
                    <td className="py-4 px-4 text-text font-medium">{feature.name}</td>
                    <td className="py-4 px-4 text-center">
                      {feature.starter === false ? (
                        <X className="h-5 w-5 text-red-500 mx-auto" />
                      ) : feature.starter === true ? (
                        <Check className="h-5 w-5 text-green-500 mx-auto" />
                      ) : (
                        <span className="text-muted">{feature.starter}</span>
                      )}
                    </td>
                    <td className="py-4 px-4 text-center">
                      {feature.pro === false ? (
                        <X className="h-5 w-5 text-red-500 mx-auto" />
                      ) : feature.pro === true ? (
                        <Check className="h-5 w-5 text-green-500 mx-auto" />
                      ) : (
                        <span className="text-muted">{feature.pro}</span>
                      )}
                    </td>
                    <td className="py-4 px-4 text-center">
                      {feature.business === false ? (
                        <X className="h-5 w-5 text-red-500 mx-auto" />
                      ) : feature.business === true ? (
                        <Check className="h-5 w-5 text-green-500 mx-auto" />
                      ) : (
                        <span className="text-muted">{feature.business}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* FAQ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16"
        >
          <h2 className="text-2xl font-bold text-text mb-8 text-center">Frequently Asked Questions</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="card">
              <h3 className="font-semibold text-text mb-2">Can I change plans anytime?</h3>
              <p className="text-muted text-sm">
                Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately, 
                and we'll prorate any billing differences.
              </p>
            </div>
            
            <div className="card">
              <h3 className="font-semibold text-text mb-2">Is there a free trial?</h3>
              <p className="text-muted text-sm">
                Our Starter plan is completely free forever. For Pro and Business plans, 
                you can try them risk-free with our 14-day money-back guarantee.
              </p>
            </div>
            
            <div className="card">
              <h3 className="font-semibold text-text mb-2">How secure is my financial data?</h3>
              <p className="text-muted text-sm">
                We use bank-level 256-bit encryption and are SOC 2 compliant. Your data is never shared 
                with third parties and is stored securely in encrypted databases.
              </p>
            </div>
            
            <div className="card">
              <h3 className="font-semibold text-text mb-2">Can I cancel anytime?</h3>
              <p className="text-muted text-sm">
                Absolutely! You can cancel your subscription at any time from your account settings. 
                You'll continue to have access until the end of your billing period.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}