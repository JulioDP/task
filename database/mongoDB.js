import { MongoClient, ServerApiVersion } from "mongodb";
import { config } from "../config/config.js";
import ErrorGeneral from "../error/error.js";

const client = new MongoClient(config.urlMongoDB, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const connectToDatabase = async () => {
  try {
    await client.connect();
    console.log('ejecutando')
    const db = client.db(config.databaseMongoDB);
    return db;
  } catch (error) {
    throw new ErrorGeneral('Error de conexion de DB');
  }
};

const closeDB = async() => {
  try {
    await client.close();
    console.log("Client closed")
  } catch (error) {
    throw new Error ("Failed to close database connection");
  }
}

export {
  connectToDatabase,
  closeDB
} 
