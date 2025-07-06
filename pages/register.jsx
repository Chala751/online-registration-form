'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { toast } from 'sonner'
import { CheckCircle } from 'lucide-react'
import { useState } from 'react'

const schema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  email: z.string().email('Invalid email'),
  phone: z.string().min(10, 'Phone must be at least 10 digits'),
  interest: z.string().min(1, 'Interest is required'),
})

export default function RegisterForm() {
  const [submitted, setSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data, e) => {
    const form = e.target
    const formData = new FormData(form)

    const res = await fetch('/api/register', {
      method: 'POST',
      body: formData,
    })

    if (res.ok) {
      setSubmitted(true)
      toast.success('Registration successful!')
      reset()
    } else {
      toast.error('Something went wrong. Please try again.')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-lg bg-white p-8 rounded-xl shadow-lg border border-gray-200">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">
          Join <span className="text-gray-800">C_Company Camp</span>
        </h1>

        {submitted && (
          <div className="text-center text-green-600 mb-4">
            <CheckCircle className="w-10 h-10 mx-auto mb-1" />
            <p className="text-lg">Thank you for registering!</p>
          </div>
        )}

        <form
          onSubmit={handleSubmit(onSubmit)}
          encType="multipart/form-data"
          className="space-y-5"
        >
          <div>
            <label className="block font-medium mb-1">Full Name</label>
            <input
              {...register('fullName')}
              className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Your full name"
            />
            {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>}
          </div>

          <div>
            <label className="block font-medium mb-1">Email</label>
            <input
              {...register('email')}
              type="email"
              className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="example@gmail.com"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block font-medium mb-1">Phone</label>
            <input
              {...register('phone')}
              className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. 09xxxxxxxx"
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
          </div>

          <div>
            <label className="block font-medium mb-1">Interest</label>
            <input
              {...register('interest')}
              className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Why do you want to join?"
            />
            {errors.interest && <p className="text-red-500 text-sm mt-1">{errors.interest.message}</p>}
          </div>

          <div>
            <label className="block font-medium mb-1">Upload Certificate / CV (PDF)</label>
            <input
              type="file"
              name="certificate"
              accept=".pdf"
              required
              className="w-full border border-gray-300 p-2 rounded bg-white"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded transition disabled:opacity-50"
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  )
}
