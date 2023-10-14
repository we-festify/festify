import logo from "./logo.png";
import "./App.css";
import AppRoutes from "./routes/AppRoutes";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { refresh } from "./state/redux/auth/authActions";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refresh());
  }, [dispatch]);

  return (
    <div className="App">
      <AppRoutes />
    </div>
  );
}

export default App;
