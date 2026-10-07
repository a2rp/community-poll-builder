import { FiClock, FiTrash2, FiUsers } from "react-icons/fi";
import styles from "./styles.module.css";

const formatCloseDate = (dateValue) =>
    new Intl.DateTimeFormat("en", {
        month: "short",
        day: "numeric",
    }).format(new Date(dateValue + "T12:00:00"));

const PollCard = ({
    poll,
    selectedChoice,
    onSelectChoice,
    onVote,
    onDelete,
}) => {
    const responseCount = poll.options.reduce(
        (total, option) => total + option.votes,
        0,
    );
    const showResults = Boolean(poll.selectedVote) || poll.closed;
    const canVote = Boolean(selectedChoice) && selectedChoice !== poll.selectedVote;

    return (
        <article className={styles.pollCard}>
            <aside className={styles.sideInfo}>
                <span className={styles.topic}>{poll.topic}</span>
                <span className={poll.closed ? styles.closedDate : styles.closeDate}>
                    {poll.closed ? (
                        "Closed"
                    ) : (
                        <>
                            <FiClock aria-hidden="true" />
                            {formatCloseDate(poll.closeDate)}
                        </>
                    )}
                </span>
                <span className={styles.responseCount}>
                    <FiUsers aria-hidden="true" />
                    {responseCount} votes
                </span>
            </aside>

            <div className={styles.main}>
                <div className={styles.questionRow}>
                    <h3>{poll.question}</h3>
                    <button
                        className={styles.deleteButton}
                        type="button"
                        aria-label={"Delete poll: " + poll.question}
                        onClick={onDelete}
                    >
                        <FiTrash2 aria-hidden="true" />
                    </button>
                </div>

                <div
                    className={styles.options}
                    role="group"
                    aria-label={"Choices for " + poll.question}
                >
                    {poll.options.map((option) => {
                        const percentage = responseCount
                            ? Math.round((option.votes / responseCount) * 100)
                            : 0;
                        const isSelected = selectedChoice === option.label;

                        return (
                            <button
                                className={
                                    isSelected
                                        ? styles.optionSelected
                                        : styles.option
                                }
                                key={option.label}
                                type="button"
                                disabled={poll.closed}
                                aria-pressed={isSelected}
                                onClick={() =>
                                    onSelectChoice(poll.id, option.label)
                                }
                            >
                                <span className={styles.optionText}>
                                    <span className={styles.radioMark}>
                                        {isSelected ? "✓" : ""}
                                    </span>
                                    <span>{option.label}</span>
                                    {showResults ? (
                                        <strong>{percentage}%</strong>
                                    ) : null}
                                </span>
                                {showResults ? (
                                    <span
                                        className={styles.barTrack}
                                        aria-hidden="true"
                                    >
                                        <span
                                            style={{
                                                width: percentage + "%",
                                            }}
                                        />
                                    </span>
                                ) : null}
                            </button>
                        );
                    })}
                </div>

                <div className={styles.cardBottom}>
                    <span className={styles.voteStatus} role="status">
                        {poll.closed
                            ? "Voting has ended"
                            : poll.selectedVote
                              ? "Your response is saved on this device"
                              : "Choose one answer"}
                    </span>
                    <button
                        className={styles.voteButton}
                        type="button"
                        disabled={!canVote || poll.closed}
                        onClick={() => onVote(poll.id)}
                    >
                        {poll.selectedVote ? "Update vote" : "Cast vote"}
                    </button>
                </div>
            </div>
        </article>
    );
};

export { PollCard };
