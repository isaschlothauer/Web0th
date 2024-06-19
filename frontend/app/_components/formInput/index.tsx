"use client"

import React, { ChangeEvent, useState, useEffect } from 'react';
import styles from './index.module.css'
import { formDataInputs } from './inputFieldArray'

interface FormDataProps {
  email: string;
  password: string;
  rememberId: boolean;
}

export default function FormInput() {
  const [formData, setFormData] = useState<FormDataProps>({
    email: '',
    password: '',
    rememberId: false
  })

  useEffect(() => {
    console.log(formData);
  }, [formData])

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
    console.log(formData);
  }

  const clearInput = (field: keyof FormDataProps) => {
    setFormData(prevState => ({
      ...prevState,
      [field]: ''
    }));
  }
  
  
  return (
    <>
      <form onSubmit={loginSubmit}>
        <div className={styles.form}>
          <ul className={styles.ulStyles}>

            {/* Input field mapping */}
            {formDataInputs.map((element) => (
              <li key={element.id} className={styles.listStyles}>
                <label htmlFor={element.label} className={styles.inputFieldLabel} >{element.input}</label>
                <div className={styles.inputClearContainer}>
                  <input 
                    id={element.label}  
                    name={element.label} 
                    className={styles.inputFieldStyles} 
                    type={element.type} value={formData[element.label as keyof FormDataProps] as string} 
                    onChange={handleInputChange} 
                  />
                  <button 
                    type="button" 
                    className={styles.inputClearButton} 
                    value={element.label}
                    // onClick={clearInput}   
                    onClick={() => clearInput(element.label as keyof FormDataProps)}
                    >
                    x
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Remember user ID button */}
        <div className={styles.checkboxContainer}>
          <input 
            type="checkbox" 
            id="rememberId" 
            name="rememberId" 
            onChange={handleCheckbox} 
          />
          <label htmlFor="rememberId" className={styles.checkboxLabel}>Remember user ID</label>
        </div>

        <div className={styles.submitButtonLocation}>
          <button type="submit" className={styles.submitButton}>Sign In</button>
        </div>

      </form>
      


    </>
  )
}