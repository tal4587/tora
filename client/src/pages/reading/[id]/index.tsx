import { Link, useParams } from "react-router-dom";
import { reading } from "../../../assets/images";
import ImageCard from "../../../components/card/imagecard";
import useGetReading from "../../../hooks/queries/useGetReading";
import "./style.css";

export const ReadingId = () => {

    const {id} = useParams();
    const { isLoading: isReadingLoading, isError: isReadingError, data: readingData } = useGetReading(id || "");

    return (
        <div className="reading_single_body">
            <div className="reading_single_section left">
                <ImageCard href={reading}/>
                <p>{ isReadingLoading ? "Loading..." : readingData?.data.reading.name}</p>
                { isReadingError && <Link to="/reading/">Invalid Reading | Return Back</Link>}
            </div>
            <div className="reading_single_section right">
                <Link to={`/reading/${id}/invite/`}>Create Invite</Link>
            </div>
        </div>
    )
}