"use client"

import React, { useState } from 'react';
import styles from './index.module.css'
import { accountRegistrationInputArray } from './accountRegistrationInputArray'
import SubmitButton from '../formSubmitButton'
import { ComponentProps } from '../formInput';
import InputField from '../inputField';
import { emailVerification } from '@/app/hooks/emailVerification';

import axios, {isCancel, AxiosError} from 'axios';

interface AccountRegistrationProps {
  email: string;
  password: string;
  passwordConfirm: string;
}

interface RenderErrorProps {
  email: boolean;
  password: number;
}

interface ErrorProps {
  message: string;
}

export default function CreateAccount(componentSetter: ComponentProps) {
  const [registrationData, setRegistrationData] = useState<AccountRegistrationProps>({
    email: '',
    password: '',
    passwordConfirm: '',
  })

  // Error msg trigger
  const [ renderErrorMsg, setRenderErrorMsg ] = useState<RenderErrorProps>({
    email: false,
    password: 1,
  })

  // Backend error msgs
  const [ validationFailureMsg, setValidationFailureMsg ] = useState<ErrorProps[]>([])

  // Msg for new account creation
  const [ successMsg, setSuccessMsg] = useState<string>('');

  // Input data state handler
  const handleInputChange = (label: string, value: string) => {
    setRegistrationData((prevState) => ({
      ...prevState,
      [label]: value.trim(),
    }));

    // Resets renderErrorMsg state when input is changed
    if (label === 'email') {
      setRenderErrorMsg(prevState => ({
        ...prevState,
        email: false
      }))
    } else if (label === 'password' || label === 'passwordConfirm') {
      setRenderErrorMsg(prevState => ({
        ...prevState,
        password: 1
      }))
    }
  }

  // Data submission handler
  const accountCreationSbumit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Clear previous backend error messages
    setValidationFailureMsg([]);

    // Frontend email format check. Following state renders the error message or not. 
    if (emailVerification(registrationData.email) !== true) {
      setRenderErrorMsg(prevState => ({
        ...prevState,
        email: true
      }))
    } else {
      setRenderErrorMsg(prevState => ({
        ...prevState,
        email: false
      }))
    }

    // String compare
    const passwordMatchVerification = (registrationData.password).localeCompare(registrationData.passwordConfirm);

    if (!passwordMatchVerification) {
      setRenderErrorMsg(prevState => ({
        ...prevState,
        password: -1 || 1
      }))
    } else {
      setRenderErrorMsg(prevState => ({
        ...prevState,
        password: 0
      }))
    }

    // API call
    if (renderErrorMsg.email == false && passwordMatchVerification == 0) {
      try{
        const res = await axios.post(`${process.env.NEXT_PUBLIC_URL}:${process.env.NEXT_PUBLIC_BACKEND_PORT}/api/${process.env.NEXT_PUBLIC_REGISTER}`, registrationData);     

        if (res.data.success === true) {
          setRegistrationData({
            email: "",
            password: "",
            passwordConfirm: ""
          })
        }

        // Clear error texts
        setValidationFailureMsg([]);

        setSuccessMsg(res.data.message);
        setTimeout(() => {
          setSuccessMsg('');
          setComponent(2);
        }, 2500)
      } catch (error: any) {

        const errorMsg = error.response;

        if (errorMsg.data.success == false) {

          setValidationFailureMsg(prevState => {
            return [...prevState, { message: errorMsg.data.error }];

          })
        } else if (errorMsg.data.errors) {

          const errorMsgs: ErrorProps[] = errorMsg.data.errors.map((err: any) => ({ message: err }));
        //   // console.log(error)
          setValidationFailureMsg(errorMsgs);

        } else{
          console.error("Account creation errors: ", errorMsg);
        }
      }
    }
  }

  const errorTextsHandler = () => {
    return (
      <ul className={styles.errorMsgsUL}>
        {validationFailureMsg.map((element, index) => (
          <li key={index} className={styles.errorMsgList}>* {element.message}</li>
        ))}
      </ul>
    )
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
              Account creation
            </div>
            <ul className={styles.ulStyles}>

              {/* Input field mapping */}
              {accountRegistrationInputArray.map((item) => (
                <li key={item.id} className={styles.listStyles}>
                    <InputField inputProps={{
                        required:item.required,
                        input: item.input,
                        label: item.label,
                        type: item.type,
                        value: registrationData[item.label as keyof AccountRegistrationProps],
                      }}
                      onInputChange={handleInputChange}
                    />
                    {((item.id === 0 && renderErrorMsg.email) && renderErrorMsg.email) && <p className={styles.invalidEmailAddressMsgInvisible}>* Please provide valid email address</p>}
                    {(item.id === 2 && renderErrorMsg.password === 0) && <p className={styles.invalidEmailAddressMsgInvisible}>* Password mismatch</p>}
                </li>
              ))}
            </ul>
            {errorTextsHandler()}
            <p className={styles.newAccountMsg}>{successMsg}</p>

          </div>
        </div>

        {/* Submit button */}
        <div className={styles.submitButtonAlignment}>
          <SubmitButton 
            buttonName='Create Account'            
          />
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