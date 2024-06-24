"use client"

import React, { ChangeEvent, useState, useEffect } from 'react';
import styles from './index.module.css'
import { accountRecoveryInputArray } from './accountRecoveryInputArray'
import SubmitButton from '../formSubmitButton'

import { ComponentProps } from '../formInput';

interface AccountRecoveryProps {
  email: string;
}

interface submitButtonProps {
  registrationCancel: ()=> void;
}

export default function AccountRecovery (componentSetter: ComponentProps) {
  const [accountRecovery, setAccountRecovery] = useState<AccountRecoveryProps>({
    email: '',
  })

  // Input data state handler
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAccountRecovery((prevState => ({
      ...prevState,
      [name]: value,
    })))
  }

  const accountCreationSbumit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // API call
    console.log("AccRec: ", accountRecovery)
  }

  const setComponent = (arg: number) => {
    componentSetter.componentSetter(arg);
  }
  
  return (
    <>
      <form onSubmit={accountCreationSbumit}>
        <div className={styles.form}>
          <div className={styles.formContentStyles}>
            <div className={styles.signInContainerText}>
              Account recovery
            </div>
            <ul className={styles.ulStyles}>

              {/* Input field mapping */}
              {accountRecoveryInputArray.map((item) => (
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
                      type={item.type} value={accountRecovery[item.label as keyof AccountRecoveryProps] as string} 
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
          <SubmitButton buttonName='Submit' />
        </div>
      </form>

      {/* Registration cancellation and return to log in */}
      <button 
        className={styles.accountRegCancel} 
        onClick={()=>setComponent(2)}
        >
        Cancel
      </button>
    </>
  )
}