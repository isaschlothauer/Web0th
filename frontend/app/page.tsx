'use client'
import styles from "./page.module.css";
import Link from 'next/link';

import { useState } from 'react';

import FormInput from './_components/formInput';
import AccountCreation from './_components/accountCreation';

export default function Home() {
  const [ authComponentVisible, setAuthComponentVisible ] = useState<boolean>(false);

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
              {authComponentVisible? 
              <>
                <div className={styles.signInContainerText}>
                  Log in or <Link href="/">create account</Link>
                </div>

                <FormInput />
                
                <p className={styles.loginRecovery}>Forgot your login or password? 
                  <Link href="/" className={styles.linkStyle}>
                    Account recovery
                  </Link>
                </p>
              </> 
              : 
              <>
                <div className={styles.signInContainerText}>
                  Account creation
                </div>
                <AccountCreation />
              </>
              }

            </div>
          </div>

        </main>
      </div>
    </>
  );
}
