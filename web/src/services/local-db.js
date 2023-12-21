import leafstore from "leafstore-db";

const db = new leafstore("festify-db");

const userSchema = leafstore.Schema({
  name: leafstore.SchemaTypes.String,
  email: leafstore.SchemaTypes.String,
  password: leafstore.SchemaTypes.String,
  isVerified: leafstore.SchemaTypes.Boolean,
});

const User = db.Model("User", userSchema);

try {
  await db.connect();
  console.log("Connected to database");
} catch (err) {
  console.error(err);
}

export default User;
