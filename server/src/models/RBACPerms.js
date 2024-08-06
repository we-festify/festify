const mongoose = require("mongoose");
const { actions } = require("../config/permissions");

const RBACPermsSchema = new mongoose.Schema({
  role: {
    type: String,
    required: true,
    unique: true,
    enum: ["admin", "organiser", "user", "guest"],
  },
  permissions: {
    type: [String],
    required: true,
    default: [],
    validate: {
      validator: (v) => v.every((perm) => actions.includes(perm)),
      message: (props) => `${props.value} is not a valid permission!`,
    },
  },
});

/**
 * @param {mongoose.Connection} db
 */
module.exports = (db) => db.model("RBACPerms", RBACPermsSchema);
