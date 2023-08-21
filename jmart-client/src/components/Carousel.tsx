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
  displayDot?: boolean;
};

const Carousel = ({ data, height = 170, displayDot = true }: CarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isResetting, setIsResetting] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentIndex === data.length) {
        setIsTransitioning(false);
        setCurrentIndex(0);
        setIsResetting(true);

        setTimeout(() => {
          setIsResetting(false);
          setIsTransitioning(true);
          setCurrentIndex(1);
        }, 50);
      } else if (!isResetting) {
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }
    }, 1500);

    return () => clearInterval(interval);
  }, [data.length, currentIndex, isResetting]);

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  const isActiveDot = (index: number) => {
    if (currentIndex === data.length && index === 0) return true;
    if (index !== data.length) {
      return index === currentIndex;
    }
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
            className={`${styles.container} ${
              !isTransitioning ? styles.noTransition : ""
            }`}
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            <img width="100%" src={item.imageUrl} alt={item.title} />
          </div>
        ))}
        <div
          key={0}
          className={`${styles.container} ${
            !isTransitioning ? styles.noTransition : ""
          }`}
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          <img width="100%" src={data[0].imageUrl} alt={data[0].title} />
        </div>
      </div>
      {displayDot && (
        <div className={styles.dotsContainer}>
          <div className={styles.dots}>
            {data.map((_, index) => (
              <span
                key={index}
                className={`${styles.dot} ${
                  isActiveDot(index) ? styles.activeDot : ""
                }`}
                onClick={() => handleDotClick(index)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export { Carousel };
