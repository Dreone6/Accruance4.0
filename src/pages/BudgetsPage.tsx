import React, { useState } from 'react'
import { Plus, Target, AlertTriangle, CheckCircle, Edit, Trash2 } from 'lucide-react'
import { formatCurrency, formatPercentage } from '../lib/utils'

const budgets = [
  {
    id: 1,
    name: 'Food & Dining',
    allocated: 1000,
    spent: 850,
    remaining: 150,
    percentage: 85,
    status: 'on-track',
    color: '#10b981',
  },
  {
    id: 2,
    name: 'Transportation',
    allocated: 600,
    spent: 720,
    remaining: -120,
    percentage: 120,
    status: 'over-budget',
    color: '#ef4444',
  },
  {
    id: 3,
    name: 'Entertainment',
    allocated: 300,
    spent: 245,
    remaining: 55,
    percentage: 82,
    status: 'on-track',
    color: '#3b82f6',
  },
  {
    id: 4,
    name: 'Shopping',
    allocated: 500,
    spent: 320,
    remaining: 180,
    percentage: 64,
    status: 'under-budget',
    color: '#f59e0b',
  },
  {
    id: 5,
    name: 'Bills & Utilities',
    allocated: 800,
    spent: 780,
    remaining: 20,
    percentage: 98,
    status: 'warning',
    color: '#8b5cf6',
  },
]

export default function BudgetsPage() {
  const [showCreateModal, setShowCreateModal] = useState(false)

  const totalAllocated = budgets.reduce((sum, budget) => sum + budget.allocated, 0)
  const totalSpent = budgets.reduce((sum, budget) => sum + budget.spent, 0)
  const totalRemaining = totalAllocated - totalSpent

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'over-budget':
        return <AlertTriangle className="h-5 w-5 text-red-500" />
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />
      case 'on-track':
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case 'under-budget':
        return <CheckCircle className="h-5 w-5 text-blue-500" />
      default:
        return <Target className="h-5 w-5 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'over-budget':
        return 'bg-red-500/10 text-red-500 border-red-500/20'
      case 'warning':
        return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
      case 'on-track':
        return 'bg-green-500/10 text-green-500 border-green-500/20'
      case 'under-budget':
        return 'bg-blue-500/10 text-blue-500 border-blue-500/20'
      default:
        return 'bg-gray-500/10 text-gray-500 border-gray-500/20'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text">Budgets</h1>
          <p className="text-muted">Track and manage your spending limits</p>
        </div>
        <button 
          onClick={() => setShowCreateModal(true)}
          className="btn-primary inline-flex items-center"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Budget
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted text-sm">Total Allocated</p>
              <p className="text-2xl font-bold text-text">{formatCurrency(totalAllocated)}</p>
            </div>
            <div className="h-12 w-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
              <Target className="h-6 w-6 text-blue-500" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted text-sm">Total Spent</p>
              <p className="text-2xl font-bold text-text">{formatCurrency(totalSpent)}</p>
            </div>
            <div className="h-12 w-12 bg-red-500/10 rounded-lg flex items-center justify-center">
              <AlertTriangle className="h-6 w-6 text-red-500" />
            </div>
          </div>
          <div className="mt-2">
            <span className={`text-sm ${totalSpent > totalAllocated ? 'text-red-500' : 'text-green-500'}`}>
              {formatPercentage((totalSpent / totalAllocated) * 100)} of budget used
            </span>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted text-sm">Remaining</p>
              <p className={`text-2xl font-bold ${totalRemaining >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {formatCurrency(totalRemaining)}
              </p>
            </div>
            <div className="h-12 w-12 bg-green-500/10 rounded-lg flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-green-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Budget List */}
      <div className="space-y-4">
        {budgets.map((budget) => (
          <div key={budget.id} className="card hover:border-primary-500/50 transition-colors">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                {getStatusIcon(budget.status)}
                <div>
                  <h3 className="font-semibold text-text">{budget.name}</h3>
                  <p className="text-sm text-muted">
                    {formatCurrency(budget.spent)} of {formatCurrency(budget.allocated)} spent
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-3 py-1 rounded-full text-xs border ${getStatusColor(budget.status)}`}>
                  {budget.status.replace('-', ' ')}
                </span>
                <button className="p-2 hover:bg-slate-700 rounded-lg">
                  <Edit className="h-4 w-4 text-muted" />
                </button>
                <button className="p-2 hover:bg-slate-700 rounded-lg">
                  <Trash2 className="h-4 w-4 text-muted" />
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted">Progress</span>
                <span className="text-text font-medium">{formatPercentage(budget.percentage)}</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-3">
                <div 
                  className={`h-3 rounded-full transition-all duration-300 ${
                    budget.percentage > 100 ? 'bg-red-500' : 
                    budget.percentage > 90 ? 'bg-yellow-500' : 'bg-green-500'
                  }`}
                  style={{ width: `${Math.min(budget.percentage, 100)}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted">
                  {budget.remaining >= 0 ? 'Remaining' : 'Over budget'}
                </span>
                <span className={`font-medium ${
                  budget.remaining >= 0 ? 'text-green-500' : 'text-red-500'
                }`}>
                  {formatCurrency(Math.abs(budget.remaining))}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create Budget Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-card border border-slate-700 rounded-xl w-full max-w-md">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-text mb-4">Create New Budget</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text mb-2">
                    Budget Name
                  </label>
                  <input
                    type="text"
                    className="input w-full"
                    placeholder="e.g., Groceries, Gas, etc."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text mb-2">
                    Category
                  </label>
                  <select className="input w-full">
                    <option>Food & Dining</option>
                    <option>Transportation</option>
                    <option>Shopping</option>
                    <option>Entertainment</option>
                    <option>Bills & Utilities</option>
                    <option>Healthcare</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text mb-2">
                    Monthly Budget Amount
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted">$</span>
                    <input
                      type="number"
                      className="input w-full pl-8"
                      placeholder="0.00"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text mb-2">
                    Alert Threshold
                  </label>
                  <select className="input w-full">
                    <option>80% of budget</option>
                    <option>90% of budget</option>
                    <option>95% of budget</option>
                    <option>100% of budget</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button className="btn-primary">
                  Create Budget
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}