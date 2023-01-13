import React, { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import { userQuery } from "../utils/data";
import { client } from "../client";


export const AuthContext = React.createContext({
  user: null,
  loaded: false,
  setLoaded: () => null,
  setUser: () => null,
});

export function useFetchAuthUser() {
  const [loaded, setLoaded] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userToken = localStorage.getItem("user");
    if (!userToken) {
      setLoaded(true);
      return;
    }

    const userDecoded = jwtDecode(userToken);
    const query = userQuery(userDecoded.sub);
    client.fetch(query)
      .then((data) => {
        setUser(data[0]);
      })
      .finally(() => {
        setLoaded(true);
      });
  }, []);

  return {
    loaded,
    setLoaded,
    user,
    setUser,
  };
}

export function AuthProvider({ children }) {
  const { user, loaded, setLoaded, setUser } = useFetchAuthUser();

  return (
    <AuthContext.Provider value={{
      user,
      loaded,
      setLoaded,
      setUser,
    }}>
      {children}
    </AuthContext.Provider>
  );
}