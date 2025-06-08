import { createContext, useContext, useEffect, useState } from "react";
import type { AuthContextType, JwtPayload } from "../interfaces/Auth";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const token = localStorage.getItem("token");
    if (!token) return false;

    try {
      const { exp } = jwtDecode<JwtPayload>(token);
      return exp * 1000 > Date.now();
    } catch {
      return false;
    }
  });

  const login = (token: string) => {
    localStorage.setItem("token", token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  const getToken = () => {
    const token = localStorage.getItem("token");
    if (!token) return null;

    try {
      const { exp } = jwtDecode<JwtPayload>(token);
      if (exp * 1000 < Date.now()) {
        logout();
        return null;
      }
      return token;
    } catch {
      logout();
      return null;
    }
  };

  useEffect(() => {
    getToken(); // auto logout on load
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, getToken }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);