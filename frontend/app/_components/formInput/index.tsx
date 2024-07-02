"use client"

import React, { ChangeEvent, useState, useEffect } from 'react';
import styles from './index.module.css'
import { formDataInputs } from './inputFieldArray'
import { FormDataInputProps } from './inputFieldArray'
import InputField from '../inputField';

import axios, {isCancel, AxiosError} from 'axios';

interface FormDataProps {
  email: string;
  password: string;
  rememberId: boolean;
}

export interface ComponentProps {
  componentSetter: (compId: number)=> void;
}

export default function FormInput(componentSetter: ComponentProps) {
  const [formData, setFormData] = useState<FormDataProps>({
    email: '',
    password: '',
    rememberId: false,
  })

  // Input data state handler
  const handleInputChange = (label: string, value: string) => {
    setFormData((prevState => ({
      ...prevState,
      [label]: value,
    })))
  }

  const handleCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prevState => ({
      ...prevState,
      [name]: checked
    })))
  }

  const loginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // API call
    console.log(formData);

    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_URL}:${process.env.NEXT_PUBLIC_BACKEND_PORT}/api/${process.env.NEXT_PUBLIC_LOGIN}`, formData);    

      console.log(res);
    }
    catch (err) {
      console.error(err);
    }

  }



  const setComponent = (arg: number) => {
    componentSetter.componentSetter(arg);
  }

  return (
    <>
      <form onSubmit={loginSubmit}>
        <div className={styles.form}>
          <div className={styles.formContentStyles}>
            <div className={styles.signInContainerText}>
              SIgn in or 
              <button
                type="button" 
                onClick={()=>setComponent(0)}
                className={styles.registration}  
              >
                create a new account
              </button>
            </div>
            <ul className={styles.ulStyles}>

              {/* Input field mapping */}
              {formDataInputs.map((element) => (
                <li key={element.id} className={styles.listStyles}>
                  <InputField
                    inputProps={{
                      required: element.required,
                      input: element.input,
                      label: element.label,
                      type: element.type,
                      value: formData[element.label as keyof FormDataProps] as string,
                    }}
                    onInputChange={handleInputChange}
                  />
                </li>
              ))}
            </ul>
          </div>
          
          {/* Remember user ID button */}
          <div className={styles.checkbox}>
            <input 
              type="checkbox" 
              id="rememberId" 
              name="rememberId" 
              onChange={handleCheckbox} 
            />
            <label htmlFor="rememberId" className={styles.checkboxLabel}>
              Remember user ID
            </label>
          </div> 
        </div>

        {/* Submit button */}
        <div className={styles.submitButtonAlignment}>
          <button type="submit" className={styles.submitButton}>Sign In</button>
        </div>

      </form>
      <p className={styles.loginRecovery}>Forgot your login or password? 
        <button 
          type="button" 
          className={styles.linkStyle}
          onClick={()=>setComponent(1)}
          >
          Account recovery
        </button>
      </p>
    </>
  )
}