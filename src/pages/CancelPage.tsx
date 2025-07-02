import React from 'react'
import { Link } from 'react-router-dom'
import { XCircle, ArrowLeft, RefreshCw } from 'lucide-react'
import { motion } from 'framer-motion'

export default function CancelPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-red-500/10 mb-6">
            <XCircle className="h-12 w-12 text-red-500" />
          </div>
          
          <h1 className="text-3xl font-bold text-text mb-2">Subscription Cancelled</h1>
          <p className="text-muted mb-8">
            Your subscription setup was cancelled. No charges have been made to your account.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="card"
        >
          <h3 className="text-lg font-semibold text-text mb-4">What happened?</h3>
          <p className="text-muted text-sm mb-4">
            You cancelled the subscription process before it was completed. This could happen if:
          </p>
          <ul className="text-left text-sm text-muted space-y-2">
            <li>• You clicked the back button or closed the payment window</li>
            <li>• You decided not to complete the subscription</li>
            <li>• There was a technical issue with the payment process</li>
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="space-y-4"
        >
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
            <h4 className="font-medium text-blue-400 mb-2">Still interested?</h4>
            <p className="text-sm text-muted">
              You can still access all the powerful features of Accruance. Choose a plan that works for you 
              and start managing your finances smarter.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              to="/#pricing"
              className="btn-primary inline-flex items-center justify-center"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              View Plans
            </Link>
            
            <Link
              to="/dashboard"
              className="btn-secondary inline-flex items-center justify-center"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Link>
          </div>

          <div className="pt-4">
            <p className="text-xs text-muted">
              Questions about our plans? Contact us at{' '}
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