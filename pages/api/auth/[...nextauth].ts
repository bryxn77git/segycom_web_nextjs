
import { NextApiRequest } from "next";
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import GithubProvider from "next-auth/providers/github"
import { dbUsers } from "../../../database";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
  }
}

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    Credentials({
      name: 'Custom Login',
      credentials: {
        email: {label: 'Correo', type: 'email', placeholder: 'correo@google.com'},
        password: { label: 'Contraseña', type: 'password', placeholder: 'Contraseña'}
      },
      async authorize(credentials):Promise<any> {

        return await dbUsers.checkUserEmailPassword( credentials!.email, credentials!.password );

      }
    }),
    // GithubProvider({
    //   clientId: process.env.GITHUB_ID!,
    //   clientSecret: process.env.GITHUB_SECRET!,
    // }),
    // ...add more providers here
  ],

  pages: {
    signIn: '/auth/login',
  },

  session:{
    maxAge: 2592000, //30 dias
    strategy: 'jwt',
    updateAge: 86400, //cada dia
  },

  callbacks: {
        async jwt({ token, account, user }){
    
          if( account ){
            token.accessToken = account.access_token;
    
            switch( account.type ){
    
              case 'oauth':
                token.user = await dbUsers.oAuthToDbUser( user?.email || '', user?.name || '');
              break;
    
              case 'credentials':
                token.user = user;
              break;
            }
          }
    
          return token;
        },
    
        async session({ session, token, user, }){
    
          session.accessToken = token.accessToken as any;
          session.user = token.user as any;
          return session;
        }
      }

});



// import NextAuth from "next-auth"
// import Credentials from "next-auth/providers/credentials"
// import { dbUsers } from "../../../database";

// export default NextAuth({
//   // Configure one or more authentication providers
//   providers: [
    
//     // ...add more providers here
    
//     Credentials({
//       name: 'Custom Login',
//       credentials: {
//         email: {label: 'Correo', type: 'email', placeholder: 'correo@google.com'},
//         password: { label: 'Contraseña', type: 'password', placeholder: 'Contraseña'}
//       },
//       async authorize(credentials) {

//         return await dbUsers.checkUserEmailPassword( credentials!.email, credentials!.password )

//       }
//     }),
//     // GoogleProvider({
//     //     clientId: process.env.GOOGLE_CLIENT_ID!,
//     //     clientSecret: process.env.GOOGLE_CLIENT_SECRET!
//     // })
//   ],

//   pages: {
//     signIn: '/auth/login',
//   },

//   session:{
//     maxAge: 2592000, //30 dias
//     strategy: 'jwt',
//     updateAge: 86400, //cada dia
//   },

//   jwt: {
//     // secret: process.env.JWT_SECRET_SEED,
//     // MAXaGE:8 * 60 * 60,
//   },

//   callbacks: {
//     async jwt({ token, account, user }){

//       if( account ){
//         token.accessToken = account.access_token;

//         switch( account.type ){

//           case 'oauth':
//             token.user = await dbUsers.oAuthToDbUser( user?.email || '', user?.name || '');
//           break;

//           case 'credentials':
//             token.user = user;
//           break;
//         }
//       }

//       return token;
//     },

//     async session({ session, token, user, }){

//       session.accessToken = token.accessToken;
//       session.user = token.user as any;
//       return session;
//     }
//   }
// });
