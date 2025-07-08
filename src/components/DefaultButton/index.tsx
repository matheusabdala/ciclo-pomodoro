import styles from './styles.module.css';

type defaultButtonProps = {
  icon: React.ReactNode;
  color?: 'white' | 'red';
} & React.ComponentProps<'button'>;

export function DefaultButton({
  icon,
  color = 'white',
  ...props
}: defaultButtonProps) {
  return (
    <>
      <button className={`${styles.button} ${styles[color]}`} {...props}>
        {icon}
      </button>
    </>
  );
}
