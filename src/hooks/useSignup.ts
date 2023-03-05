import { useContext, useState } from "react";
import authClient from "@/firebase/firebase";
import { AuthContext } from "./context";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  updateProfile,
} from "firebase/auth";
import { useRouter } from "next/router";

export default function useSignup() {
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const userContext = useContext(AuthContext);
  const router = useRouter();

  const signup = async (
    email: string,
    password: string,
    displayName: string
  ) => {
    setError(null);
    setPending(true);
    try {
      const res = await createUserWithEmailAndPassword(
        authClient,
        email,
        password
      );

      if (!res) {
        throw new Error("could not complete signup");
      }

      // add display name to usser
      await updateProfile(res.user, { displayName });

      userContext?.setUser(res.user);
      setPending(false);
      setError(null);
      router.push("/");
    } catch (e) {
      const err = (e as Error).message;
      setError(err);
      setPending(false);
      console.log(err);
    }
  };

  return { error, pending, signup };
}
