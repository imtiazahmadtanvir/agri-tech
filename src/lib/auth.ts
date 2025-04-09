
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import { loginUser } from "@/app/action/auth/login";
import { NextAuthOptions } from "next-auth";
declare module "next-auth/jwt" {
    interface JWT {
        role?: string;
        firstName?: string;
        lastName?: string;
        isOAuth?: boolean;
        image?: string | null;
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
                const { email, image } = user;
                const nameArr = user?.name?.split(" ") || []
                const lastName = nameArr[nameArr?.length - 1]
                const firstName = nameArr.slice(0, -1).concat("").join(" ")
                const userCollection = await dbConnect(collectionNameObj.userCollection);
                const existingUser = await userCollection.findOne({ email });

                if (!existingUser) {
                    const payload = {
                        providerAccountId,
                        provider,
                        email,
                        firstName,
                        lastName,
                        image,
                        role: "farmer",
                    };
                    await userCollection.insertOne(payload);
                    user.role = "farmer";
                    user.image = image;
                } else {
                    user.role = existingUser.role || "farmer";
                    user.image = existingUser.image || image;
                    user.firstName = firstName
                    user.lastName = lastName
                }
            }
            return true;
        },
        async jwt({ token, user, account }) {
            if (user) {
                token.id = user.id;
                token.email = user.email;
                token.role = user.role || "farmer";
                token.image = user.image ?? null;
                if (account?.provider === "google" || account?.provider === "github") {
                    token.isOAuth = true;
                } else if (account?.provider === "credentials") {
                    token.isOAuth = false;
                    token.firstName = user.firstName || "";
                    token.lastName = user.lastName || "";
                }
                const userCollection = await dbConnect(collectionNameObj.userCollection);
                const dbUser = await userCollection.findOne({ email: user.email });
                if (dbUser) {
                    token.role = dbUser.role || "farmer";
                    token.image = dbUser.image ?? user.image ?? null;
                    if (account?.provider === "credentials") {
                        token.firstName = dbUser.firstName || "";
                        token.lastName = dbUser.lastName || "";
                    }
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
                session.user.firstName = token.firstName || "";
                session.user.lastName = token.lastName || "";
            }
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
};