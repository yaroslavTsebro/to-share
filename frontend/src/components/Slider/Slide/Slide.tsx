import React from "react";

type Props = {
  src: string;
  width: string;
};

export const Slide = ({ src, width }: Props) => {
  return <img src={src} alt="preview" width={width} />;
};
