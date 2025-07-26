import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { createGuest, getGuest } from "./data-service";

const authConfig = {
    providers: [
        Google({
            clientId: process.env.AUTH_GOOGLE_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET,
        }),
    ],
    callbacks: {
        authorized({auth}) {
            return !!auth?.user;
        },
        // While User SignIn If The User Is Already Exist In "Guests Table" Then Continue To Log In Else Then Insert This Guest In "Guests Table"  
        async signIn({user}) {
            try {
                const isExisting = await getGuest(user?.email);
                if (!isExisting) await createGuest({fullName: user?.name, email: user?.email});
                return true;
            }
            catch {
                return false;
            }
        },
        // To Get The Guest Id From DB If The Guest Is Already Exist And Insert It To The "Session Info"  
        async session({session}) {
            const guest = await getGuest(session?.user?.email)
            session.user.guestId = guest.id;
            return session;
        }
    },
    pages: {
        signIn:"/login"
    }
}
export const {
    auth,
    signIn,
    signOut,
    handlers: { GET, POST }} = NextAuth(authConfig);