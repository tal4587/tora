import { useEffect, useState } from "react"

interface Verse {
    verseCount: string,
    verseText: string,
}

interface Chapter {
    id: number,
    verses: Verse[]
}

type Book = Chapter[];

export const ReadingInvite = () => {

    const [verseToggle, setVerseToggle] = useState<boolean>(false);
    const [bookSelected, setBookSelected] = useState<string>("/json/books/1.Genesis.json");
    const [chapterSelected, setChapterSelected] = useState<number>(1);
    const [verseSelected, setVerseSelected] = useState<number>(0);
    const [bookContent, setBookContent] = useState<Book>([]);

    useEffect(() => {
        const fetchBookContent = async () => {
            await fetch(bookSelected).then(async (data) => {
                await data.json()
                    .then(data => setBookContent(data))
                    .catch(console.log);
            }).catch(console.log)
        }
        fetchBookContent();
    }, [bookSelected, chapterSelected])

    return (
        <div>
            Create Invite
            <form>
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
                        onChange={(e) => setBookSelected(e.target.value)}
                    >
                        <option value="/json/books/1.Genesis.json">1. Genesis</option>
                        <option value="/json/books/2.Exodus.json">2. Exodus</option>
                        <option value="/json/books/3.Leviticus.json">3. Levictus</option>
                        <option value="/json/books/4.Bamidbar.json">4. Bamidbar</option>
                        <option value="/json/books/5.Deuteronomy.json">5. Deuteronomy</option>
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