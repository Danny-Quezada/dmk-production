import React from "react";
import ButtonStyle from "../ButtonPercentage/ButtonPercentage.module.css";

function ButtonPercentage({ onClick, content, isActive, title }) {

  const buttonStyle = isActive ? { backgroundColor: 'blue' } : {};

  return (
    <button
        className={ButtonStyle.buttonSend}
        title={title}
        style={buttonStyle}
        type="submit"
        onClick={onClick}>
        {content}
    </button>
  );
}

export default ButtonPercentage;
