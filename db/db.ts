import { Collection, Db, InsertOneResult, MongoClient } from "mongodb";
import Message from "./model/Message";
import getEnv from "../utils/getEnvVar";
import * as dotenv from "dotenv";

export * from "colors";

dotenv.config();

let singletonDB: Db;
let singletonCollection: Collection<Message>;

async function databaseConnect(): Promise<Db> {
  if (singletonDB) return singletonDB;

  const client = new MongoClient(getEnv("MONGO_HOST"));
  await client.connect();

  singletonDB = client.db(getEnv("MONGO_DATABASE"));

  console.log("Database connect success!".green);

  return singletonDB;
}

async function getDatabaseCollection(): Promise<Collection<Message>> {
  if (singletonCollection) return singletonCollection;

  const db: Db = await databaseConnect();

  singletonCollection = db.collection(getEnv("MONGO_DOCUMENT"));

  return singletonCollection;
}

export async function getMessages(): Promise<Message[]> {
  console.log("Request: Get Messages".yellow);
  return (await getDatabaseCollection()).find({}).toArray();
}

export async function insertMessage(
  message: string,
): Promise<InsertOneResult<Message>> {
  console.log("Request: Insert Message".yellow);
  return (await getDatabaseCollection()).insertOne({ message });
}
