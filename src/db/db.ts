import { Collection, Db, InsertOneResult, MongoClient } from "mongodb";
import Message from "./model/Message";

let singletonDB: Db;
let singletonCollection: Collection<Message>;

async function databaseConnect(): Promise<Db> {
  if (singletonDB) return singletonDB;

  const client = new MongoClient(process.env.MONGO_HOST as string);
  await client.connect();

  singletonDB = client.db(process.env.MONGO_DATABASE as string);

  console.log("Database connect success!".green);

  return singletonDB;
}

async function getDatabaseCollection(): Promise<Collection<Message>> {
  if (singletonCollection) return singletonCollection;

  const db: Db = await databaseConnect();

  singletonCollection = db.collection(process.env.MONGO_DOCUMENT as string);

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

export async function getSize() {
  console.log("Request: Stats indexSize".yellow);
  const { objects, indexSize } = await (await databaseConnect()).stats();
  return { objects, indexSize };
}
