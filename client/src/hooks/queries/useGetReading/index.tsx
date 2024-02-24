import { useQuery } from "@tanstack/react-query";
import axios from "../../../utils/axios";
import { ReadingData } from "../../../types/reading";

const useGetReading = (reading_id: string) => {
    return useQuery({
        queryKey: ["reading", reading_id],
        queryFn: () => {
            return axios.get<ReadingData>(`/reading/${reading_id}`)
        },
    })
}

export default useGetReading;