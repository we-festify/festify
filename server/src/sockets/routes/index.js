const SocketRouter = require("../router");
const router = new SocketRouter();

// socket message handlers
router.use("auth", require("./auth"));

module.exports = router;
