export interface ReadingData {
    success: boolean,
    reading: {
        _id: string,
        name: string,
        email: string,
        createdAt: string
        readBy: "verse" | "chapter"
    }
}

export interface ReadingBody {
    name?: string,
    email?: string,
    description?: string,
    readBy?: "verse" | "chapter"
}