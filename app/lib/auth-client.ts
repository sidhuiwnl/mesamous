import { createAuthClient } from "better-auth/react";


export const { signIn, signOut, signUp, useSession } = createAuthClient({
   baseURL: "http://localhost:3000"
});