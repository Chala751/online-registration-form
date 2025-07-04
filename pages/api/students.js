import dbConnect from '@/lib/mongo'
import Student from '@/models/Student'

export default async function handler(req, res) {
  try {
    await dbConnect()
    const students = await Student.find().lean()

    // Fix file URLs (ensure public paths work)
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
    const fixedStudents = students.map(student => ({
      ...student,
      certificateUrl: student.certificateUrl
        ? `${baseUrl}${student.certificateUrl}`
        : '',
    }))

    return res.status(200).json(fixedStudents)
  } catch (err) {
    console.error('Failed to load students:', err)
    return res.status(500).json({ message: 'Error loading students' })
  }
}
