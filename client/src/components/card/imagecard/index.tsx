import "./style.css"

type ImageCardProps = {
    href: string,
    alt?: string,
    variant?: "solid" | "glass",  
}

const ImageCard = ( { href, alt, variant = "solid" }: ImageCardProps) => {
    return (
        <div className={`image_card_main ${variant}`}>
            <img src={href} alt={alt}/>
        </div>
    )
}

export default ImageCard