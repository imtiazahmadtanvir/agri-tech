import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import { loginUser } from "@/app/action/auth/login";
import { NextAuthOptions } from "next-auth";

declare module "next-auth/jwt" {
    interface JWT {
        role?: string;
        isOAuth?: boolean;
        image?: string | null;
        isProfileComplete?: boolean;
        name?: string | null;
    }
}

declare module "next-auth" {
    interface User {
        id: string;
        name?: string | null;
        email?: string | null;
        image?: string | null;
        role?: string;
        isProfileComplete?: boolean;
    }

    interface Session {
        User: {
            id: string;
            name?: string | null;
            email?: string | null;
            image?: string | null;
            role?: string;
            firstName?: string;
            lastName?: string;
            isProfileComplete?: boolean;
        };
    }
}

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "Enter Email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials) return null;

                const { email, password } = credentials;
                const user = await loginUser({ email, password });

                if (user) {
                    return {
                        id: user._id,
                        name: user.name,
                        email: user.email,
                        role: user.role,
                        isProfileComplete: user.isProfileComplete,
                    };
                }
                return null;
            },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
    ],
    pages: {
        signIn: "/login",
    },
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async signIn({ user, account }) {
            if (account?.provider === "google" || account?.provider === "github") {
                const { providerAccountId, provider } = account;
                const { email, name, image } = user;
                const userCollection = await dbConnect(collectionNameObj.userCollection);
                const existingUser = await userCollection.findOne({ email });

                if (!existingUser) {
                    const payload = {
                        providerAccountId,
                        provider,
                        email,
                        name,
                        image,
                        role: "farmer",
                        isProfileComplete: false,
                    };
                    await userCollection.insertOne(payload);
                    user.role = "farmer";
                    user.image = image;
                    user.isProfileComplete = false;
                } else {
                    user.role = existingUser.role || "farmer";
                    user.image = existingUser.image || image;
                    user.isProfileComplete = existingUser.isProfileComplete || false;
                    user.name = existingUser.name || name;
                }
            }
            return true;
        },
        async jwt({ token, user, account }) {
            if (user) {
                token.id = user.id;
                token.name = user.name;
                token.email = user.email;
                token.role = user.role || "farmer";
                token.image = user.image ?? null;
                token.isProfileComplete = user.isProfileComplete ?? false;

                if (account?.provider === "google" || account?.provider === "github") {
                    token.isOAuth = true;
                } else if (account?.provider === "credentials") {
                    token.isOAuth = false;
                }

                const userCollection = await dbConnect(collectionNameObj.userCollection);
                const dbUser = await userCollection.findOne({ email: user.email });
                if (dbUser) {
                    token.role = dbUser.role || "farmer";
                    token.image = dbUser.image ?? user.image ?? null;
                    token.isProfileComplete = dbUser.isProfileComplete || false;
                    token.name = dbUser.name || user.name;
                }
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string;
                session.user.name = token.name ?? null;
                session.user.email = token.email ?? null;
                session.user.image = token.image ?? null;
                session.user.role = token.role || "farmer";
                session.user.isProfileComplete = token.isProfileComplete ?? false;

                if (!token.isOAuth) {
                    const userCollection = await dbConnect(collectionNameObj.userCollection);
                    const dbUser = await userCollection.findOne({ email: token.email });
                    if (dbUser) {
                        session.user.name = dbUser.name || token.name;
                    }
                }
            }
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
};