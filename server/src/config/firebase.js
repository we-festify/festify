const firebaseAdmin = require("firebase-admin");
const serviceAccount = require("../secrets/festify-c3d37-firebase-adminsdk-5x6v1-eae1975872.json");

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
});

module.exports = firebaseAdmin;
