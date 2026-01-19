import type { NextAuthOptions } from "next-auth";
import { connectDB } from "./lib/mongodb";
import {
  createduserFromAuth,
  findB2BUserByEmail,
  findB2BUserById,
  findUserByEmail,
} from "./lib/user.service";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import Facebook from "next-auth/providers/facebook";
import bcrypt from "bcrypt";

export const authConfig: NextAuthOptions = {
  providers: [
    // Credentials({
    //   credentials: {
    //     email: { label: "Email", type: "text", placeholder: "you@example.com" },
    //     profile_id: { label: "profile_id", type: "text", placeholder: "Enter b2b-profile-id" },
    //     password: { label: "Password", type: "password" },
    //   },
    //   async authorize(credentials, req) {
    //     if (!credentials?.email || !credentials.password) {
    //       return null;
    //     }

    //     await connectDB();
    //     const user = await findUserByEmail(credentials.email);

    //      if (user && user.password) {
    //        const passwordMatch = await bcrypt.compare(
    //          credentials.password,
    //          user.password
    //        );

    //        if (!passwordMatch) return null;

    //        return {
    //          id: user._id.toString(),
    //          email: user.email,
    //          name: user.username,
    //          username: user.username,
    //          phone: user.phone,
    //          userRole: user.userRole, // "user"
    //          source: "users",
    //        } as any;
    //      }

    //     // if (user && user.password) {
    //     //   const passwordMatch = await bcrypt.compare(
    //     //     credentials.password,
    //     //     user.password
    //     //   );

    //     //   if (!passwordMatch) {
    //     //     return null;
    //     //   }

    //     //   // ensure id is a string to satisfy NextAuth User type
    //     //   return {
    //     //     id: user._id.toString(),
    //     //     email: user.email,
    //     //     name: user.username,
    //     //     username: user.username,
    //     //     phone: user.phone,
    //     //     userRole: user.userRole,
    //     //   } as any;
    //     // }

    //     // 2️⃣ Try B2B user
    //     // const b2bUser = await findB2BUserByEmail(credentials.email);
    //     const b2bProfileId = await findB2BUserById(credentials.profile_id)

    //     if (b2bProfileId && b2bProfileId.password) {
    //       const passwordMatch = await bcrypt.compare(
    //         credentials.password,
    //         b2bProfileId.password
    //       );

    //       if (!passwordMatch || !b2bProfileId.isActive) return null;

    //       return {
    //         id: b2bProfileId._id.toString(),
    //         email: b2bProfileId.email,
    //         name: b2bProfileId.userName,
    //         phone: b2bProfileId.phone,
    //         userRole: "b2b",
    //         source: "b2b_users",
    //       } as any;
    //     }
    //   },
    // }),

    Credentials({
      id: "credentials-user",
      name: "User Login",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {

        if (!credentials?.email || !credentials.password) {
          return null;
        }

        await connectDB();
        const user = await findUserByEmail(
          credentials.email.toLowerCase()
        );

        if (!user) {
          return null;
        }

        if (!user.password) {
          return null;
        }

        if (!user || !user.password) {
          return null;
        }

        const ok = await bcrypt.compare(credentials.password, user.password);

        if (!ok) {
          return null;
        }

        if (!ok) return null;

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.username,
          username: user.username,
          phone: user.phone,
          userRole: user.userRole,
          source: "users",
        } as any;
      },
    }),

    Credentials({
      id: "credentials-b2b",
      name: "B2B Login",
      credentials: {
        profile_id: { label: "B2B Profile ID", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.profile_id || !credentials.password) return null;

        await connectDB();

        const b2b = await findB2BUserById(credentials.profile_id);

        if (!b2b || !b2b.password || !b2b.isActive) return null;

        const ok = await bcrypt.compare(credentials.password, b2b.password);

        if (!ok) return null;

        return {
          id: b2b._id.toString(),
          email: b2b.email,
          name: b2b.userName,
          phone: b2b.phone,
          userRole: "b2b",
          source: "b2b_users",
        } as any;
      },
    }),

    Google({
      clientId: process.env.GOOGLE_ID || "",
      clientSecret: process.env.GOOGLE_SECRET || "",
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    Facebook({
      clientId: process.env.FACEBOOK_ID || "",
      clientSecret: process.env.FACEBOOK_SECRET || "",
    }),
  ],
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signup",
  },
  callbacks: {
    async jwt({ token, user, account }) {

       console.log("JWT CALLBACK:", { token, user, account });
      if (account && user) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.accessTokenExpires =
          Date.now() + (account.expires_in as any) * 1000;

        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.username = (user as any).username;
        token.phone = (user as any).phone;
        token.userRole = (user as any).userRole;

        return token;
      }

      if (Date.now() < (token.accessTokenExpires as number)) {
        return token;
      }
      if (Date.now() < (token.accessTokenExpires as number)) {
        return token;
      }

      if (token.refreshToken) {
        token = await refreshGoogleAccessToken(token);
      }

      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.phone = (user as any).phone;
        token.username = (user as any).username;
      }

      if (account?.provider === "google" || account?.provider === "facebook") {
        await connectDB();
        const existingUser = await findUserByEmail((token as any).email);

        if (!existingUser) {
          const newUser = await createduserFromAuth({
            email: (token as any).email,
            username:
              (user as any)?.name || ((token as any).email || "").split("@")[0],
            provider: account.provider,
            userRole: "user",
          });

          (token as any).id = newUser._id.toString();
          (token as any).username = newUser.username;
        } else {
          (token as any).id = existingUser._id.toString();
          (token as any).username = existingUser.username;
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = (token as any).id as string;
        session.user.email = (token as any).email;
        (session.user as any).phone = (token as any).phone;
        (session.user as any).username = (token as any).username;
        (session.user as any).userRole = (token as any).userRole;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
};

async function refreshGoogleAccessToken(token: any) {
  try {
    const url =
      "https://oauth2.googleapis.com/token?" +
      new URLSearchParams({
        client_id: process.env.GOOGLE_ID!,
        client_secret: process.env.GOOGLE_SECRET!,
        grant_type: "refresh_token",
        refresh_token: token.refreshToken,
      });

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });

    const refreshedTokens = await res.json();

    if (!res.ok) throw refreshedTokens;

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken,
    };
  } catch (error) {
    console.error("Error refreshing access token", error);
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}
