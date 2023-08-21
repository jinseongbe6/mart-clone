import axios from "axios";
import { useMutation } from "react-query";

const toggleGoodsInBasket = async (goodsId: number) => {
  const response = await axios.patch(
    `${process.env.NEXT_PUBLIC_API_URL}/goods/${goodsId}/toggle-basket`
  );
  return response.data;
};

const useToggleGoodsInBasket = () => {
  return useMutation(toggleGoodsInBasket);
};
