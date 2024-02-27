import { useParams } from "react-router-dom";
import useGetInvite from "../../../hooks/queries/useGetInvite";
import { useEffect, useState } from "react";
import bookNumberToPath from "../../../constants/books";
import { Book } from "../../../types/book";

export const ReadingInviteId = () => {

    const { id } = useParams();
    const { isLoading, data: bookData, isError, error } = useGetInvite(id || "");

    const [inviteReading, setInviteReading] = useState<React.ReactNode>("");

    const copyLinkToClipboard = () => {
        if(id){
            navigator.clipboard.writeText(id);
        }
    }

    useEffect(() => {
        if(bookData) {
            const fetchBookContent = async () => {
                await fetch(bookNumberToPath.get(bookData.data.invite.book) as RequestInfo).then(async (data) => {
                    await data.json()
                        .then((data: Book) => {
                            if(bookData.data.invite.readBy === "chapter"){
                                setInviteReading(data[bookData.data.invite.chapter - 1].verses.map((verse: { verseText: string }) => (
                                    <div>{verse.verseText}</div>
                                )))
                            } else {
                                if(bookData.data.invite.verse !== undefined) {
                                    setInviteReading(data[bookData.data.invite.chapter - 1].verses[bookData.data.invite.verse].verseText)
                                }
                            }
                        })
                        .catch(console.log);
                }).catch(console.log)
            }
            fetchBookContent();
        }
    }, [bookData])

    return (
        <div>
            { isLoading ? <div>loading...</div>:
            isError ? <div>{error.message}</div> :
            <div>
                <div>
                { bookData?.data.invite._id }
                <button onClick={copyLinkToClipboard}>Copy Invite Link</button>
                </div>
                <div>
                    {inviteReading}
                </div>
                <button>Mark As Read</button>
                <button>Mark As Reading</button>
                <button>Mark As Unread</button>
            </div>}
        </div>
    )
}