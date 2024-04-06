import React from 'react';
import styles from '../Options/Options.module.css'; // Asegúrate de que la ruta del archivo CSS es correcta

const Options = ({ value, onChange, options, name }) => {
  return (
    <div className={styles.paymentOptions}>
      {<label className={styles.label}>{"Tipo de demanda:"}</label>}
      <div className={styles.optionsContainer}>
      {options.map((option) => (
        <button
          key={option.value}
          name={name}
          onClick={() => onChange({ target: { name, value: option.value } })}
          className={`${styles.option} ${value === option.value ? styles.selected : ''}`}
        >
          <span className={styles.radio}>
            {value === option.value && <span className={styles.innerCircle}></span>}
          </span>
          {option.label}
        </button>
      ))}
      </div>
    </div>
  );
};

export default Options;
