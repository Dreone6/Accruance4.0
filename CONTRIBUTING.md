# Contributing to Accruance

Thank you for your interest in contributing to Accruance! This document provides guidelines and information for contributors.

## 🤝 Code of Conduct

We are committed to providing a welcoming and inspiring community for all. Please read and follow our Code of Conduct.

### Our Standards

- Use welcoming and inclusive language
- Be respectful of differing viewpoints and experiences
- Gracefully accept constructive criticism
- Focus on what is best for the community
- Show empathy towards other community members

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Git
- Supabase account (for testing)
- Stripe account (for payment testing)

### Development Setup

1. **Fork the repository**
```bash
git clone https://github.com/yourusername/accruance.git
cd accruance
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment**
```bash
cp .env.example .env
# Fill in your environment variables
```

4. **Start development server**
```bash
npm run dev
```

## 📋 How to Contribute

### Reporting Bugs

Before creating bug reports, please check existing issues. When creating a bug report, include:

- **Clear title and description**
- **Steps to reproduce** the behavior
- **Expected behavior**
- **Screenshots** if applicable
- **Environment details** (OS, browser, Node version)

### Suggesting Features

Feature suggestions are welcome! Please:

- **Check existing feature requests** first
- **Provide clear use case** and rationale
- **Consider implementation complexity**
- **Think about user experience** impact

### Pull Requests

1. **Create a feature branch**
```bash
git checkout -b feature/amazing-feature
```

2. **Make your changes**
   - Follow coding standards
   - Add tests for new features
   - Update documentation

3. **Test your changes**
```bash
npm run test
npm run lint
npm run build
```

4. **Commit your changes**
```bash
git commit -m 'Add amazing feature'
```

5. **Push to your fork**
```bash
git push origin feature/amazing-feature
```

6. **Create Pull Request**
   - Use clear title and description
   - Reference related issues
   - Include screenshots for UI changes

## 🎯 Development Guidelines

### Code Style

We use ESLint and Prettier for code formatting:

```bash
# Check linting
npm run lint

# Fix linting issues
npm run lint -- --fix

# Format code
npm run format
```

### TypeScript

- Use strict TypeScript
- Define proper interfaces and types
- Avoid `any` type when possible
- Use meaningful variable names

### React Components

- Use functional components with hooks
- Follow React best practices
- Use TypeScript for props
- Implement proper error boundaries

### Styling

- Use Tailwind CSS classes
- Follow design system patterns
- Ensure responsive design
- Test on multiple screen sizes

### Testing

- Write unit tests for utilities
- Test React components
- Test API integrations
- Maintain good test coverage

```bash
# Run tests
npm run test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

## 🏗 Project Structure

```
accruance/
├── src/
│   ├── components/          # Reusable UI components
│   ├── pages/              # Page components
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility functions
│   ├── contexts/           # React contexts
│   └── types/              # TypeScript type definitions
├── supabase/
│   ├── functions/          # Edge functions
│   └── migrations/         # Database migrations
├── public/                 # Static assets
└── docs/                   # Documentation
```

### Component Guidelines

- **Single Responsibility**: Each component should have one clear purpose
- **Reusability**: Design components to be reusable across the app
- **Props Interface**: Always define TypeScript interfaces for props
- **Error Handling**: Implement proper error boundaries and fallbacks

### State Management

- Use React Context for global state
- Use local state for component-specific data
- Consider performance implications
- Implement proper loading and error states

## 🔧 Working with Specific Areas

### Stripe Integration

When working on payment features:

- Use Stripe test mode
- Test webhook endpoints locally
- Verify subscription flows
- Handle edge cases (failed payments, cancellations)

### Supabase Integration

When working on backend features:

- Test RLS policies thoroughly
- Use proper error handling
- Implement real-time subscriptions carefully
- Consider performance implications

### FINN AI

When enhancing the AI assistant:

- Maintain conversation context
- Handle API failures gracefully
- Implement proper loading states
- Consider rate limiting

## 📚 Documentation

### Code Documentation

- Use JSDoc for function documentation
- Comment complex logic
- Update README for new features
- Maintain API documentation

### User Documentation

- Update user guides for new features
- Include screenshots for UI changes
- Provide clear setup instructions
- Maintain troubleshooting guides

## 🧪 Testing Strategy

### Unit Tests

- Test utility functions
- Test custom hooks
- Test component logic
- Mock external dependencies

### Integration Tests

- Test API integrations
- Test user workflows
- Test payment flows
- Test authentication

### E2E Tests

- Test critical user journeys
- Test across different browsers
- Test responsive design
- Test accessibility

## 🚀 Release Process

### Version Numbering

We follow [Semantic Versioning](https://semver.org/):

- **MAJOR**: Breaking changes
- **MINOR**: New features (backward compatible)
- **PATCH**: Bug fixes (backward compatible)

### Release Checklist

- [ ] All tests passing
- [ ] Documentation updated
- [ ] CHANGELOG.md updated
- [ ] Version bumped in package.json
- [ ] Git tag created
- [ ] Release notes written

## 🎉 Recognition

Contributors will be recognized in:

- README.md contributors section
- Release notes
- GitHub contributors page
- Annual contributor highlights

## 📞 Getting Help

- **Discord**: Join our community Discord
- **GitHub Issues**: For bug reports and feature requests
- **Email**: dev@accruance.com for direct questions
- **Documentation**: Check our comprehensive docs

## 📄 License

By contributing to Accruance, you agree that your contributions will be licensed under the MIT License.

---

**Thank you for contributing to Accruance! 🙏**

Together, we're building the future of financial management.