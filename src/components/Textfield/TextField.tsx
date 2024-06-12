import React from "react";
import TextFieldCSS from "./TextField.module.css";

interface Props {
  title: string;
  value: string;
  id: string;
  type: string;
  autoFocus: boolean;
  onChangeInputValue: (e: React.FormEvent<HTMLInputElement>) => void;
  isRequired: boolean;
  readOnly: boolean;
  compareValue?: number | null;
}
function TextField({
  title,
  value,
  id,
  type,
  autoFocus,
  onChangeInputValue,
  isRequired,
  readOnly,
  compareValue,
}: Props) {
  return (
    <div className={`${TextFieldCSS.form__group}`}>
      <input
        onInvalid={(e) => {
          const event = e.target as HTMLInputElement;

          if (event.value === "") {
            event.setCustomValidity("Campo requerido, coloca: " + title);
          }
          if (type === "number") {
            if (event.value === "--" || event.value === "e") {
              event.setCustomValidity("Solamente números");
            }

            if (
              compareValue != null &&
              compareValue >= Number.parseInt(event.value)
            ) {
             
              event.setCustomValidity(
                title + " no puede ser menor o igual que: " + compareValue
              );
            }
          }
        }}
        onInput={(e) => {
          const event = e.target as HTMLInputElement;

          if (
            compareValue != null &&
            compareValue > Number.parseInt(event.value)
          ) {
            event.setCustomValidity(
              title + " no puede ser menor o igual que: " + compareValue
            );
          } else {
            event.setCustomValidity("");
          }
        }}
        max= {type==="date" ?  new Date().toISOString().split('T')[0]:   "1000000"}
        min="0"
        step="any"
        title={title}
        autoFocus={autoFocus}
        value={value}
        onChange={onChangeInputValue}
        type={type}
        className={TextFieldCSS.form__field}
        placeholder={id}
        name={id}
        id={id}
        required={isRequired}
        readOnly={readOnly}
      />
      <label htmlFor={id} className={TextFieldCSS.form__label}>
        {title}
      </label>
    </div>
  );
}

export default TextField;
