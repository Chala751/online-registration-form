import { getSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import LogoutButton from '@/components/LogoutButton'

export default function AdminPage({ user }) {
  const [students, setStudents] = useState([])

  useEffect(() => {
    fetch('/api/students')
      .then(res => res.json())
      .then(data => setStudents(data))
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-blue-100 to-pink-100 py-10 px-4">
      <div className="max-w-6xl mx-auto bg-white/90 backdrop-blur-md shadow-xl rounded-3xl border border-white/30 p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-indigo-700">Welcome, {user.name}</h1>
          <LogoutButton />
        </div>

        {/* Table */}
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Registered Students</h2>
        <div className="overflow-x-auto rounded-xl shadow-sm">
          <table className="min-w-full text-sm border border-gray-200 bg-white rounded-xl overflow-hidden">
            <thead className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Phone</th>
                <th className="p-3 text-left">Interest</th>
                <th className="p-3 text-left">Certificate</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, idx) => (
                <tr key={idx} className="border-t hover:bg-indigo-50 transition">
                  <td className="p-3">{student.fullName}</td>
                  <td className="p-3">{student.email}</td>
                  <td className="p-3">{student.phone}</td>
                  <td className="p-3">{student.interest}</td>
                  <td className="p-3">
                    {student.certificateUrl ? (
                      <a
                        href={student.certificateUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-600 hover:underline font-medium"
                      >
                        View
                      </a>
                    ) : (
                      <span className="text-gray-400">N/A</span>
                    )}
                  </td>
                </tr>
              ))}
              {students.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center p-6 text-gray-500 italic">
                    No students registered yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

// Server-side session check
export async function getServerSideProps(context) {
  const session = await getSession(context)

  if (!session || session.user.role !== 'admin') {
    return {
      redirect: {
        destination: '/unauthorized',
        permanent: false,
      },
    }
  }

  return {
    props: {
      user: session.user,
    },
  }
}
