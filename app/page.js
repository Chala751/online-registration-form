'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { LogIn, UserPlus } from 'lucide-react'

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
      password
    })

    if (res.ok) {
      router.push('/admin')
    } else {
      setError('Invalid credentials')
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 bg-white shadow">
        <h1 className="text-2xl font-bold text-gray-800">C_Company</h1>

        <div className="flex items-center space-x-4">
          {/* Register icon */}
          <button
            onClick={() => router.push('/register')}
            title="Student Register"
          >
            <UserPlus className="w-6 h-6 text-green-600 hover:text-green-800 cursor-pointer" />
          </button>

          {/* Admin login icon */}
          <button onClick={() => setShowLogin(!showLogin)} title="Admin Login">
            <LogIn className="w-6 h-6 text-blue-600 hover:text-blue-800 cursor-pointer" />
          </button>
        </div>
      </header>

      {/* Admin Login form */}
      {showLogin && (
        <div className="max-w-md mx-auto mt-12 bg-white p-6 shadow-md rounded">
          <h2 className="text-xl font-semibold mb-4">Admin Login</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              name="email"
              type="email"
              placeholder="Email"
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
            {error && <p className="text-red-500">{error}</p>}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              Login
            </button>
          </form>
        </div>
      )}
    </div>
  )
}
