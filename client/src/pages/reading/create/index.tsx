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
        <>
        <div className="create_reading_body">
            <div className="create_reading_section left">
                <div className="create_reading_image_card_container">
                    <ImageCard padding="2em" href={icon} />
                </div>
            </div>
            <div className="create_reading_section right">
                <div className="create_reading_section_header">
                    <Link to="/reading">חזרה</Link>
                    <p>לפתיחת קריאה חדשה</p>
                </div>
                <div className="create_reading_section_description">
                    <div className="create_reading_section_description_top">
                    באתר זה תוכלו לפתוח קריאת ספר התורה לקריאה משותפת לרפואת יקיריכם.
                    </div>
                    <div className="create_reading_section_description_middle">
                    לאחר ה7.10.23 , יום שמחת התורה רבים מאיתנו לא חגגו את החג הקדוש, והאתר הוקם להפצת קריאת התורה בקהילות.
                    תוכלו לפתוח קריאה לפי פרקים או לפי פסוקים, לפי כמות האנשים איתם תרצו לשתף.
                    לאחר מילוי הפרטים ולחיצה על הכפתור תקבלו קישור במייל ועל המסך.
                    </div>
                    <div>
                    הפיצו את הקישור באמצעות המייל, ווטסאפ, פייסבוק וכדומה
                    כל אדם שיכנס לקישור זה, יקבל באופן אוטומטי פרק אחר או פסוק אחר בספר.
                    </div>
                    <div className="create_reading_section_description_bottom">כך תושלם קריאת ספר התורה כולה.</div>
                </div>
                <form onSubmit={onSubmit} className="create_reading_form">
                    <InputPrimary ref={name} type="text" placeholder="שם החולה לו מוקדשת הקריאה"/>
                    <InputPrimaryTextbox ref={description} placeholder="תיאור נוסף / ספר על המקרה"/>
                    <InputPrimary ref={email} type="email" placeholder="אימייל שאליו ישלח לינק לשיתוף הקריאה"/>
                    <div className="create_reading_radio_container">
                        <InputPrimaryRadio checked={!verseToggle} onChange={() => setVerseToggle(false)} label="קריאה לפי פרקים"/>
                        <InputPrimaryRadio checked={verseToggle} onChange={() => setVerseToggle(true)} label="קריאה לפי פסוקים"/>
                    </div>
                    <ButtonPrimary disabled={isPending}>{isPending ? "Loading..." : "לפתיחת קריאה חדשה"}</ButtonPrimary>
                    {!isError && JSON.stringify(data?.data)}
                </form>
            </div>
        </div>
        <div className="create_reading_bottom_link">
            <a href="https://www.tvip.co.il">
                ©כל הזכויות שמורות לעמותת דרך המלך נלך הרקם ע"ר  2024 | האתר נבנה על ידי חי ברשת
            </a>
        </div>
        </>
    )
}