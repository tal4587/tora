import { NextFunction, Request, Response } from "express"
import Reading from "../models/reading"
import { nextTick } from "process";

export const getAllReadings = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let count = await Reading.countDocuments();
        let reading = await Reading.find({});
        res.json({ success: true, reading, count })
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
        res.json({ success: true, reading })
    } catch (error) {
        next({ status: 404, message: "Invalid Reading", detail: "The provided Reading Id does not exist"})
    }
}