import { NextFunction, Request, Response } from "express";
import Invite from "../models/invite";
import Reading from "../models/reading";

export const getMetaData = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const readingCount = await Reading.countDocuments();
    const invitesCount = (await Invite.find({ status: "read" })).length;
    const result = await Invite.aggregate([
      {
        $match: {
          status: 'read'
        }
      },
      {
        $lookup: {
          from: 'readings',
          localField: 'reading',
          foreignField: '_id',
          as: 'readingData'
        }
      },
      {
        $unwind: '$readingData'
      },
      {
        $match: {
          'readingData.readBy': { $in: ['chapter', 'verse'] }
        }
      },
      {
        $group: {
          _id: '$readingData.readBy',
          count: { $sum: 1 }
        }
      }
    ]);

    const counts = { ChapterCount: 0, VerseCount: 0, readingCount, invitesCount };

    result.forEach((item: { _id: string; count: number }) => {
      if (item._id === 'chapter') {
        counts.ChapterCount = item.count;
      } else if (item._id === 'verse') {
        counts.VerseCount = item.count;
      }
    });

    res.json(counts);

  } catch (error) {
    next({ status: 404, message: "Not Found", detail: "No Data found" })
  }
}