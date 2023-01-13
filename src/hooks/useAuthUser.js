import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export function useAuthUser() {
  const { loaded, setLoaded, user, setUser } = useContext(AuthContext);

  return {
    loaded,
    setLoaded,
    user,
    setUser,
  };
}