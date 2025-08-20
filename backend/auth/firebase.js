import admin from "firebase-admin"
import serviceAccount from "./firebaseService.json"

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})

export default admin