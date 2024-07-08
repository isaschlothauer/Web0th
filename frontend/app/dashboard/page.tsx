'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './index.module.css'
import { useExpirationValidator } from '../hooks/useExpirationValidator';
import axios from 'axios';
import Header from '../_components/Header'

export default function Dashboard () {
  const [ componentLoader, setComponentLoader ] = useState<boolean | null>(null);
  const [ userName, setUserName ] = useState<string>('');

  const router = useRouter();
  const authenticationState : any = useExpirationValidator();

  useEffect(() => {
    if (authenticationState) {

      if (authenticationState.status !== 200) {
        setComponentLoader(false);
        router.push('/');
      } else {
        if (authenticationState.data && authenticationState.data.user) {
          setUserName(authenticationState.data.user);
        }
        setComponentLoader(true);
      }
    }
  }, [authenticationState, router]);


  // Log out trigger function. Request res.clearCookie() to delete cookie
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
    <>
        <Header />
        <main className={styles.dashboardContainer}>
          <div className={styles.centerContainer}>
            <article>
              <p>Welcome. You are logged in.</p>
              <p>Hello. My name is Isamu Schlothauer and this is a demo of full stack web authentication application, initially started as a part of larger personal project.</p>
              <p className={styles.dashboardParagraph}>Current user login: {userName}</p>
              <div className={styles.techStackList}>
                <p className={styles.techStack}>Project tech stack: </p>
                
                <div className={styles.techStackParagraph}>
                  <div className={styles.tech}>Frontend: </div>
                  <div>NextJS</div>
                </div>
                <div className={styles.techStackParagraph}>
                  <div className={styles.tech}>Backend: </div>
                  <div>Node / Express</div>
                </div>
                <div className={styles.techStackParagraph}>
                  <div className={styles.tech}>Database: </div>
                  <div>MariaDB (MySQL)</div>
                </div>
                <div className={styles.techStackParagraph}>
                  <div className={styles.tech}>Additional: </div>
                  <div>TypeScript</div>
                </div>
              </div>
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
        </>
        : 
        <div>...loading</div>}
        
    </>
  )
}