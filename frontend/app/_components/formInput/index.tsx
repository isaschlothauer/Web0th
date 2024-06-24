"use client"

import React, { ChangeEvent, useState, useEffect } from 'react';
import styles from './index.module.css'
import { formDataInputs } from './inputFieldArray'

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
    rememberId: false
  })

  // useEffect(() => {
  //   console.log("DELETE ME from index.tsx", formData);
  // }, [formData])

  // Input data state handler
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState => ({
      ...prevState,
      [name]: value,
    })))
  }

  const handleCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prevState => ({
      ...prevState,
      [name]: checked
    })))
  }

  const loginSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // API call
    console.log(formData)
  }

  const clearInput = (field: keyof FormDataProps) => {
    setFormData(prevState => ({
      ...prevState,
      [field]: ''
    }));
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
                  <label 
                    htmlFor={element.label} 
                    className={styles.inputFieldLabel} 
                  >
                    {element.input}
                  </label>

                  <div className={styles.inputClearContainer}>
                    <input 
                      id={element.label}  
                      name={element.label} 
                      className={styles.inputFieldStyles} 
                      type={element.type} value={formData[element.label as keyof FormDataProps] as string} 
                      onChange={handleInputChange} 
                      required={element.required}
                    />
                  </div>
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