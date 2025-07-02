import React, { useState } from 'react'
import { Plus, CreditCard, Building, Eye, EyeOff, MoreHorizontal, Trash2, Edit } from 'lucide-react'
import { formatCurrency } from '../lib/utils'

const accounts = [
  {
    id: 1,
    name: 'Chase Checking',
    type: 'Checking',
    bank: 'Chase Bank',
    balance: 5420.75,
    accountNumber: '****1234',
    isConnected: true,
    lastSync: '2024-01-15T10:30:00Z',
  },
  {
    id: 2,
    name: 'Savings Account',
    type: 'Savings',
    bank: 'Bank of America',
    balance: 12450.00,
    accountNumber: '****5678',
    isConnected: true,
    lastSync: '2024-01-15T10:25:00Z',
  },
  {
    id: 3,
    name: 'Credit Card',
    type: 'Credit',
    bank: 'Capital One',
    balance: -1250.30,
    accountNumber: '****9012',
    isConnected: true,
    lastSync: '2024-01-15T10:20:00Z',
  },
  {
    id: 4,
    name: 'Investment Account',
    type: 'Investment',
    bank: 'Fidelity',
    balance: 25680.45,
    accountNumber: '****3456',
    isConnected: false,
    lastSync: '2024-01-14T15:30:00Z',
  },
]

export default function AccountsPage() {
  const [showBalances, setShowBalances] = useState(true)
  const [showAddModal, setShowAddModal] = useState(false)

  const totalBalance = accounts.reduce((sum, account) => sum + account.balance, 0)

  const getAccountIcon = (type: string) => {
    switch (type) {
      case 'Checking':
      case 'Savings':
        return <Building className="h-6 w-6" />
      case 'Credit':
        return <CreditCard className="h-6 w-6" />
      default:
        return <Building className="h-6 w-6" />
    }
  }

  const getAccountColor = (type: string) => {
    switch (type) {
      case 'Checking':
        return 'bg-blue-500/10 text-blue-500'
      case 'Savings':
        return 'bg-green-500/10 text-green-500'
      case 'Credit':
        return 'bg-red-500/10 text-red-500'
      case 'Investment':
        return 'bg-purple-500/10 text-purple-500'
      default:
        return 'bg-gray-500/10 text-gray-500'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text">Accounts</h1>
          <p className="text-muted">Manage your connected financial accounts</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowBalances(!showBalances)}
            className="btn-secondary inline-flex items-center"
          >
            {showBalances ? (
              <EyeOff className="h-4 w-4 mr-2" />
            ) : (
              <Eye className="h-4 w-4 mr-2" />
            )}
            {showBalances ? 'Hide' : 'Show'} Balances
          </button>
          <button 
            onClick={() => setShowAddModal(true)}
            className="btn-primary inline-flex items-center"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Account
          </button>
        </div>
      </div>

      {/* Summary Card */}
      <div className="card">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-text mb-2">Total Net Worth</h3>
            <p className="text-3xl font-bold text-text">
              {showBalances ? formatCurrency(totalBalance) : '••••••'}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted mb-1">{accounts.length} accounts connected</p>
            <div className="flex items-center text-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              <span className="text-green-500">All accounts synced</span>
            </div>
          </div>
        </div>
      </div>

      {/* Accounts List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {accounts.map((account) => (
          <div key={account.id} className="card hover:border-primary-500/50 transition-colors">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className={`h-12 w-12 rounded-lg flex items-center justify-center ${getAccountColor(account.type)}`}>
                  {getAccountIcon(account.type)}
                </div>
                <div>
                  <h3 className="font-semibold text-text">{account.name}</h3>
                  <p className="text-sm text-muted">{account.bank}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${
                  account.isConnected ? 'bg-green-500' : 'bg-red-500'
                }`}></div>
                <button className="p-1 hover:bg-slate-700 rounded">
                  <MoreHorizontal className="h-4 w-4 text-muted" />
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted">Balance</span>
                <span className={`font-semibold ${
                  account.balance < 0 ? 'text-red-500' : 'text-text'
                }`}>
                  {showBalances ? formatCurrency(account.balance) : '••••••'}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-muted">Account</span>
                <span className="text-sm text-text">{account.accountNumber}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-muted">Last Sync</span>
                <span className="text-sm text-text">
                  {new Date(account.lastSync).toLocaleDateString()}
                </span>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-700">
                <span className={`text-xs px-2 py-1 rounded-full ${
                  account.isConnected 
                    ? 'bg-green-500/10 text-green-500' 
                    : 'bg-red-500/10 text-red-500'
                }`}>
                  {account.isConnected ? 'Connected' : 'Disconnected'}
                </span>
                <div className="flex items-center space-x-2">
                  <button className="text-xs text-primary-500 hover:text-primary-400">
                    Sync Now
                  </button>
                  <button className="text-xs text-muted hover:text-text">
                    <Edit className="h-3 w-3" />
                  </button>
                  <button className="text-xs text-red-500 hover:text-red-400">
                    <Trash2 className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Account Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-card border border-slate-700 rounded-xl w-full max-w-md">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-text mb-4">Add New Account</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text mb-2">
                    Account Type
                  </label>
                  <select className="input w-full">
                    <option>Checking Account</option>
                    <option>Savings Account</option>
                    <option>Credit Card</option>
                    <option>Investment Account</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text mb-2">
                    Bank or Institution
                  </label>
                  <select className="input w-full">
                    <option>Chase Bank</option>
                    <option>Bank of America</option>
                    <option>Wells Fargo</option>
                    <option>Capital One</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text mb-2">
                    Account Name
                  </label>
                  <input
                    type="text"
                    className="input w-full"
                    placeholder="Enter a name for this account"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button className="btn-primary">
                  Connect Account
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}