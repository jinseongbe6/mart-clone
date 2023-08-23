"use client";

import { Carousel } from "@/components/Carousel";
import styles from "./page.module.scss";
import { MainCarouselData, PromotionCarouselData } from "@/mockData";
import { GoodsList } from "@/components/GoodsList";
import { CategoryList } from "@/components/CategoryList";
import useGetGoods from "@/hooks/useGoodsQuery";

export default function Home() {
  const { data } = useGetGoods();

  return (
    <main className={styles.mainContainer}>
      <Carousel data={MainCarouselData} />
      {/* <div className={styles.category}>카테고리</div> */}
      <CategoryList />
      <GoodsList
        title="진성님을 위한 할인 상품"
        listDirection="row"
        displayGoodsCount={9}
        displayLike
        moreLink="/"
        data={data?.goods}
      />
      <GoodsList
        title="지금 뭐 먹지?"
        listDirection="column-3"
        displayGoodsCount={6}
        displayLike
        moreLink="/"
        data={data?.goods}
      />
      <Carousel data={PromotionCarouselData} height={90} displayDot={false} />
      <GoodsList
        title="새로 나왔어요"
        listDirection="row"
        displayGoodsCount={20}
        displayLike
        moreLink="/"
        data={data?.goods}
      />
      <GoodsList
        title="요즘 잘 팔려요"
        listDirection="row"
        displayGoodsCount={20}
        displayLike
        moreLink="/"
        data={data?.goods}
      />
      <GoodsList
        title="지금 필요한 생필품"
        listDirection="column-3"
        displayGoodsCount={24}
        displayLike
        moreLink="/"
        data={data?.goods}
      />
      {/* <div className={styles.representive}>대표상품</div> */}

      {/* <div className={styles.flashdiscount}>번쩍할인</div> */}
    </main>
  );
}
