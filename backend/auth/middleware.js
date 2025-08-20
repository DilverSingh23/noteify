import admin from "./firebase.js"

const verifyToken = async(req, res, next) => {
    const idToken = req.headers.authorization?.split("Bearer ")[1]
    try {
        const decodedToken = await admin.auth().verifyIdToken(idToken)
        req.user = decodedToken
        next()
    } catch(err){
        console.error("Error authorizing token: ", err)
        res.status(401).json({ error: "Unauthorized token" })
    }
}

export default verifyToken