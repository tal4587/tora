import { FormEvent, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import SearchIcon from "../../../assets/svgs/Search";
import ButtonPrimary from "../../../components/button/primary";
import InputPrimaryForm from "../../../components/input/primaryform";
import "./style.css";
import useGetAllReadings from "../../../hooks/queries/useGetAllReadings";

const ReadingSearch = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const keyword = searchParams.get("keyword") || "";
    const page = searchParams.get("page") || "0";
    const [searchKeyword, setSearchKeyword] = useState<string>(keyword);

    const onSearch = (e: FormEvent) => {
        e.preventDefault();
        setSearchParams({
            keyword: searchKeyword
        })
    }

    const nextPage = () => {
        setSearchParams(p => ({
            ...p,
            page: Number.parseInt(page) + 1
        }))
    }

    const prevPage = () => {
        setSearchParams(p => ({
            ...p,
            page: Number.parseInt(page) - 1
        }))
    }

    const {isLoading: isReadingsLoading, isError: isReadingsError, data: readings} = useGetAllReadings(keyword, page)

    const ReadingCard = ({ name, email, count, total }: { name: string, email: string, count: number, total: number}) => {
        return (
            <div className="reading_card_body">
                <div className="reading_card_left"></div>
                <div className="reading_card_right">
                    <div className="reading_card_title">{name}</div>
                    <div className="reading_card_subtitle">
                        <div className="reading_card_percentage">{Math.floor((count/total) * 100)}%</div>
                        <div className="reading_card_mail">{email}</div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="reading_search_body">
            <div className="reading_search_top">
                <div className="reading_search_bar_container">
                    <InputPrimaryForm
                        onSubmit={onSearch}
                        value={searchKeyword} onChange={e => setSearchKeyword(e.target.value)} 
                        placeholder="Search or Enter Reading Id..." icon={<SearchIcon/>}/>
                </div>
            </div>
            <div className="reading_search_middle">
                {isReadingsLoading && <div>Loading...</div>}
                {!isReadingsLoading && !isReadingsError && readings?.data.reading.map((r) => (
                    <Link to={`/reading/${r._id}`}>
                        <ReadingCard name={r.name} email={r.email} count={r.readCount} total={r.readCount + r.readingCount + r.unreadCount}/> 
                    </Link>
                ))}
            </div>
            <div className="reading_search_bottom">
                <ButtonPrimary onClick={prevPage} disabled={!page || !readings || Number.parseInt(page) === 1}>Previous</ButtonPrimary>
                {readings?.data.page} of {readings?.data.pages}
                <ButtonPrimary onClick={nextPage} disabled={!page || !readings || Number.parseInt(page) === readings.data.pages}>Next</ButtonPrimary>
            </div>
        </div>
    ) 
}

export default ReadingSearch;