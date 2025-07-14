import styles from './styles.module.css';
import { RouterLink } from '../RouterLink';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <RouterLink href='/about-pomodoro/'>
        Entenda como funciona a técnica pomodoro 🍅
      </RouterLink>
      <RouterLink href='/'>
        Ciclo Pomodoro &copy; {new Date().getFullYear()} - Feito por Matheus
        Abdala 👨‍💻
      </RouterLink>
    </footer>
  );
}
