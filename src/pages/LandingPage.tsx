import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  ArrowRight, 
  BarChart3, 
  Shield, 
  Smartphone, 
  Zap,
  CheckCircle,
  Star,
  TrendingUp,
  PieChart,
  Target
} from 'lucide-react'

const features = [
  {
    icon: BarChart3,
    title: 'Smart Analytics',
    description: 'Get deep insights into your spending patterns with AI-powered analytics and personalized recommendations.',
  },
  {
    icon: Shield,
    title: 'Bank-Level Security',
    description: 'Your financial data is protected with enterprise-grade encryption and security protocols.',
  },
  {
    icon: Smartphone,
    title: 'Mobile First',
    description: 'Access your finances anywhere with our responsive design and mobile-optimized experience.',
  },
  {
    icon: Zap,
    title: 'Real-Time Updates',
    description: 'Stay on top of your finances with instant notifications and real-time transaction tracking.',
  },
  {
    icon: PieChart,
    title: 'Budget Management',
    description: 'Create and track budgets effortlessly with intelligent categorization and spending alerts.',
  },
  {
    icon: Target,
    title: 'Goal Tracking',
    description: 'Set financial goals and track your progress with visual indicators and milestone celebrations.',
  },
]

const pricing = [
  {
    name: 'Starter',
    price: 'Free',
    description: 'Perfect for getting started with basic financial tracking',
    features: [
      'Connect up to 2 accounts',
      'Basic transaction tracking',
      'Simple budgeting tools',
      'Mobile app access',
    ],
  },
  {
    name: 'Pro',
    price: '$9.99',
    period: '/month',
    description: 'Advanced features for serious financial management',
    features: [
      'Unlimited account connections',
      'AI-powered insights',
      'Advanced analytics',
      'Custom reports',
      'Priority support',
      'FINN AI assistant',
    ],
    popular: true,
  },
  {
    name: 'Business',
    price: '$29.99',
    period: '/month',
    description: 'Comprehensive solution for businesses and teams',
    features: [
      'Everything in Pro',
      'Multi-user access',
      'Team collaboration',
      'Advanced reporting',
      'API access',
      'Dedicated support',
    ],
  },
]

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Small Business Owner',
    content: 'Accruance has transformed how I manage my business finances. The AI insights are incredibly accurate.',
    rating: 5,
  },
  {
    name: 'Michael Chen',
    role: 'Software Engineer',
    content: 'Finally, a financial app that actually understands my spending habits. FINN is like having a personal CFO.',
    rating: 5,
  },
  {
    name: 'Emily Rodriguez',
    role: 'Marketing Manager',
    content: 'The budgeting features are intuitive and the real-time alerts have saved me from overspending multiple times.',
    rating: 5,
  },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-primary-500">Accruance</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="text-muted hover:text-text transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="btn-primary"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl lg:text-6xl font-bold text-text mb-6"
            >
              Take Control of Your
              <span className="text-primary-500 block">Financial Future</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-xl text-muted mb-8 max-w-3xl mx-auto"
            >
              Smart financial management powered by AI. Track expenses, create budgets, 
              and get personalized insights with FINN, your AI financial assistant.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                to="/signup"
                className="btn-primary text-lg px-8 py-3 inline-flex items-center"
              >
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <button className="btn-secondary text-lg px-8 py-3">
                Watch Demo
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-text mb-4">
              Everything You Need to Manage Your Finances
            </h2>
            <p className="text-xl text-muted max-w-2xl mx-auto">
              Powerful features designed to give you complete control over your financial life
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card hover:border-primary-500/50 transition-colors"
              >
                <feature.icon className="h-12 w-12 text-primary-500 mb-4" />
                <h3 className="text-xl font-semibold text-text mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-text mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-muted max-w-2xl mx-auto">
              Choose the plan that fits your needs. Upgrade or downgrade at any time.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricing.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`card relative ${
                  plan.popular ? 'border-primary-500 ring-2 ring-primary-500/20' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-primary-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                <div className="text-center mb-6">
                  <h3 className="text-xl font-semibold text-text mb-2">
                    {plan.name}
                  </h3>
                  <div className="mb-2">
                    <span className="text-3xl font-bold text-text">
                      {plan.price}
                    </span>
                    {plan.period && (
                      <span className="text-muted">{plan.period}</span>
                    )}
                  </div>
                  <p className="text-muted">{plan.description}</p>
                </div>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-primary-500 mr-3 flex-shrink-0" />
                      <span className="text-text">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/signup"
                  className={`w-full text-center py-3 px-4 rounded-lg font-medium transition-colors ${
                    plan.popular
                      ? 'bg-primary-500 hover:bg-primary-600 text-white'
                      : 'bg-slate-700 hover:bg-slate-600 text-text'
                  }`}
                >
                  Get Started
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-text mb-4">
              Trusted by Thousands
            </h2>
            <p className="text-xl text-muted max-w-2xl mx-auto">
              See what our users have to say about their experience with Accruance
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-text mb-4">"{testimonial.content}"</p>
                <div>
                  <p className="font-semibold text-text">{testimonial.name}</p>
                  <p className="text-muted text-sm">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-text mb-4">
              Ready to Transform Your Finances?
            </h2>
            <p className="text-xl text-muted mb-8">
              Join thousands of users who have taken control of their financial future with Accruance.
            </p>
            <Link
              to="/signup"
              className="btn-primary text-lg px-8 py-3 inline-flex items-center"
            >
              Start Your Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-700 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-text mb-4">Accruance</h3>
              <p className="text-muted">
                Smart financial management powered by AI.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-text mb-4">Product</h4>
              <ul className="space-y-2 text-muted">
                <li><a href="#" className="hover:text-text transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-text transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-text transition-colors">Security</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-text mb-4">Company</h4>
              <ul className="space-y-2 text-muted">
                <li><a href="#" className="hover:text-text transition-colors">About</a></li>
                <li><a href="#" className="hover:text-text transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-text transition-colors">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-text mb-4">Support</h4>
              <ul className="space-y-2 text-muted">
                <li><a href="#" className="hover:text-text transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-text transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-text transition-colors">Privacy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-700 mt-8 pt-8 text-center text-muted">
            <p>&copy; 2024 Accruance. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}