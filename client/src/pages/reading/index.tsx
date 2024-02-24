import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";

export const Reading = () => {

    const [readingLink, setReadingLink] = useState<string>("");
    const [inviteLink, setInviteLink] = useState<string>("");

    const navigate = useNavigate();
    const onOpenReading = () => {
        navigate(`/reading/${readingLink}`)
    }

    const onOpenInvite = () => {
        navigate(`/invite/${inviteLink}`)
    }

    return (
        <main className="reading_body">
            <div className="reading_options">
                <Link to="/reading/create">Create New Reading</Link>

                <label>
                    <input
                        value={readingLink} onChange={e => setReadingLink(e.target.value)}
                        type="text" placeholder="Enter Reading Link"/>
                    <button disabled={readingLink.length === 0} 
                        onClick={onOpenReading}>Open Reading</button>
                </label>

                <label>
                    <input
                        value={inviteLink} onChange={e => setInviteLink(e.target.value)}
                        type="text" placeholder="Enter Invite Link"/>
                    <button disabled={inviteLink.length === 0}
                        onClick={onOpenInvite}>Open Invite</button>
                </label>
            </div>
        </main>
    )
}