import "./style.css";
import { Link, useParams } from "react-router-dom";

export const ReadingId = () => {

    const {id} = useParams();

    return (
        <div>
            Name of Reading
            <Link to={`/reading/${id}/invite/`}>Create Invite</Link>
        </div>
    )
}