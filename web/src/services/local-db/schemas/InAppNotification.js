import leafstore from "leafstore-db";

const InAppNotificationSchema = leafstore.Schema({
  title: leafstore.SchemaTypes.String,
  body: leafstore.SchemaTypes.String,
  url: leafstore.SchemaTypes.String,
  read: leafstore.SchemaTypes.Boolean,
  timestamp: leafstore.SchemaTypes.Date,
  readAt: leafstore.SchemaTypes.Date,
});

export default InAppNotificationSchema;
