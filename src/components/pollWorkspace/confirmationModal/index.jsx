import { useEffect, useRef } from "react";
import { FiAlertTriangle } from "react-icons/fi";
import styles from "./styles.module.css";

const ConfirmationModal = ({ question, onCancel, onConfirm }) => {
  const dialogRef = useRef(null);
  const cancelButtonRef = useRef(null);

  useEffect(() => {
    cancelButtonRef.current?.focus();
    const handleKeys = (event) => {
      if (event.key === "Escape") {
        onCancel();
        return;
      }
      if (event.key !== "Tab") return;

      const buttons = dialogRef.current?.querySelectorAll("button");
      if (!buttons?.length) return;
      const firstButton = buttons[0];
      const lastButton = buttons[buttons.length - 1];

      if (event.shiftKey && document.activeElement === firstButton) {
        event.preventDefault();
        lastButton.focus();
      } else if (!event.shiftKey && document.activeElement === lastButton) {
        event.preventDefault();
        firstButton.focus();
      }
    };

    document.addEventListener("keydown", handleKeys);
    return () => document.removeEventListener("keydown", handleKeys);
  }, [onCancel]);

  return (
    <div
      className={styles.backdrop}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onCancel();
      }}
    >
      <section
        className={styles.modal}
        ref={dialogRef}
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="delete-poll-title"
        aria-describedby="delete-poll-description"
      >
        <span className={styles.warningIcon}><FiAlertTriangle aria-hidden="true" /></span>
        <h2 id="delete-poll-title">Delete this poll?</h2>
        <p id="delete-poll-description">
          “{question}” and its votes will be removed from this browser. This cannot be undone.
        </p>
        <div className={styles.actions}>
          <button ref={cancelButtonRef} type="button" onClick={onCancel}>Keep poll</button>
          <button className={styles.deleteButton} type="button" onClick={onConfirm}>Delete poll</button>
        </div>
      </section>
    </div>
  );
};

export { ConfirmationModal };