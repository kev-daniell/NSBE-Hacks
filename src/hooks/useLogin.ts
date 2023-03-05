import { useContext, useState } from "react";
import authClient from "@/firebase/firebase";
import { AuthContext } from "./context";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { useRouter } from "next/router";

export default function useLogin() {
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const authContext = useContext(AuthContext);
  const googleProvier = new GoogleAuthProvider();
  const router = useRouter();

  const login = async (email: string, password: string) => {
    setError(null);
    setPending(true);
    try {
      const res = await signInWithEmailAndPassword(authClient, email, password);
      if (!res) {
        throw new Error("could not complete signup");
      }

      console.log(res);
      authContext?.setUser(res.user);

      // add display name to user
      setPending(false);
      setError(null);
      router.push("/");
    } catch (e) {
      console.log(e);
      const err = (e as Error).message;
      setError(err);
      setPending(false);
      console.log(err);
    }
  };

  return { error, pending, login };
}
