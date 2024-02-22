import mongoose from "mongoose";

const invite = new mongoose.Schema({
    reading: {
        type: mongoose.Schema.ObjectId,
        ref: "Reading",
        required: true,
    },
    readBy: {
        type: { type: String, enum: ["chapter", "verse"]},
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
        type: { type: String, enum: ["unread", "reading", "read"]},
        required: true
    }
});

export default mongoose.model("Invite", invite);