import Image from "next/image";
import styles from "./Goods.module.scss";
import { BiHeart, BiSolidHeart } from "react-icons/bi";
import { usePatchToggleGoodsLiked } from "@/hooks/useToggleGoodsLikedMutate";
import useGetGoods from "@/hooks/useGoodsQuery";

export type GoodsData = {
  id: number;
  imageUrl: string;
  name: string;
  price: number;
  description: string;
  stock: number;
  discountRate: number;
  discountPrice: number;
  is_liked: boolean;
};

export type GoodsProps = {
  data: GoodsData;
  imageWidth?: number;
  imageHeight?: number;
  displayLike?: boolean;
  dispalyBasket?: boolean;
};

const Goods = (props: GoodsProps) => {
  const {
    data,
    imageWidth = 150,
    imageHeight = 150,
    displayLike,
    dispalyBasket,
  } = props;

  const { mutate } = usePatchToggleGoodsLiked();
  const { refetch } = useGetGoods();

  const isDiscounted = !!data.discountPrice;

  const priceWithComma = (price: number) => {
    return price.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const onClickLikeHandler = (id: any) => {
    mutate(id, {
      onSuccess() {
        refetch();
      },
    });
  };

  return (
    <div className={styles.goodsContainer}>
      <div className={styles.goodsImageContainer}>
        <Image
          className={styles.goodsImage}
          src={data.imageUrl}
          width={imageWidth}
          height={imageHeight}
          alt={data.name}
        />
        {displayLike && (
          <div
            className={styles.goodsLike}
            onClick={() => onClickLikeHandler(data.id)}
          >
            {!!data.is_liked ? (
              <BiSolidHeart size="22px" style={{ fill: "red" }} />
            ) : (
              <BiHeart size="22px" style={{ fill: "white" }} />
            )}
          </div>
        )}
      </div>
      <div className={styles.goodsInfoContainer}>
        <div className={styles.goodsName}>{data.name}</div>
        <span className={styles.priceWrapper}>
          {isDiscounted && (
            <>
              <span className={styles.goodsDiscountRate}>
                {data.discountRate}%
              </span>
              <span className={styles.goodsDiscount}>
                {priceWithComma(data.price)}원
              </span>
            </>
          )}
          <span className={styles.goodsPrice}>
            {isDiscounted
              ? priceWithComma(data.discountPrice)
              : priceWithComma(data.price)}
            원
          </span>
        </span>
      </div>
    </div>
  );
};

export { Goods };
