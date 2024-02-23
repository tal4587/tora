import { NextFunction, Request, Response } from "express";
import Invite from "../models/invite";

export const getAllInvites = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const total = await Invite.countDocuments();
        const invites = await Invite.find({}).populate("reading", "name");
        const count = invites.length;

        res.json({ success: true, invites, total, count });
    } catch (error) {
        next({ status: 404, message: "Not Found", detail: "No Invites found"})
    }
}

export const getAllInviteFromReading = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let query: 
            { reading: string, status?: string, book?: number, chapter?: number, verse?: number }
            = { reading: req.params.id };
        const { status, book, chapter, verse } = req.query;
        if(status) {
            if(["read", "reading", "unread"].includes(status.toString())) {
                query = { ...query, status: status.toString() }
            } else {
                return next({ status: 400, message: "Bad Request", detail: "Status is Invalid" })
            }
        }

        if(book) query = { ...query, book: Number.parseInt(book.toString())}
        if(chapter) query = { ...query, chapter: Number.parseInt(chapter.toString())}
        if(verse) query = { ...query, verse: Number.parseInt(verse.toString())}

        const total = await Invite.countDocuments();
        const invites = await Invite.find(query).populate("reading", "name");
        const count = invites.length;
        res.json({ success: true, invites, total, count })
    } catch (error) {
        next({ status: 404, message: "Not Found", detail: "No Reading found"})
    }
}

export const createInviteForReading = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let body = req.body;
        body = { ...body, reading: req.params.id};
        const invite = await Invite.create(body);
        res.json({ success: true, invite })
    } catch (error) {
        next({ status: 404, message: "Not Found", detail: "No Reading found"})
    }
}

export const getInvite = async (req:Request, res: Response, next: NextFunction) => {
    try {
        const invite = await Invite.findById(req.params.id).populate("reading", "name");
        if(!invite){
            return next({ status: 404, message: "Not Found", detail: "The provided invite Id does not exist"})
        }
        res.json({ success: true, invite });
    } catch (error) {
        next({ status: 404, message: "Not Found", detail: "No Invite found"})
    }
}

export const updateInvite = async (req:Request, res: Response, next: NextFunction) => {
    try {
        const invite = await Invite.findByIdAndUpdate(req.params.id, req.body, { new: true })
        if(!invite){
            return next({ status: 404, message: "Not Found", detail: "The provided invite Id does not exist"})
        }
        res.json({ success: true, invite })
    } catch (error) {
        next({ status: 404, message: "Not Found", detail: "No Invite found"})
    }
}

export const deleteInvite = async (req:Request, res: Response, next: NextFunction) => {
    try {
        const invite = await Invite.findByIdAndDelete(req.params.id, req.body)
        if(!invite){
            return next({ status: 404, message: "Not Found", detail: "The provided invite Id does not exist"})
        }
        res.json({ success: true, invite })
    } catch (error) {
        next({ status: 404, message: "Not Found", detail: "No Invite found"})
    }
}