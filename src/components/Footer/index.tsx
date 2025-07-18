import styles from './styles.module.css';
import { RouterLink } from '../RouterLink';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <RouterLink href='/about-pomodoro/'>
        Entenda como funciona a técnica pomodoro 🍅
      </RouterLink>
      <a
        href='https://www.linkedin.com/in/matheus-m-abdala/'
        target='_blank'
        rel='noopener noreferrer'
      >
        Ciclo Pomodoro &copy; {new Date().getFullYear()} - Feito por Matheus
        Abdala 👨‍💻
      </a>
    </footer>
  );
}
