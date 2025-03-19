import { loginUser } from '@/app/action/auth/login';
import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth, { NextAuthOptions } from "next-auth";

import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "Enter Email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials) return null;

                const { email, password } = credentials;

                const user = await loginUser({ email, password });
                console.log(user);
                if (user) {
                    return {
                        id: user._id.toString(),
                        name: user.name,
                        email: user.email,
                    };
                }
                return null;
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string
        })
    ],
    pages: {
        signIn: "/login",
    },
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            // console.log('account info', account, 'user info', user);
            if (account) {
                const { providerAccountId, provider } = account
                const { email, image, name } = user
                const userCollection = await dbConnect(collectionNameObj.userCollection)
                const gUser = await userCollection.findOne({ providerAccountId })
                if (!gUser) {
                    const payload = {
                        providerAccountId, provider, email, image, name
                    }
                    await userCollection.insertOne(payload)
                }
            }
            return true
        }
    }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
