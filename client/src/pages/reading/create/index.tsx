import { FormEvent, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import ButtonPrimary from "../../../components/button/primary";
import InputPrimary from "../../../components/input/primary";
import InputPrimaryTextbox from "../../../components/input/primarytextbox";
import useCreateNewReading from "../../../hooks/mutations/useCreateNewReading";
import { ReadingBody } from "../../../types/reading";
import "./style.css";
import ImageCard from "../../../components/card/imagecard";
import { reading } from "../../../assets/images";

export const ReadingCreate = () => {

    const { mutate, data, isError } = useCreateNewReading();
    const name = useRef<HTMLInputElement>(null);
    const description = useRef<HTMLTextAreaElement>(null);
    const email = useRef<HTMLInputElement>(null);

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
        mutate(body, {
            onSuccess: (data) => {
                navigate(`/reading/${data.data.reading._id}`)
            }
        });
    }
    
    return (
        <div className="create_reading_body">
            <div className="create_reading_section left">
                <ImageCard href={reading} />
            </div>
            <div className="create_reading_section right">
                <div className="create_reading_section_header">
                    <Link to="/reading">Go Back</Link>
                    <p>Create a New Reading</p>
                </div>
                <form onSubmit={onSubmit} className="create_reading_form">
                    <InputPrimary ref={name} type="text" placeholder="Enter Reading Name"/>
                    <InputPrimaryTextbox ref={description} placeholder="Enter Reading Description"/>
                    <InputPrimary ref={email} type="email" placeholder="Enter User Email Id"/>
                    <ButtonPrimary>Create a Reading</ButtonPrimary>
                    {!isError && JSON.stringify(data?.data)}
                </form>
            </div>
        </div>
    )
}