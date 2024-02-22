import { Link } from "react-router-dom";
import "./style.css";

export const Reading = () => {
    return (
        <main className="reading_body">
            <div className="reading_options">
                <Link to="/reading/create">Create New Reading</Link>

                <label>
                    <input type="text" placeholder="Enter Reading Link"/>
                    <button>Open Reading</button>
                </label>

                <label>
                    <input type="text" placeholder="Enter Invite Link"/>
                    <button>Open Invite</button>
                </label>
            </div>
        </main>
    )
}