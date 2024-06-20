'use client'
import styles from "./page.module.css";
import { useState } from 'react';

import FormInput from './_components/formInput';
import AccountCreation from './_components/accountCreation';
import AccountRecovery from './_components/accountRecovery'

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
                  SIgn in or 
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
                    onClick={()=>setAuthComponentVisible(2)}
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
                <AccountRecovery registrationCancel={registrationCancellation}/>
              </>
              }

            </div>
          </div>

        </main>
      </div>
    </>
  );
}
