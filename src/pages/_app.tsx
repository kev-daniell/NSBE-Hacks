import "@/styles/globals.css";
import type { AppProps } from "next/app";
import AppLayout from "@/components/AppLayout";
import { AuthContext } from "@/hooks/context";
import { User } from "firebase/auth";
import { useEffect, useState } from "react";
import authClient from "@/firebase/firebase";

export default function App({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => authClient.onAuthStateChanged(setUser), []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <AppLayout />
      <Component {...pageProps} />
    </AuthContext.Provider>
  );
}
