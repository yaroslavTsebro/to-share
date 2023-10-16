import React, { useContext } from "react";
import { SliderContext } from "../Slider";
import { Slide } from "../Slide/Slide";

type Props = {
  translate: string;
  transition: string;
  width: string;
  slideWidth: string;
};

export const SlidesList = ({
  translate,
  transition,
  width,
  slideWidth,
}: Props) => {
  const items: any = [];

  return (
    <div>
      {items.map((slide: any) => (
        <Slide key={slide.url} width={slideWidth} src={slide.url} />
      ))}
    </div>
  );
};
