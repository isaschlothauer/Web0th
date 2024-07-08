'use client'

import { useContext, useEffect, useState } from 'react';
import { LoginContext } from '../contexts/loginContext';
import { useRouter } from 'next/navigation';
import styles from './index.module.css'
import { useExpirationValidator } from '../hooks/useExpirationValidator';

export default function Dashboard () {
  const [ componentLoader, setComponentLoader ] = useState<boolean | null>(null);

  const router = useRouter();
  const authenticationState : any = useExpirationValidator();

  useEffect(() => {
    authenticationState && console.log(authenticationState);
    if (authenticationState && authenticationState.status === undefined) {
      setComponentLoader(false);
      
      

      router.push('/');
    }

    setComponentLoader(true);
  })


  const testFunc = () => {
  }


  return (
    <>
    {componentLoader? 
      <main className={styles.dashboardContainer}>
        <div className={styles.centerContainer}>
          <h1 className={styles.dashboardMainHeader}>Secure page</h1>
          <article>
            Hello and welcome. This is a secure page and only way to reach this page is through valid authentication. 
          </article>
          <button
            type="button"
            onClick={testFunc}
          >
            Test
          </button>
        </div>
        
      
      </main>
      : 
      <div>...loading</div>}
      
    </>
  )
}