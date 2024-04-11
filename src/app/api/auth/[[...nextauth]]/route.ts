import NextAuth from "next-auth/next";
import Github from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
    providers: [
        Github({
            clientId: process.env.GITHUB_ID ?? "",
            clientSecret: process.env.GITHUB_SECRET ?? "",
        }),
        CredentialsProvider({
            name: "Admin",
            credentials: {
              username: { label: "Username", type: "text", placeholder: "admin" },
              password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                if (credentials.username === "admin" && credentials.password === "admin") {
                    return Promise.resolve({ email: "admin" }); 
                } else {
                    return Promise.resolve(null);
                }
            }
          })
    ]
}

export const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }