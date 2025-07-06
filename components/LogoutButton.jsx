'use client'

import { signOut } from 'next-auth/react'
import { toast } from 'sonner'
import { LogOut, CheckCircle } from 'lucide-react'

export default function LogoutButton() {
  const handleLogout = async () => {
   
    toast.success('Logged out successfully!', {
      icon: <CheckCircle className="text-green-600 w-5 h-5" />,
      duration: 1500, 
    })

  
    setTimeout(() => {
      signOut({ callbackUrl: '/' })
    }, 1200) 
  }

  return (
    <button
      onClick={handleLogout}
      className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition cursor-pointer"
    >
      <LogOut className="w-4 h-4" />
      Logout
    </button>
  )
}
