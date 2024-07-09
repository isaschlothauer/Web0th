'use client'
import styles from "./page.module.css";
import { ReactNode, useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic'
import { useExpirationValidator } from './hooks/useExpirationValidator'
import axios from 'axios';

// Lazy loading
const FormInput = dynamic(() => import('./_components/FormInput'))
const AccountCreation = dynamic(() => import('./_components/CreateAccount'))
const AccountRecovery = dynamic(() => import('./_components/AccountRecovery'))

const getCookieKillOrder = async () => {
  try {
    // API query returns res.clearCooie() response and deletes stored cookie
    await axios.delete(`${process.env.NEXT_PUBLIC_URL}${process.env.NEXT_PUBLIC_BACKEND_PORT}/api/${process.env.NEXT_PUBLIC_COOKIE}`, 
      {withCredentials: true,
      headers: {
        'Access-Control-Allow-Origin': '*', 
        'Content-Type': 'application/cookie'
        }
      })
  }
  catch (err: any) {
    // console.error("Home error: ", err);
    return err;
  }
}

export default function Home () {
  const [ renderLoginComponent, setRenderLoginComponent ] = useState<ReactNode>(<FormInput componentSetter={handleComponentChange} />)

  const router = useRouter();
  const authenticationState : any = useExpirationValidator();

  useEffect(() => {
    if (authenticationState && authenticationState.status === 200) {
      router.push('/dashboard');
    } else if (authenticationState && authenticationState.status !== 200) {
      getCookieKillOrder()
    }
  });

  // Component ID: 
  // 0: Account Creation
  // 1: Account Recovery
  // 2: Form Input
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
