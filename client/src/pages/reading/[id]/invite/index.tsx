import { FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import bookNumberToPath from "../../../../constants/books";
import useCreateNewInvite from "../../../../hooks/mutations/useCreateNewInvite";
import { InviteBody } from "../../../../types/invite";
import { Book } from "../../../../types/book";

export const ReadingInvite = () => {

    const {id} = useParams();
    const navigate = useNavigate();

    const [verseToggle, setVerseToggle] = useState<boolean>(false);
    const [bookSelected, setBookSelected] = useState<number>(1);
    const [chapterSelected, setChapterSelected] = useState<number>(1);
    const [verseSelected, setVerseSelected] = useState<number>(0);
    const [bookContent, setBookContent] = useState<Book>([]);

    const { mutate } = useCreateNewInvite(id || "")

    useEffect(() => {
        const fetchBookContent = async () => {
            await fetch(bookNumberToPath.get(bookSelected) as RequestInfo).then(async (data) => {
                await data.json()
                    .then(data => setBookContent(data))
                    .catch(console.log);
            }).catch(console.log)
        }
        fetchBookContent();
        setChapterSelected(1);
        setVerseSelected(0);
    }, [bookSelected])

    useEffect(() => {
        setVerseSelected(0);
    }, [chapterSelected])

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        let body: InviteBody = { readBy: "chapter", book: bookSelected, chapter: chapterSelected };
        if(verseToggle) {
            body = { ...body, readBy: "verse", verse: verseSelected }
        }
        mutate(body, {
            onSuccess: (data) => {
                navigate(`/invite/${data?.data.invite._id}`)
            }
        });
    }

    return (
        <div>
            Create Invite
            <form onSubmit={onSubmit}>
                <div>
                    <label>
                        Read by chapter
                        <input checked={!verseToggle} onChange={() => setVerseToggle(false)} type="radio"/>
                    </label>
                    <label>
                        Read by Verse
                        <input checked={verseToggle} onChange={() => setVerseToggle(true)} type="radio"/>
                    </label>
                </div>
                <label>
                    Book
                    <select
                        value={bookSelected}
                        onChange={(e) => setBookSelected(Number.parseInt(e.target.value))}
                    >
                        <option value={1}>ספר בראשית</option>
                        <option value={2}>ספר שמות</option>
                        <option value={3}>ספר ויקרא</option>
                        <option value={4}>ספר במדבר</option>
                        <option value={5}>ספר דברים</option>
                    </select>
                </label>
                <label>
                    Chapter
                    <select
                        value={chapterSelected}
                        onChange={e => setChapterSelected(Number.parseInt(e.target.value))}
                    >
                        { bookContent.map((chapter) => (
                            <option key={chapter.id} value={chapter.id}>{chapter.id}</option>
                        ))}
                    </select>
                </label>
                { verseToggle && <label>
                    Verse
                    <select
                        value={verseSelected}
                        onChange={e => setVerseSelected(Number.parseInt(e.target.value))}
                    >
                        { bookContent[chapterSelected - 1].verses.map(( verse, i ) => (
                            <option key={i} value={i}>{verse.verseCount}. {verse.verseText} </option>
                        ))}
                    </select>
                </label> }
                <button>Create Invite</button>
            </form>
            { bookContent.length !==0 && (!verseToggle ?
                <div key={bookContent[chapterSelected - 1].id}>
                    <p>Chapter {bookContent[chapterSelected - 1].id}</p>
                    <ul>
                        {bookContent[chapterSelected - 1].verses.map(verse => (
                            <li key={verse.verseCount}> {verse.verseText} <span>({verse.verseCount})</span></li>
                        ))}
                    </ul>
                </div> : 
                <div>{bookContent[chapterSelected - 1].verses[verseSelected].verseText}</div>)
            }
        </div>
    )
}