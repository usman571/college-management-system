// import { NextAuthConfig } from 'next-auth';
// import CredentialProvider from 'next-auth/providers/credentials';
// import GithubProvider from 'next-auth/providers/github';

// const authConfig = {
//   providers: [
//     GithubProvider({
//       clientId: process.env.GITHUB_ID ?? '',
//       clientSecret: process.env.GITHUB_SECRET ?? ''
//     }),
//     CredentialProvider({
//       credentials: {
//         email: {
//           type: 'email'
//         },
//         password: {
//           type: 'password'
//         }
//       },
//       async authorize(credentials, req) {
//         if (process.env.NEXT_PUBLIC_FAKE_LOGIN === 'true') {
//           return { id: '1', name: 'Admin', email: 'dummy@admin.com' };
//         }
//         const user = {
//           id: '1',
//           name: 'John',
//           email: credentials?.email as string
//         };
//         if (user) {
//           // Any object returned will be saved in `user` property of the JWT
//           return user;
//         } else {
//           // If you return null then an error will be displayed advising the user to check their details.
//           return null;

//           // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
//         }
//       }
//     })
//   ],
//   pages: {
//     signIn: '/' //sigin page
//   }
// } satisfies NextAuthConfig;

// export default authConfig;

import { NextAuthConfig } from 'next-auth';
import CredentialProvider from 'next-auth/providers/credentials';
import { User } from 'next-auth';

const authConfig = {
  providers: [
    CredentialProvider({
      credentials: {
        email: { type: 'email' }
      },
      async authorize(credentials): Promise<User | null> {
        // Always return a dummy user for testing
        const user: User = {
          id: '1',
          name: 'Test User',
          email: credentials?.email as string
        };
        return user;
      }
    })
  ],
  pages: {
    signIn: '/'
  },
  callbacks: {
    redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith('/')) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    }
  }
} satisfies NextAuthConfig;

export default authConfig;
