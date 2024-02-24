import { useParams } from "react-router-dom"

export const ReadingInviteId = () => {

    const { id } = useParams();

    return (
        <div>{id}</div>
    )
}