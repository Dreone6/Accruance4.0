# Deployment Guide

This guide covers deploying Accruance to production environments.

## 🚀 Quick Deploy

### Prerequisites
- Supabase project set up
- Stripe account configured
- Domain name (optional)

### 1. Environment Setup

Create production environment variables:

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key

# Stripe Configuration (use live keys for production)
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

### 2. Database Migration

Apply all migrations to your Supabase project:

```sql
-- Run the migration file in Supabase SQL Editor
-- File: supabase/migrations/20250702192718_pink_limit.sql
```

### 3. Supabase Edge Functions

Deploy the Stripe integration functions:

```bash
# Install Supabase CLI
npm install -g supabase

# Login to Supabase
supabase login

# Link to your project
supabase link --project-ref your-project-ref

# Deploy functions
supabase functions deploy stripe-webhook
supabase functions deploy stripe-checkout
```

### 4. Stripe Configuration

1. **Update Price IDs** in `src/stripe-config.ts`:
```typescript
export const stripeProducts: StripeProduct[] = [
  {
    priceId: 'price_live_starter_id', // Your actual live price ID
    name: 'Starter',
    // ... rest of config
  },
  // ... other products
]
```

2. **Configure Webhooks** in Stripe Dashboard:
   - Endpoint URL: `https://your-project.supabase.co/functions/v1/stripe-webhook`
   - Events: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`

### 5. Frontend Deployment

#### Option A: Netlify (Recommended)

1. **Build the project**:
```bash
npm run build
```

2. **Deploy to Netlify**:
   - Connect your GitHub repository
   - Set build command: `npm run build`
   - Set publish directory: `dist`
   - Add environment variables in Netlify dashboard

3. **Configure redirects** (create `public/_redirects`):
```
/*    /index.html   200
```

#### Option B: Vercel

1. **Install Vercel CLI**:
```bash
npm install -g vercel
```

2. **Deploy**:
```bash
vercel --prod
```

3. **Configure environment variables** in Vercel dashboard

#### Option C: AWS S3 + CloudFront

1. **Build the project**:
```bash
npm run build
```

2. **Upload to S3**:
```bash
aws s3 sync dist/ s3://your-bucket-name --delete
```

3. **Configure CloudFront** for SPA routing

## 🔧 Production Configuration

### Security Checklist

- [ ] Use HTTPS for all endpoints
- [ ] Configure CORS properly
- [ ] Use production Stripe keys
- [ ] Enable Supabase RLS policies
- [ ] Set up proper error monitoring
- [ ] Configure rate limiting
- [ ] Enable security headers

### Performance Optimization

- [ ] Enable gzip compression
- [ ] Configure CDN caching
- [ ] Optimize images and assets
- [ ] Enable lazy loading
- [ ] Monitor Core Web Vitals

### Monitoring Setup

1. **Supabase Monitoring**:
   - Enable real-time monitoring
   - Set up alerts for errors
   - Monitor database performance

2. **Stripe Monitoring**:
   - Monitor webhook delivery
   - Set up failed payment alerts
   - Track subscription metrics

3. **Frontend Monitoring**:
   - Set up error tracking (Sentry)
   - Monitor performance metrics
   - Track user analytics

## 🔄 CI/CD Pipeline

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run tests
      run: npm test
    
    - name: Build
      run: npm run build
      env:
        VITE_SUPABASE_URL: ${{ secrets.VITE_SUPABASE_URL }}
        VITE_SUPABASE_ANON_KEY: ${{ secrets.VITE_SUPABASE_ANON_KEY }}
    
    - name: Deploy to Netlify
      uses: nwtgck/actions-netlify@v2.0
      with:
        publish-dir: './dist'
        production-branch: main
      env:
        NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
        NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
```

## 🧪 Testing in Production

### Smoke Tests

1. **Authentication Flow**:
   - Sign up new user
   - Sign in existing user
   - Password reset

2. **Subscription Flow**:
   - Start free trial
   - Upgrade to Pro
   - Cancel subscription

3. **Core Features**:
   - Add transaction
   - Create budget
   - Generate report
   - Use FINN AI

### Load Testing

Use tools like:
- Artillery.io for API load testing
- Lighthouse for performance testing
- WebPageTest for real-world performance

## 🚨 Troubleshooting

### Common Issues

1. **Stripe Webhook Failures**:
   - Check webhook endpoint URL
   - Verify webhook secret
   - Check Supabase function logs

2. **Authentication Issues**:
   - Verify Supabase configuration
   - Check RLS policies
   - Validate JWT tokens

3. **Build Failures**:
   - Check environment variables
   - Verify TypeScript types
   - Review build logs

### Monitoring Commands

```bash
# Check Supabase function logs
supabase functions logs stripe-webhook

# Monitor Stripe webhooks
stripe listen --forward-to localhost:3000/webhook

# Check build output
npm run build -- --verbose
```

## 📊 Post-Deployment

### Analytics Setup

1. **Google Analytics 4**
2. **Mixpanel** for user behavior
3. **Stripe Analytics** for revenue metrics
4. **Supabase Analytics** for database metrics

### Backup Strategy

1. **Database Backups**:
   - Supabase automatic backups
   - Manual backup procedures
   - Point-in-time recovery

2. **Code Backups**:
   - GitHub repository
   - Tagged releases
   - Environment configurations

---

**Your Accruance deployment is now live! 🎉**

For support, contact: support@accruance.com