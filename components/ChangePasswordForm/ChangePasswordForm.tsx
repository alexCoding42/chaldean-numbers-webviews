import { useState } from 'react';
import { useChangePassword } from '@nhost/nextjs';
import styles from './ChangePasswordForm.module.css';
import Cross from '../Cross/Cross';

export default function ChangePasswordForm() {
  const { changePassword } = useChangePassword();

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isloading, setIsLoading] = useState(false);
  const [isPasswordChanged, setIsPasswordChanged] = useState(false);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    if (newPassword === '' || confirmPassword === '') {
      setErrorMessage('You must fill all the fields');
      setIsLoading(false);
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage('New password and confirm password do not match');
      setIsLoading(false);
      return;
    }

    try {
      const res = await changePassword(newPassword);
      setIsPasswordChanged(true);
    } catch (error) {
      setErrorMessage((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isPasswordChanged) {
    return (
      <>
        <div className={styles.description}>
          Your password has been changed. You can now close this window and
          login through the application.
        </div>
        <Cross />
      </>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.inputContainer}>
        <div className={styles.label}>New Password:</div>
        <input
          type='password'
          value={newPassword}
          onChange={(event) => setNewPassword(event.target.value)}
          className={styles.textField}
        />
        <div className={styles.clearIcon} onClick={() => setNewPassword('')}>
          <div>x</div>
        </div>
      </div>
      <div className={styles.inputContainer}>
        <div className={styles.label}>Confirm Password:</div>
        <input
          type='password'
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          className={styles.textField}
        />
        <div
          className={styles.clearIcon}
          onClick={() => setConfirmPassword('')}
        >
          <div>x</div>
        </div>
      </div>
      {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
      <button type='submit' className={styles.button} disabled={isloading}>
        {isloading ? 'Loading...' : 'Change Password'}
      </button>
    </form>
  );
}
