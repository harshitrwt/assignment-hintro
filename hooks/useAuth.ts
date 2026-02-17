"use client";

import { useApp } from "@/context/AppContext";

export function useAuth() {
  const { state, dispatch } = useApp();

  const login = (email: string, password: string, rememberMe: boolean = false) => {
    if (email === "intern@demo.com" && password === "intern123") {
      dispatch({
        type: "LOGIN",
        payload: { email, isAuthenticated: true, rememberMe },
      });
      return true;
    }
    return false;
  };

  const logout = () => dispatch({ type: "LOGOUT" });

  return {
    user: state.user,
    login,
    logout,
    isAuthenticated: !!state.user?.isAuthenticated,
  };
}
