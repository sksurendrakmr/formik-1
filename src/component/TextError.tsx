import React from "react";
import { JsxElement } from "typescript";
import "../App.css";

type TextErrorProps = {
  children: string;
};

export const TextError = (props: any) => {
  return <div className="error">{props.children}</div>;
};
