"use client"

import React, { ChangeEvent, useState, useEffect } from 'react';
import styles from './index.module.css'
import { accountRegistrationInputArray } from './accountRegistrationInputArray'

interface FormDataProps {
  email: string;
  password: string;
  rememberId: boolean;
}

export default function AccountCreation() {
  const [formData, setFormData] = useState<FormDataProps>({
    email: '',
    password: '',
    rememberId: false,
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

  const accountCreationSbumit = (e: React.FormEvent<HTMLFormElement>) => {
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
  
  return (
    <>
      <form onSubmit={accountCreationSbumit}>
        <div className={styles.form}>
          <div className={styles.formContentStyles}>
            <ul className={styles.ulStyles}>

              {/* Input field mapping */}
              {accountRegistrationInputArray.map((item) => (
                <li key={item.id} className={styles.listStyles}>
                  <label 
                    htmlFor={item.label} 
                    className={styles.inputFieldLabel} 
                  >
                    {item.input}
                  </label>

                  <div className={styles.inputClearContainer}>
                    <input 
                      id={item.label}  
                      name={item.label} 
                      className={styles.inputFieldStyles} 
                      type={item.type} value={formData[item.label as keyof FormDataProps] as string} 
                      onChange={handleInputChange} 
                      required={item.required}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Remember user ID button */}
          {/* <div className={styles.checkbox}>
            <input 
              type="checkbox" 
              id="rememberId" 
              name="rememberId" 
              onChange={handleCheckbox} 
            />
            <label htmlFor="rememberId" className={styles.checkboxLabel}>
              Remember user ID
            </label>
          </div>  */}
        </div>

        {/* Submit button */}
        <div className={styles.submitButtonAlignment}>
          <button type="submit" className={styles.submitButton}>Sign In</button>
        </div>

      </form>
    </>
  )
}