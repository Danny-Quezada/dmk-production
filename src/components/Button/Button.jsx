import React from "react";
import ButtonStyle from "./Button.module.css";
function Button({ title, onSubmit }) {
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

export default Button;
