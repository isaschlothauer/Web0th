'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './index.module.css'
import { useExpirationValidator } from '../hooks/useExpirationValidator';
import axios from 'axios';

export default function Dashboard () {
  const [ componentLoader, setComponentLoader ] = useState<boolean | null>(null);

  const router = useRouter();
  const authenticationState : any = useExpirationValidator();

  useEffect(() => {
    authenticationState && console.log(authenticationState);
    if (authenticationState && authenticationState.status !== 200) {
      setComponentLoader(false);
      
      router.push('/');
    }
    setComponentLoader(true);
  })


  // Logging out
  const logOut = async () => {
    await axios.delete(`${process.env.NEXT_PUBLIC_URL}:${process.env.NEXT_PUBLIC_BACKEND_PORT}/api/${process.env.NEXT_PUBLIC_COOKIE}`, 
      {withCredentials: true,
      headers: {
        'Access-Control-Allow-Origin': '*', 
        'Content-Type': 'application/cookie'
        }
      })
    setComponentLoader(false);
    router.push('/');
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
            onClick={logOut}
            className={styles.signOutButton}
          >
            Sign out
          </button>
        </div>
        
      
      </main>
      : 
      <div>...loading</div>}
      
    </>
  )
}