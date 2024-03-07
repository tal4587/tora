import { Link, useParams } from "react-router-dom";
import { reading } from "../../../assets/images";
import ImageCard from "../../../components/card/imagecard";
import useGetReading from "../../../hooks/queries/useGetReading";
import "./style.css";
import useGetRandomInviteFromReading from "../../../hooks/queries/useGetRandomInviteFromReading";

export const ReadingId = () => {

    const {id} = useParams();
    const { isLoading: isReadingLoading, isError: isReadingError, data: readingData } = useGetReading(id || "");
    const { isLoading: isRandomInviteLoading, data: randomInvite} = useGetRandomInviteFromReading(id || "");

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
                    </div>
                )}
            </div>
        </div>
    )
}