import { useQuery } from "@tanstack/react-query"
import axios from "../../../utils/axios"
import { MetaData } from "../../../types/meta"

const useGetMetaData = () => {
    return useQuery({
        queryKey: ["meta"],
        queryFn: () => {
            return axios.get<MetaData>(`/meta`)
        }
    })
}

export default useGetMetaData;