import React, { useState } from 'react'
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
  Target,
  Bot,
  MessageCircle,
  Brain,
  Lightbulb,
  DollarSign,
  Calculator,
  Send,
  Sparkles,
  Users,
  Award,
  Globe
} from 'lucide-react'
import FloatingSymbols from '../components/FloatingSymbols'

const features = [
  {
    icon: BarChart3,
    title: 'Smart Analytics',
    description: 'Get deep insights into your spending patterns with AI-powered analytics and personalized recommendations.',
    stat: '94% accuracy in expense categorization',
  },
  {
    icon: Shield,
    title: 'Bank-Level Security',
    description: 'Your financial data is protected with enterprise-grade encryption and security protocols.',
    stat: '256-bit encryption & SOC 2 compliant',
  },
  {
    icon: Bot,
    title: 'FINN AI Assistant',
    description: 'Chat with your personal AI financial advisor for instant insights and recommendations.',
    stat: 'Answers 10,000+ financial questions daily',
  },
  {
    icon: Smartphone,
    title: 'Mobile First',
    description: 'Access your finances anywhere with our responsive design and mobile-optimized experience.',
    stat: 'Works on 99% of mobile devices',
  },
  {
    icon: Zap,
    title: 'Real-Time Updates',
    description: 'Stay on top of your finances with instant notifications and real-time transaction tracking.',
    stat: 'Updates in under 2 seconds',
  },
  {
    icon: Target,
    title: 'Goal Tracking',
    description: 'Set financial goals and track your progress with visual indicators and milestone celebrations.',
    stat: '87% of users reach their goals faster',
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
      'Email support',
    ],
    popular: false,
  },
  {
    name: 'Pro',
    price: '$9.99',
    period: '/month',
    description: 'Advanced features for serious financial management',
    features: [
      'Unlimited account connections',
      'FINN AI assistant (unlimited)',
      'Advanced analytics & insights',
      'Custom reports & exports',
      'Priority support',
      'Goal tracking & planning',
      'Bill reminders',
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
      'Multi-user access (up to 10)',
      'Team collaboration tools',
      'Advanced business reporting',
      'API access',
      'Dedicated account manager',
      'Custom integrations',
    ],
    popular: false,
  },
]

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Small Business Owner',
    company: 'Chen\'s Bakery',
    content: 'FINN helped me identify $2,400 in unnecessary expenses within the first month. The AI insights are incredibly accurate and have transformed how I manage my business finances.',
    rating: 5,
    image: 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&crop=face',
    savings: '$2,400 saved',
  },
  {
    name: 'Marcus Johnson',
    role: 'Software Engineer',
    company: 'TechFlow Inc.',
    content: 'Finally, a financial app that actually understands my spending habits. FINN is like having a personal CFO who never sleeps. My savings rate increased by 40%!',
    rating: 5,
    image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&crop=face',
    savings: '40% savings increase',
  },
  {
    name: 'Emily Rodriguez',
    role: 'Marketing Manager',
    company: 'Creative Solutions',
    content: 'The budgeting features are intuitive and the real-time alerts have saved me from overspending multiple times. I\'ve never felt more in control of my finances.',
    rating: 5,
    image: 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&crop=face',
    savings: 'Zero overspending',
  },
  {
    name: 'David Park',
    role: 'Freelance Designer',
    company: 'Park Design Studio',
    content: 'As a freelancer, tracking irregular income was always a nightmare. Accruance made it simple, and FINN helps me plan for lean months. Game changer!',
    rating: 5,
    image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&crop=face',
    savings: 'Better cash flow',
  },
  {
    name: 'Lisa Thompson',
    role: 'Real Estate Agent',
    company: 'Thompson Realty',
    content: 'The commission tracking and tax preparation features are phenomenal. FINN even reminds me about quarterly payments. It\'s like having an accountant in my pocket.',
    rating: 5,
    image: 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&crop=face',
    savings: 'Tax-ready reports',
  },
  {
    name: 'James Wilson',
    role: 'Restaurant Owner',
    company: 'Wilson\'s Bistro',
    content: 'Managing restaurant finances is complex, but Accruance simplified everything. The cash flow predictions helped me avoid a potential crisis during slow season.',
    rating: 5,
    image: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&crop=face',
    savings: 'Crisis avoided',
  },
]

