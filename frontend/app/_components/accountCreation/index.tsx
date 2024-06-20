"use client"

import React, { ChangeEvent, useState, useEffect } from 'react';
import styles from './index.module.css'
import { accountRegistrationInputArray } from './accountRegistrationInputArray'
import SubmitButton from '../formSubmitButton'
interface AccountRegistrationProps {
  email: string;
  password: string;
  passwordConfirm: string;
}

interface submitButtonProps {
  registrationCancel: ()=> void;
}

export default function AccountCreation(props: submitButtonProps) {
  const [registrationData, setRegistrationData] = useState<AccountRegistrationProps>({
    email: '',
    password: '',
    passwordConfirm: '',
  })

  // Input data state handler
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegistrationData((prevState => ({
      ...prevState,
      [name]: value,
    })))
  }

  const accountCreationSbumit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // API call
    console.log(registrationData)
  }

  // function registrationCancel() {
  //   console.log("registration cancelled")
  // }
  
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
                      type={item.type} value={registrationData[item.label as keyof AccountRegistrationProps] as string} 
                      onChange={handleInputChange} 
                      required={item.required}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Submit button */}
        <div className={styles.submitButtonAlignment}>
          <SubmitButton buttonName='Create account'/>
        </div>
      </form>

      {/* Registration cancellation and return to log in */}
      <button className={styles.accountRegCancel} onClick={props.registrationCancel}>Cancel</button>
    </>
  )
}