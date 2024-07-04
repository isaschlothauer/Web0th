'use client'

import { useContext, useEffect, useRef } from 'react';
import { LoginContext } from '../contexts/loginContext';
import { useRouter } from 'next/navigation';

export default function Dashboard () {
  const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext)
  let loggedInStatus = useRef(false);
  // useRef keeps track of logged in status even through component remount. 
  
  const router = useRouter();

  useEffect(() => {
    if (loggedInStatus.current == true && isLoggedIn == false)
      setIsLoggedIn(true);

    if (isLoggedIn)
      loggedInStatus.current = true;
    else {
      loggedInStatus.current = false;
      setIsLoggedIn(false)
    }
  })


  useEffect(() => {
    if (loggedInStatus.current == false)
      router.push('/');
  })

  const testFunc = () => {
    setIsLoggedIn(false);
  }
  // if (isLoggedIn == false)
  //   router.push('/');

  // useEffect(() => {
  //   console.log("isLoggedIn", isLoggedIn);
  // }, [isLoggedIn])

  return (
    <>
    {isLoggedIn && <div>
        <p>Hello</p>
        <button
          type="button"
          onClick={testFunc}
        >
          Test
        </button>
      
      </div>}
      
    </>
  )
}