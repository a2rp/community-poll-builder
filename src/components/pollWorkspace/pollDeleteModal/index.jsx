import { useEffect, useRef } from "react";
import { FiAlertTriangle, FiX } from "react-icons/fi";
import styles from "./styles.module.css";

const PollDeleteModal = ({ question, onCancel, onConfirm }) => {
    const dialogRef = useRef(null);
    const cancelButtonRef = useRef(null);

    useEffect(() => {
        const previousFocus = document.activeElement;
        cancelButtonRef.current?.focus();

        const handleKeyDown = (event) => {
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
            } else if (
                !event.shiftKey &&
                document.activeElement === lastButton
            ) {
                event.preventDefault();
                firstButton.focus();
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            previousFocus?.focus?.();
        };
    }, [onCancel]);

    return (
        <div
            className={styles.backdrop}
            onMouseDown={(event) => {
                if (event.target === event.currentTarget) onCancel();
            }}
        >
            <section
                className={styles.dialog}
                ref={dialogRef}
                role="alertdialog"
                aria-modal="true"
                aria-labelledby="delete-poll-title"
                aria-describedby="delete-poll-description"
            >
                <div className={styles.dialogTop}>
                    <span className={styles.warningIcon}>
                        <FiAlertTriangle aria-hidden="true" />
                    </span>
                    <button
                        className={styles.closeButton}
                        type="button"
                        aria-label="Close delete confirmation"
                        onClick={onCancel}
                    >
                        <FiX aria-hidden="true" />
                    </button>
                </div>
                <h2 id="delete-poll-title">Delete this poll?</h2>
                <p id="delete-poll-description">
                    <strong>{question}</strong> and its votes will be removed
                    from this browser. This cannot be undone.
                </p>
                <div className={styles.actions}>
                    <button
                        className={styles.cancelButton}
                        ref={cancelButtonRef}
                        type="button"
                        onClick={onCancel}
                    >
                        Keep poll
                    </button>
                    <button
                        className={styles.deleteButton}
                        type="button"
                        onClick={onConfirm}
                    >
                        Delete poll
                    </button>
                </div>
            </section>
        </div>
    );
};

export { PollDeleteModal };
