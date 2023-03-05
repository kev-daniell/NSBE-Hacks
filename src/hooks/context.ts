import { createContext } from "react";
import { User } from "firebase/auth";

type UserContext = {
  user: User | undefined;
  setUser: Function;
};

export const AuthContext = createContext<UserContext | undefined>(undefined);
