import mongoose from "mongoose";

const invite = new mongoose.Schema({
    reading: {
        type: mongoose.Schema.ObjectId,
        ref: "Reading",
        required: true,
    },
    readBy: {
        type: String,
        enum: ["chapter", "verse"],
        required: true
    },
    book: {
        type: Number,
        required: true
    },
    chapter: {
        type: Number,
        required: true
    },
    verse: {
        type: Number,
    },
    status: {
        type: String,
        enum: ["unread", "reading", "read"],
        default: "unread",
    }
});

export default mongoose.model("Invite", invite);