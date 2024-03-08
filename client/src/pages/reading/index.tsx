import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { icon } from "../../assets/images";
import SearchIcon from "../../assets/svgs/Search.tsx";
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
                    <ImageCard href={ icon }/>
                    <ButtonLink to="/reading/create">Create a Reading</ButtonLink>
                    <div className="reading_options_container">
                        <p className="reading_option_label">Looking for a reading?</p>
                        <InputPrimaryForm
                            icon={<SearchIcon/>}
                            onSubmit={onOpenReading}
                            value={readingLink} onChange={e => setReadingLink(e.target.value)}
                            type="text" placeholder="Search or Enter Reading Id..."
                            disabled={readingLink.length === 0}
                        />
                    </div>
                </div>

            </div>
        </main>
    )
}