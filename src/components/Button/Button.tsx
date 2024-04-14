import React from "react";
import ButtonStyle from "./Button.module.css";
function Button({ title, onSubmit }: Props) {
  return (
    <button
      className={ButtonStyle.buttonSend}
      type="submit"
      onSubmit={onSubmit}
    >
      {title}
    </button>
  );
}
interface Props{
  title: string;
  onSubmit: any
}
export default Button;
