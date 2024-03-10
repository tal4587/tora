interface Reading {
    _id: string,
    name: string,
    email: string,
    createdAt: string
    readBy: "verse" | "chapter"
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
    name?: string,
    email?: string,
    description?: string,
    readBy?: "verse" | "chapter"
}