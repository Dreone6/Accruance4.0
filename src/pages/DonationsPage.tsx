import React, { useEffect, useState } from 'react'
import { Heart, Download, Calendar, DollarSign } from 'lucide-react'
import { motion } from 'framer-motion'
import DonationCard from '../components/DonationCard'
import { useStripe } from '../hooks/useStripe'
import { formatCurrency, formatDate } from '../lib/utils'

export default function DonationsPage() {
  const { getOrders } = useStripe()
  const [donations, setDonations] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const orders = await getOrders()
        // Filter for donation orders (you might want to add a product identifier)
        setDonations(orders)
      } catch (error) {
        console.error('Error fetching donations:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchDonations()
  }, [getOrders])

  const totalDonated = donations.reduce((sum, donation) => sum + (donation.amount_total / 100), 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text">Donations</h1>
          <p className="text-muted">Support Haiti relief efforts through your contributions</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="btn-secondary inline-flex items-center">
            <Download className="h-4 w-4 mr-2" />
            Tax Receipt
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted text-sm">Total Donated</p>
              <p className="text-2xl font-bold text-text">{formatCurrency(totalDonated)}</p>
            </div>
            <div className="h-12 w-12 bg-red-500/10 rounded-lg flex items-center justify-center">
              <Heart className="h-6 w-6 text-red-500" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted text-sm">Donations Made</p>
              <p className="text-2xl font-bold text-text">{donations.length}</p>
            </div>
            <div className="h-12 w-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
              <DollarSign className="h-6 w-6 text-blue-500" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted text-sm">Last Donation</p>
              <p className="text-2xl font-bold text-text">
                {donations.length > 0 ? formatDate(donations[0].order_date) : 'None'}
              </p>
            </div>
            <div className="h-12 w-12 bg-green-500/10 rounded-lg flex items-center justify-center">
              <Calendar className="h-6 w-6 text-green-500" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Donation Form */}
        <div>
          <h2 className="text-xl font-semibold text-text mb-4">Make a Donation</h2>
          <DonationCard />
        </div>

        {/* Impact Information */}
        <div className="space-y-6">
          <div className="card">
            <h3 className="text-lg font-semibold text-text mb-4">Our Impact in Haiti</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-muted">Families Helped</span>
                <span className="text-text font-semibold">2,847</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted">Emergency Kits Distributed</span>
                <span className="text-text font-semibold">1,523</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted">Schools Rebuilt</span>
                <span className="text-text font-semibold">12</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted">Medical Clinics Supported</span>
                <span className="text-text font-semibold">8</span>
              </div>
            </div>
          </div>

          <div className="card">
            <h3 className="text-lg font-semibold text-text mb-4">How Your Money Helps</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-text font-medium">$3 = Emergency Food Kit</p>
                  <p className="text-sm text-muted">Provides a family with essential food supplies for one day</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-text font-medium">$15 = Clean Water Access</p>
                  <p className="text-sm text-muted">Provides clean drinking water for a family for one week</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-text font-medium">$50 = School Supplies</p>
                  <p className="text-sm text-muted">Provides educational materials for 10 children</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Donation History */}
      {donations.length > 0 && (
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-text">Your Donation History</h3>
            <button className="text-primary-500 hover:text-primary-400 text-sm">
              View All
            </button>
          </div>
          
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500 mx-auto"></div>
              <p className="text-muted mt-2">Loading donations...</p>
            </div>
          ) : (
            <div className="space-y-4">
              {donations.slice(0, 5).map((donation) => (
                <motion.div
                  key={donation.order_id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center justify-between py-3 border-b border-slate-700 last:border-b-0"
                >
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 bg-red-500/10 rounded-lg flex items-center justify-center">
                      <Heart className="h-5 w-5 text-red-500" />
                    </div>
                    <div>
                      <p className="font-medium text-text">Donation #{donation.order_id}</p>
                      <p className="text-sm text-muted">{formatDate(donation.order_date)}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-text">
                      {formatCurrency(donation.amount_total / 100)}
                    </p>
                    <span className="px-2 py-1 bg-green-500/10 text-green-500 text-xs rounded-full">
                      {donation.payment_status}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}