'use client'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'



import { useState } from 'react'

export default function LoginPage() {
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
    <div className="max-w-sm mx-auto mt-20 p-6 shadow-md bg-white">
      <h1 className="text-xl font-bold mb-4">Admin Login</h1>
      <form onSubmit={handleLogin} className="space-y-4">
        <input name="email" placeholder="Email" className="w-full p-2 border" required />
        <input name="password" type="password" placeholder="Password" className="w-full p-2 border" required />
        {error && <p className="text-red-500">{error}</p>}
        <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded">
          Login
        </button>
      </form>
    </div>
  )
}
