import { NextFunction, Request, Response } from "express";
import Invite from "../models/invite";

export const getAllInvites = async (req: Request, res: Response, next: NextFunction) => {
    try {

        // Search Functionality
        let query = {};
        if(req.query.search) {
            const keyword = new RegExp(req.query.search.toString(), 'i');
            query = { $or: [{ email: keyword }, { name: keyword }] };
        }

        const total = await Invite.countDocuments();
        const invites = await Invite.find(query).populate("reading", "name");
        const count = invites.length;

        res.json({ success: true, invites, total, count });
    } catch (error) {
        next({ status: 404, message: "Not Found", detail: "No Invites found"})
    }
}

export const getAllInviteFromReading = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const total = await Invite.countDocuments();
        const invites = await Invite.find({ reading: req.params.id }).populate("reading", "name");
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