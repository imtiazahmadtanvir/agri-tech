import NextAuth, { NextAuthOptions, DefaultSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import { loginUser } from "@/app/action/auth/login";



declare module "next-auth/jwt" {
    interface JWT {
        role?: string;
        firstName?: string;
        lastName?: string;
        isOAuth?: boolean;
    }
}

declare module "next-auth" {
    interface Session {
        user: {
            id?: string;
            name?: string | null;
            email?: string | null;
            image?: string | null;
            role: string;
            firstName?: string;
            lastName?: string;
        } & DefaultSession["user"];
    }

    interface User {
        role?: string;
        firstName?: string;
        lastName?: string;
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
                console.log("Authorize user:", user);

                if (user) {
                    return {
                        id: user._id,
                        name: user.name,
                        email: user.email,
                        firstName: user.firstName,
                        lastName: user.lastName,
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
            console.log('Account provider:', account);
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
                    };
                    await userCollection.insertOne(payload);
                    user.role = "farmer";
                } else {
                    user.role = existingUser.role || "farmer";
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
                session.user.image = typeof token.image === 'string' ? token.image : null;
                session.user.role = token.role || "farmer";

                if (token.isOAuth) {

                    delete session.user.firstName;
                    delete session.user.lastName;
                } else {

                    session.user.firstName = token.firstName || "";
                    session.user.lastName = token.lastName || "";
                }
            }
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };