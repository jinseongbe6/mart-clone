import { useQuery } from "react-query";
import axios from "axios";

const fetchGoodsInBasket = async () => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/goods/in-basket/`
  );
  return response.data;
};

const useGetGoodsInBasket = () => {
  return useQuery("goodsInBasket", fetchGoodsInBasket);
};

export { useGetGoodsInBasket };
