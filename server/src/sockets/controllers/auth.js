const { verifyAccessToken } = require("../../utils/token");
const { addClient } = require("../clients");

class AuthController {
  static async connect(payload, ws, wss) {
    const { token } = payload;
    const user = verifyAccessToken(token);
    if (!user) {
      ws.send(JSON.stringify(["error", "Invalid token"]));
      return ws.close();
    }
    const { _id } = user;
    addClient(_id, ws);
    console.log(`Client ${_id} connected`);
  }
}

module.exports = AuthController;
