export interface StripeProduct {
  priceId: string
  name: string
  description: string
  mode: 'payment' | 'subscription'
  price?: number
}

export const stripeProducts: StripeProduct[] = [
  {
    priceId: 'price_1RWahBHSDI56Von2KaKPvCbg',
    name: 'Donations',
    description: 'Donate a fraction of proceeds will go to saving Haiti',
    mode: 'payment',
    price: 3.00
  }
]

export function getProductByPriceId(priceId: string): StripeProduct | undefined {
  return stripeProducts.find(product => product.priceId === priceId)
}