import React, { useState } from 'react'
import { 
  User, 
  Bell, 
  Shield, 
  CreditCard, 
  Smartphone, 
  Mail,
  Lock,
  Eye,
  EyeOff,
  Save,
  Trash2
} from 'lucide-react'

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile')
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)

  const tabs = [
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'security', name: 'Security', icon: Shield },
    { id: 'billing', name: 'Billing', icon: CreditCard },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-text">Settings</h1>
        <p className="text-muted">Manage your account preferences and settings</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <nav className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                  activeTab === tab.id
                    ? 'bg-primary-500 text-white'
                    : 'text-muted hover:text-text hover:bg-slate-700'
                }`}
              >
                <tab.icon className="h-5 w-5" />
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          {activeTab === 'profile' && (
            <div className="card">
              <h3 className="text-lg font-semibold text-text mb-6">Profile Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-6">
                  <div className="h-20 w-20 bg-primary-500 rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">JD</span>
                  </div>
                  <div>
                    <button className="btn-secondary text-sm">Change Photo</button>
                    <p className="text-xs text-muted mt-1">JPG, GIF or PNG. 1MB max.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      className="input w-full"
                      defaultValue="John"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="input w-full"
                      defaultValue="Doe"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="input w-full"
                    defaultValue="john.doe@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    className="input w-full"
                    defaultValue="+1 (555) 123-4567"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text mb-2">
                    Time Zone
                  </label>
                  <select className="input w-full">
                    <option>Eastern Time (ET)</option>
                    <option>Central Time (CT)</option>
                    <option>Mountain Time (MT)</option>
                    <option>Pacific Time (PT)</option>
                  </select>
                </div>

                <div className="flex justify-end">
                  <button className="btn-primary">
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="card">
              <h3 className="text-lg font-semibold text-text mb-6">Notification Preferences</h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium text-text mb-4">Email Notifications</h4>
                  <div className="space-y-3">
                    {[
                      { id: 'budget-alerts', label: 'Budget alerts and warnings', checked: true },
                      { id: 'transaction-updates', label: 'New transaction notifications', checked: true },
                      { id: 'monthly-reports', label: 'Monthly financial reports', checked: false },
                      { id: 'security-alerts', label: 'Security and login alerts', checked: true },
                      { id: 'product-updates', label: 'Product updates and news', checked: false },
                    ].map((item) => (
                      <label key={item.id} className="flex items-center justify-between">
                        <span className="text-text">{item.label}</span>
                        <input
                          type="checkbox"
                          className="h-4 w-4 text-primary-500 focus:ring-primary-500 border-slate-600 rounded bg-slate-800"
                          defaultChecked={item.checked}
                        />
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-text mb-4">Push Notifications</h4>
                  <div className="space-y-3">
                    {[
                      { id: 'push-budget', label: 'Budget threshold alerts', checked: true },
                      { id: 'push-transactions', label: 'Large transaction alerts', checked: true },
                      { id: 'push-goals', label: 'Savings goal milestones', checked: false },
                      { id: 'push-bills', label: 'Bill payment reminders', checked: true },
                    ].map((item) => (
                      <label key={item.id} className="flex items-center justify-between">
                        <span className="text-text">{item.label}</span>
                        <input
                          type="checkbox"
                          className="h-4 w-4 text-primary-500 focus:ring-primary-500 border-slate-600 rounded bg-slate-800"
                          defaultChecked={item.checked}
                        />
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end">
                  <button className="btn-primary">
                    <Save className="h-4 w-4 mr-2" />
                    Save Preferences
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6">
              {/* Change Password */}
              <div className="card">
                <h3 className="text-lg font-semibold text-text mb-6">Change Password</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-text mb-2">
                      Current Password
                    </label>
                    <div className="relative">
                      <input
                        type={showCurrentPassword ? 'text' : 'password'}
                        className="input w-full pr-10"
                        placeholder="Enter current password"
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      >
                        {showCurrentPassword ? (
                          <EyeOff className="h-5 w-5 text-muted" />
                        ) : (
                          <Eye className="h-5 w-5 text-muted" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text mb-2">
                      New Password
                    </label>
                    <div className="relative">
                      <input
                        type={showNewPassword ? 'text' : 'password'}
                        className="input w-full pr-10"
                        placeholder="Enter new password"
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                      >
                        {showNewPassword ? (
                          <EyeOff className="h-5 w-5 text-muted" />
                        ) : (
                          <Eye className="h-5 w-5 text-muted" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text mb-2">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      className="input w-full"
                      placeholder="Confirm new password"
                    />
                  </div>

                  <div className="flex justify-end">
                    <button className="btn-primary">
                      <Lock className="h-4 w-4 mr-2" />
                      Update Password
                    </button>
                  </div>
                </div>
              </div>

              {/* Two-Factor Authentication */}
              <div className="card">
                <h3 className="text-lg font-semibold text-text mb-6">Two-Factor Authentication</h3>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-text font-medium">Authenticator App</p>
                    <p className="text-sm text-muted">Use an authenticator app to generate verification codes</p>
                  </div>
                  <button className="btn-secondary">
                    <Smartphone className="h-4 w-4 mr-2" />
                    Setup
                  </button>
                </div>
              </div>

              {/* Active Sessions */}
              <div className="card">
                <h3 className="text-lg font-semibold text-text mb-6">Active Sessions</h3>
                
                <div className="space-y-4">
                  {[
                    { device: 'MacBook Pro', location: 'New York, NY', lastActive: '2 minutes ago', current: true },
                    { device: 'iPhone 14', location: 'New York, NY', lastActive: '1 hour ago', current: false },
                    { device: 'Chrome on Windows', location: 'Los Angeles, CA', lastActive: '2 days ago', current: false },
                  ].map((session, index) => (
                    <div key={index} className="flex items-center justify-between py-3 border-b border-slate-700 last:border-b-0">
                      <div>
                        <div className="flex items-center space-x-2">
                          <p className="font-medium text-text">{session.device}</p>
                          {session.current && (
                            <span className="px-2 py-1 bg-green-500/10 text-green-500 text-xs rounded-full">
                              Current
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-muted">{session.location} • {session.lastActive}</p>
                      </div>
                      {!session.current && (
                        <button className="text-red-500 hover:text-red-400 text-sm">
                          Revoke
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'billing' && (
            <div className="space-y-6">
              {/* Current Plan */}
              <div className="card">
                <h3 className="text-lg font-semibold text-text mb-6">Current Plan</h3>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-text">Pro Plan</h4>
                    <p className="text-sm text-muted">$9.99/month • Billed monthly</p>
                    <p className="text-sm text-muted">Next billing date: February 15, 2024</p>
                  </div>
                  <div className="text-right">
                    <button className="btn-secondary mb-2">Change Plan</button>
                    <br />
                    <button className="text-red-500 hover:text-red-400 text-sm">Cancel Subscription</button>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="card">
                <h3 className="text-lg font-semibold text-text mb-6">Payment Method</h3>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
                      <CreditCard className="h-5 w-5 text-blue-500" />
                    </div>
                    <div>
                      <p className="font-medium text-text">•••• •••• •••• 4242</p>
                      <p className="text-sm text-muted">Expires 12/25</p>
                    </div>
                  </div>
                  <button className="btn-secondary">Update</button>
                </div>
              </div>

              {/* Billing History */}
              <div className="card">
                <h3 className="text-lg font-semibold text-text mb-6">Billing History</h3>
                
                <div className="space-y-4">
                  {[
                    { date: '2024-01-15', amount: '$9.99', status: 'Paid', invoice: 'INV-001' },
                    { date: '2023-12-15', amount: '$9.99', status: 'Paid', invoice: 'INV-002' },
                    { date: '2023-11-15', amount: '$9.99', status: 'Paid', invoice: 'INV-003' },
                  ].map((bill, index) => (
                    <div key={index} className="flex items-center justify-between py-3 border-b border-slate-700 last:border-b-0">
                      <div>
                        <p className="font-medium text-text">{bill.date}</p>
                        <p className="text-sm text-muted">Invoice {bill.invoice}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-text">{bill.amount}</p>
                        <span className="px-2 py-1 bg-green-500/10 text-green-500 text-xs rounded-full">
                          {bill.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Danger Zone */}
              <div className="card border-red-500/20">
                <h3 className="text-lg font-semibold text-red-500 mb-6">Danger Zone</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-text">Delete Account</p>
                      <p className="text-sm text-muted">Permanently delete your account and all data</p>
                    </div>
                    <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors">
                      <Trash2 className="h-4 w-4 mr-2 inline" />
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}