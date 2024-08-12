import leafstore from "leafstore-db";
import InAppNotificationSchema from "./schemas/InAppNotification";

const db = new leafstore("festify-db");

try {
  await db.connect();
  console.log("Local Database connected");
} catch (err) {
  console.error(err);
}

const InAppNotification = db.Model(
  "InAppNotification",
  InAppNotificationSchema
);

export { InAppNotification };
