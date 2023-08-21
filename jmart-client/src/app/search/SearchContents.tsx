"use client";

import useSearchGoods from "@/hooks/useSearchGoodsQuery";
import styles from "./SearchContents.module.scss";
import { useGlobalContext } from "@/context/GlobalContext";
import { GoodsList } from "@/components/GoodsList";

const SearchContents = () => {
  const ctx = useGlobalContext();
  const { data } = useSearchGoods(ctx?.search ? ctx.search : "");

  return (
    <div className={styles.searchContents}>
      <GoodsList
        listDirection="column-2"
        data={data.goods}
        displayBasket
        displayLike={false}
      />
    </div>
  );
};

export { SearchContents };
