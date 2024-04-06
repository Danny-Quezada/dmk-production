import React from 'react';
import DropDownCSS from "./DropDown.module.css"; // Asegúrate de que la ruta del CSS sea correcta

const DropdownSelect = ({ value, onChange, options, name }) => {

  return (
    <div> 
      {<label className={DropDownCSS.label}>{"Tipo de demanda:"}</label>}
        <select
          name={name}
          value={value}
          onChange={onChange}
          className={DropDownCSS.dropdown}>

          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
    </div>
  );
};

export default DropdownSelect;
