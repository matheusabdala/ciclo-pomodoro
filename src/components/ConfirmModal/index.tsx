import styles from './styles.module.css';

interface ConfirmModalProps {
  text: string;
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmModal({
  text,
  isOpen,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onCancel();
    }
  };

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.modal}>
        <button
          className={styles.closeButton}
          onClick={onCancel}
          aria-label='Fechar modal'
        >
          ×
        </button>
        <div className={styles.content}>
          <p className={styles.text}>{text}</p>
          <div className={styles.buttonContainer}>
            <button
              className={`${styles.button} ${styles.cancelButton}`}
              onClick={onCancel}
            >
              Cancelar
            </button>
            <button
              className={`${styles.button} ${styles.confirmButton}`}
              onClick={onConfirm}
            >
              Confirmar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
