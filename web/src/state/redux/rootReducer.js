import api from "./api";
import configReducer from "./config/configSlice";
import eventsReducer from "./events/eventsSlice";
import authReducer from "./auth/authSlice";

const rootReducer = {
  [api.reducerPath]: api.reducer,
  events: eventsReducer,
  auth: authReducer,
  config: configReducer,
};

export default rootReducer;
