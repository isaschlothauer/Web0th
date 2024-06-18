import styles from "./page.module.css";

import FormInput from './_components/formInput'

export default function Home() {
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
              <div className={styles.authText}>
                Log in or create account
              </div>
              {/* <p className={styles.loginText}></p> */}
              <FormInput />
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
