"use client";

import { useGlobalContext } from "@/context/GlobalContext";
import styles from "./OffCanvasMenu.module.scss";
import {
  BiArrowBack,
  BiChevronRight,
  BiSolidHeart,
  BiReceipt,
} from "react-icons/bi";
import Link from "next/link";
import useGetGoods from "@/hooks/useGoodsQuery";
import { GoodsList } from "./GoodsList";

const OffCanvasMenu = () => {
  const ctx = useGlobalContext();
  const { data } = useGetGoods();

  const onClickLikedGoosHandler = () => {
    ctx?.closeMenu();
  };

  return (
    <div
      className={`${styles.mainContainer} ${ctx?.isMenuOpen && styles.open}`}
    >
      <BiArrowBack
        size="26px"
        onClick={ctx?.closeMenu}
        className={styles.backIcon}
      />

      <div className={styles.topContainer}>
        <Link href="/" className={styles.textWrapper} onClick={ctx?.closeMenu}>
          <strong>J마트 홈</strong>으로 가기 <BiChevronRight size="28px" />
        </Link>
        <div className={styles.menuWrapper}>
          <Link
            href="/basket"
            className={styles.menuWrapperSub}
            onClick={ctx?.closeMenu}
          >
            <BiReceipt size="22px" />
            <div>주문내역</div>
          </Link>
          <div className={styles.verticleLine}></div>
          <div
            className={styles.menuWrapperSub}
            onClick={onClickLikedGoosHandler}
          >
            <BiSolidHeart size="22px" className={styles.heart} />
            <div>찜한상품</div>
          </div>
        </div>
      </div>

      <div className={styles.bottomContainer}>
        <div className={styles.title}>맛있는 것</div>
        <GoodsList
          listDirection="column-2"
          displayGoodsCount={4}
          displayLike
          data={data?.goods}
        />
      </div>
    </div>
  );
};

export { OffCanvasMenu };
