
import admin from "../firebaseAdmin.js"; 

export default async function verifyToken(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized: No token" });
    }

    const token = authHeader.split(" ")[1]; 

    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken; 

    next();
  } catch (err) {
    console.log("verifyToken Error:", err);
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
}
