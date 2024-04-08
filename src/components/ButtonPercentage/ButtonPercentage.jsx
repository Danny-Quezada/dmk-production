import React from "react";
import ButtonStyle from "../ButtonPercentage/ButtonPercentage.module.css";

function ButtonPercentage({ onClick, content, isActive, title }) {

  const buttonStyle = isActive ? { backgroundColor: 'rgba(0, 0, 255, 0.7)', color: 'white'} : {};

  return (
    <button
        className={ButtonStyle.buttonSend}
        title={title}
        style={buttonStyle}
        type="button"
        onClick={onClick}>
        {content}
    </button>
  );
}

export default ButtonPercentage;
