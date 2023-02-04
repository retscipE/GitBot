import { model, Schema, SchemaType, connect, set } from "mongoose";

export function startConnection(uri: string) {
    // Connect to the mongoose database and catch for errors
  connect(uri).catch((err) => console.error(err))
  set('strictQuery', true)
}