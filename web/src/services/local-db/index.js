import leafstore from "leafstore-db";
import InAppNotificationSchema from "./schemas/InAppNotification";

const db = new leafstore("festify-db");

// models
let InAppNotification;

const init = async () => {
  try {
    await db.connect();
    console.log("Local Database connected");
    InAppNotification = db.Model("InAppNotification", InAppNotificationSchema);
  } catch (err) {
    console.error(err);
  }
};

init();

export { InAppNotification };
