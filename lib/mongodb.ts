"use server";

import { MongoClient } from "mongodb"

// type initial for the client
let client: MongoClient | null = null

// db type initial
let db: any = null;

// this function is used for the connect db
export async function connectDB() {
    if(db){
        return db
    }

    try{
        // process.env.mongodb_url come form the env file
        client = new MongoClient(process.env.MONGODB_URI!);
        await client.connect();

        // process.env.mongodb_db come form the env file and the mongodb_db is the name of my db
        db = client.db(process.env.MONGODB_DB);
        
        return db;
    }catch(error){
        
        throw error;

    }
}


// this is the main function for connected the mongodb
export async function getDB(){
    if(!db){
        await connectDB();
    }
    return db;
}

export async function closeDB() {
    if(client){
        await client.close()
        client = null
        db= null
    }
}