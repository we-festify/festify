import FullPageLoading from "../../components/FullPageLoading";
import { useRefreshMutation } from "../redux/auth/authApi";
import { clearCredentials, setCredentials } from "../redux/auth/authSlice";
import { createContext, useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

function AuthProvider({ children }) {
  const [refresh, { isLoading }] = useRefreshMutation();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true); // for initial loading

  useEffect(() => {
    refresh({})
      .unwrap()
      .then((data) => {
        dispatch(setCredentials(data));
      })
      .catch(() => {
        dispatch(clearCredentials());
      })
      .finally(() => {
        setLoading(false);
      });
  }, [dispatch, refresh]);

  const value = {
    isLoading: isLoading || loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {loading ? <FullPageLoading /> : <>{children}</>}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
