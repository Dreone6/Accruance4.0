import React, { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { CheckCircle, ArrowRight, Download, Home, Crown } from 'lucide-react'
import { motion } from 'framer-motion'
import { useStripe } from '../hooks/useStripe'
import { formatCurrency } from '../lib/utils'
import { getProductByPriceId } from '../stripe-config'

export default function SuccessPage() {
  const [searchParams] = useSearchParams()
  const { getSubscription, getOrders } = useStripe()
  const [subscriptionDetails, setSubscriptionDetails] = useState<any>(null)
  const [orderDetails, setOrderDetails] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  const sessionId = searchParams.get('session_id')

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        // Try to get subscription first
        const subscription = await getSubscription()
        if (subscription) {
          setSubscriptionDetails(subscription)
        } else {
          // If no subscription, check for one-time orders
          const orders = await getOrders()
          const order = orders.find(o => o.checkout_session_id === sessionId)
          setOrderDetails(order)
        }
      } catch (error) {
        console.error('Error fetching payment details:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchDetails()
  }, [sessionId, getSubscription, getOrders])

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    )
  }

  const product = subscriptionDetails?.price_id ? getProductByPriceId(subscriptionDetails.price_id) : null

  return (
    <div className="min-h-screen bg-background flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-green-500/10 mb-6">
            <CheckCircle className="h-12 w-12 text-green-500" />
          </div>
          
          <h1 className="text-3xl font-bold text-text mb-2">
            {subscriptionDetails ? 'Welcome to Accruance!' : 'Payment Successful!'}
          </h1>
          <p className="text-muted mb-8">
            {subscriptionDetails 
              ? 'Your subscription is now active and ready to use.'
              : 'Thank you for your payment. Your transaction has been completed.'
            }
          </p>
        </motion.div>

        {subscriptionDetails && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="card text-left"
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="h-10 w-10 bg-primary-500/10 rounded-lg flex items-center justify-center">
                <Crown className="h-6 w-6 text-primary-500" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-text">
                  {product?.name || 'Pro'} Plan
                </h3>
                <p className="text-sm text-muted">Active Subscription</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted">Status:</span>
                <span className="px-2 py-1 bg-green-500/10 text-green-500 text-xs rounded-full">
                  {subscriptionDetails.subscription_status}
                </span>
              </div>
              {subscriptionDetails.current_period_end && (
                <div className="flex justify-between">
                  <span className="text-muted">Next billing:</span>
                  <span className="text-text">
                    {new Date(subscriptionDetails.current_period_end * 1000).toLocaleDateString()}
                  </span>
                </div>
              )}
              {subscriptionDetails.payment_method_last4 && (
                <div className="flex justify-between">
                  <span className="text-muted">Payment method:</span>
                  <span className="text-text">
                    {subscriptionDetails.payment_method_brand} ****{subscriptionDetails.payment_method_last4}
                  </span>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {orderDetails && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="card text-left"
          >
            <h3 className="text-lg font-semibold text-text mb-4">Order Details</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted">Order ID:</span>
                <span className="text-text font-mono text-sm">#{orderDetails.order_id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Amount:</span>
                <span className="text-text font-semibold">
                  {formatCurrency(orderDetails.amount_total / 100)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Status:</span>
                <span className="px-2 py-1 bg-green-500/10 text-green-500 text-xs rounded-full">
                  {orderDetails.payment_status}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Date:</span>
                <span className="text-text">
                  {new Date(orderDetails.order_date).toLocaleDateString()}
                </span>
              </div>
            </div>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="space-y-4"
        >
          {subscriptionDetails && (
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
              <h4 className="font-medium text-blue-400 mb-2">What's Next?</h4>
              <p className="text-sm text-muted">
                Your {product?.name || 'Pro'} subscription is now active! You have access to all premium features 
                including FINN AI assistant, unlimited account connections, and advanced analytics.
              </p>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              to="/dashboard"
              className="btn-primary inline-flex items-center justify-center"
            >
              <Home className="h-4 w-4 mr-2" />
              Go to Dashboard
            </Link>
            
            {subscriptionDetails && (
              <Link
                to="/settings"
                className="btn-secondary inline-flex items-center justify-center"
              >
                Manage Subscription
              </Link>
            )}
          </div>

          <div className="pt-4">
            <p className="text-xs text-muted">
              Need help? Contact our support team at{' '}
              <a href="mailto:support@accruance.com" className="text-primary-500 hover:text-primary-400">
                support@accruance.com
              </a>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}