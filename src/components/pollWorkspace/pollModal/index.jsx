import { useEffect, useState } from "react";
import { FiPlus, FiX } from "react-icons/fi";
import styles from "./styles.module.css";

const getDateAfterDays = (days) => {
    const date = new Date();
    date.setDate(date.getDate() + days);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return [year, month, day].join("-");
};

const PollModal = ({ onClose, onSave }) => {
    const [question, setQuestion] = useState("");
    const [topic, setTopic] = useState("Neighborhood");
    const [closeDate, setCloseDate] = useState(getDateAfterDays(7));
    const [options, setOptions] = useState(["", ""]);

    useEffect(() => {
        const closeOnEscape = (event) => {
            if (event.key === "Escape") onClose();
        };
        window.addEventListener("keydown", closeOnEscape);
        return () => window.removeEventListener("keydown", closeOnEscape);
    }, [onClose]);

    const updateOption = (index, value) => {
        setOptions(
            options.map((option, optionIndex) =>
                optionIndex === index ? value : option,
            ),
        );
    };

    const submitPoll = (event) => {
        event.preventDefault();
        onSave({
            id: crypto.randomUUID(),
            question: question.trim(),
            topic,
            closeDate,
            options: options.map((label) => ({
                label: label.trim(),
                votes: 0,
            })),
            selectedVote: "",
            closed: false,
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
                className={styles.modal}
                role="dialog"
                aria-modal="true"
                aria-labelledby="poll-modal-title"
            >
                <header className={styles.modalHeader}>
                    <div>
                        <p className={styles.modalLabel}>NEW COMMUNITY POLL</p>
                        <h2 id="poll-modal-title">Ask your neighbors</h2>
                    </div>
                    <button
                        className={styles.closeButton}
                        type="button"
                        aria-label="Close poll form"
                        onClick={onClose}
                    >
                        <FiX aria-hidden="true" />
                    </button>
                </header>
                <form className={styles.form} onSubmit={submitPoll}>
                    <label className={styles.field}>
                        Question
                        <input
                            autoFocus
                            required
                            maxLength="120"
                            pattern=".*\S.*"
                            value={question}
                            onChange={(event) =>
                                setQuestion(event.target.value)
                            }
                            placeholder="What would you like the community to decide?"
                        />
                    </label>
                    <div className={styles.twoFields}>
                        <label className={styles.field}>
                            Topic
                            <select
                                value={topic}
                                onChange={(event) =>
                                    setTopic(event.target.value)
                                }
                            >
                                <option>Neighborhood</option>
                                <option>Public spaces</option>
                                <option>Community events</option>
                                <option>Local services</option>
                            </select>
                        </label>
                        <label className={styles.field}>
                            Close date
                            <input
                                type="date"
                                required
                                min={getDateAfterDays(0)}
                                value={closeDate}
                                onChange={(event) =>
                                    setCloseDate(event.target.value)
                                }
                            />
                        </label>
                    </div>
                    <fieldset className={styles.options}>
                        <legend>Answer choices</legend>
                        {options.map((option, index) => (
                            <div className={styles.optionField} key={index}>
                                <input
                                    required
                                    maxLength="80"
                                    pattern=".*\S.*"
                                    value={option}
                                    onChange={(event) =>
                                        updateOption(index, event.target.value)
                                    }
                                    placeholder={"Choice " + (index + 1)}
                                    aria-label={"Choice " + (index + 1)}
                                />
                                {options.length > 2 ? (
                                    <button
                                        className={styles.removeOption}
                                        type="button"
                                        aria-label={
                                            "Remove choice " + (index + 1)
                                        }
                                        onClick={() =>
                                            setOptions(
                                                options.filter(
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
                                className={styles.addOption}
                                type="button"
                                onClick={() => setOptions([...options, ""])}
                            >
                                <FiPlus aria-hidden="true" /> Add another choice
                            </button>
                        ) : null}
                    </fieldset>
                    <p className={styles.helperText}>
                        Polls are saved in this browser on this device.
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

export { PollModal };
