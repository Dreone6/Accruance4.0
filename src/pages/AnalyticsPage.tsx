import React, { useState } from 'react'
import { TrendingUp, TrendingDown, DollarSign, Calendar } from 'lucide-react'
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from 'recharts'
import { formatCurrency, formatPercentage } from '../lib/utils'

const monthlyTrends = [
  { month: 'Jul', income: 4800, expenses: 3200, savings: 1600 },
  { month: 'Aug', income: 5200, expenses: 3400, savings: 1800 },
  { month: 'Sep', income: 4900, expenses: 3100, savings: 1800 },
  { month: 'Oct', income: 5500, expenses: 3800, savings: 1700 },
  { month: 'Nov', income: 5300, expenses: 3600, savings: 1700 },
  { month: 'Dec', income: 5700, expenses: 4200, savings: 1500 },
]

const categorySpending = [
  { name: 'Food & Dining', amount: 1200, percentage: 28.6, color: '#10b981' },
  { name: 'Transportation', amount: 800, percentage: 19.0, color: '#3b82f6' },
  { name: 'Bills & Utilities', amount: 900, percentage: 21.4, color: '#8b5cf6' },
  { name: 'Shopping', amount: 600, percentage: 14.3, color: '#f59e0b' },
  { name: 'Entertainment', amount: 400, percentage: 9.5, color: '#ef4444' },
  { name: 'Other', amount: 300, percentage: 7.1, color: '#6b7280' },
]

const weeklySpending = [
  { week: 'Week 1', amount: 850 },
  { week: 'Week 2', amount: 920 },
  { week: 'Week 3', amount: 1100 },
  { week: 'Week 4', amount: 980 },
]

