import { useQuery } from "react-query";
import axios from "axios";

const fetchGoods = async (searchTerm: string) => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/goods/?search=${searchTerm}`
  );
  return response.data;
};

const useSearchGoods = (searchTerm: string) => {
  return useQuery(["searchGoods", searchTerm], () => fetchGoods(searchTerm), {
    enabled: false,
  });
};

export default useSearchGoods;
