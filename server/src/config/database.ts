import mongoose from "mongoose";

const connectDatabase = () => {

    const DB_URI:string = process.env.DB_URI || "mongodb://127.0.0.1:27017/tora";

    mongoose.connect(DB_URI, {})
        .then(() => {
            console.log("[DATABASE] ✨✨ Connected!!");
        })
        .catch((err: Error) => {
            console.log("[DATABASE] ❌❌ Error Occured: ", err.message);
        });
}

export default connectDatabase;