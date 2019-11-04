const admin = require("firebase-admin");
let productionServiceAccont = require("../../credentials/production-service-account.json");
let stagingServiceAccount = require("../../credentials/staging-service-account.json");

const env = () => {
  if (process.env.ENV === "STAGING" || process.env.ENV === "DEV") {
    return stagingServiceAccount;
  } else {
    return productionServiceAccont;
  }
};

admin.initializeApp({
  credential: admin.credential.cert(env())
});

let db = admin.firestore();

module.exports = db;
