import mongoose from "mongoose";

declare global{
    var mongoose: {conn: null | typeof import('mongoose'),promise:null | Promise<typeof import('mongoose')>}
}

let mongoDbURI: any = process.env.MONGODB_URI

let cached = global.mongoose

if(!cached){
    cached = global.mongoose = {conn:null, promise:null}
}

async function connectDb() {
    if(cached.conn) return cached.conn

    cached.promise = mongoose.connect(mongoDbURI)
    cached.conn = await cached.promise

    return cached.conn

}

export default connectDb
