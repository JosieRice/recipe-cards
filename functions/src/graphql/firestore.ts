import admin from "firebase-admin";
import * as functions from "firebase-functions";

const auth: any = {
  type: functions.config().firestore.type,
  project_id: functions.config().firestore.project_id,
  private_key_id: functions.config().firestore.private_key_id,
  private_key: functions.config().firestore.private_key.replace(/\\n/g, "\n"),
  client_email: functions.config().firestore.client_email,
  client_id: functions.config().firestore.client_id,
  auth_uri: functions.config().firestore.auth_uri,
  token_uri: functions.config().firestore.token_uri,
  auth_provider_x509_cert_url: functions.config().firestore
    .auth_provider_x509_cert_url,
  client_x509_cert_url: functions.config().firestore.client_x509_cert_url
};

admin.initializeApp({
  credential: admin.credential.cert(auth)
});

const db = admin.firestore();

export default db;
