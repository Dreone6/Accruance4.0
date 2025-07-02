import React from 'react'
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  CreditCard,
  ArrowUpRight,
  ArrowDownRight,
  Plus
} from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { formatCurrency } from '../lib/utils'

const monthlyData = [
  { month: 'Jan', income: 5000, expenses: 3200 },
  { month: 'Feb', income: 5200, expenses: 3400 },
  { month: 'Mar', income: 4800, expenses: 3100 },
  { month: 'Apr', income: 5500, expenses: 3800 },
  { month: 'May', income: 5300, expenses: 3600 },
  { month: 'Jun', income: 5700, expenses: 4200 },
]

const categoryData = [
  { name: 'Food & Dining', value: 1200, color: '#10b981' },
  { name: 'Transportation', value: 800, color: '#3b82f6' },
  { name: 'Shopping', value: 600, color: '#f59e0b' },
  { name: 'Entertainment', value: 400, color: '#ef4444' },
  { name: 'Bills & Utilities', value: 900, color: '#8b5cf6' },
  { name: 'Other', value: 300, color: '#6b7280' },
]

const recentTransactions = [
  { id: 1, description: 'Starbucks Coffee', amount: -5.49, category: 'Food & Dining', date: '2024-01-15' },
  { id: 2, description: 'Salary Deposit', amount: 5000, category: 'Income', date: '2024-01-15' },
  { id: 3, description: 'Uber Ride', amount: -12.30, category: 'Transportation', date: '2024-01-14' },
  { id: 4, description: 'Amazon Purchase', amount: -89.99, category: 'Shopping', date: '2024-01-14' },
  { id: 5, description: 'Netflix Subscription', amount: -15.99, category: 'Entertainment', date: '2024-01-13' },
]

export default function Dashboard() {
  const totalBalance = 12450.75
  const monthlyIncome = 5700
  const monthlyExpenses = 4200
  const savingsRate = ((monthlyIncome - monthlyExpenses) / monthlyIncome * 100).toFixed(1)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text">Dashboard</h1>
          <p className="text-muted">Welcome back! Here's your financial overview.</p>
        </div>
        <button className="btn-primary inline-flex items-center">
          <Plus className="h-4 w-4 mr-2" />
          Add Transaction
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted text-sm">Total Balance</p>
              <p className="text-2xl font-bold text-text">{formatCurrency(totalBalance)}</p>
            </div>
            <div className="h-12 w-12 bg-primary-500/10 rounded-lg flex items-center justify-center">
              <DollarSign className="h-6 w-6 text-primary-500" />
            </div>
          </div>
          <div className="flex items-center mt-4 text-sm">
            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-green-500">+2.5%</span>
            <span className="text-muted ml-1">from last month</span>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted text-sm">Monthly Income</p>
              <p className="text-2xl font-bold text-text">{formatCurrency(monthlyIncome)}</p>
            </div>
            <div className="h-12 w-12 bg-green-500/10 rounded-lg flex items-center justify-center">
              <ArrowUpRight className="h-6 w-6 text-green-500" />
            </div>
          </div>
          <div className="flex items-center mt-4 text-sm">
            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-green-500">+8.2%</span>
            <span className="text-muted ml-1">from last month</span>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted text-sm">Monthly Expenses</p>
              <p className="text-2xl font-bold text-text">{formatCurrency(monthlyExpenses)}</p>
            </div>
            <div className="h-12 w-12 bg-red-500/10 rounded-lg flex items-center justify-center">
              <ArrowDownRight className="h-6 w-6 text-red-500" />
            </div>
          </div>
          <div className="flex items-center mt-4 text-sm">
            <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
            <span className="text-red-500">+12.1%</span>
            <span className="text-muted ml-1">from last month</span>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted text-sm">Savings Rate</p>
              <p className="text-2xl font-bold text-text">{savingsRate}%</p>
            </div>
            <div className="h-12 w-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
              <CreditCard className="h-6 w-6 text-blue-500" />
            </div>
          </div>
          <div className="flex items-center mt-4 text-sm">
            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-green-500">+3.1%</span>
            <span className="text-muted ml-1">from last month</span>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Income vs Expenses Chart */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-text">Income vs Expenses</h3>
            <select className="input text-sm">
              <option>Last 6 months</option>
              <option>Last year</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="month" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1e293b', 
                  border: '1px solid #334155',
                  borderRadius: '8px',
                  color: '#f1f5f9'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="income" 
                stroke="#10b981" 
                strokeWidth={2}
                name="Income"
              />
              <Line 
                type="monotone" 
                dataKey="expenses" 
                stroke="#ef4444" 
                strokeWidth={2}
                name="Expenses"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Spending by Category */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-text">Spending by Category</h3>
            <select className="input text-sm">
              <option>This month</option>
              <option>Last month</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
                paddingAngle={5}
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1e293b', 
                  border: '1px solid #334155',
                  borderRadius: '8px',
                  color: '#f1f5f9'
                }}
                formatter={(value) => [formatCurrency(value as number), 'Amount']}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {categoryData.map((category) => (
              <div key={category.name} className="flex items-center">
                <div 
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: category.color }}
                />
                <span className="text-sm text-muted truncate">{category.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-text">Recent Transactions</h3>
          <button className="text-primary-500 hover:text-primary-400 text-sm">
            View all
          </button>
        </div>
        <div className="space-y-4">
          {recentTransactions.map((transaction) => (
            <div key={transaction.id} className="flex items-center justify-between py-3 border-b border-slate-700 last:border-b-0">
              <div className="flex items-center space-x-3">
                <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${
                  transaction.amount > 0 ? 'bg-green-500/10' : 'bg-red-500/10'
                }`}>
                  {transaction.amount > 0 ? (
                    <ArrowUpRight className="h-5 w-5 text-green-500" />
                  ) : (
                    <ArrowDownRight className="h-5 w-5 text-red-500" />
                  )}
                </div>
                <div>
                  <p className="font-medium text-text">{transaction.description}</p>
                  <p className="text-sm text-muted">{transaction.category}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`font-semibold ${
                  transaction.amount > 0 ? 'text-green-500' : 'text-text'
                }`}>
                  {transaction.amount > 0 ? '+' : ''}{formatCurrency(transaction.amount)}
                </p>
                <p className="text-sm text-muted">{transaction.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}