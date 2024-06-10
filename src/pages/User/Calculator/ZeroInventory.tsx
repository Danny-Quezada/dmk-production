import React, { useState } from 'react'
import Button from '../../../components/Button/Button'
import TextField from '../../../components/Textfield/TextField'

const ZeroInventory = () => {
    const [ZI, setZI] = useState({
        PPT: "",
        MESES: "",
      
      });
    

    const onChange = (e) => {
        setZI({ ...ZI, [e.target.name]: e.target.value });
      };
    
      const submit = (event) => {
        event.preventDefault();
      
        // changeResult(Math.sqrt((2 * eoq.D * eoq.S) / eoq.H));
      };
  return (
    <form
        style={{
          margin: "10px",
          display: "flex",
          gap: "20px",
          flexDirection: "column",
        }}
        onSubmit={submit}
      >
        <h3>Inventario cero</h3>
        <TextField
          autoFocus={true}
          value={ZI.PPT}
          onChangeInputValue={onChange}
          id={"D"}
          title={"Demanda"}
          type={"number"}
          isRequired={true}
          readOnly={false}
        />

       
        <TextField
          autoFocus={false}
          onChangeInputValue={onChange}
          type={"number"}
          id={"S"}
          isRequired={true}
          title={"Coste de establecimiento"}
          value={ZI.MESES}
          readOnly={false}
        />

       
        <Button title={"Calcular"} onSubmit={submit} />
      </form>

  )
}

export default ZeroInventory
