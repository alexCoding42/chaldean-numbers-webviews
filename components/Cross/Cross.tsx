import styles from './Cross.module.css';

export default function Cross() {
  return (
    <div className={styles.closeContainer}>
      <div
        className={styles.closingCross}
        onClick={() => {
          window.open('', '_self');
          window.close();
        }}
      >
        X
      </div>
    </div>
  );
}
