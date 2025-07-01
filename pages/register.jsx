'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useState } from 'react'


const schema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  email: z.string().email('Invalid email'),
  phone: z.string().min(10, 'Phone must be at least 10 characters'),
  interest: z.string().min(1, 'Interest is required'),
})

export default function RegisterForm() {
  const [submitted, setSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
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

    if (res.ok) setSubmitted(true)
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md mt-10 rounded">
      <h1 className="text-2xl font-bold mb-4">Join C_Company Camp</h1>

      {submitted ? (
        <p className="text-green-500">Registration successful!</p>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data" className="space-y-4">
          <div>
            <label>Full Name</label>
            <input {...register("fullName")} className="w-full border p-2" />
            {errors.fullName && <p className="text-red-500">{errors.fullName.message}</p>}
          </div>
          <div>
            <label>Email</label>
            <input {...register("email")} type="email" className="w-full border p-2" />
            {errors.email && <p className="text-red-500">{errors.email.message}</p>}
          </div>
          <div>
            <label>Phone</label>
            <input {...register("phone")} className="w-full border p-2" />
            {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}
          </div>
          <div>
            <label>Interest</label>
            <input {...register("interest")} className="w-full border p-2" />
            {errors.interest && <p className="text-red-500">{errors.interest.message}</p>}
          </div>

          <div>
            <label>Upload Certificate/CV (PDF)</label>
            <input type="file" name="certificate" accept=".pdf" required className="w-full border p-2" />
          </div>

          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
            Submit
          </button>
        </form>
      )}
    </div>
  )
}
