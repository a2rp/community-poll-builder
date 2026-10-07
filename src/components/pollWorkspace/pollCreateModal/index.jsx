import { useEffect, useRef, useState } from "react";
import { FiPlus, FiX } from "react-icons/fi";
import styles from "./styles.module.css";

const getDateAfterDays = (days) => {
    const date = new Date();
    date.setHours(12, 0, 0, 0);
    date.setDate(date.getDate() + days);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return year + "-" + month + "-" + day;
};

const PollCreateModal = ({ onClose, onSave }) => {
    const dialogRef = useRef(null);
    const [question, setQuestion] = useState("");
    const [topic, setTopic] = useState("Public spaces");
    const [closeDate, setCloseDate] = useState(getDateAfterDays(7));
    const [options, setOptions] = useState(["", ""]);
    const [error, setError] = useState("");

    useEffect(() => {
        const previousFocus = document.activeElement;
        const dialog = dialogRef.current;
        const firstField = dialog?.querySelector("input");
        firstField?.focus();

        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                onClose();
                return;
            }

            if (event.key !== "Tab" || !dialog) return;

            const focusable = dialog.querySelectorAll(
                "button:not([disabled]), input:not([disabled]), select:not([disabled])",
            );
            const first = focusable[0];
            const last = focusable[focusable.length - 1];

            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first.focus();
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            previousFocus?.focus?.();
        };
    }, [onClose]);

    const updateOption = (index, value) => {
        setOptions((currentOptions) =>
            currentOptions.map((option, optionIndex) =>
                optionIndex === index ? value : option,
            ),
        );
        setError("");
    };

    const submitPoll = (event) => {
        event.preventDefault();
        const cleanOptions = options.map((option) => option.trim());
        const uniqueOptions = new Set(
            cleanOptions.map((option) => option.toLowerCase()),
        );

        if (uniqueOptions.size !== cleanOptions.length) {
            setError("Each answer choice needs different wording.");
            return;
        }

        onSave({
            id: "poll-" + Date.now(),
            question: question.trim(),
            topic,
            closeDate,
            selectedVote: "",
            options: cleanOptions.map((label) => ({ label, votes: 0 })),
        });
    };

    return (
        <div
            className={styles.backdrop}
            onMouseDown={(event) => {
                if (event.target === event.currentTarget) onClose();
            }}
        >
            <section
                className={styles.dialog}
                ref={dialogRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby="create-poll-title"
                aria-describedby="create-poll-description"
            >
                <header className={styles.dialogHeader}>
                    <div>
                        <p className={styles.label}>New poll</p>
                        <h2 id="create-poll-title">Ask your neighbors</h2>
                        <p id="create-poll-description">
                            Keep it to one clear question and a few simple choices.
                        </p>
                    </div>
                    <button
                        className={styles.closeButton}
                        type="button"
                        aria-label="Close new poll form"
                        onClick={onClose}
                    >
                        <FiX aria-hidden="true" />
                    </button>
                </header>

                <form className={styles.form} onSubmit={submitPoll}>
                    <label className={styles.field}>
                        <span>Question</span>
                        <input
                            type="text"
                            value={question}
                            onChange={(event) => setQuestion(event.target.value)}
                            maxLength={120}
                            pattern=".*\S.*"
                            placeholder="What should the neighborhood decide?"
                            required
                        />
                    </label>

                    <div className={styles.twoFields}>
                        <label className={styles.field}>
                            <span>Topic</span>
                            <select
                                value={topic}
                                onChange={(event) => setTopic(event.target.value)}
                            >
                                <option>Public spaces</option>
                                <option>Community events</option>
                                <option>Local services</option>
                                <option>Neighborhood</option>
                            </select>
                        </label>
                        <label className={styles.field}>
                            <span>Close date</span>
                            <input
                                type="date"
                                value={closeDate}
                                min={getDateAfterDays(0)}
                                onChange={(event) => setCloseDate(event.target.value)}
                                required
                            />
                        </label>
                    </div>

                    <fieldset className={styles.choiceFields}>
                        <legend>Answer choices</legend>
                        {options.map((option, index) => (
                            <div className={styles.choiceRow} key={index}>
                                <input
                                    type="text"
                                    value={option}
                                    onChange={(event) =>
                                        updateOption(index, event.target.value)
                                    }
                                    maxLength={70}
                                    pattern=".*\S.*"
                                    placeholder={"Choice " + (index + 1)}
                                    aria-label={"Answer choice " + (index + 1)}
                                    required
                                />
                                {options.length > 2 ? (
                                    <button
                                        className={styles.removeChoice}
                                        type="button"
                                        aria-label={"Remove answer choice " + (index + 1)}
                                        onClick={() =>
                                            setOptions((currentOptions) =>
                                                currentOptions.filter(
                                                    (_, optionIndex) =>
                                                        optionIndex !== index,
                                                ),
                                            )
                                        }
                                    >
                                        <FiX aria-hidden="true" />
                                    </button>
                                ) : null}
                            </div>
                        ))}
                        {options.length < 5 ? (
                            <button
                                className={styles.addChoice}
                                type="button"
                                onClick={() => setOptions((current) => [...current, ""])}
                            >
                                <FiPlus aria-hidden="true" />
                                Add an answer
                            </button>
                        ) : null}
                    </fieldset>

                    {error ? (
                        <p className={styles.error} role="alert">
                            {error}
                        </p>
                    ) : null}
                    <p className={styles.helperText}>
                        Polls stay in this browser on this device.
                    </p>

                    <div className={styles.actions}>
                        <button
                            className={styles.cancelButton}
                            type="button"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button className={styles.submitButton} type="submit">
                            Publish poll
                        </button>
                    </div>
                </form>
            </section>
        </div>
    );
};

export { PollCreateModal };
