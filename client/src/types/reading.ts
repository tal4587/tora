export interface ReadingData {
    success: boolean,
    reading: {
        _id: string,
        name: string,
        email: string,
        createdAt: string
    }
}

export interface ReadingBody {
    name?: string,
    email?: string,
    description?: string,
}