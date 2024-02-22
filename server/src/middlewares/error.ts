import { NextFunction, Request, Response } from "express";

interface ServerError {
    status: number,
    message: string,
    detail: string,
}

const ErrorMiddleware = (err: ServerError, req: Request, res: Response, next: NextFunction) => {
    const status = err.status || 500;
    const message = err.message || "Internal Server Error";
    const detail = err.detail || "Some Internal Server Error Occurred";
    res.status(status).json({ success: false, error: { message, detail }})
}

export default ErrorMiddleware;