import useGetReading from "../../../hooks/queries/useGetReading";
import "./style.css";
import { Link, useParams } from "react-router-dom";

export const ReadingId = () => {

    const {id} = useParams();
    const { isLoading, isError, data } = useGetReading(id || "");

    return (
        <div>
            { isLoading ? "Loading..." : data?.data.reading.name}
            { isError && <Link to="/reading/">Invalid Reading | Return Back</Link>}
            <Link to={`/reading/${id}/invite/`}>Create Invite</Link>
        </div>
    )
}