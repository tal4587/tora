import { Link, useParams } from "react-router-dom";
import { reading } from "../../../assets/images";
import ImageCard from "../../../components/card/imagecard";
import useGetRandomInviteFromReading from "../../../hooks/queries/useGetRandomInviteFromReading";
import useGetReading from "../../../hooks/queries/useGetReading";
import useFetchBook from "../../../hooks/utils/useFetchBook";
import "./style.css";

export const ReadingId = () => {

    const {id} = useParams();
    const { isLoading: isReadingLoading, isError: isReadingError, data: readingData } = useGetReading(id || "");
    const { isLoading: isRandomInviteLoading, data: randomInvite} = useGetRandomInviteFromReading(id || "");
    const { bookContent } = useFetchBook(randomInvite ? (randomInvite?.data.invite.book) : 0);
    
    const Chapter = () => {
        if(randomInvite && bookContent.length > 0) {
            return <div>{(bookContent)[randomInvite.data.invite.chapter - 1].verses.map(verse => (
                <div key={verse.verseCount}>{verse.verseCount}. {verse.verseText}</div>
            ))}</div>
        }
    }
    const Verse = () => {
        if(randomInvite && randomInvite.data.invite.verse && bookContent.length > 0){
            return <div>{(bookContent)[randomInvite.data.invite.chapter - 1].verses[randomInvite.data.invite.verse - 1].verseText}</div> 
        }
    }


    return (
        <div className="reading_single_body">
            <div className="reading_single_section left">
                <ImageCard href={reading}/>
                <p>{ isReadingLoading ? "Loading..." : readingData?.data.reading.name}</p>
                { isReadingError && <Link to="/reading/">Invalid Reading | Return Back</Link>}
            </div>
            <div className="reading_single_section right">
                { isRandomInviteLoading ? "Loading..." : (
                    <div>
                        <div>Book {randomInvite?.data.invite.book}</div>
                        <div>Chapter {randomInvite?.data.invite.chapter}</div>
                        { readingData?.data.reading.readBy === "verse" && <div>Verse {randomInvite?.data.invite.verse}</div>}
                        { readingData?.data.reading.readBy === "chapter" ? <Chapter/> : <Verse/>}
                    </div>
                )}
            </div>
        </div>
    )
}