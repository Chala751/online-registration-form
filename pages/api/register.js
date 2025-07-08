import formidable from 'formidable'
import { v2 as cloudinary } from 'cloudinary'
import dbConnect from '@/lib/mongo'
import Student from '@/models/Student'

// Disable Next.js default body parser
export const config = {
  api: {
    bodyParser: false,
  },
}

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  await dbConnect()

  const form = formidable({ multiples: false })

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error('❌ Form parse error:', err)
      return res.status(500).json({ message: 'Form parsing failed' })
    }

    try {
      const { fullName, email, phone, interest } = fields

      let certificateUrl = ''

      const certificate = files.certificate
      if (certificate && certificate.filepath) {
        // Upload to Cloudinary
        const result = await cloudinary.uploader.upload(certificate.filepath, {
          folder: 'c_company_certificates',
          resource_type: 'auto',
        })

        certificateUrl = result.secure_url
      }

      // Save to MongoDB
      const student = await Student.create({
        fullName,
        email,
        phone,
        interest,
        certificateUrl,
      })

      return res.status(201).json({ message: 'Student registered', student })
    } catch (error) {
      console.error('❌ Registration failed:', error)
      return res.status(500).json({ message: 'Failed to register student' })
    }
  })
}
