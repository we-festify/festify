import leafstore from "leafstore-db";
import InAppNotificationSchema from "./schemas/InAppNotification";

const db = new leafstore("festify-db");

const InAppNotification = db.Model(
  "InAppNotification",
  InAppNotificationSchema
);

db.connect()
  .then(() => {
    console.log("Connected to local database");
  })
  .catch((err) => {
    console.error("Error connecting to local database:", err);
  });

export { InAppNotification };
