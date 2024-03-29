import Head from "next/head";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import ChangePasswordForm from "../components/ChangePasswordForm/ChangePasswordForm";
import Cross from "../components/Cross/Cross";
import styles from "../styles/Home.module.css";

enum ParamType {
  passwordReset = "passwordReset",
  emailVerify = "emailVerify",
}

enum ErrorType {
  invalidRequest = "invalid-request",
  invalidTicket = "invalid-ticket",
}

export default function Home() {
  const router = useRouter();
  const { refreshToken, type, error, errorDescription } = router.query;

  let renderContent: ReactNode = <></>;

  switch (error) {
    case ErrorType.invalidRequest:
      renderContent = (
        <>
          <div className={styles.title}>Error: {error ?? ""}</div>
          <div className={styles.description}>{errorDescription ?? ""}</div>
        </>
      );
      break;
    case ErrorType.invalidTicket:
      renderContent = (
        <>
          <div className={styles.title}>Error: {error ?? ""}</div>
          <div className={styles.description}>{errorDescription ?? ""}</div>
        </>
      );
      break;
  }

  switch (type) {
    case ParamType.passwordReset:
      renderContent = (
        <>
          <div className={styles.title}>Password reset</div>
          {refreshToken ? (
            <ChangePasswordForm />
          ) : (
            <div className={styles.description}>
              The token to reset your password has expired, please generate a
              new one by performing a reset password through the application.
            </div>
          )}
        </>
      );
      break;
    case ParamType.emailVerify:
      renderContent = (
        <>
          <div className={styles.title}>Email verification</div>
          {refreshToken ? (
            <div className={styles.description}>
              Your account has been verified. You can now close this window and
              login through the application.
            </div>
          ) : (
            <div className={styles.description}>
              The token to verify your account has expired, please generate a
              new one by asking a new confirmation link through the application.
            </div>
          )}
        </>
      );
      break;
  }

  return (
    <>
      <Head>
        <title>Chaldean Numbers</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        {renderContent}
        <Cross />
      </main>
    </>
  );
}
