import formidable from 'formidable'
import fs from 'fs'
import dbConnect from '@/lib/mongo'
import Student from '@/models/Student'

export const config = {
  api: {
    bodyParser: false,
  },
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    await dbConnect()

    const form = formidable({ uploadDir: './public/uploads', keepExtensions: true })

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error('Form parsing error:', err)
        return res.status(500).json({ message: 'Form parsing failed' })
      }

      const { fullName, email, phone, interest } = fields
      const certificatePath = files.certificate?.filepath.replace('public', '')

      try {
        const student = await Student.create({
          fullName,
          email,
          phone,
          interest,
          certificateUrl: certificatePath || '',
        })

        return res.status(201).json({ message: 'Student registered', student })
      } catch (dbError) {
        console.error('MongoDB save error:', dbError)
        return res.status(500).json({ message: 'Failed to save student' })
      }
    })
  } catch (e) {
    console.error('Outer error:', e)
    return res.status(500).json({ message: 'Unexpected server error' })
  }
}
