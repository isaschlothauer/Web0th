import Image from "next/image";
import styles from "./page.module.css";

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
            <p className={styles.loginText}>Log in or create account</p>
            <div className={styles.loginContainer}>
              <div className={styles.authPass}>
                

              </div>

            </div>
          </div>
        </main>
      </div>
    </>
  );
}
