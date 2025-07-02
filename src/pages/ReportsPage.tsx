import React, { useState } from 'react'
import { Download, Calendar, Filter, FileText, Mail, Share } from 'lucide-react'
import { formatCurrency, formatDate } from '../lib/utils'

const reportTemplates = [
  {
    id: 1,
    name: 'Monthly Summary',
    description: 'Complete overview of income, expenses, and savings',
    frequency: 'Monthly',
    lastGenerated: '2024-01-15',
  },
  {
    id: 2,
    name: 'Expense Breakdown',
    description: 'Detailed categorization of all expenses',
    frequency: 'Weekly',
    lastGenerated: '2024-01-14',
  },
  {
    id: 3,
    name: 'Budget Performance',
    description: 'Analysis of budget adherence and variances',
    frequency: 'Monthly',
    lastGenerated: '2024-01-10',
  },
  {
    id: 4,
    name: 'Investment Summary',
    description: 'Portfolio performance and asset allocation',
    frequency: 'Quarterly',
    lastGenerated: '2024-01-01',
  },
]

const recentReports = [
  {
    id: 1,
    name: 'December 2023 Monthly Summary',
    type: 'Monthly Summary',
    generatedDate: '2024-01-01',
    size: '2.4 MB',
    format: 'PDF',
  },
  {
    id: 2,
    name: 'Week 52 Expense Breakdown',
    type: 'Expense Breakdown',
    generatedDate: '2023-12-31',
    size: '1.8 MB',
    format: 'PDF',
  },
  {
    id: 3,
    name: 'Q4 2023 Investment Summary',
    type: 'Investment Summary',
    generatedDate: '2023-12-30',
    size: '3.1 MB',
    format: 'PDF',
  },
]

