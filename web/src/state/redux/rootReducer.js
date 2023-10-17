import eventsReducer from "./events/eventsSlice";
import authReducer from "./auth/authSlice";

const rootReducer = {
  events: eventsReducer,
  auth: authReducer,
};

export default rootReducer;
