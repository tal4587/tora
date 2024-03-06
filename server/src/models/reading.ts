import mongoose from "mongoose";

const reading = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    readBy: {
        type: String,
        enum: ["chapter", "verse"],
        required: true
    },
})

export default mongoose.model("Reading", reading);