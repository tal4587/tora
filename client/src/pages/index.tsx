import ButtonLink from "../components/button/link"
import "./style.css"

const Home = () => {
    return (
        <div className="home_body">
            <ButtonLink to="/reading">Get Started</ButtonLink>
        </div>
    )
}

export default Home