export interface InviteBody {
    readBy: "chapter" | "verse",
    book: number,
    chapter: number,
    verse?: number,
}

export interface InviteData {
    success: boolean,
    invite: {
      reading: string,
      readBy: "chapter" | "verse",
      book: number,
      chapter: number,
      verse?: number,
      status: "unread" | "read" | "reading",
      _id: string,
    }
  }