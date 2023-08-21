import Link from "next/link";
import { Goods, GoodsData } from "./Goods";
import styles from "./GoodsList.module.scss";

// import { GoodsListData } from "@/mockData";
import { BiChevronRight } from "react-icons/bi";
import useGetGoods from "@/hooks/useGoodsQuery";

export type GoodsListProps = {
  listDirection?: "row" | "column-2" | "column-3";
  displayGoodsCount?: number;
  title?: string;
  moreLink?: string;
  displayLike?: boolean;
  displayBasket?: boolean;
  data?: GoodsData[];
};

const GoodsList = (props: GoodsListProps) => {
  const {
    listDirection = "row",
    displayGoodsCount = 50,
    title,
    moreLink,
    displayLike,
    displayBasket,
    data,
  } = props;
  const isRowOrColumn2 =
    listDirection === "row" || listDirection === "column-2";
  const isListDirectionRow = listDirection === "row";

  if (!data) return null;
  const goodsData = data;

  return (
    <div className={styles.mainContainer}>
      {title && (
        <div className={styles.titleContainer}>
          <div className={styles.title}>{title}</div>
          {moreLink && (
            <Link href={moreLink} className={styles.moreLink}>
              더보기 <BiChevronRight size={15} />
            </Link>
          )}
        </div>
      )}

      {isRowOrColumn2 ? (
        <div
          className={
            isListDirectionRow
              ? styles.goodsContainerRow
              : styles.goodsContainerColumn2
          }
        >
          {goodsData.map(
            (data, index) =>
              index < displayGoodsCount && (
                <div className={styles.goodsItem}>
                  <Goods data={data} displayLike={displayLike} />
                </div>
              )
          )}{" "}
        </div>
      ) : (
        <div className={styles.goodsContainerColumn3}>
          {goodsData.map(
            (data, index) =>
              index < displayGoodsCount && (
                <div className={styles.goodsItem}>
                  <Goods data={data} displayLike={displayLike} />
                </div>
              )
          )}{" "}
        </div>
      )}
    </div>
  );
};

export { GoodsList };
