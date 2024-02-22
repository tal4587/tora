import { NextFunction, Request, Response } from "express"
import Reading from "../models/reading"

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
        res.status(201).json({ success: true, reading })
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