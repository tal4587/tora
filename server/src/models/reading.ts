import mongoose, { Types } from "mongoose";

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
    readBy: {
        type: String,
        enum: ["chapter", "verse"],
        required: true
    },
    readCount: {
        type: Number,
    },
    readingCount: {
        type: Number,
    },
    unreadCount: {
        type: Number,
    }
}, {
    timestamps: true,
    statics: {
        updateInviteCounts: async function (readingId: Types.ObjectId) {
            const result = await this.aggregate([
              { $match: { _id: readingId } },
              {
                $lookup: {
                  from: 'invites',
                  localField: '_id',
                  foreignField: 'reading',
                  as: 'invites',
                },
              },
              {
                $set: {
                  readCount: { $size: { $filter: { input: '$invites', as: 'invite', cond: { $eq: ['$$invite.status', 'read'] } } } },
                  unreadCount: { $size: { $filter: { input: '$invites', as: 'invite', cond: { $eq: ['$$invite.status', 'unread'] } } } },
                  readingCount: { $size: { $filter: { input: '$invites', as: 'invite', cond: { $eq: ['$$invite.status', 'reading'] } } } },
                },
              },
            ]);
          
            if (result.length > 0) {
              const { readCount, unreadCount, readingCount } = result[0];
              await this.findByIdAndUpdate(readingId, { readCount, unreadCount, readingCount });
            }
          }
    }
})


export default mongoose.model("Reading", reading);