export default function ReportsPage() {
  const [selectedTemplate, setSelectedTemplate] = useState('')
  const [dateRange, setDateRange] = useState('last-month')
  const [showCustomReport, setShowCustomReport] = useState(false)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text">Reports</h1>
          <p className="text-muted">Generate detailed financial reports and insights</p>
        </div>
        <button 
          onClick={() => setShowCustomReport(true)}
          className="btn-primary inline-flex items-center"
        >
          <FileText className="h-4 w-4 mr-2" />
          Custom Report
        </button>
      </div>

      {/* Quick Generate */}
      <div className="card">
        <h3 className="text-lg font-semibold text-text mb-4">Quick Generate</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-text mb-2">
              Report Template
            </label>
            <select 
              value={selectedTemplate}
              onChange={(e) => setSelectedTemplate(e.target.value)}
              className="input w-full"
            >
              <option value="">Select a template</option>
              {reportTemplates.map(template => (
                <option key={template.id} value={template.id}>
                  {template.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-text mb-2">
              Date Range
            </label>
            <select 
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="input w-full"
            >
              <option value="last-week">Last Week</option>
              <option value="last-month">Last Month</option>
              <option value="last-quarter">Last Quarter</option>
              <option value="last-year">Last Year</option>
              <option value="custom">Custom Range</option>
            </select>
          </div>

          <div className="flex items-end">
            <button 
              disabled={!selectedTemplate}
              className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Generate Report
            </button>
          </div>
        </div>
      </div>

      {/* Report Templates */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-text">Report Templates</h3>
          <button className="text-primary-500 hover:text-primary-400 text-sm">
            Manage Templates
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reportTemplates.map((template) => (
            <div key={template.id} className="border border-slate-700 rounded-lg p-4 hover:border-primary-500/50 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 bg-primary-500/10 rounded-lg flex items-center justify-center">
                    <FileText className="h-5 w-5 text-primary-500" />
                  </div>
                  <div>
                    <h4 className="font-medium text-text">{template.name}</h4>
                    <p className="text-sm text-muted">{template.description}</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-4">
                  <span className="text-muted">
                    <Calendar className="h-4 w-4 inline mr-1" />
                    {template.frequency}
                  </span>
                  <span className="text-muted">
                    Last: {formatDate(template.lastGenerated)}
                  </span>
                </div>
                <button className="text-primary-500 hover:text-primary-400">
                  Generate
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Reports */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-text">Recent Reports</h3>
          <button className="text-primary-500 hover:text-primary-400 text-sm">
            View All
          </button>
        </div>
        <div className="space-y-4">
          {recentReports.map((report) => (
            <div key={report.id} className="flex items-center justify-between py-3 border-b border-slate-700 last:border-b-0">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
                  <FileText className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <h4 className="font-medium text-text">{report.name}</h4>
                  <div className="flex items-center space-x-4 text-sm text-muted">
                    <span>{report.type}</span>
                    <span>{formatDate(report.generatedDate)}</span>
                    <span>{report.size}</span>
                    <span className="px-2 py-1 bg-slate-700 rounded text-xs">{report.format}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button className="p-2 hover:bg-slate-700 rounded-lg">
                  <Download className="h-4 w-4 text-muted" />
                </button>
                <button className="p-2 hover:bg-slate-700 rounded-lg">
                  <Share className="h-4 w-4 text-muted" />
                </button>
                <button className="p-2 hover:bg-slate-700 rounded-lg">
                  <Mail className="h-4 w-4 text-muted" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scheduled Reports */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-text">Scheduled Reports</h3>
          <button className="btn-secondary text-sm">
            Add Schedule
          </button>
        </div>
        <div className="text-center py-8">
          <FileText className="h-12 w-12 text-muted mx-auto mb-4" />
          <p className="text-muted mb-2">No scheduled reports yet</p>
          <p className="text-sm text-muted">Set up automatic report generation to receive regular insights</p>
        </div>
      </div>

      {/* Custom Report Modal */}
      {showCustomReport && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-card border border-slate-700 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-text mb-4">Create Custom Report</h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-text mb-2">
                    Report Name
                  </label>
                  <input
                    type="text"
                    className="input w-full"
                    placeholder="Enter report name"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text mb-2">
                      Start Date
                    </label>
                    <input
                      type="date"
                      className="input w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text mb-2">
                      End Date
                    </label>
                    <input
                      type="date"
                      className="input w-full"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text mb-2">
                    Include Sections
                  </label>
                  <div className="space-y-2">
                    {[
                      'Income Summary',
                      'Expense Breakdown',
                      'Budget Analysis',
                      'Account Balances',
                      'Transaction Details',
                      'Category Trends',
                      'Savings Goals',
                      'Investment Performance'
                    ].map((section) => (
                      <label key={section} className="flex items-center">
                        <input
                          type="checkbox"
                          className="h-4 w-4 text-primary-500 focus:ring-primary-500 border-slate-600 rounded bg-slate-800"
                          defaultChecked
                        />
                        <span className="ml-2 text-sm text-text">{section}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text mb-2">
                    Filter by Accounts
                  </label>
                  <select className="input w-full">
                    <option>All Accounts</option>
                    <option>Chase Checking</option>
                    <option>Savings Account</option>
                    <option>Credit Card</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text mb-2">
                    Export Format
                  </label>
                  <div className="flex space-x-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="format"
                        value="pdf"
                        className="h-4 w-4 text-primary-500 focus:ring-primary-500 border-slate-600 bg-slate-800"
                        defaultChecked
                      />
                      <span className="ml-2 text-sm text-text">PDF</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="format"
                        value="excel"
                        className="h-4 w-4 text-primary-500 focus:ring-primary-500 border-slate-600 bg-slate-800"
                      />
                      <span className="ml-2 text-sm text-text">Excel</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="format"
                        value="csv"
                        className="h-4 w-4 text-primary-500 focus:ring-primary-500 border-slate-600 bg-slate-800"
                      />
                      <span className="ml-2 text-sm text-text">CSV</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowCustomReport(false)}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button className="btn-primary">
                  Generate Report
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}