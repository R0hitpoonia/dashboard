import { sleep } from "@/lib/sleep";
import {
  useLoginUserMutation,
  useLogoutUserMutation,
} from "@/redux/api/authApi";
import { useLazyGetUserQuery } from "@/redux/api/userApi";
import * as React from "react";

export interface AuthContext {
  isAuthenticated: boolean;
  login: ({ email, pass }: { email: string; pass: string }) => Promise<void>;
  logout: () => Promise<void>;
  token: string | null;
  user: { name: string; profilePhoto: string } | null;
  loading: boolean;
}

const AuthContext = React.createContext<AuthContext | null>(null);

const key = "token";

function getStoredToken() {
  return localStorage.getItem(key);
}

function setStoredToken(user: string | null) {
  if (user) {
    localStorage.setItem(key, user);
  } else {
    localStorage.removeItem(key);
  }
}

async function getUserApi(token: string | null) {
  if (!token) return null;
  else {
    return { name: "Rohit", profilePhoto: "" };
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = React.useState<string | null>(getStoredToken());
  const [loading, setLoading] = React.useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] =
    React.useState<boolean>(!!token);
  const [user, setUser] = React.useState<{
    name: string;
    profilePhoto: string;
  } | null>(null);
  const [loginUser] = useLoginUserMutation();
  const [getUser] = useLazyGetUserQuery();
  const [logoutUser] = useLogoutUserMutation();

const logout = React.useCallback(async () => {
  try {
    await sleep(250);
    const result = await logoutUser();
    if (result.data) {
      setUser(null);
      setStoredToken(null);
      setToken(null);
      setIsAuthenticated(false);
    }
  } catch (error) {
    console.error(error);
  }
}, [logoutUser]);
// [logoutUser] is a destructured array containing the logoutUser mutation function from the useLogoutUserMutation hook.
// The empty dependency array [] means the useCallback function will only be recreated when the component mounts,
// and not on every render. This prevents the creation of a new function reference on every render,
// which can cause issues with dependencies and memoization.
  
  // const logout = React.useCallback(async () => {
  //   await sleep(250);
  //   //logout query
  //   logoutUser();
  //   setUser(null);
  //   setStoredToken(null);
  //   setToken(null);
  // }, []);

  const login = React.useCallback(
    async ({ email, pass }: { email: string; pass: string }) => {
      try {
        setLoading(true);
        const result = await loginUser({ email: email, password: pass });
        if (result.data) {
          const token = result.data.token;
          const user = await getUserApi(token);
          setUser(user);
          setStoredToken(token);
          setToken(token);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    },
    [loginUser, getUserApi],
  );
  // const login = React.useCallback(
  //   async ({ email, pass }: { email: string; pass: string }) => {
  //     await sleep(500);
  //     //login query
  //     loginUser({ email: email, password: pass });

  //     setUser(await getUserApi(pass)); //will get user from query
  //     setStoredToken(email); //will get token from query
  //     setToken(email); //will get token from query
  //   },
  //   [],
  // );
  React.useEffect(() => {
    const handleGetUser = async () => {
      setLoading(true);
      setToken(getStoredToken());
      try {
        const result = await getUser(null);
        if (result.data) {
          setUser(result.data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    handleGetUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, token, login, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
