import leafstore from "leafstore-db";
import InAppNotificationSchema from "./schemas/InAppNotification";

const db = new leafstore("festify-db");

const InAppNotification = db.Model(
  "InAppNotification",
  InAppNotificationSchema
);

try {
  await db.connect();
  console.log("Connected to database");
} catch (err) {
  console.error(err);
}

export { InAppNotification };