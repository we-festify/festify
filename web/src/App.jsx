import "./App.css";
import AppRoutes from "./routes/AppRoutes";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getPermissions } from "./state/redux/config/configActions";
import { useRefreshMutation } from "./state/redux/auth/authApi";
import { clearCredentials, setCredentials } from "./state/redux/auth/authSlice";

function App() {
  const dispatch = useDispatch();
  const [refresh] = useRefreshMutation();

  useEffect(() => {
    refresh()
      .unwrap()
      .then((data) => {
        dispatch(setCredentials(data));
      })
      .catch(() => {
        dispatch(clearCredentials());
      });
    dispatch(getPermissions()); // get permissions on app load
  }, [dispatch, refresh]);

  return (
    <div className="App">
      <AppRoutes />
    </div>
  );
}

export default App;
