"use client";

import { usePathname } from "next/navigation";
import styles from "./BasketFloat.module.scss";
import { BiCart } from "react-icons/bi";
import Link from "next/link";
import { useGlobalContext } from "@/context/GlobalContext";
import { useGetGoodsInBasket } from "@/hooks/useGoodsInBasketQuery";

const BasketFloat = () => {
  const currentUrl = usePathname();
  const ctx = useGlobalContext();
  const { data } = useGetGoodsInBasket();

  const isBasketPage = currentUrl === "/basket";
  const isSearchPage = currentUrl === "/search";

  if (isBasketPage || isSearchPage || ctx?.isMenuOpen) return null;

  const amount = data?.goods?.length;

  return (
    <Link href="/basket">
      <div className={styles.container}>
        <BiCart size="30px" className={styles.cart} />
        {amount && <div className={styles.amount}>{amount}</div>}
      </div>
    </Link>
  );
};

export { BasketFloat };
