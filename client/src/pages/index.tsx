import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import ButtonLink from "../components/button/link"
import "./style.css"

const Home = () => {

    const navigate = useNavigate();
    useEffect(() => {
        navigate("/reading");
    }, [navigate])

    return (
        <div className="home_body">
            <ButtonLink to="/reading">Get Started</ButtonLink>
        </div>
    )
}

export default Home