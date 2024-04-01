import React from "react";
import TextFieldCSS from "./TextField.module.css";
function TextField({
  title,
  value,
  id,
  type,
  autoFocus,
  onChangeInputValue,
  isRequired,
}) {
  return (
    <div className={`${TextFieldCSS.form__group}`}>
      <input
        autoFocus={autoFocus}
        value={value}
        onChange={onChangeInputValue}
        type={type}
        className={TextFieldCSS.form__field}
        placeholder={id}
        name={id}
        id={id}
        required={isRequired}
      
      />
      <label htmlFor={id} className={TextFieldCSS.form__label}>
        {title}
      </label>
    </div>
  );
}

export default TextField;
