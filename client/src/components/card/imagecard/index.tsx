import "./style.css"

const ImageCard = ( { href, alt }: { href: string, alt?: string}) => {
    return (
        <div className="image_card_main">
            <img src={href} alt={alt}/>
        </div>
    )
}

export default ImageCard