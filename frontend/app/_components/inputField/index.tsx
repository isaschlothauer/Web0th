import { ChangeEvent } from "react";
import styles from "./index.module.css"



interface InputPropTypes {
  inputProps: {
    required: boolean;
    type: string;
    label: string; 
    input: string;
  }
  onInputChange: (label: string, value: string) => void;
}

export default function InputField(props: InputPropTypes) {
  const { input, label, type, required } = props.inputProps;
  const { onInputChange } = props;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onInputChange(label, e.target.value);
  };
  
  return (
    <>
      <div className={styles.listAlignment}>

        <label 
          htmlFor={label} 
          className={styles.inputFieldLabel} 
        >
          {input}
        </label>

          <input 
            id={label}  
            name={label} 
            className={styles.inputFieldStyles} 
            type={type} 
            onChange={handleChange} 
            required={required}
          />
        </div>
    </>
  )
}

function onInputChange(label: string, value: string) {
  throw new Error("Function not implemented.");
}
