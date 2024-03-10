import { FormEvent, useState } from "react";
import { useSearchParams } from "react-router-dom";
import SearchIcon from "../../../assets/svgs/Search";
import ButtonPrimary from "../../../components/button/primary";
import InputPrimaryForm from "../../../components/input/primaryform";
import "./style.css";
import useGetAllReadings from "../../../hooks/queries/useGetAllReadings";

const ReadingSearch = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const keyword = searchParams.get("keyword") || "";
    const page = searchParams.get("page") || "";
    const [searchKeyword, setSearchKeyword] = useState<string>(keyword);

    const onSearch = (e: FormEvent) => {
        e.preventDefault();
        setSearchParams({
            keyword: searchKeyword
        })
    }

    const {isLoading: isReadingsLoading, isError: isReadingsError, data: readings} = useGetAllReadings(keyword, page)

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
                    <div>{r.name}</div>
                ))}
            </div>
            <div className="reading_search_bottom">
                <ButtonPrimary>Previous</ButtonPrimary>
                {readings?.data.page} of {readings?.data.pages}
                <ButtonPrimary>Next</ButtonPrimary>
            </div>
        </div>
    ) 
}

export default ReadingSearch;