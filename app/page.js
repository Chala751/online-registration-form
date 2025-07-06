'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { LogIn, UserPlus, CheckCircle, XCircle } from 'lucide-react'
import { toast } from 'sonner'

export default function HomePage() {
  const [showLogin, setShowLogin] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleLogin = async (e) => {
    e.preventDefault()
    const email = e.target.email.value
    const password = e.target.password.value

    const res = await signIn('credentials', {
      redirect: false,
      email,
      password,
    })

    if (res.ok) {
      toast.success('Login successful!', {
        icon: <CheckCircle className="text-green-600 w-5 h-5" />
      })
      router.push('/admin')
    } else {
      toast.error('Invalid credentials. Please try again.', {
        icon: <XCircle className="text-red-600 w-5 h-5" />
      })
      setError('Invalid credentials')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-blue-100 to-pink-100">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 bg-white/80 backdrop-blur-md shadow-md">
        <h1 className="text-2xl font-bold text-indigo-800">C_Company</h1>

        <div className="flex items-center space-x-4">
          {/* Register icon */}
          <button
            onClick={() => router.push('/register')}
            title="Student Register"
            className="hover:scale-110 transition-transform"
          >
            <UserPlus className="w-6 h-6 text-purple-600 hover:text-purple-800 cursor-pointer" />
          </button>

          {/* Admin login icon */}
          <button
            onClick={() => setShowLogin(!showLogin)}
            title="Admin Login"
            className="hover:scale-110 transition-transform"
          >
            <LogIn className="w-6 h-6 text-indigo-600 hover:text-indigo-800 cursor-pointer" />
          </button>
        </div>
      </header>

      {/* Admin Login form */}
      {showLogin && (
        <div className="max-w-md mx-auto mt-12 bg-white/90 backdrop-blur-md p-8 shadow-xl rounded-2xl border border-white/30">
          <h2 className="text-xl font-bold text-center text-gray-800 mb-4">Admin Login</h2>
          <form onSubmit={handleLogin} className="space-y-5">
            <input
              name="email"
              type="email"
              placeholder="Email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-3 rounded-lg hover:opacity-90 transition-all duration-300 shadow-md cursor-pointer"
            >
              Login
            </button>
          </form>
        </div>
      )}
    </div>
  )
}
