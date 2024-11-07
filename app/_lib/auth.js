import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

// Configuration object for NextAuth
const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID, // Google Client ID from environment variables
      clientSecret: process.env.AUTH_GOOGLE_SECRET, // Google Client Secret from environment variables
    }),
  ],
  callbacks: {
    // NextAuth will call this function whenever one tries to access the protected route
    authorized({ auth, request }) {
      // auth reads the current session info
      return !!auth?.user;
    },
  },
};

// Exporting parts of NextAuth - Handlers and session fn
export const {
  auth, // A server-side helper function to retrieve the current session data in SCs
  signIn, // A server-side helper function to start a current session
  signOut, // A server-side helper function to end the current session
  handlers: { GET, POST }, // API route handlers GET and POST methods to manage auth sessions as addressed inside http://localhost:3000/api/auth/[...nextauth] @ route.js
} = NextAuth(authConfig);
