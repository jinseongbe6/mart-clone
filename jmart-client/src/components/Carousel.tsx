"use client";

import React, { useState, useEffect } from "react";
import styles from "./Carousel.module.scss";

export type CarouselData = {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
};

export type CarouselProps = {
  data: CarouselData[];
  height?: number;
};

const Carousel = ({ data, height = 170 }: CarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === data.length - 1 ? 0 : prevIndex + 1
      );
    }, 2000);

    return () => clearInterval(interval);
  }, [data.length]);

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  if (data?.length === 0) {
    return <></>;
  }

  return (
    <div className={styles.carouselContainer} style={{ height }}>
      <div className={styles.imageContainer}>
        {data.map((item, index) => (
          <div
            key={item.id}
            className={`${styles.container}`}
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            <img width="100%" src={item.imageUrl} alt={item.title} />
          </div>
        ))}
      </div>
      <div className={styles.dotsContainer}>
        <div className={styles.dots}>
          {data.map((_, index) => (
            <span
              key={index}
              className={`${styles.dot} ${
                index === currentIndex ? styles.activeDot : ""
              }`}
              onClick={() => handleDotClick(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export { Carousel };
