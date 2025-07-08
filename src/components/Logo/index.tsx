import { AlarmClock } from 'lucide-react';
import styles from './styles.module.css';

export function Logo() {
  return (
    <div className={styles.logo}>
      <a className={styles.logoLink} href='#'>
        <AlarmClock />
        <span>Ciclos</span>
      </a>
    </div>
  );
}
