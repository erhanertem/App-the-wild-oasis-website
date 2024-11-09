import { createGuest, getGuest } from "@/app/_lib/data-service";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

// Configuration object for NextAuth
const authConfig = {
  // SIGN-IN PROVIDERS
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID, // Google Client ID from environment variables
      clientSecret: process.env.AUTH_GOOGLE_SECRET, // Google Client Secret from environment variables
    }),
  ],

  callbacks: {
    // >#1.Pre-auth middleware - Determines if a user is authorized to access protected routes.
    authorized({ auth, request }) {
      // auth reads the current session info
      return !!auth?.user; // true || false
    },

    // >#2. Pre-signin Middleware - Executes just before the sign-in is completed.
    async signIn({ user, account, profile }) {
      // Add your to supabase if does not exist
      try {
        // IF USER EXISTS YIELDS USER DATA
        const existingGuest = await getGuest(user.email);
        // IF USER DOES NOT EXIST IN DB, WRITE TO DB
        if (!existingGuest)
          await createGuest({ email: user.email, fullName: user.name });

        return true; // Signin should return either true || false
      } catch {
        return false;
      }
    },
    // >#3.Session middleware - Executes after signIn and is called each time the session is retrieved via auth()
    async session({ session, user }) {
      const guest = await getGuest(session.user.email);
      session.user.guestId = guest.id;
      return session; // Return revised session with userId retrieved from DB
    },

    // >#4. There is also redirect middleware - Determines the URL users are redirected to after signing in or signing out. Allows custom redirection behavior, which can be used if you want more control over where users go after authentication actions.
    // async redirect({ url, baseUrl }) {
    //   return url.startsWith(baseUrl) ? url : baseUrl;
    // },
    // >#5. There is also jwt middleware - Controls the contents of the JSON Web Token (JWT) that is generated and sent with the session.
    // async jwt({ token, user }) {
    //   if (user) {
    //     token.userId = user.id;
    //   }
    //   return token;
    // },
  },

  // REDIRECT PAGES UPON SIGNIN/SIGNOUT COMPLETE
  pages: {
    signIn: "/login",
    // signOut: "/", // Only if you are using client-side signOut version
  },
};

// Exporting parts of NextAuth - Handlers and session fn
export const {
  auth, // A SC helper function to retrieve the current session data in SCs
  signIn, // A SC helper function to start a current session, used in CCs via import from next-auth/react - for SCs use server-actions w/in form tag element wrapper
  signOut, // A SC helper function to end the current session, used in CCs via import from next-auth/react - for SCs use server-actions w/in form tag element wrapper
  handlers: { GET, POST }, // API route handlers GET and POST methods to manage auth sessions as addressed inside http://localhost:3000/api/auth/[...nextauth] @ route.js
} = NextAuth(authConfig);
