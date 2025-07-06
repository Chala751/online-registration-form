'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { toast } from 'sonner'
import { CheckCircle, FileText } from 'lucide-react'
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
      toast.success('🎉 Registration successful!')
      reset()
    } else {
      toast.error('❌ Something went wrong. Please try again.')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-blue-100 to-pink-100 flex items-center justify-center px-4 py-10">
      <div className="container mx-auto max-w-4xl bg-white/80 backdrop-blur-md shadow-2xl rounded-3xl border border-white/30 p-8 md:p-10">
        <div className="grid md:grid-cols-2 gap-10">
          {/* Illustration Side */}
          <div className="hidden md:flex flex-col items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-2xl p-6">
            <FileText className="w-16 h-16 mb-4" />
            <h2 className="text-3xl font-bold mb-2">C_Company Camp</h2>
            <p className="text-lg text-center">Apply now and shape your tech future!</p>
          </div>

          {/* Form Side */}
          <div>
            <h1 className="text-2xl font-boldtext-gray-800 text-center mb-6">Registration Form</h1>

            {submitted ? (
              <div className="text-center text-green-600 mb-4">
                <CheckCircle className="w-12 h-12 mx-auto mb-2 animate-bounce" />
                <p className="text-lg font-semibold">Thank you for registering!</p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                encType="multipart/form-data"
                className="space-y-6 bg-white rounded-xl p-4"
              >
                {/* Full Name */}
                <div>
                  <label className="block font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    {...register('fullName')}
                    placeholder="Your full name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>}
                </div>

                {/* Email */}
                <div>
                  <label className="block font-medium text-gray-700 mb-1">Email</label>
                  <input
                    {...register('email')}
                    type="email"
                    placeholder="example@mail.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                </div>

                {/* Phone */}
                <div>
                  <label className="block font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    {...register('phone')}
                    placeholder="09xxxxxxxx"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
                </div>

                {/* Interest */}
                <div>
                  <label className="block font-medium text-gray-700 mb-1">Interest</label>
                  <textarea
                    {...register('interest')}
                    placeholder="Why do you want to join?"
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                  />
                  {errors.interest && <p className="text-red-500 text-sm mt-1">{errors.interest.message}</p>}
                </div>

                {/* Certificate */}
                <div>
                  <label className="block font-medium text-gray-700 mb-1">Upload Certificate / CV (PDF)</label>
                  <input
                    type="file"
                    name="certificate"
                    accept=".pdf"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-white cursor-pointer"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-3 rounded-lg hover:opacity-90 transition-all duration-300 shadow-lg disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Application'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
