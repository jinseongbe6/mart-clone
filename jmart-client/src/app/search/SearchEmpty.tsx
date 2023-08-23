import styles from "./SearchEmpty.module.scss";

const SearchEmpty = () => {
  return (
    <div className={styles.emptyContainer}>
      <div className={styles.wrapper}>
        <img
          className={styles.emptyImg}
          src="https://cdn-mart.baemin.com/front-end/assets/20230817121409/images/defaultEmptyImage.11f8bc33139d72b546eb54f5b89e2abf.png"
        />
        <div className={styles.emptyText}>최근 검색내역이 없습니다.</div>
      </div>
    </div>
  );
};

export { SearchEmpty };
