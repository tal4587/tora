import { FormEvent, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { icon } from "../../../assets/images";
import ButtonPrimary from "../../../components/button/primary";
import ImageCard from "../../../components/card/imagecard";
import InputPrimary from "../../../components/input/primary";
import InputPrimaryRadio from "../../../components/input/primaryradio";
import InputPrimaryTextbox from "../../../components/input/primarytextbox";
import useCreateNewReading from "../../../hooks/mutations/useCreateNewReading";
import { ReadingBody } from "../../../types/reading";
import "./style.css";

export const ReadingCreate = () => {

    const { mutate, data, isError, isPending } = useCreateNewReading();
    const name = useRef<HTMLInputElement>(null);
    const description = useRef<HTMLTextAreaElement>(null);
    const email = useRef<HTMLInputElement>(null);
    const [ verseToggle, setVerseToggle ] = useState<boolean>(false);

    const navigate = useNavigate();
    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        let body: ReadingBody = {};
        if(name.current && name.current.value.length !== 0) {
            body = {...body, name: name.current.value}
        }
        if(email.current && email.current.value.length !== 0) {
            body = {...body, email: email.current.value}
        }
        if(description.current && description.current.value.length !== 0) {
            body = {...body, description: description.current.value}
        }
        if(verseToggle) {
            body = {...body, readBy: "verse"}
        } else {
            body = {...body, readBy: "chapter"}
        }
        mutate(body, {
            onSuccess: (data) => {
                navigate(`/reading/${data.data.reading._id}`)
            }
        });
    }
    
    return (
        <div className="create_reading_body">
            <div className="create_reading_section left">
                <div className="create_reading_image_card_container">
                    <ImageCard padding="2em" href={icon} />
                </div>
            </div>
            <div className="create_reading_section right">
                <div className="create_reading_section_header">
                    <Link to="/reading">Go Back</Link>
                    <p>לפתיחת קריאה חדשהg</p>
                </div>
                <form onSubmit={onSubmit} className="create_reading_form">
                    <InputPrimary ref={name} type="text" placeholder="Enter Reading Name"/>
                    <InputPrimaryTextbox ref={description} placeholder="Enter Reading Description"/>
                    <InputPrimary ref={email} type="email" placeholder="Enter User Email Id"/>
                    <div className="create_reading_radio_container">
                        <InputPrimaryRadio checked={!verseToggle} onChange={() => setVerseToggle(false)} label="קריאה לפי פרקים"/>
                        <InputPrimaryRadio checked={verseToggle} onChange={() => setVerseToggle(true)} label="קריאה לפי פסוקים"/>
                    </div>
                    <ButtonPrimary disabled={isPending}>לפתיחת קריאה חדשהg</ButtonPrimary>
                    {!isError && JSON.stringify(data?.data)}
                </form>
            </div>
        </div>
    )
}