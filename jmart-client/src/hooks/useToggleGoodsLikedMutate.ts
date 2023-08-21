import axios from "axios";
import { useMutation } from "react-query";

const toggleGoodsLiked = async (goodsId: number) => {
  const response = await axios.patch(
    `${process.env.NEXT_PUBLIC_API_URL}/goods/${goodsId}/toggle-liked`
  );
  return response.data;
};

const usePatchToggleGoodsLiked = () => {
  return useMutation(toggleGoodsLiked);
};

export { usePatchToggleGoodsLiked };
