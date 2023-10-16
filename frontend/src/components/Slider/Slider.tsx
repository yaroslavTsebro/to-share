import React, { createContext, useEffect, useState } from "react";
import style from "./Slider.module.scss";

type Props = {
  width: string;
  height: string;
  children: JSX.Element | JSX.Element[];
  arrows: JSX.Element[];
};
export class Cat {
  id: string;
  url: string;
  width: number;
  height: number;
  breeds: any[];
  favourite: any;
}
export const SliderContext = createContext({});

export const Slider = () => {
  const [items, setItems] = useState<Cat[]>([]);
  const [slide, setSlide] = useState(0);
  const [animation, setAnimation] = useState(true);

  useEffect(() => {
    fetch("https://api.thecatapi.com/v1/images/search?limit=10").then(
      (result) => {
        result.json().then((result) => setItems(result));
      }
    );
  }, []);

  const preloadImages = () => {
    const prevItemIndex = slide - 1 < 0 ? items.length - 1 : slide - 1;
    const nextItemIndex = (slide + 1) % items.length;

    new Image().src = items[slide].url;
    new Image().src = items[prevItemIndex].url;
    new Image().src = items[nextItemIndex].url;
  }

  useEffect(() => {
    if (items.length) {
      preloadImages();
    }
  }, [slide, items])

  return (
    <div className={style.wrapper}>
      <div className={style.sliderWrapper}>
        {items.length > 0 &&
          items.map((item) => {
            return (
              <img
                key={item.id}
                src={item.url}
                alt="something"
                width={"250px"}
                height={"max"}
              />
            );
          })}
      </div>
      <button>Left</button>
      <button>Right</button>
    </div>
  );
};
