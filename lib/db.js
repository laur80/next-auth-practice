import { MongoClient } from "mongodb";

export async function connectToDatabase() {
  const dbURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_CLUSTERNAME}.gnpxe.mongodb.net/${process.env.DB_key}?retryWrites=true&w=majority`;
  const client = await MongoClient.connect(dbURI);
  return client;
}
