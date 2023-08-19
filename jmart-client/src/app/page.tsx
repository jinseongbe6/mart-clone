import { Carousel } from "@/components/Carousel";
import styles from "./page.module.scss";
import { MainCarouselData } from "@/mockData";

export default function Home() {
  return (
    <main className={styles.mainContainer}>
      <Carousel data={MainCarouselData} />
      <div className={styles.category}>카테고리</div>
      <div className={styles.target}>진성님을 위한 할인 상품</div>
      <div className={styles.flashdiscount}>번쩍할인</div>
      <div className={styles.noweat}>지금 뭐 먹지</div>
      <div className={styles.new}>새로 나왔어요</div>
      <div className={styles.popular}>요즘 잘 팔려요</div>
      <div className={styles.nowneed}>지금 필요한 생필품</div>
      <div className={styles.representive}>대표상품</div>
      <div className={styles.banner}>중간 프로모션 배너</div>
      <div className={styles.basket}>장바구니</div>
    </main>
  );
}
