import { useState } from 'react'
import { supabase } from '../lib/supabase'
import toast from 'react-hot-toast'

interface CreateCheckoutSessionParams {
  priceId: string
  mode: 'payment' | 'subscription'
  successUrl?: string
  cancelUrl?: string
}

interface SubscriptionData {
  customer_id: string
  subscription_id: string | null
  subscription_status: string
  price_id: string | null
  current_period_start: number | null
  current_period_end: number | null
  cancel_at_period_end: boolean
  payment_method_brand: string | null
  payment_method_last4: string | null
}

interface OrderData {
  customer_id: string
  order_id: number
  checkout_session_id: string
  payment_intent_id: string
  amount_subtotal: number
  amount_total: number
  currency: string
  payment_status: string
  order_status: string
  order_date: string
}

export function useStripe() {
  const [loading, setLoading] = useState(false)

  const createCheckoutSession = async ({
    priceId,
    mode,
    successUrl = `${window.location.origin}/success`,
    cancelUrl = `${window.location.origin}/cancel`
  }: CreateCheckoutSessionParams) => {
    setLoading(true)
    
    try {
      const { data: { session } } = await supabase.auth.getSession()
      
      if (!session?.access_token) {
        throw new Error('No authentication token found')
      }

      const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/stripe-checkout`
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          price_id: priceId,
          mode,
          success_url: successUrl,
          cancel_url: cancelUrl,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to create checkout session')
      }

      const { url } = await response.json()
      
      if (url) {
        window.location.href = url
      } else {
        throw new Error('No checkout URL received')
      }
    } catch (error: any) {
      console.error('Checkout error:', error)
      toast.error(error.message || 'Failed to start checkout process')
    } finally {
      setLoading(false)
    }
  }

  const getSubscription = async (): Promise<SubscriptionData | null> => {
    try {
      const { data, error } = await supabase
        .from('stripe_user_subscriptions')
        .select('*')
        .maybeSingle()

      if (error) {
        console.error('Error fetching subscription:', error)
        return null
      }

      return data
    } catch (error) {
      console.error('Error fetching subscription:', error)
      return null
    }
  }

  const getOrders = async (): Promise<OrderData[]> => {
    try {
      const { data, error } = await supabase
        .from('stripe_user_orders')
        .select('*')
        .order('order_date', { ascending: false })

      if (error) {
        console.error('Error fetching orders:', error)
        return []
      }

      return data || []
    } catch (error) {
      console.error('Error fetching orders:', error)
      return []
    }
  }

  const cancelSubscription = async () => {
    setLoading(true)
    try {
      const { data: { session } } = await supabase.auth.getSession()
      
      if (!session?.access_token) {
        throw new Error('No authentication token found')
      }

      // You would need to create a cancel subscription endpoint
      const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/stripe-cancel-subscription`
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to cancel subscription')
      }

      toast.success('Subscription cancelled successfully')
      return true
    } catch (error: any) {
      console.error('Cancel subscription error:', error)
      toast.error(error.message || 'Failed to cancel subscription')
      return false
    } finally {
      setLoading(false)
    }
  }

  return {
    createCheckoutSession,
    getSubscription,
    getOrders,
    cancelSubscription,
    loading
  }
}