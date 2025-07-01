import dbConnect from '@/lib/mongo'
import Student from '@/models/Student'
import formidable from 'formidable'
import fs from 'fs'

export const config = {
  api: {
    bodyParser: false,
  },
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  await dbConnect()

  const form = formidable({ uploadDir: './public/uploads', keepExtensions: true })

  form.parse(req, async (err, fields, files) => {
    if (err) return res.status(500).json({ error: 'Error parsing form' })

    const { fullName, email, phone, interest } = fields
    const certificatePath = files.certificate?.[0]?.filepath.replace('public', '')

    try {
      const student = await Student.create({
        fullName,
        email,
        phone,
        interest,
        certificateUrl: certificatePath,
      })
      res.status(201).json({ message: 'Student registered', student })
    } catch (error) {
      res.status(500).json({ error: 'Failed to register' })
    }
  })
}
