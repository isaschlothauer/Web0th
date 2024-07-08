import { ChangeEvent } from "react";
import styles from "./index.module.css"

interface InputPropTypes {
  inputProps: {
    required: boolean;
    type: string;
    label: string; 
    value: string;
    input: string;
    disabled?: boolean
  }
  onInputChange: (label: string, value: string) => void;
}

export default function InputField(props: InputPropTypes) {
  const { input, label, type, required, value, disabled } = props.inputProps;
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
          value={value}
          onChange={handleChange} 
          required={required}
          disabled={disabled}
        />
      </div>
    </>
  )
}

function onInputChange(label: string, value: string) {
  throw new Error("Function not implemented.");
}
