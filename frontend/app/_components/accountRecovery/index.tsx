"use client"

import { useState } from 'react';
import styles from './index.module.css'
import { accountRecoveryInputArray } from './accountRecoveryInputArray'
import SubmitButton from '../formSubmitButton'
import InputField from '../inputField';
import axios from 'axios';

import { ComponentProps } from '../formInput';

interface AccountRecoveryProps {
  email: string;
}

export default function AccountRecovery (componentSetter: ComponentProps) {
  const [ accountRecoveryData, setAccountRecoveryData ] = useState<AccountRecoveryProps>({
    email: '',
  })

  // Input data state handler
  const handleInputChange = (label: string, value: string) => {
    setAccountRecoveryData((prevState => ({
      ...prevState,
      [label]: value,
    })))
  }

  const accountRecoveryFOrmSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // API call
    try {  
      // ..... //
      console.log("This functionality is currently unimplemented")
    }
    catch (err: any) {
      console.error(err);
    }
  }
  

  const setComponent = (arg: number) => {
    componentSetter.componentSetter(arg);
  }
  
  return (
    <>
      <form onSubmit={accountRecoveryFOrmSubmit}>
        <div className={styles.form}>
          <div className={styles.formContentStyles}>
            <div className={styles.signInContainerText}>
              Account recovery
            </div>
            <ul className={styles.ulStyles}>

              {/* Input field mapping */}
              {accountRecoveryInputArray.map((item) => (
                <li key={item.id} className={styles.listStyles}>
                  <div className={styles.inputClearContainer}>
                    <InputField
                      inputProps={{
                        required: item.required,
                        input: item.input,
                        label: item.label,
                        type: item.type,
                        value: accountRecoveryData[item.label as keyof AccountRecoveryProps] as string,
                        disabled: true
                      }}
                      onInputChange={handleInputChange}
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
      <p className={styles.inputDisabled}>* Currently account recovery functionality has not been implemented</p>
    </>
  )
}