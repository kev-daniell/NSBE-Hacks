import { createContext } from "react";
import { User } from "firebase/auth";

export type UserContext = {
  user: User | null;
  setUser: Function;
};

export const AuthContext = createContext<UserContext | undefined>(undefined);
