import admin from "firebase-admin";
import fs from "fs";
import path from "path";


const __dirname = path.resolve();
const serviceAccountPath = path.join(__dirname, "serviceAccountKey.json");


const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, "utf-8"));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export default admin;
