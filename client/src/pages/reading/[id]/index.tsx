import { Link, useNavigate, useParams } from "react-router-dom";
import { icon } from "../../../assets/images";
import ButtonPrimary from "../../../components/button/primary";
import ImageCard from "../../../components/card/imagecard";
import ProgressBar from "../../../components/progressbar";
import useGetRandomInviteFromReading from "../../../hooks/queries/useGetRandomInviteFromReading";
import useGetReading from "../../../hooks/queries/useGetReading";
import useFetchBook from "../../../hooks/utils/useFetchBook";
import "./style.css";
import useEditInviteStatus from "../../../hooks/mutations/useEditInviteStatus";

export const ReadingId = () => {

    const {id} = useParams();
    const { isLoading: isReadingLoading, isError: isReadingError, data: readingData } = useGetReading(id || "");
    const { isLoading: isRandomInviteLoading, data: randomInvite } = useGetRandomInviteFromReading(id || "");
    const { bookContent } = useFetchBook(randomInvite ? (randomInvite?.data.invite.book) : 1);
    const {mutate: editInviteStatus } = useEditInviteStatus(randomInvite?.data.invite._id || "");

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
    const navigate = useNavigate();

    const markAsRead = () => {
        editInviteStatus("read");
        navigate("/reading")
    }

    return (
        <div className="reading_single_body">
            <div className="reading_single_section left">
                <div className="reading_single_image_card_container">
                    <ImageCard padding="2em" href={icon}/>
                </div>
                {isReadingLoading ? "Loading" : !readingData? "Loading...":(
                    <div>
                        <div className="reading_single_title_container">
                            <h3>{readingData.data.reading.name}</h3>
                            <p>{readingData.data.reading.email}</p>
                            {isReadingError && <Link to="/reading/">Invalid Reading | Return Back</Link>}
                        </div>
                        <div className="reading_single_progress">
                            {readingData.data.reading.readCount} Read
                            <ProgressBar percentage={(readingData.data.reading.readCount * 100)/ (readingData.data.reading.readCount + readingData.data.reading.unreadCount + readingData.data.reading.readingCount)}/>
                            {readingData.data.reading.readingCount} Reading
                            <ProgressBar percentage={(readingData.data.reading.readingCount * 100)/ (readingData.data.reading.readCount + readingData.data.reading.unreadCount + readingData.data.reading.readingCount)}/>
                            {readingData.data.reading.unreadCount} Unread
                            <ProgressBar percentage={(readingData.data.reading.unreadCount * 100)/ (readingData.data.reading.readCount + readingData.data.reading.unreadCount + readingData.data.reading.readingCount)}/>
                        </div>
                    </div>
                ) }
            </div>
            <div className="reading_single_section right">
                { isRandomInviteLoading ? "Loading..." : (
                    <div>
                        <h4>Book {randomInvite?.data.invite.book}</h4>
                        <div>Chapter {randomInvite?.data.invite.chapter}</div>
                        { readingData?.data.reading.readBy === "verse" && <div>Verse {randomInvite?.data.invite.verse}</div>}
                        <div className="reading_single_text">
                            { readingData?.data.reading.readBy === "chapter" ? <Chapter/> : <Verse/>}
                        </div>
                        <div className="reading_single_bottom_buttons">
                            <ButtonPrimary onClick={markAsRead}>Mark as Read</ButtonPrimary>
                            <ButtonPrimary>I want to read Another</ButtonPrimary>
                            <ButtonPrimary>Can't Read now will read later</ButtonPrimary>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}