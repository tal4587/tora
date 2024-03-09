import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { iconwhite } from "../../assets/images";
import ButtonLink from "../../components/button/link";
import ImageCard from "../../components/card/imagecard";
import InputPrimaryForm from "../../components/input/primaryform";
import "./style.css";

export const Reading = () => {

    const [readingLink, setReadingLink] = useState<string>("");

    const navigate = useNavigate();
    const onOpenReading = (e: FormEvent) => {
        e.preventDefault();
        if(readingLink.length !== 0) {
            navigate(`/reading/${readingLink}`);
        }
    }

    return (
        <main className="reading_body">
            <div className="reading_options">

                <div className="reading_option left">
                    <div className="reading_home_icon">
                        <ImageCard href={ iconwhite } variant="glass"/>
                    </div>
                    <div className="reading_description">
                        <h4>לרפואת אריאל נסים בן זר</h4>
                        <h2>קריאת התורה אונליין</h2>
                        <h3> לפי פרקים או פסוקים לרפואת חולי עם ישראל הפצועים, והחטופים!</h3>
                    </div>
                    <ButtonLink variant="filled-inverse" to="/reading/create">לפתיחת קריאה חדשה</ButtonLink>
                    <div className="reading_options_container">
                        <p className="reading_option_label">השתתפות בקריאה קיימת</p>
                        <InputPrimaryForm
                            onSubmit={onOpenReading}
                            value={readingLink} onChange={e => setReadingLink(e.target.value)}
                            type="text" placeholder="Enter Reading Id..."
                            disabled={readingLink.length === 0}
                        />
                    </div>
                </div>

            </div>
        </main>
    )
}