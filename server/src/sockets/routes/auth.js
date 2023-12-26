const SocketRouter = require("../router");
const router = new SocketRouter();
const AuthController = require("../controllers/auth");

router.type("connect", AuthController.connect);

module.exports = router;
