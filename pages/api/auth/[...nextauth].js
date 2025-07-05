import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Replace with DB lookup
        const adminUser = {
          id: "1",
          name: "Admin",
          email: "admin@ccamp.com",
          password: "admin123",
          role: "admin",
        }

        if (
          credentials.email === adminUser.email &&
          credentials.password === adminUser.password
        ) {
          return adminUser
        }

        return null
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = user.role
      return token
    },
    async session({ session, token }) {
      session.user.role = token.role
      return session
    }
  },
  pages: {
    signIn: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET || 'ccamp-secret',
})
