import { MongoClient, ServerApiVersion } from "mongodb"
import dotenv from "dotenv"
dotenv.config()

const uri = process.env.ATLAS_URI
if (!uri) {
    throw new Error("Can not access MongoDB database.")
}
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
    }
})

try {
    await client.connect()
    await client.db("admin").command({ ping: 1 })
    console.log("Successfully connected to MongoDB")
} catch (err) {
    console.error(err)
}

let db = client.db("noteifyApp")

export default db