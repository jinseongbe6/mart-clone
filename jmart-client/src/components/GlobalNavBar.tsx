"use client";

import { usePathname, useRouter } from "next/navigation";
import styles from "./GlobalNavBar.module.scss";
import { BiMenu, BiSearch, BiArrowBack } from "react-icons/bi";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useGlobalContext } from "@/context/GlobalContext";
import useSearchGoods from "@/hooks/useSearchGoodsQuery";

const GlobalNavBar = () => {
  const ctx = useGlobalContext();
  const pathname = usePathname();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [targetPath, setTargetPath] = useState("/");

  const search = ctx?.search ? ctx.search : "";

  const { refetch } = useSearchGoods(search);

  const isMainPage = pathname === "/";
  const isSearchPage = pathname === "/search";
  const isBasketPage = pathname === "/basket";

  const onClickMenuHandler = () => {
    ctx?.openMenu();
  };

  const onClicikSearchHandler = () => {
    refetch();
  };

  useEffect(() => {
    if (isBasketPage) {
      setTitle("장바구니");
      setTargetPath("/basket");
    } else {
      setTitle("J마트");
      setTargetPath("/");
    }
  }, [pathname]);

  return (
    <nav className={styles.nav}>
      {!isMainPage && (
        <BiArrowBack
          size="26px"
          onClick={router.back}
          className={styles.backIcon}
        />
      )}

      {!isSearchPage && (
        <>
          <div
            onClick={() => router.push(targetPath)}
            className={styles.logoContainer}
          >
            {title}
          </div>
          <div className={styles.wrapper}>
            <Link href="/search" className={styles.searchWrapper}>
              <BiSearch size="28px" className={styles.searchIcon} />
            </Link>
            <BiMenu
              onClick={onClickMenuHandler}
              size="30px"
              className={styles.menuIcon}
            />
          </div>
        </>
      )}

      {isSearchPage && (
        <>
          <input
            type="text"
            value={search}
            className={styles.input}
            placeholder="어떤 상품을 찾으시나요?"
            onChange={(e) => ctx?.setSearch(e.target.value)}
          />

          <div className={styles.wrapper}>
            <BiSearch
              size="28px"
              className={styles.searchIcon}
              onClick={onClicikSearchHandler}
            />
          </div>
        </>
      )}
    </nav>
  );
};

export { GlobalNavBar };
