import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { iconwhite } from "../../assets/images";
import ButtonLink from "../../components/button/link";
import ImageCard from "../../components/card/imagecard";
import InputPrimaryForm from "../../components/input/primaryform";
import "./style.css";
import SearchIcon from "../../assets/svgs/Search";

export const Reading = () => {

    const [readingLink, setReadingLink] = useState<string>("");

    const navigate = useNavigate();
    const onOpenReading = (e: FormEvent) => {
        e.preventDefault();
        if(readingLink.length !== 0) {
            navigate(`/reading/search?keyword=${readingLink}`);
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
                        <h4>לרפואת אריאל ניסים בן זר הי"ו</h4>
                        <h2>קריאת התורה אונליין</h2>
                        <h3> לפי פרקים או פסוקים לרפואת חולי עם ישראל הפצועים, והחטופים!</h3>
                    </div>
                    <ButtonLink variant="filled-inverse" to="/reading/create">לפתיחת קריאה חדשה</ButtonLink>
                    <div className="reading_options_container">
                        <p className="reading_option_label">השתתפות בקריאה קיימת</p>
                        {/* <InputPrimaryForm
                            variant='glass'
                            icon={<Left/>}
                            onSubmit={onOpenReading}
                            value={readingLink} onChange={e => setReadingLink(e.target.value)}
                            type="text" placeholder="Enter Reading Id..."
                            disabled={readingLink.length === 0}
                        /> */}
                        <InputPrimaryForm
                            variant='glass'
                            onSubmit={onOpenReading}
                            icon={<SearchIcon />}
                            value={readingLink} onChange={e => setReadingLink(e.target.value)}
                            type="text" placeholder="חיפוש / חפש שם קריאה קיימת"
                        />
                    </div>

                    <div className="reading_option_bottom_link">
                        <a href="https://www.tvip.co.il">
                        ©כל הזכויות שמורות לעמותת דרך המלך נלך הרקם ע"ר  2024 | האתר נבנה על ידי חי ברשת 
                        </a>
                    </div>
                </div>

            </div>
        </main>
    )
}