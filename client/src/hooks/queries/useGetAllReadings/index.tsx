import { useQuery } from "@tanstack/react-query";
import axios from "../../../utils/axios";
import { ReadingsData } from "../../../types/reading";

const useGetAllReadings = (keyword: string, page: string) => {
    return useQuery({
        queryKey: ["readings", keyword, page],
        queryFn: () => {
            return axios.get<ReadingsData>(`/reading?search=${keyword}&page=${page}`)
        }
    })
}

export default useGetAllReadings;