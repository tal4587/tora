import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { reading } from "../../assets/images";
import SearchIcon from "../../assets/svgs/Search.tsx";
import ButtonLink from "../../components/button/link";
import ImageCard from "../../components/card/imagecard";
import InputPrimaryForm from "../../components/input/primaryform";
import "./style.css";

export const Reading = () => {

    const [readingLink, setReadingLink] = useState<string>("");
    // const [inviteLink, setInviteLink] = useState<string>("");

    const navigate = useNavigate();
    const onOpenReading = (e: FormEvent) => {
        e.preventDefault();
        if(readingLink.length !== 0) {
            navigate(`/reading/${readingLink}`);
        }
    }

    // const onOpenInvite = (e: FormEvent) => {
    //     e.preventDefault();
    //     if(inviteLink.length !== 0){
    //         navigate(`/invite/${inviteLink}`);
    //     }
    // }

    return (
        <main className="reading_body">
            <div className="reading_options">

                <div className="reading_option left">
                    <ImageCard href={ reading }/>
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

                {/* <div className="reading_option right">
                    <ImageCard href={ invite }/>
                    <div className="reading_options_container">
                        <p className="reading_option_label">Have an Invite?</p>
                        <InputPrimaryForm onSubmit={onOpenInvite}
                            icon={<FlowerIcon/>}
                            value={inviteLink} onChange={e => setInviteLink(e.target.value)}
                            type="text" placeholder="Enter Invite Link to start reading..."
                            disabled={inviteLink.length === 0}
                        />
                        <p className="reading_option_label">Participate and Read Now</p>
                    </div>
                </div> */}

            </div>
        </main>
    )
}