const finnCapabilities = [
  {
    icon: Brain,
    title: 'Smart Analysis',
    description: 'Analyzes your spending patterns and identifies optimization opportunities',
  },
  {
    icon: Lightbulb,
    title: 'Personalized Insights',
    description: 'Provides tailored financial advice based on your unique situation',
  },
  {
    icon: Calculator,
    title: 'Budget Planning',
    description: 'Creates and adjusts budgets automatically based on your income and goals',
  },
  {
    icon: TrendingUp,
    title: 'Investment Guidance',
    description: 'Offers investment suggestions aligned with your risk tolerance and goals',
  },
  {
    icon: Shield,
    title: 'Risk Assessment',
    description: 'Evaluates financial risks and suggests protective measures',
  },
  {
    icon: Target,
    title: 'Goal Achievement',
    description: 'Tracks progress and adjusts strategies to help you reach financial milestones',
  },
]

const demoQuestions = [
  "How can I save more money each month?",
  "What's my biggest spending category?",
  "Should I pay off debt or invest?",
  "How much should I budget for groceries?",
  "When will I reach my savings goal?",
]

export default function LandingPage() {
  const [demoQuestion, setDemoQuestion] = useState('')
  const [showDemoResponse, setShowDemoResponse] = useState(false)
  const [isTyping, setIsTyping] = useState(false)

  const handleDemoQuestion = (question: string) => {
    setDemoQuestion(question)
    setIsTyping(true)
    setShowDemoResponse(false)
    
    setTimeout(() => {
      setIsTyping(false)
      setShowDemoResponse(true)
    }, 2000)
  }

  const getDemoResponse = (question: string) => {
    const responses = {
      "How can I save more money each month?": "Based on your spending patterns, I've identified 3 key areas: You're spending $340/month on dining out (23% above average), $89 on unused subscriptions, and could save $156 by switching to a high-yield savings account. Total potential savings: $585/month! 💰",
      "What's my biggest spending category?": "Your largest expense category is Housing at $2,100/month (42% of income), which is within the recommended 30-40% range. However, your second largest is Food & Dining at $680/month - there's room for optimization here! 🏠🍽️",
      "Should I pay off debt or invest?": "With your credit card debt at 18.9% APR, I recommend paying that off first. You'll save more in interest than you'd likely earn investing. Once that's cleared, start with a 3-month emergency fund, then begin investing! 📈",
      "How much should I budget for groceries?": "Based on your household size and location, I recommend $400-500/month for groceries. You're currently spending $520, so there's a small opportunity to optimize. Try meal planning and bulk buying! 🛒",
      "When will I reach my savings goal?": "At your current savings rate of $850/month, you'll reach your $25,000 emergency fund goal in 18 months. Want to reach it faster? I can help you find an extra $200/month to cut that down to 14 months! ⏰"
    }
    return responses[question as keyof typeof responses] || "I'd be happy to analyze your specific financial situation and provide personalized recommendations. Let's start by connecting your accounts!"
  }

  return (
    <div className="min-h-screen bg-background relative">
      {/* Floating Financial Symbols */}
      <FloatingSymbols />
      
      {/* Navigation */}
      <nav className="border-b border-slate-700 sticky top-0 bg-background/80 backdrop-blur-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-primary-500">Accruance</h1>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-muted hover:text-text transition-colors">Features</a>
              <a href="#finn" className="text-muted hover:text-text transition-colors">FINN AI</a>
              <a href="#pricing" className="text-muted hover:text-text transition-colors">Pricing</a>
              <a href="#testimonials" className="text-muted hover:text-text transition-colors">Reviews</a>
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
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 via-transparent to-blue-500/10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center px-4 py-2 bg-primary-500/10 border border-primary-500/20 rounded-full text-primary-400 text-sm mb-6"
            >
              <Sparkles className="h-4 w-4 mr-2" />
              Powered by Advanced AI Technology
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl lg:text-7xl font-bold text-text mb-6"
            >
              Take Control of Your
              <span className="text-primary-500 block">Financial Future</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl lg:text-2xl text-muted mb-8 max-w-4xl mx-auto leading-relaxed"
            >
              Smart financial management powered by FINN, your AI assistant. Track expenses, create budgets, 
              and get personalized insights that help you save more and stress less.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            >
              <Link
                to="/signup"
                className="btn-primary text-lg px-8 py-4 inline-flex items-center text-center justify-center"
              >
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <button className="btn-secondary text-lg px-8 py-4 inline-flex items-center justify-center">
                <Bot className="mr-2 h-5 w-5" />
                Meet FINN AI
              </button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap justify-center items-center gap-8 text-muted"
            >
              <div className="flex items-center">
                <Users className="h-5 w-5 mr-2 text-primary-500" />
                <span>50,000+ users</span>
              </div>
              <div className="flex items-center">
                <Award className="h-5 w-5 mr-2 text-primary-500" />
                <span>4.9/5 rating</span>
              </div>
              <div className="flex items-center">
                <Shield className="h-5 w-5 mr-2 text-primary-500" />
                <span>Bank-level security</span>
              </div>
              <div className="flex items-center">
                <Globe className="h-5 w-5 mr-2 text-primary-500" />
                <span>Available worldwide</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FINN AI Section */}
      <section id="finn" className="py-20 bg-gradient-to-br from-slate-900/50 to-blue-900/20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="inline-flex items-center px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-sm mb-6"
            >
              <Bot className="h-4 w-4 mr-2" />
              Meet Your AI Financial Assistant
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-4xl lg:text-5xl font-bold text-text mb-6"
            >
              FINN: Your Personal
              <span className="text-blue-400 block">Financial Super AI</span>
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-xl text-muted max-w-3xl mx-auto mb-12"
            >
              FINN analyzes your financial data 24/7, providing intelligent insights, 
              personalized recommendations, and proactive guidance to help you achieve your financial goals faster.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* FINN Capabilities */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-text mb-8">What FINN Can Do For You</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {finnCapabilities.map((capability, index) => (
                  <motion.div
                    key={capability.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start space-x-3"
                  >
                    <div className="h-10 w-10 bg-blue-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <capability.icon className="h-5 w-5 text-blue-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-text mb-1">{capability.title}</h4>
                      <p className="text-sm text-muted">{capability.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Interactive Demo */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-card border border-slate-700 rounded-2xl p-6"
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="h-10 w-10 bg-blue-500 rounded-full flex items-center justify-center">
                  <Bot className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-text">Try FINN Now</h4>
                  <p className="text-sm text-muted">Ask a financial question</p>
                </div>
              </div>

              {/* Demo Questions */}
              <div className="space-y-2 mb-4">
                <p className="text-sm text-muted mb-3">Try asking:</p>
                {demoQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleDemoQuestion(question)}
                    className="w-full text-left p-3 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm text-text transition-colors"
                  >
                    {question}
                  </button>
                ))}
              </div>

              {/* Custom Question Input */}
              <div className="flex space-x-2 mb-4">
                <input
                  type="text"
                  value={demoQuestion}
                  onChange={(e) => setDemoQuestion(e.target.value)}
                  placeholder="Or ask your own question..."
                  className="flex-1 input text-sm"
                  onKeyPress={(e) => e.key === 'Enter' && handleDemoQuestion(demoQuestion)}
                />
                <button
                  onClick={() => handleDemoQuestion(demoQuestion)}
                  disabled={!demoQuestion.trim()}
                  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>

              {/* Demo Response */}
              {(isTyping || showDemoResponse) && (
                <div className="bg-slate-800 rounded-lg p-4">
                  {isTyping ? (
                    <div className="flex items-center space-x-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                      <span className="text-sm text-muted">FINN is thinking...</span>
                    </div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="h-6 w-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <Bot className="h-3 w-3 text-white" />
                        </div>
                        <p className="text-sm text-text">{getDemoResponse(demoQuestion)}</p>
                      </div>
                    </motion.div>
                  )}
                </div>
              )}

              <div className="mt-4 text-center">
                <Link
                  to="/signup"
                  className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
                >
                  Sign up to unlock FINN's full potential →
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-3xl lg:text-4xl font-bold text-text mb-4"
            >
              Everything You Need to Master Your Finances
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-xl text-muted max-w-2xl mx-auto"
            >
              Powerful features designed to give you complete control over your financial life
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card hover:border-primary-500/50 transition-all duration-300 group"
              >
                <div className="h-12 w-12 bg-primary-500/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary-500/20 transition-colors">
                  <feature.icon className="h-6 w-6 text-primary-500" />
                </div>
                <h3 className="text-xl font-semibold text-text mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted mb-4">
                  {feature.description}
                </p>
                <div className="text-sm text-primary-400 font-medium">
                  {feature.stat}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-slate-900/50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-3xl lg:text-4xl font-bold text-text mb-4"
            >
              Trusted by Thousands of Smart Savers
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-xl text-muted max-w-2xl mx-auto"
            >
              Real stories from real people who transformed their financial lives with Accruance
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card hover:border-primary-500/30 transition-all duration-300"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <p className="text-text mb-6 leading-relaxed">"{testimonial.content}"</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="h-12 w-12 rounded-full object-cover mr-4"
                    />
                    <div>
                      <p className="font-semibold text-text">{testimonial.name}</p>
                      <p className="text-sm text-muted">{testimonial.role}</p>
                      <p className="text-xs text-muted">{testimonial.company}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="bg-green-500/10 text-green-400 px-3 py-1 rounded-full text-xs font-medium">
                      {testimonial.savings}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-3xl lg:text-4xl font-bold text-text mb-4"
            >
              Simple, Transparent Pricing
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-xl text-muted max-w-2xl mx-auto"
            >
              Choose the plan that fits your needs. Upgrade or downgrade at any time.
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricing.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`card relative hover:border-primary-500/50 transition-all duration-300 ${
                  plan.popular ? 'border-primary-500 ring-2 ring-primary-500/20 scale-105' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-primary-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <h3 className="text-xl font-semibold text-text mb-2">
                    {plan.name}
                  </h3>
                  <div className="mb-2">
                    <span className="text-4xl font-bold text-text">
                      {plan.price}
                    </span>
                    {plan.period && (
                      <span className="text-muted">{plan.period}</span>
                    )}
                  </div>
                  <p className="text-muted">{plan.description}</p>
                </div>
                
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-primary-500 mr-3 flex-shrink-0" />
                      <span className="text-text">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Link
                  to="/signup"
                  className={`w-full text-center py-3 px-4 rounded-lg font-medium transition-colors block ${
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

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary-500/10 to-blue-500/10 relative">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-text mb-6">
              Ready to Transform Your Financial Future?
            </h2>
            <p className="text-xl text-muted mb-8">
              Join thousands of users who have taken control of their finances with Accruance and FINN AI.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/signup"
                className="btn-primary text-lg px-8 py-4 inline-flex items-center justify-center"
              >
                Start Your Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <button className="btn-secondary text-lg px-8 py-4 inline-flex items-center justify-center">
                <MessageCircle className="mr-2 h-5 w-5" />
                Chat with FINN
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-700 py-12 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-text mb-4">Accruance</h3>
              <p className="text-muted mb-4">
                Smart financial management powered by AI. Take control of your financial future today.
              </p>
              <div className="flex space-x-4">
                <div className="h-8 w-8 bg-slate-700 rounded-full"></div>
                <div className="h-8 w-8 bg-slate-700 rounded-full"></div>
                <div className="h-8 w-8 bg-slate-700 rounded-full"></div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-text mb-4">Product</h4>
              <ul className="space-y-2 text-muted">
                <li><a href="#features" className="hover:text-text transition-colors">Features</a></li>
                <li><a href="#finn" className="hover:text-text transition-colors">FINN AI</a></li>
                <li><a href="#pricing" className="hover:text-text transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-text transition-colors">Security</a></li>
                <li><a href="#" className="hover:text-text transition-colors">API</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-text mb-4">Company</h4>
              <ul className="space-y-2 text-muted">
                <li><a href="#" className="hover:text-text transition-colors">About</a></li>
                <li><a href="#" className="hover:text-text transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-text transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-text transition-colors">Press</a></li>
                <li><a href="#" className="hover:text-text transition-colors">Partners</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-text mb-4">Support</h4>
              <ul className="space-y-2 text-muted">
                <li><a href="#" className="hover:text-text transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-text transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-text transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-text transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-text transition-colors">Status</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-700 mt-8 pt-8 text-center text-muted">
            <p>&copy; 2024 Accruance. All rights reserved. Made with ❤️ for your financial success.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}