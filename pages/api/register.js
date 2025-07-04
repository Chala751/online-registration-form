import formidable from 'formidable'
import fs from 'fs'
import path from 'path'
import dbConnect from '@/lib/mongo'
import Student from '@/models/Student'

// Disable body parsing (required for formidable)
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

    // Ensure uploads folder exists
    const uploadDir = path.join(process.cwd(), '/public/uploads')
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true })

    const form = formidable({
      uploadDir,
      keepExtensions: true,
      multiples: false,
    })

    // Parse the form data
    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error('Form parse error:', err)
        return res.status(500).json({ message: 'Form parsing failed' })
      }

      // Convert fields (which are arrays) into strings
      const fullName = Array.isArray(fields.fullName) ? fields.fullName[0] : fields.fullName
      const email = Array.isArray(fields.email) ? fields.email[0] : fields.email
      const phone = Array.isArray(fields.phone) ? fields.phone[0] : fields.phone
      const interest = Array.isArray(fields.interest) ? fields.interest[0] : fields.interest

      // Handle file path
      let certificatePath = ''
      const file = files.certificate
      if (file && file.filepath) {
        certificatePath = file.filepath.replace(path.join(process.cwd(), '/public'), '')
      }

      try {
        const student = await Student.create({
          fullName,
          email,
          phone,
          interest,
          certificateUrl: certificatePath,
        })

        return res.status(201).json({ message: 'Student registered', student })
      } catch (dbError) {
        console.error('Database error:', dbError)
        return res.status(500).json({ message: 'Failed to save student' })
      }
    })
  } catch (e) {
    console.error('Unexpected server error:', e)
    return res.status(500).json({ message: 'Server error' })
  }
}
