import api from "./api";
import configReducer from "./config/configSlice";
import authReducer from "./auth/authSlice";

const rootReducer = {
  [api.reducerPath]: api.reducer,
  auth: authReducer,
  config: configReducer,
};

export default rootReducer;
