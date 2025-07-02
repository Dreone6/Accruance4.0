import React, { useState } from 'react'
import { Search, Filter, Download, ArrowUpDown, ArrowUpRight, ArrowDownRight } from 'lucide-react'
import { formatCurrency, formatDate } from '../lib/utils'

const transactions = [
  {
    id: 1,
    date: '2024-01-15',
    description: 'Starbucks Coffee',
    category: 'Food & Dining',
    account: 'Chase Checking',
    amount: -5.49,
    status: 'completed',
  },
  {
    id: 2,
    date: '2024-01-15',
    description: 'Salary Deposit',
    category: 'Income',
    account: 'Chase Checking',
    amount: 5000.00,
    status: 'completed',
  },
  {
    id: 3,
    date: '2024-01-14',
    description: 'Uber Ride',
    category: 'Transportation',
    account: 'Chase Checking',
    amount: -12.30,
    status: 'completed',
  },
  {
    id: 4,
    date: '2024-01-14',
    description: 'Amazon Purchase',
    category: 'Shopping',
    account: 'Credit Card',
    amount: -89.99,
    status: 'pending',
  },
  {
    id: 5,
    date: '2024-01-13',
    description: 'Netflix Subscription',
    category: 'Entertainment',
    account: 'Credit Card',
    amount: -15.99,
    status: 'completed',
  },
  {
    id: 6,
    date: '2024-01-13',
    description: 'Grocery Store',
    category: 'Food & Dining',
    account: 'Chase Checking',
    amount: -67.45,
    status: 'completed',
  },
  {
    id: 7,
    date: '2024-01-12',
    description: 'Gas Station',
    category: 'Transportation',
    account: 'Credit Card',
    amount: -45.20,
    status: 'completed',
  },
  {
    id: 8,
    date: '2024-01-12',
    description: 'Freelance Payment',
    category: 'Income',
    account: 'Chase Checking',
    amount: 1200.00,
    status: 'completed',
  },
]

const categories = [
  'All Categories',
  'Food & Dining',
  'Transportation',
  'Shopping',
  'Entertainment',
  'Income',
  'Bills & Utilities',
  'Healthcare',
  'Other',
]

const accounts = [
  'All Accounts',
  'Chase Checking',
  'Credit Card',
  'Savings Account',
]

export default function TransactionsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All Categories')
  const [selectedAccount, setSelectedAccount] = useState('All Accounts')
  const [sortBy, setSortBy] = useState('date')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')

  const filteredTransactions = transactions
    .filter(transaction => {
      const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === 'All Categories' || transaction.category === selectedCategory
      const matchesAccount = selectedAccount === 'All Accounts' || transaction.account === selectedAccount
      return matchesSearch && matchesCategory && matchesAccount
    })
    .sort((a, b) => {
      let aValue, bValue
      switch (sortBy) {
        case 'amount':
          aValue = Math.abs(a.amount)
          bValue = Math.abs(b.amount)
          break
        case 'description':
          aValue = a.description
          bValue = b.description
          break
        default:
          aValue = new Date(a.date)
          bValue = new Date(b.date)
      }
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(field)
      setSortOrder('desc')
    }
  }

  const totalIncome = transactions
    .filter(t => t.amount > 0)
    .reduce((sum, t) => sum + t.amount, 0)

  const totalExpenses = transactions
    .filter(t => t.amount < 0)
    .reduce((sum, t) => sum + Math.abs(t.amount), 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text">Transactions</h1>
          <p className="text-muted">Track and manage all your financial transactions</p>
        </div>
        <button className="btn-primary inline-flex items-center">
          <Download className="h-4 w-4 mr-2" />
          Export
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted text-sm">Total Income</p>
              <p className="text-2xl font-bold text-green-500">{formatCurrency(totalIncome)}</p>
            </div>
            <div className="h-12 w-12 bg-green-500/10 rounded-lg flex items-center justify-center">
              <ArrowUpRight className="h-6 w-6 text-green-500" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted text-sm">Total Expenses</p>
              <p className="text-2xl font-bold text-red-500">{formatCurrency(totalExpenses)}</p>
            </div>
            <div className="h-12 w-12 bg-red-500/10 rounded-lg flex items-center justify-center">
              <ArrowDownRight className="h-6 w-6 text-red-500" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted text-sm">Net Flow</p>
              <p className={`text-2xl font-bold ${
                totalIncome - totalExpenses >= 0 ? 'text-green-500' : 'text-red-500'
              }`}>
                {formatCurrency(totalIncome - totalExpenses)}
              </p>
            </div>
            <div className="h-12 w-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
              <ArrowUpDown className="h-6 w-6 text-blue-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted" />
              <input
                type="text"
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input pl-10 w-full"
              />
            </div>
          </div>
          
          <div className="flex gap-4">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="input"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>

            <select
              value={selectedAccount}
              onChange={(e) => setSelectedAccount(e.target.value)}
              className="input"
            >
              {accounts.map(account => (
                <option key={account} value={account}>{account}</option>
              ))}
            </select>

            <button className="btn-secondary inline-flex items-center">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </button>
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="text-left py-3 px-4">
                  <button
                    onClick={() => handleSort('date')}
                    className="flex items-center text-muted hover:text-text"
                  >
                    Date
                    <ArrowUpDown className="h-4 w-4 ml-1" />
                  </button>
                </th>
                <th className="text-left py-3 px-4">
                  <button
                    onClick={() => handleSort('description')}
                    className="flex items-center text-muted hover:text-text"
                  >
                    Description
                    <ArrowUpDown className="h-4 w-4 ml-1" />
                  </button>
                </th>
                <th className="text-left py-3 px-4 text-muted">Category</th>
                <th className="text-left py-3 px-4 text-muted">Account</th>
                <th className="text-right py-3 px-4">
                  <button
                    onClick={() => handleSort('amount')}
                    className="flex items-center text-muted hover:text-text ml-auto"
                  >
                    Amount
                    <ArrowUpDown className="h-4 w-4 ml-1" />
                  </button>
                </th>
                <th className="text-left py-3 px-4 text-muted">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((transaction) => (
                <tr key={transaction.id} className="border-b border-slate-700/50 hover:bg-slate-800/50">
                  <td className="py-4 px-4 text-text">
                    {formatDate(transaction.date)}
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-3">
                      <div className={`h-8 w-8 rounded-lg flex items-center justify-center ${
                        transaction.amount > 0 ? 'bg-green-500/10' : 'bg-red-500/10'
                      }`}>
                        {transaction.amount > 0 ? (
                          <ArrowUpRight className="h-4 w-4 text-green-500" />
                        ) : (
                          <ArrowDownRight className="h-4 w-4 text-red-500" />
                        )}
                      </div>
                      <span className="font-medium text-text">{transaction.description}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-muted">{transaction.category}</td>
                  <td className="py-4 px-4 text-muted">{transaction.account}</td>
                  <td className={`py-4 px-4 text-right font-semibold ${
                    transaction.amount > 0 ? 'text-green-500' : 'text-text'
                  }`}>
                    {transaction.amount > 0 ? '+' : ''}{formatCurrency(transaction.amount)}
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      transaction.status === 'completed'
                        ? 'bg-green-500/10 text-green-500'
                        : 'bg-yellow-500/10 text-yellow-500'
                    }`}>
                      {transaction.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredTransactions.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted">No transactions found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  )
}