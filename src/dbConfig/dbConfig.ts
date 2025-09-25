import { error } from "console";
import mongoose from "mongoose";

export async function connectDB() {
    try {
        mongoose.connect(process.env.MONGODB_URL!);
        const connection = mongoose.connection;

        connection.on("connected", () => {
            console.log("mongodb connected successfully")
        })

        connection.on("error", () => {
            console.log("mongodb connected error, please make sure the MONGODB is running. ", error)
            process.exit()
        })
    } catch (error) {
        console.log('something went wrong');
        console.log(error)
    }
}