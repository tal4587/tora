import { NextFunction, Request, Response } from "express";
import books from "../constants/books";
import Invite from "../models/invite";
import Reading from "../models/reading";

export const getAllReadings = async (req: Request, res: Response, next: NextFunction) => {
    try {

        // Search Functionality
        let query = {};
        if(req.query.search) {
            const keyword = new RegExp(req.query.search.toString(), 'i');
            query = { $or: [{ email: keyword }, { name: keyword }] };
        }
        
        const total = await Reading.countDocuments();
        const reading = await Reading.find(query);
        const count = reading.length;

        res.json({ success: true, reading, total, count })
    } catch (error) {
        next({ status: 404, message: "Cannot find Readings"})
    }
}

export const createReading = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let reading = await Reading.create(req.body);

        let invites: { reading: string, book: number, chapter: number, verse?: number, status: string }[] = [];
        if(reading.readBy === "chapter") {
            books.forEach((book) => {
                invites.push(...book.chapters.map((chapter) => ({
                    reading: reading.id,
                    book: book.id,
                    chapter: chapter.id,
                    status: "unread",
                })))
            })
        } else {
            books.forEach((book) => {
                book.chapters.forEach((chapter) => {
                    invites.push(...Array.from({ length: chapter.verseCount }, (_, id) => ({
                        reading: reading.id,
                        book: book.id,
                        chapter: chapter.id,
                        verse: id,
                        status: "unread"
                    })))
                })
            });
        }

        await Invite.insertMany(invites);

        res.status(201).json({ success: true, reading });
    } catch (error) {
        next({ status: 404, message: "Cound Not Create Reading"})
    }
}

export const getReading = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        let reading = await Reading.findById(id);
        if(!reading){
            return next({ status: 404, message: "Not Found", detail: "The provided Reading Id does not exist"})
        }
        res.json({ success: true, reading })
    } catch (error) {
        next({ status: 404, message: "Invalid Reading", detail: "The provided Reading Id does not exist"})
    }
}

export const updateReading = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const reading = await Reading.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if(!reading){
            return next({ status: 404, message: "Not Found", detail: "The provided Reading Id does not exist"})
        }
        res.json({ success: true, reading })
    } catch (error) {
        next({ status: 404, message: "Not Found", detail: "The provide Reading Id does not exist"})
    }
}

export const deleteReading = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const reading = await Reading.findByIdAndDelete(req.params.id);
        if(!reading){
            return next({ status: 404, message: "Not Found", detail: "The provided Reading Id does not exist"})
        }
        res.json({ success: true, reading });
    } catch (error) {
        next({ status: 404, message: "Not Found", detail: "The provide Reading Id does not exist"})
    }
}