const savingsGoals = [
  { name: 'Emergency Fund', current: 8500, target: 15000, percentage: 56.7 },
  { name: 'Vacation', current: 2300, target: 5000, percentage: 46.0 },
  { name: 'New Car', current: 12000, target: 25000, percentage: 48.0 },
]

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('6months')

  const currentMonthIncome = 5700
  const currentMonthExpenses = 4200
  const savingsRate = ((currentMonthIncome - currentMonthExpenses) / currentMonthIncome * 100)
  const expenseGrowth = 12.1

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text">Analytics</h1>
          <p className="text-muted">Deep insights into your financial patterns</p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="input"
          >
            <option value="1month">Last Month</option>
            <option value="3months">Last 3 Months</option>
            <option value="6months">Last 6 Months</option>
            <option value="1year">Last Year</option>
          </select>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted text-sm">Savings Rate</p>
              <p className="text-2xl font-bold text-text">{formatPercentage(savingsRate)}</p>
            </div>
            <div className="h-12 w-12 bg-green-500/10 rounded-lg flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-green-500" />
            </div>
          </div>
          <div className="flex items-center mt-4 text-sm">
            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-green-500">+3.2%</span>
            <span className="text-muted ml-1">vs last month</span>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted text-sm">Expense Growth</p>
              <p className="text-2xl font-bold text-text">{formatPercentage(expenseGrowth)}</p>
            </div>
            <div className="h-12 w-12 bg-red-500/10 rounded-lg flex items-center justify-center">
              <TrendingDown className="h-6 w-6 text-red-500" />
            </div>
          </div>
          <div className="flex items-center mt-4 text-sm">
            <TrendingUp className="h-4 w-4 text-red-500 mr-1" />
            <span className="text-red-500">+2.1%</span>
            <span className="text-muted ml-1">vs last month</span>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted text-sm">Avg Daily Spend</p>
              <p className="text-2xl font-bold text-text">{formatCurrency(135.48)}</p>
            </div>
            <div className="h-12 w-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
              <Calendar className="h-6 w-6 text-blue-500" />
            </div>
          </div>
          <div className="flex items-center mt-4 text-sm">
            <TrendingDown className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-green-500">-5.3%</span>
            <span className="text-muted ml-1">vs last month</span>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted text-sm">Budget Adherence</p>
              <p className="text-2xl font-bold text-text">87%</p>
            </div>
            <div className="h-12 w-12 bg-purple-500/10 rounded-lg flex items-center justify-center">
              <DollarSign className="h-6 w-6 text-purple-500" />
            </div>
          </div>
          <div className="flex items-center mt-4 text-sm">
            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-green-500">+12%</span>
            <span className="text-muted ml-1">vs last month</span>
          </div>
        </div>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Income vs Expenses Trend */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-text">Income vs Expenses Trend</h3>
            <select className="input text-sm">
              <option>Last 6 months</option>
              <option>Last year</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={monthlyTrends}>
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
                formatter={(value) => [formatCurrency(value as number), '']}
              />
              <Area 
                type="monotone" 
                dataKey="income" 
                stackId="1"
                stroke="#10b981" 
                fill="#10b981"
                fillOpacity={0.3}
                name="Income"
              />
              <Area 
                type="monotone" 
                dataKey="expenses" 
                stackId="2"
                stroke="#ef4444" 
                fill="#ef4444"
                fillOpacity={0.3}
                name="Expenses"
              />
            </AreaChart>
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
          <div className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categorySpending}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="amount"
                >
                  {categorySpending.map((entry, index) => (
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
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {categorySpending.map((category) => (
              <div key={category.name} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div 
                    className="w-3 h-3 rounded-full mr-2"
                    style={{ backgroundColor: category.color }}
                  />
                  <span className="text-sm text-muted truncate">{category.name}</span>
                </div>
                <span className="text-sm text-text">{formatPercentage(category.percentage)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Spending Pattern */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-text">Weekly Spending Pattern</h3>
            <select className="input text-sm">
              <option>This month</option>
              <option>Last month</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={weeklySpending}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="week" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1e293b', 
                  border: '1px solid #334155',
                  borderRadius: '8px',
                  color: '#f1f5f9'
                }}
                formatter={(value) => [formatCurrency(value as number), 'Amount']}
              />
              <Bar 
                dataKey="amount" 
                fill="#10b981"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Savings Goals Progress */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-text">Savings Goals Progress</h3>
            <button className="text-primary-500 hover:text-primary-400 text-sm">
              Manage Goals
            </button>
          </div>
          <div className="space-y-6">
            {savingsGoals.map((goal) => (
              <div key={goal.name}>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-text">{goal.name}</span>
                  <span className="text-sm text-muted">
                    {formatCurrency(goal.current)} / {formatCurrency(goal.target)}
                  </span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div 
                    className="bg-primary-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${goal.percentage}%` }}
                  />
                </div>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs text-muted">{formatPercentage(goal.percentage)} complete</span>
                  <span className="text-xs text-muted">
                    {formatCurrency(goal.target - goal.current)} remaining
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Insights */}
      <div className="card">
        <h3 className="text-lg font-semibold text-text mb-4">AI Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
            <div className="flex items-center mb-2">
              <TrendingUp className="h-5 w-5 text-blue-500 mr-2" />
              <span className="font-medium text-text">Spending Insight</span>
            </div>
            <p className="text-sm text-muted">
              Your dining expenses increased by 23% this month. Consider meal planning to reduce costs.
            </p>
          </div>

          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
            <div className="flex items-center mb-2">
              <DollarSign className="h-5 w-5 text-green-500 mr-2" />
              <span className="font-medium text-text">Savings Opportunity</span>
            </div>
            <p className="text-sm text-muted">
              You could save $200/month by switching to a different phone plan based on your usage.
            </p>
          </div>

          <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
            <div className="flex items-center mb-2">
              <Calendar className="h-5 w-5 text-purple-500 mr-2" />
              <span className="font-medium text-text">Budget Alert</span>
            </div>
            <p className="text-sm text-muted">
              You're 85% through your entertainment budget with 10 days left in the month.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}