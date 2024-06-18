"use client"

import React, { useState } from 'react';
import styles from './index.module.css'
import { formDataInputs } from './inputFieldArray'

interface FormDataProps {
  email: string;
  password: string;
}

export default function FormInput() {
  const [formData, setFormData] = useState<FormDataProps>({
    email: '',
    password: ''
  })
  return (
    <>
      <form >
        <div className={styles.form}>
          <ul className={styles.ulStyles}>
            {formDataInputs.map((element) => (
              <li key={element.id} className={styles.listStyles}>
                <label htmlFor={element.label} className={styles.inputFieldLabel} >{element.input}</label>
                <input id={element.label}  name={element.label}  className={styles.inputFieldStyles} type={element.type} />
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.checkboxContainer}>
          <input type="checkbox" id="test" name="test"/>
          <label htmlFor="test" className={styles.checkboxLabel}>Remember user ID</label>
        </div>
        
      </form>
    </>
  )
}