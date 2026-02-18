import CredentialsProvider from "next-auth/providers/credentials";

const API_LOGIN_URL = `${process.env.NEXT_PUBLIC_HOST_URL}/auth/login`;
const ERROR_MESSAGES = {
  MISSING_CREDENTIALS: "Email and password are required",
  AUTH_FAILED: "Authentication failed",
  INVALID_RESPONSE: "Invalid response from authentication server",
};

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Validate credentials
        if (!credentials?.email || !credentials?.password) {
          throw new Error(ERROR_MESSAGES.MISSING_CREDENTIALS);
        }

        try {
          // Call backend API for authentication
          const res = await fetch(API_LOGIN_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          });
          // console.log(res.status)
          if (res.status !== 200) {
            const errorBody = await res.json();
            console.error("Auth API error:", errorBody);
            throw new Error(
              errorBody?.error?.message || ERROR_MESSAGES.AUTH_FAILED
            );
          }

          const user = await res.json();
          // console.log(user);
          // Validate API response structure
          if (
            user?.access_token &&
            user?.admin?.id &&
            user?.admin?.email &&
            user?.admin?.name &&
            user?.admin?.role
          ) {
            // Return a normalized user object
            return {
              id: user.admin.id,
              email: user.admin.email,
              name: user.admin.name,
              role: user.admin.role,
              token: user.access_token,
            };
          } else {
            console.error("Unexpected user object from API:", user);
            throw new Error(ERROR_MESSAGES.INVALID_RESPONSE);
          }
        } catch (error) {
          // Log and rethrow for NextAuth to handle
          // console.error('Auth error:', error);
          throw error;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 1 * 23 * 60 * 60, // 1 day
  },
  callbacks: {
    async jwt({ token, user }) {
      // Attach user info and access token on sign in
      if (user) {
        token.accessToken = user.token;
        token.user = {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        };
        token.expires = Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60;
      } else {
        // Validate existing JWT
        if (
          !token?.accessToken ||
          !token?.user ||
          (token.expires && token.expires < Math.floor(Date.now() / 1000))
        ) {
          return null;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (!token || !token.user) {
        return null; // Force logout on client
      }

      if (token.expires && token.expires < Math.floor(Date.now() / 1000)) {
        return null;
      }
      // Expose access token and user info to the client
      session.accessToken = token.accessToken;
      session.user = token.user;
      return session;
    },
  },
  pages: {
    signIn: "/admin",
    error: "/login", // Redirect to login on error
  },
};
