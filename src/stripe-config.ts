export interface StripeProduct {
  priceId: string
  name: string
  description: string
  mode: 'payment' | 'subscription'
  price: number
  period?: string
  features: string[]
  popular?: boolean
}

export const stripeProducts: StripeProduct[] = [
  {
    priceId: 'price_starter_monthly', // Replace with your actual Stripe price ID
    name: 'Starter',
    description: 'Perfect for getting started with basic financial tracking',
    mode: 'subscription',
    price: 0,
    period: 'Free',
    features: [
      'Connect up to 2 accounts',
      'Basic transaction tracking',
      'Simple budgeting tools',
      'Mobile app access',
      'Email support',
    ],
    popular: false,
  },
  {
    priceId: 'price_pro_monthly', // Replace with your actual Stripe price ID
    name: 'Pro',
    description: 'Advanced features for serious financial management',
    mode: 'subscription',
    price: 9.99,
    period: '/month',
    features: [
      'Unlimited account connections',
      'FINN AI assistant (unlimited)',
      'Advanced analytics & insights',
      'Custom reports & exports',
      'Priority support',
      'Goal tracking & planning',
      'Bill reminders',
    ],
    popular: true,
  },
  {
    priceId: 'price_business_monthly', // Replace with your actual Stripe price ID
    name: 'Business',
    description: 'Comprehensive solution for businesses and teams',
    mode: 'subscription',
    price: 29.99,
    period: '/month',
    features: [
      'Everything in Pro',
      'Multi-user access (up to 10)',
      'Team collaboration tools',
      'Advanced business reporting',
      'API access',
      'Dedicated account manager',
      'Custom integrations',
    ],
    popular: false,
  },
]

export function getProductByPriceId(priceId: string): StripeProduct | undefined {
  return stripeProducts.find(product => product.priceId === priceId)
}