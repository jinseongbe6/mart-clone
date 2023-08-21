import { useQuery } from "react-query";
import axios from "axios";

const fetchGoods = async (id?: number) => {
  const endpoint = id ? `/goods/${id}` : "/goods/";
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}${endpoint}`
  );
  return response.data;
};

const useGetGoods = (id?: number) => {
  return useQuery(["getGoods", id], () => fetchGoods(id), {});
};

export default useGetGoods;
