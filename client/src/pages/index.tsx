import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import "./style.css"
import ImageCard from "../components/card/imagecard"
import { icon } from "../assets/images"

const Home = () => {

    const navigate = useNavigate();
    useEffect(() => {
        navigate("/reading");
    }, [navigate])

    return (
        <div className="home_body">
            <div className="home_icon_wrapper">
                <ImageCard padding="2em" href={icon} />
            </div>
        </div>
    )
}

export default Home