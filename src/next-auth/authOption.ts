import { jwtDecode } from "jwt-decode";

import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const authOption: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },

  providers: [
    Credentials({
      name: "login",
      credentials: {
        email: {
          label: "email",
          type: "email",
          placeholder: "enter your email",
        },
        password: {
          label: "password",
          type: "password",
          placeholder: "enter your password",
        },
      },

      async authorize(credentials) {
        const response = await fetch(
          "https://ecommerce.routemisr.com/api/v1/auth/signin",
          {
            method: "POST",
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          },
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Login failed");
        }

        const decoded = jwtDecode(data.token);

  

        const userId =
          (decoded as any).id ??
          (decoded as any)._id ??
          data.user?._id ??
          data.user?.id;

    

        if (!userId || userId === "undefined") {
          throw new Error("User ID is missing");
        }

        return {
          id: String(userId),
          email: data.user.email,
          name: data.user.name,
          token: data.token,
        };
      },
    }),
  ],
  pages: {
    signIn: "/Login",
  },
  callbacks: {
    // servsr
    jwt({ user, token }) {
      if (user) {
        token.id = (user as any).id;
        token.token = user.token;
      }
      return token;
    },
    // }client
    session({ token, session }) {
      if (token) {
        session.user.id = String(token.id);
      }
      return session;
    },
  },
};
