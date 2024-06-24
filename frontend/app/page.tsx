'use client'
import styles from "./page.module.css";
import { ReactNode, useState } from 'react';
import dynamic from 'next/dynamic'

// Lazy loading
const FormInput = dynamic(() => import('./_components/formInput'))
const AccountCreation = dynamic(() => import('./_components/accountCreation'))
const AccountRecovery = dynamic(() => import('./_components/accountRecovery'))

export default function Home() {
  const [ renderLoginComponent, setRenderLoginComponent ] = useState<ReactNode>(<FormInput componentSetter={handleComponentChange} />)

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
