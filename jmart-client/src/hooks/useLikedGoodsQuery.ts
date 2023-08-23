import { useQuery } from "react-query";
import axios from "axios";

const fetchLikedGoods = async () => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/goods/liked/`
  );
  return response.data;
};

const useGetLikedGoods = () => {
  return useQuery("likedGoods", fetchLikedGoods);
};

export { useGetLikedGoods };
