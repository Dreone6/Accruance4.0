# Accruance 4.0 - Smart Financial Management Platform

![Accruance Logo](https://via.placeholder.com/200x80/10b981/ffffff?text=Accruance)

**Accruance** is a comprehensive financial management platform powered by FINN AI, designed to help individuals and businesses take control of their financial future through intelligent insights, automated tracking, and advanced analytics.

## 🚀 Features

### Core Financial Management
- **Multi-Account Integration** - Connect unlimited bank accounts, credit cards, and investment accounts
- **Real-Time Transaction Tracking** - Automatic categorization and real-time updates
- **Smart Budgeting** - AI-powered budget recommendations and tracking
- **Advanced Analytics** - Deep insights into spending patterns and financial health
- **Goal Tracking** - Set and monitor financial goals with progress visualization
- **Custom Reports** - Generate detailed financial reports and export data

### FINN AI Assistant
- **Intelligent Financial Advisor** - 24/7 AI assistant for financial guidance
- **Personalized Insights** - Tailored recommendations based on your financial data
- **Natural Language Queries** - Ask questions about your finances in plain English
- **Proactive Alerts** - Smart notifications for budget limits, unusual spending, and opportunities
- **Investment Guidance** - AI-powered investment recommendations and portfolio analysis

### Security & Compliance
- **Bank-Level Security** - 256-bit encryption and SOC 2 compliance
- **Row-Level Security** - Advanced database security with Supabase RLS
- **Secure Authentication** - Multi-factor authentication and secure session management
- **Data Privacy** - Your data is never shared with third parties

### Subscription Management
- **Flexible Plans** - Starter (Free), Pro ($9.99/month), Business ($29.99/month)
- **Stripe Integration** - Secure payment processing with webhooks
- **Subscription Management** - Easy upgrades, downgrades, and cancellations

## 🛠 Tech Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Recharts** for data visualization
- **React Router** for navigation
- **React Hook Form** with Zod validation

### Backend & Database
- **Supabase** for backend services
- **PostgreSQL** with Row-Level Security
- **Supabase Edge Functions** for serverless computing
- **Real-time subscriptions** for live data updates

### Payment Processing
- **Stripe** for subscription and payment management
- **Webhook handling** for real-time payment updates
- **Secure customer management** with encrypted data storage

### AI & Analytics
- **FINN AI Framework** - Custom AI assistant architecture
- **Advanced Analytics Engine** - Real-time financial insights
- **Machine Learning Models** - Spending pattern recognition and predictions

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account
- Stripe account

### Environment Setup

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/accruance.git
cd accruance
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment Variables**
Create a `.env` file in the root directory:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
```

4. **Database Setup**
Run the Supabase migrations:
```bash
# The migration files are in supabase/migrations/
# Apply them through Supabase Dashboard or CLI
```

5. **Stripe Configuration**
Update `src/stripe-config.ts` with your actual Stripe price IDs:
```typescript
export const stripeProducts: StripeProduct[] = [
  {
    priceId: 'price_your_actual_starter_price_id',
    // ... other config
  },
  // ... other products
]
```

6. **Start Development Server**
```bash
npm run dev
```

## 🚀 Deployment

### Supabase Edge Functions
Deploy the Stripe webhook and checkout functions:
```bash
# Deploy webhook function
supabase functions deploy stripe-webhook

# Deploy checkout function  
supabase functions deploy stripe-checkout
```

### Frontend Deployment
The app can be deployed to any static hosting service:
- **Netlify** (recommended)
- **Vercel**
- **AWS S3 + CloudFront**
- **GitHub Pages**

Build for production:
```bash
npm run build
```

## 📊 Database Schema

### Core Tables
- `stripe_customers` - Customer mapping between Supabase users and Stripe
- `stripe_subscriptions` - Subscription status and details
- `stripe_orders` - One-time payment records
- `stripe_user_subscriptions` - View for user subscription data
- `stripe_user_orders` - View for user order data

### Security
- Row-Level Security (RLS) enabled on all tables
- User-specific data access policies
- Secure views for data access

## 🔧 Configuration

### Stripe Products
Configure your subscription plans in `src/stripe-config.ts`:

```typescript
export const stripeProducts: StripeProduct[] = [
  {
    priceId: 'price_starter',
    name: 'Starter',
    price: 0,
    mode: 'subscription',
    features: ['2 accounts', 'Basic tracking', 'Email support']
  },
  // Add your actual Stripe price IDs
]
```

### FINN AI Configuration
The AI assistant framework is built for extensibility. Customize responses and capabilities in:
- `src/components/FinnAI.tsx` - Main AI interface
- Add custom AI endpoints in Supabase Edge Functions

## 🧪 Testing

### Run Tests
```bash
npm run test
```

### Test Stripe Integration
1. Use Stripe test mode with test cards
2. Test webhook endpoints with Stripe CLI
3. Verify subscription flows in test environment

## 📈 Analytics & Monitoring

### Built-in Analytics
- User engagement tracking
- Financial health scoring
- Spending pattern analysis
- Goal achievement metrics

### Monitoring
- Supabase real-time monitoring
- Stripe webhook monitoring
- Error tracking and logging

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: [docs.accruance.com](https://docs.accruance.com)
- **Email Support**: support@accruance.com
- **Community**: [Discord](https://discord.gg/accruance)
- **Issues**: [GitHub Issues](https://github.com/yourusername/accruance/issues)

## 🗺 Roadmap

### Q1 2024
- [ ] Mobile app (React Native)
- [ ] Advanced AI insights
- [ ] Investment portfolio tracking
- [ ] Tax preparation features

### Q2 2024
- [ ] Business expense management
- [ ] Team collaboration features
- [ ] Advanced reporting dashboard
- [ ] API for third-party integrations

### Q3 2024
- [ ] Cryptocurrency tracking
- [ ] International banking support
- [ ] Advanced security features
- [ ] White-label solutions

## 🏆 Achievements

- ✅ Full Stripe integration with webhooks
- ✅ Secure authentication and authorization
- ✅ Real-time financial data processing
- ✅ AI-powered financial insights
- ✅ Responsive design for all devices
- ✅ Production-ready architecture
- ✅ Comprehensive error handling
- ✅ Advanced security implementation

---

**Built with ❤️ for your financial success**

*Accruance - Take control of your financial future*