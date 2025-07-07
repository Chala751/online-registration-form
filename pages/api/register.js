import formidable from 'formidable'
import cloudinary from '@/lib/cloudinary'
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

  await dbConnect()

  const form = formidable({ keepExtensions: true })

  form.parse(req, async (err, fields, files) => {
    if (err) return res.status(500).json({ message: 'Form parsing failed' })

    const fullName = fields.fullName?.[0] || fields.fullName
    const email = fields.email?.[0] || fields.email
    const phone = fields.phone?.[0] || fields.phone
    const interest = fields.interest?.[0] || fields.interest

    let certificateUrl = ''

    const file = files.certificate
    if (file) {
      try {
        const result = await cloudinary.uploader.upload(file.filepath, {
          folder: 'certificates',
          resource_type: 'auto',
        })
        certificateUrl = result.secure_url
      } catch (uploadErr) {
        console.error('Cloudinary upload failed:', uploadErr)
        return res.status(500).json({ message: 'Certificate upload failed' })
      }
    }

    try {
      const student = await Student.create({
        fullName,
        email,
        phone,
        interest,
        certificateUrl,
      })
      return res.status(201).json({ message: 'Student registered', student })
    } catch (dbErr) {
      console.error('DB error:', dbErr)
      return res.status(500).json({ message: 'Failed to save student' })
    }
  })
}
