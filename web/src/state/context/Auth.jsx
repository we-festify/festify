import { useRefreshMutation } from "../redux/auth/authApi";
import { clearCredentials, setCredentials } from "../redux/auth/authSlice";
import { createContext, useContext, useEffect } from "react";
import { useDispatch } from "react-redux";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

function AuthProvider({ children }) {
  const [refresh, { isLoading }] = useRefreshMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    refresh({})
      .unwrap()
      .then((data) => {
        dispatch(setCredentials(data));
      })
      .catch(() => {
        dispatch(clearCredentials());
      });
  }, [dispatch, refresh]);

  const value = {
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
