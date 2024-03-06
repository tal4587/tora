export interface InviteBody {
    readBy: "chapter" | "verse",
    book: number,
    chapter: number,
    verse?: number,
}

interface Invite {
  reading: string,
  readBy: "chapter" | "verse",
  book: number,
  chapter: number,
  verse?: number,
  status: "unread" | "read" | "reading",
  _id: string,
}

export interface InviteData {
    success: boolean,
    invite: Invite
  }

export interface InvitesData {
    success: boolean,
    count: number,
    total: number,
    invites: Invite[]
}