import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Eye, EyeOff, Mail, Lock, Chrome, Github, Apple } from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'
import toast from 'react-hot-toast'

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

type LoginForm = z.infer<typeof loginSchema>

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [socialLoading, setSocialLoading] = useState<string | null>(null)
  const navigate = useNavigate()
  const { signIn } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginForm) => {
    setLoading(true)
    try {
      await signIn(data.email, data.password)
      toast.success('Welcome back!')
      navigate('/dashboard')
    } catch (error: any) {
      toast.error(error.message || 'Failed to sign in')
    } finally {
      setLoading(false)
    }
  }

  const handleSocialLogin = async (provider: 'google' | 'github' | 'apple') => {
    setSocialLoading(provider)
    try {
      // This would integrate with Supabase social auth
      // await supabase.auth.signInWithOAuth({ provider })
      toast.success(`${provider.charAt(0).toUpperCase() + provider.slice(1)} login initiated`)
    } catch (error: any) {
      toast.error(`Failed to sign in with ${provider}`)
    } finally {
      setSocialLoading(null)
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-primary-500 mb-2">Accruance</h1>
          <h2 className="text-2xl font-bold text-text">Welcome back</h2>
          <p className="mt-2 text-muted">
            Don't have an account?{' '}
            <Link to="/signup" className="text-primary-500 hover:text-primary-400 transition-colors">
              Sign up
            </Link>
          </p>
        </div>

        {/* Social Authentication */}
        <div className="space-y-3">
          <button
            onClick={() => handleSocialLogin('google')}
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
              onClick={() => handleSocialLogin('github')}
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
              onClick={() => handleSocialLogin('apple')}
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

        {/* Email Login Form */}
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
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
                  placeholder="Enter your password"
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
              {errors.password && (
                <p className="mt-1 text-sm text-red-400">{errors.password.message}</p>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-primary-500 focus:ring-primary-500 border-slate-600 rounded bg-slate-800"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-text">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <Link
                to="/forgot-password"
                className="text-primary-500 hover:text-primary-400 transition-colors"
              >
                Forgot your password?
              </Link>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || socialLoading !== null}
            className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Signing in...
              </div>
            ) : (
              'Sign in'
            )}
          </button>
        </form>

        {/* Security Notice */}
        <div className="text-center">
          <p className="text-xs text-muted">
            🔒 Your login is secured with bank-level encryption
          </p>
        </div>
      </div>
    </div>
  )
}