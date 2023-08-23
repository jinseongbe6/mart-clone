"use client";

import { CategoryListData } from "@/mockData";
import styles from "./CategoryList.module.scss";
import { BiTime } from "react-icons/bi";

const CategoryList = () => {
  return (
    <div className={styles.mainContainer}>
      <span className={styles.info}>
        <BiTime size={12} />
        배달시간 <strong>28~39분</strong>예상
        <span style={{ color: "rgb(186, 170,132)" }}>24시까지 주문 가능</span>
      </span>
      <div className={styles.categoryContainer}>
        {CategoryListData.length > 0 &&
          CategoryListData.map((item, index) => (
            <div key={item.id} className={styles.item}>
              {item?.imageUrl && (
                <div className={styles.imgWrapper}>
                  <img
                    className={styles.img}
                    src={item.imageUrl}
                    alt=""
                    width={60}
                    height={60}
                  />
                </div>
              )}
              <div className={styles.itemName}>{item.name}</div>
            </div>
          ))}
      </div>
    </div>
  );
};

export { CategoryList };

// ···
