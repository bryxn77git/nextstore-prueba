import NextAuth from "next-auth"
import GoogleProvider from 'next-auth/providers/google'
import Credentials from "next-auth/providers/credentials"
import { dbUsers } from "../../../database";

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    
    // ...add more providers here
    
    Credentials({
      name: 'Custom Login',
      credentials: {
        email: {label: 'Correo', type: 'email', placeholder: 'correo@google.com'},
        password: { label: 'Contraseña', type: 'password', placeholder: 'Contraseña'}
      },
      async authorize(credentials) {

        return await dbUsers.checkUserEmailPassword( credentials!.email, credentials!.password )

      }
    }),
    GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    })
  ],

  pages: {
    signIn: '/auth/login',
    newUser: '/auth/register'
  },

  session:{
    maxAge: 2592000, //30 dias
    strategy: 'jwt',
    updateAge: 86400, //cada dia
  },

  jwt: {
    // secret: process.env.JWT_SECRET_SEED,
    // MAXaGE:8 * 60 * 60,
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

      session.accessToken = token.accessToken;
      session.user = token.user as any;
      return session;
    }
  }
});
