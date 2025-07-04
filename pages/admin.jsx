import { useEffect, useState } from 'react'

export default function AdminPage() {
  const [students, setStudents] = useState([])

  useEffect(() => {
    fetch('/api/students')
      .then(res => res.json())
      .then(data => setStudents(data))
  }, [])

  return (
    <div className="max-w-5xl mx-auto mt-10 p-4">
      <h1 className="text-2xl font-bold mb-4">Registered Students</h1>
      <table className="w-full border">
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
            <tr key={idx} className="border-t">
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
