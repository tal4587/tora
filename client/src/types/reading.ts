interface Reading {
    _id: string,
    motive: string,
    name: string,
    email: string,
    description: string,
    createdAt: string
    readBy: "verse" | "chapter",
    readCount: number,
    readingCount: number,
    unreadCount: number,
}

export interface ReadingData {
    success: boolean,
    reading: Reading
}

export interface ReadingsData {
    success: boolean,
    reading: Reading[]
    total: number,
    count: number,
    page: number,
    pages: number
}

export interface ReadingBody {
    motive?: string,
    name?: string,
    email?: string,
    description?: string,
    readBy?: "verse" | "chapter"
}