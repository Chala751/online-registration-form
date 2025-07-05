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
    <div className="max-w-6xl mx-auto mt-10 p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Welcome, {user.name}</h1>
        <LogoutButton />
      </div>

      {/* Table */}
      <h2 className="text-xl font-semibold mb-4">Registered Students</h2>
      <table className="w-full border text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">Name</th>
            <th className="p-2">Email</th>
            <th className="p-2">Phone</th>
            <th className="p-2">Interest</th>
            <th className="p-2">Certificate</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, idx) => (
            <tr key={idx} className="border-t hover:bg-gray-50">
              <td className="p-2">{student.fullName}</td>
              <td className="p-2">{student.email}</td>
              <td className="p-2">{student.phone}</td>
              <td className="p-2">{student.interest}</td>
              <td className="p-2">
                {student.certificateUrl ? (
                  <a
                    href={student.certificateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    View
                  </a>
                ) : (
                  'N/A'
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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
