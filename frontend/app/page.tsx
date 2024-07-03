'use client'
import styles from "./page.module.css";
import { ReactNode, useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic'
import axios from 'axios';

import { LoginContext } from './contexts/loginContext'

// Lazy loading
const FormInput = dynamic(() => import('./_components/formInput'))
const AccountCreation = dynamic(() => import('./_components/createAccount'))
const AccountRecovery = dynamic(() => import('./_components/accountRecovery'))


const landingAuthorizationCheck = async () => {
  const tokenVerified = await axios.get(``)
}

export default function Home () {
  const [ renderLoginComponent, setRenderLoginComponent ] = useState<ReactNode>(<FormInput componentSetter={handleComponentChange} />)

  const router = useRouter();

  // const { loginStatus } = useContext(LoginContext);
  // const { isLoggedIn, setIsLoggedIn } = loginStatus;
  const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext)

  useEffect(() => {
    if (!isLoggedIn) {
      const loginStatusCheck = async () => {
        try {
          const response = await axios.get(`${process.env.NEXT_PUBLIC_URL}:${process.env.NEXT_PUBLIC_BACKEND_PORT}/api/protected/${process.env.NEXT_PUBLIC_USERAUTH}`, 
            {withCredentials: true,
            headers: {
              'Access-Control-Allow-Origin': '*', 
              'Content-Type': 'application/cookie'
              }
            })
          console.log(response)
        }
        catch (err) {
          console.error(err);
        }
      } 
      loginStatusCheck();
    }
  })



  // Component ID: 
  // 0: Account Creation
  // 1: Account Recovery
  // others: Form Input
  function handleComponentChange(compId: number) {
    switch (compId) {
      case 0:
        setRenderLoginComponent(<AccountCreation componentSetter={handleComponentChange} />);
        break;
      case 1:
        setRenderLoginComponent(<AccountRecovery  componentSetter={handleComponentChange} />);
        break;
      default:
        setRenderLoginComponent(<FormInput componentSetter={handleComponentChange}/>)
    }
  }

  return (
    <>
      <div className={styles.mainSection}>
        <header className={styles.headerMain}>
          <h1 className={styles.mainHeader}>Authentication demo</h1>
          <p className={styles.headerText}>This is a fullstack authentication demo project using NextJS, Node/Express, MySQL/MariaDB and TypeScript</p>
        </header>

        <main className={styles.main}>

          <div className={styles.authContainer}>
            <div className={styles.loginContainer}>
              {renderLoginComponent}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
