import { ObjectId } from "mongodb";

export default interface Message {
  _id?: ObjectId;
  message: string;
}
