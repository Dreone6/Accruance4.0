import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Eye, EyeOff, Mail, Lock, User, Chrome, Github, Apple } from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'
import toast from 'react-hot-toast'

const signupSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain at least one uppercase letter, one lowercase letter, and one number'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

type SignupForm = z.infer<typeof signupSchema>

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [socialLoading, setSocialLoading] = useState<string | null>(null)
  const navigate = useNavigate()
  const { signUp } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SignupForm>({
    resolver: zodResolver(signupSchema),
  })

  const password = watch('password')

  const onSubmit = async (data: SignupForm) => {
    setLoading(true)
    try {
      await signUp(data.email, data.password)
      toast.success('Account created successfully! Please check your email to verify your account.')
      navigate('/login')
    } catch (error: any) {
      toast.error(error.message || 'Failed to create account')
    } finally {
      setLoading(false)
    }
  }

  const handleSocialSignup = async (provider: 'google' | 'github' | 'apple') => {
    setSocialLoading(provider)
    try {
      // This would integrate with Supabase social auth
      // await supabase.auth.signInWithOAuth({ provider })
      toast.success(`${provider.charAt(0).toUpperCase() + provider.slice(1)} signup initiated`)
    } catch (error: any) {
      toast.error(`Failed to sign up with ${provider}`)
    } finally {
      setSocialLoading(null)
    }
  }

  const getPasswordStrength = (password: string) => {
    if (!password) return { strength: 0, label: '', color: '' }
    
    let score = 0
    if (password.length >= 8) score++
    if (/[a-z]/.test(password)) score++
    if (/[A-Z]/.test(password)) score++
    if (/\d/.test(password)) score++
    if (/[^a-zA-Z\d]/.test(password)) score++

    if (score <= 2) return { strength: score * 20, label: 'Weak', color: 'bg-red-500' }
    if (score <= 3) return { strength: score * 20, label: 'Fair', color: 'bg-yellow-500' }
    if (score <= 4) return { strength: score * 20, label: 'Good', color: 'bg-blue-500' }
    return { strength: 100, label: 'Strong', color: 'bg-green-500' }
  }

  const passwordStrength = getPasswordStrength(password || '')

  return (
    <div className="min-h-screen bg-background flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-primary-500 mb-2">Accruance</h1>
          <h2 className="text-2xl font-bold text-text">Create your account</h2>
          <p className="mt-2 text-muted">
            Already have an account?{' '}
            <Link to="/login" className="text-primary-500 hover:text-primary-400 transition-colors">
              Sign in
            </Link>
          </p>
        </div>

        {/* Social Authentication */}
        <div className="space-y-3">
          <button
            onClick={() => handleSocialSignup('google')}
            disabled={socialLoading !== null}
            className="w-full flex items-center justify-center px-4 py-3 border border-slate-600 rounded-lg bg-white hover:bg-gray-50 text-gray-900 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {socialLoading === 'google' ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-900"></div>
            ) : (
              <>
                <Chrome className="h-5 w-5 mr-3 text-red-500" />
                Continue with Google
              </>
            )}
          </button>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => handleSocialSignup('github')}
              disabled={socialLoading !== null}
              className="flex items-center justify-center px-4 py-3 border border-slate-600 rounded-lg bg-slate-800 hover:bg-slate-700 text-text font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {socialLoading === 'github' ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-text"></div>
              ) : (
                <>
                  <Github className="h-5 w-5 mr-2" />
                  GitHub
                </>
              )}
            </button>

            <button
              onClick={() => handleSocialSignup('apple')}
              disabled={socialLoading !== null}
              className="flex items-center justify-center px-4 py-3 border border-slate-600 rounded-lg bg-black hover:bg-gray-900 text-white font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {socialLoading === 'apple' ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <>
                  <Apple className="h-5 w-5 mr-2" />
                  Apple
                </>
              )}
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-600" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-background text-muted">Or continue with email</span>
          </div>
        </div>

        {/* Email Signup Form */}
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-text mb-1">
                  First name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-muted" />
                  </div>
                  <input
                    {...register('firstName')}
                    type="text"
                    className="input pl-10"
                    placeholder="First name"
                  />
                </div>
                {errors.firstName && (
                  <p className="mt-1 text-sm text-red-400">{errors.firstName.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-text mb-1">
                  Last name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-muted" />
                  </div>
                  <input
                    {...register('lastName')}
                    type="text"
                    className="input pl-10"
                    placeholder="Last name"
                  />
                </div>
                {errors.lastName && (
                  <p className="mt-1 text-sm text-red-400">{errors.lastName.message}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-text mb-1">
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-muted" />
                </div>
                <input
                  {...register('email')}
                  type="email"
                  className="input pl-10"
                  placeholder="Enter your email"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-text mb-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-muted" />
                </div>
                <input
                  {...register('password')}
                  type={showPassword ? 'text' : 'password'}
                  className="input pl-10 pr-10"
                  placeholder="Create a password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-muted" />
                  ) : (
                    <Eye className="h-5 w-5 text-muted" />
                  )}
                </button>
              </div>
              
              {/* Password Strength Indicator */}
              {password && (
                <div className="mt-2">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-muted">Password strength</span>
                    <span className={`font-medium ${
                      passwordStrength.label === 'Weak' ? 'text-red-400' :
                      passwordStrength.label === 'Fair' ? 'text-yellow-400' :
                      passwordStrength.label === 'Good' ? 'text-blue-400' :
                      'text-green-400'
                    }`}>
                      {passwordStrength.label}
                    </span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${passwordStrength.color}`}
                      style={{ width: `${passwordStrength.strength}%` }}
                    />
                  </div>
                </div>
              )}
              
              {errors.password && (
                <p className="mt-1 text-sm text-red-400">{errors.password.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-text mb-1">
                Confirm password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-muted" />
                </div>
                <input
                  {...register('confirmPassword')}
                  type={showConfirmPassword ? 'text' : 'password'}
                  className="input pl-10 pr-10"
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5 text-muted" />
                  ) : (
                    <Eye className="h-5 w-5 text-muted" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-400">{errors.confirmPassword.message}</p>
              )}
            </div>
          </div>

          {/* Terms and Privacy */}
          <div className="flex items-start">
            <input
              id="agree-terms"
              name="agree-terms"
              type="checkbox"
              required
              className="h-4 w-4 text-primary-500 focus:ring-primary-500 border-slate-600 rounded bg-slate-800 mt-0.5"
            />
            <label htmlFor="agree-terms" className="ml-3 block text-sm text-text">
              I agree to the{' '}
              <a href="#" className="text-primary-500 hover:text-primary-400 transition-colors">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="text-primary-500 hover:text-primary-400 transition-colors">
                Privacy Policy
              </a>
            </label>
          </div>

          {/* Marketing Consent */}
          <div className="flex items-start">
            <input
              id="marketing-emails"
              name="marketing-emails"
              type="checkbox"
              className="h-4 w-4 text-primary-500 focus:ring-primary-500 border-slate-600 rounded bg-slate-800 mt-0.5"
            />
            <label htmlFor="marketing-emails" className="ml-3 block text-sm text-muted">
              I'd like to receive product updates and financial tips via email
            </label>
          </div>

          <button
            type="submit"
            disabled={loading || socialLoading !== null}
            className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Creating account...
              </div>
            ) : (
              'Create account'
            )}
          </button>
        </form>

        {/* Security Notice */}
        <div className="text-center">
          <p className="text-xs text-muted">
            🔒 Your data is encrypted and secure. We never share your information.
          </p>
        </div>
      </div>
    </div>
  )
}