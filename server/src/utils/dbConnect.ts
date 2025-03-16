import mongoose from "mongoose";
import config from "config";

const dbUrl : string = config.get<string>("DB_URL") 

const dbConnect = async (): Promise<void> =>{
    try {
        await mongoose.connect(dbUrl);
        console.log("DB connect successfully")
    } catch (error) {
        console.log(error)
    }
}
dbConnect()