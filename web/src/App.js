import logo from "./logo.png";
import "./App.css";
import AppRoutes from "./routes/AppRoutes";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { refresh } from "./state/redux/auth/authActions";
import { getPermissions } from "./state/redux/config/configActions";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refresh()); // refresh token on app load
    dispatch(getPermissions()); // get permissions on app load
  }, [dispatch]);

  return (
    <div className="App">
      <AppRoutes />
    </div>
  );
}

export default App;
