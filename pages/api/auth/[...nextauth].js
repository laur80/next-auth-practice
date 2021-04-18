import NextAuth from "next-auth";
import Providers from "next-auth/providers";

import { verifyPassword } from "../../../lib/auth";
import { connectToDatabase } from "../../../lib/db";

export default NextAuth({
  //Use JSON Web Tokens for session instead of database sessions.
  // This option can be used with or without a database for users/accounts.
  // Note: `jwt` is automatically set to `true` if no database is specified.
  // in this function i handle all Db acces manualy (with this provider) BUT i setting to true EXplicitly  to be more obvios!!
  session: {
    jwt: true,
  },
  ///
  providers: [
    // OAuth authentication providers...
    Providers.Credentials({
      // STEp1 The name to display on the sign in form (e.g. 'Sign in with...')
      // name: 'Credentials',
      //Step2 if not manual created ?? The credentials is used to generate a suitable form on the sign in page
      // credentials: {
      //    username: { label: "Username", type: "text", placeholder: "jsmith" },
      //    password: {  label: "Password", type: "password" }
      //  },
      //step3 authorize provide your own logic here that takes the credentials
      async authorize(credentials) {
        const client = await connectToDatabase();
        const usersCollection = client.db().collection("users");
        const user = await usersCollection.findOne({
          email: credentials.email,
        });

        if (!user) {
          client.close();
          throw new Error("No user found!");
        }

        const isValid = await verifyPassword(
          credentials.password,
          user.password
        );

        if (!isValid) {
          client.close();
          throw new Error("Could not log you in!");
        }

        client.close();
        //create token with email...
        return { email: user.email };
      },
    }),
  ],
  // SQL or MongoDB database to persist users
});
