import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import User from "@/app/models/User";
import dbConnect from "@/app/lib/dbConnect";
const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.AUTH_GOOGLE_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET,
        }),
    ],
    callbacks: {
        async signIn({ user, account }) {
            if (account.provider === "google") {
                const { name, email, image } = user;
                await dbConnect();
                let existingUser = await User.findOne({ email });

                if (!existingUser) {
                    existingUser = await User.create({ name, email, imageUrl: image });
                }

                user.id = existingUser._id;
                user.isAdmin = existingUser.isAdmin;
                return true;
            }
            return false;
        },
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.isAdmin = user.isAdmin;
            }
            return token;
        },
        async session({ session, token }) {
            session.user.id = token.id;
            session.user.isAdmin = token.isAdmin;
            return session;
        },

    },
    session: {
        strategy: 'jwt',
    },
    pages: {
        signIn: '/auth/signin',
        signOut: '/auth/signout',
        error: '/auth/error',
        verifyRequest: '/auth/verify-request',
        newUser: null,
    },
    debug: true,
});

export { handler as GET, handler as POST };


