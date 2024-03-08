import { useEffect, useState } from "react"
import { Book } from "../../../types/book"
import { bookNumberToPath } from "../../../constants/books";

const useFetchBook = (bookSelected: number, callback?: () => void) => {
    const [bookContent, setBookContent] = useState<Book>([]);
    const [bookError, setBookError] = useState<string | null>(null);

    useEffect(() => {
        const fetchBookContent = async () => {
            await fetch(bookNumberToPath.get(bookSelected) as RequestInfo).then(
                async (data) => {
                    await data.json()
                        .then(setBookContent)
                        .catch(setBookError)
                }
            )
        }
        fetchBookContent();
        if(callback) callback();
    }, [bookSelected, callback])

    return { bookContent, bookError };
}

export default useFetchBook