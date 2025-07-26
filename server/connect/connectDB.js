import mongoose from "mongoose";

const connectDB = async () =>{
    try {
        await mongoose.connect(process.env.MONGO_DB_URL);
        console.log("Connect to MongoDB server");
    } catch (error) {
        console.log("Error connecting to MongoDb Server", error.message);
    }
}

export default  connectDB;