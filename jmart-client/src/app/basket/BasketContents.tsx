"use client";

import { GoodsList } from "@/components/GoodsList";
import styles from "./BasketContents.module.scss";
import { useGetGoodsInBasket } from "@/hooks/useGoodsInBasketQuery";

const BasketContents = () => {
  const { data } = useGetGoodsInBasket();

  return (
    <div className={styles.searchContents}>
      <GoodsList
        listDirection="column-2"
        displayGoodsCount={4}
        displayLike
        data={data?.goods}
      />
    </div>
  );
};

export { BasketContents };
