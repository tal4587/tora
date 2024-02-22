import "./style.css";
import { Link } from "react-router-dom";

export const ReadingId = () => {
    return (
        <div>
            Name of Reading
            <Link to={`/reading/${1}/invite/`}>Create Invite</Link>
        </div>
    )
}