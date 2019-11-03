const admin = require("firebase-admin");
let serviceAccount = require("../../credentials/staging-service-account.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

let db = admin.firestore();

module.exports = db;
