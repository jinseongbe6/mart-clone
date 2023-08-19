"use client";

import { usePathname, useRouter } from "next/navigation";
import styles from "./GlobalNavBar.module.scss";
import { BiMenu, BiSearch, BiArrowBack } from "react-icons/bi";

const GlobalNavBar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const backButton = pathname !== "/";

  const onClickSearchHandler = () => {
    console.log("search");
  };

  const onClickMenuHandler = () => {
    console.log("menu");
  };

  return (
    <nav className={styles.nav}>
      {backButton && (
        <BiArrowBack
          size="26px"
          onClick={router.back}
          className={styles.backIcon}
        />
      )}
      <div onClick={() => router.push("/")} className={styles.logoContainer}>
        J마트
      </div>
      <div className={styles.wrapper}>
        <BiSearch
          onClick={onClickSearchHandler}
          size="28px"
          className={styles.searchIcon}
        />
        <BiMenu
          onClick={onClickMenuHandler}
          size="30px"
          className={styles.menuIcon}
        />
      </div>
    </nav>
  );
};

export { GlobalNavBar };
