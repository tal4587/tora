interface Verse {
    verseCount: string,
    verseText: string,
}

interface Chapter {
    id: number,
    verses: Verse[]
}

export type Book = Chapter[];