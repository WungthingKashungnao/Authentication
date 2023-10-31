import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

export const options = {
  providers: [
    GitHubProvider({
      // profile logic start
      profile(profile) {
        console.log("Github Profile", profile);

        // updating user role
        let userRole = "Github User";
        if (profile?.email === "wungthingkashungnao123@gmail.com") {
          userRole = "admin";
        }

        return {
          ...profile,
          role: userRole,
        };
      },
      // profile logic end
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      // profile logic start
      profile(profile) {
        console.log("Google Profile", profile);

        return {
          ...profile,
          id: profile.sub,
          //   role: userRole,
        };
      },
      // profile logic end
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.role = token.role;
      }
      return session;
    },
  },
};
