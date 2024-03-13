import { useQueryClient } from "@tanstack/react-query";
import { FormEvent, useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { icon } from "../../../assets/images";
import CopyIcon from "../../../assets/svgs/Copy";
import ButtonPrimary from "../../../components/button/primary";
import ImageCard from "../../../components/card/imagecard";
import InputPrimaryForm from "../../../components/input/primaryform";
import ProgressBar from "../../../components/progressbar";
import { bookNumberToName } from "../../../constants/books";
import useEditInviteStatus from "../../../hooks/mutations/useEditInviteStatus";
import useGetRandomInviteFromReading from "../../../hooks/queries/useGetRandomInviteFromReading";
import useGetReading from "../../../hooks/queries/useGetReading";
import useFetchBook from "../../../hooks/utils/useFetchBook";
import "./style.css";
import PopUp from "../../../components/popup";
import ButtonLink from "../../../components/button/link";

export const ReadingId = () => {

    const {id} = useParams();
    const { isLoading: isReadingLoading, isError: isReadingError, data: readingData, refetch: refetchReading } = useGetReading(id || "");
    const { isLoading: isRandomInviteLoading, isError: isRandomInviteError, data: randomInvite, refetch: getAnotherRandomInvite } = useGetRandomInviteFromReading(id || "");
    const { bookContent } = useFetchBook(randomInvite && randomInvite.data.invite ? (randomInvite.data.invite.book) : 1);
    const {mutate: editInviteStatus } = useEditInviteStatus(randomInvite && randomInvite.data.invite && randomInvite.data.invite._id || "");

    const [showPopUp, setShowPopUp] = useState<boolean>(false);

    const Chapter = () => {
        if(randomInvite && randomInvite.data.invite && bookContent.length > 0) {
            return <div>{(bookContent)[randomInvite.data.invite.chapter - 1] && (bookContent)[randomInvite.data.invite.chapter - 1].verses.map(verse => (
                <div key={verse.verseCount}>{verse.verseCount}. {verse.verseText}</div>
            ))}</div>
        }
    }
    const Verse = () => {
        if(randomInvite && randomInvite.data.invite && randomInvite.data.invite.verse && bookContent.length > 0){
            return <div>{(bookContent)[randomInvite.data.invite.chapter - 1] && (bookContent)[randomInvite.data.invite.chapter - 1].verses[randomInvite.data.invite.verse - 1].verseText}</div> 
        }
    }
    const navigate = useNavigate();
    const queryClient = useQueryClient()
    
    const markAsRead = () => {
        console.log("Marking as read");
        editInviteStatus("read", {
            onSuccess: () => {
                refetchReading();
            }
        });
        setShowPopUp(true);
    }

    const markAsReading = useCallback(() => {
        console.log("Marking as reading");
        editInviteStatus("reading", {
            onSuccess: () => {
                refetchReading();
            }
        });
    }, [editInviteStatus, refetchReading])

    const markAsUnread = useCallback(() => {
        console.log("Marking as unread");
        editInviteStatus("unread", {
            onSuccess: () => {
                refetchReading();
            }
        });
    }, [editInviteStatus, refetchReading])

    useEffect(() => {
        if(randomInvite && randomInvite.data.invite){
            markAsReading();
        }
    }, [markAsReading, randomInvite])

    const readAnother = () => {
        markAsUnread();
        queryClient.invalidateQueries({ queryKey: ['reading-random-invite', readingData?.data.reading._id] })
        getAnotherRandomInvite();
        markAsReading();
    }

    const cantReadNow = () => {
        markAsUnread();
        queryClient.invalidateQueries({ queryKey: ['reading-random-invite', readingData?.data.reading._id] })
        navigate("/reading")
    }

    const copyLinkToClipboard = (e: FormEvent) => {
        e.preventDefault();
        if(readingData) {
            navigator.clipboard.writeText(`https://thoraread.online/reading/${readingData.data.reading._id}`)
        }
    }

    return (
        <> 
        <div className="reading_single_body">
            <div className="reading_single_section left">
                <div className="reading_single_image_card_container">
                    <ImageCard padding="2em" href={icon}/>
                </div>
                {isReadingLoading ? "Loading" : !readingData? "Loading...":(
                    <div className="reading_single_section_left_container">
                        <div className="reading_single_title_container">
                            <h3>{readingData.data.reading.name}</h3>
                            <p>{readingData.data.reading.email}</p>
                        </div>
                        <div className="reading_single_progress">
                            {readingData.data.reading.readCount} נקראו
                            <ProgressBar percentage={(readingData.data.reading.readCount * 100)/ (readingData.data.reading.readCount + readingData.data.reading.unreadCount + readingData.data.reading.readingCount)}/>
                            {readingData.data.reading.readingCount} כרגע בקריאה
                            <ProgressBar percentage={(readingData.data.reading.readingCount * 100)/ (readingData.data.reading.readCount + readingData.data.reading.unreadCount + readingData.data.reading.readingCount)}/>
                            {readingData.data.reading.unreadCount} נשאר לקרוא
                            <ProgressBar percentage={(readingData.data.reading.unreadCount * 100)/ (readingData.data.reading.readCount + readingData.data.reading.unreadCount + readingData.data.reading.readingCount)}/>
                        </div>
                        <div className="reading_single_copylink">
                            <InputPrimaryForm onSubmit={copyLinkToClipboard} icon={<CopyIcon/>} value={`https://thoraread.online/reading/${readingData.data.reading._id}`} readOnly={true}/>
                        </div>
                    </div>
                ) }
            </div>

            {isRandomInviteLoading ? "Loading..." : (
                randomInvite && randomInvite.data.invite && 
                <div className="reading_single_section right"> <div>
                    <h4>{bookNumberToName.get(randomInvite.data.invite.book)}</h4>
                    <div>פרק {randomInvite.data.invite.chapter}</div>
                    {readingData?.data.reading.readBy === "verse" && <div>פסוק {randomInvite?.data.invite.verse}</div>}
                    <div className="reading_single_text">
                        {readingData?.data.reading.readBy === "chapter" ? <Chapter /> : <Verse />}
                    </div>
                    <div className="reading_single_bottom_buttons">
                        <ButtonPrimary onClick={markAsRead}>קראתי את הפרק </ButtonPrimary>
                        <ButtonPrimary onClick={readAnother}>קראתי ואני רוצה לקרוא פרק נוסף</ButtonPrimary>
                        <ButtonPrimary onClick={cantReadNow}>לא יכול לקרוא עכשיו, אקרא מאוחר יותר</ButtonPrimary>
                    </div>
                </div></div>
            )}

            {isReadingError && <Link to="/reading/">Invalid Reading | Return Back</Link>}
            { isRandomInviteError && "Error" }
        </div>

        <PopUp showPopUp={showPopUp} setShowPopUp={setShowPopUp}>
            <div className="reading_single_popup_body">
                <div className="reading_single_popup_top">
                בס"ד
                </div>
                <div className="reading_single_pop_head">
                תודה שהשתתפת בקריאה!!
                </div>
                <div>
                <div>
                    מעשה טוב אחד - מכריע את הכף
                </div>
                <div>
                מעשה טוב אחד - מכריע את הכף "עשה מצוה אחת - הרי הכריע את עצמו והכריע את כל העולם כולו לכף זכות, וגרם להן תשועה והצלה"
                </div>
                <div>
                (רמב"ם, הלכות תשובה)
                </div>
                </div>

                <div>
                תוכל להוסיף מעשה טוב ולקחת על עצמך תרומה לעמותת דרך המלך נלך העוזרת לאלפי משפחות בסלי מזון באופן שוטף ובחגי ישראל. (ניתן לתרום כל סכום)
                </div>

                <ButtonLink to="https://secure.cardcom.solutions/EA/EA5/8BqYEVjAgEGy6X0TOvSThg/Donation" >
                    לתרומה
                </ButtonLink>
                <ButtonPrimary onClick={() => setShowPopUp(false)}>
                    חזרה לקריאה
                </ButtonPrimary>
            </div>
        </PopUp>

        </>
    )
}