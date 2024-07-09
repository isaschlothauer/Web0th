import axios from 'axios';
import { useState, useEffect } from 'react';

export const useExpirationValidator = () => {  
  const [ authResponse, setAuthResponse ] = useState<any>()
  
  useEffect(() => {
      const loginStatusCheck = async () => {
        try {
          const response: any = await axios.get(`${process.env.NEXT_PUBLIC_URL}:${process.env.NEXT_PUBLIC_BACKEND_PORT}/api/${process.env.NEXT_PUBLIC_VERIFY}`, 
            {withCredentials: true,
            headers: {
              'Access-Control-Allow-Origin': '*', 
              'Content-Type': 'application/cookie'
              }
            })
            
            setAuthResponse(response);
        }
        catch (err: any) {
          // console.error("Home error: ", err);
          return setAuthResponse(err);
        }
      } 
      loginStatusCheck();
  }, [])

  return authResponse;
}