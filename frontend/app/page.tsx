'use client'
import styles from "./page.module.css";
import Link from 'next/link';

import { useState } from 'react';

import FormInput from './_components/formInput';
import AccountCreation from './_components/accountCreation';

export default function Home() {
  const [ authComponentVisible, setAuthComponentVisible ] = useState<number>(0);

  function registrationCancellation() {
    // This sets account registration back to log in component
    setAuthComponentVisible(0);
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
              {authComponentVisible == 0? 
              <>
                <div className={styles.signInContainerText}>
                  Log in or 
                  <button
                    type="button" 
                    onClick={() => setAuthComponentVisible(1)}
                    className={styles.registration}  
                  >
                    create a new account
                  </button>
                </div>

                <FormInput />
                
                <p className={styles.loginRecovery}>Forgot your login or password? 
                  <button 
                    type="button" 
                    className={styles.linkStyle}
                    onClick={()=>setAuthComponentVisible(0)}
                  >
                    Account recovery
                  </button>
                </p>
              </> 
              : 
              authComponentVisible == 1? 
              <>
                <div className={styles.signInContainerText}>
                  Account creation
                </div>
                <AccountCreation registrationCancel={registrationCancellation}/>
              </>
              :
              <>
                <div className={styles.signInContainerText}>
                  Account recovery
                </div>
                <AccountCreation registrationCancel={registrationCancellation}/>
              </>
              }

            </div>
          </div>

        </main>
      </div>
    </>
  );
}
