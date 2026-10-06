import { FiCheck, FiClock, FiTrash2 } from "react-icons/fi";
import styles from "./styles.module.css";

const formatCloseDate = (dateValue) => {
  const date = new Date(dateValue + "T12:00:00");
  return new Intl.DateTimeFormat("en", { month: "short", day: "numeric" }).format(date);
};

const PollCard = ({ poll, selectedChoice, onSelectChoice, onVote, onDelete }) => {
  const voteCount = poll.options.reduce((total, option) => total + option.votes, 0);
  const showResults = Boolean(poll.selectedVote) || poll.closed;
  const alreadySelected = selectedChoice === poll.selectedVote;

  return (
    <article className={styles.pollCard}>
      <div className={styles.cardTopline}>
        <span className={styles.topic}>{poll.topic}</span>
        <span className={poll.closed ? styles.closedLabel : styles.deadline}>
          {poll.closed ? "Closed" : <><FiClock aria-hidden="true" /> Closes {formatCloseDate(poll.closeDate)}</>}
        </span>
      </div>
      <div className={styles.titleRow}>
        <h3>{poll.question}</h3>
        <button className={styles.deleteButton} type="button" aria-label={"Delete poll: " + poll.question} onClick={onDelete}>
          <FiTrash2 aria-hidden="true" />
        </button>
      </div>
      <div className={styles.options} role="group" aria-label={"Answer choices for " + poll.question}>
        {poll.options.map((option) => {
          const percentage = voteCount ? Math.round(option.votes / voteCount * 100) : 0;
          const isSelected = selectedChoice === option.label;
          const isSavedVote = poll.selectedVote === option.label;
          return (
            <button
              className={[styles.option, isSelected ? styles.selectedOption : "", showResults ? styles.resultOption : ""].filter(Boolean).join(" ")}
              key={option.label}
              type="button"
              disabled={poll.closed}
              aria-pressed={isSelected}
              onClick={() => onSelectChoice(poll.id, option.label)}
            >
              {showResults ? <span className={styles.resultBar} style={{ width: percentage + "%" }} /> : null}
              <span className={styles.optionText}>
                {isSelected && !showResults ? <FiCheck aria-hidden="true" /> : null}
                {option.label}
                {isSavedVote ? <span className={styles.yourVote}>Your vote</span> : null}
              </span>
              {showResults ? <span className={styles.voteCount}>{option.votes}<small>{percentage}%</small></span> : null}
            </button>
          );
        })}
      </div>
      <div className={styles.cardFooter}>
        <p>{voteCount} {voteCount === 1 ? "response" : "responses"} <span>•</span> {poll.closed ? "Poll closed" : "Open to the community"}</p>
        {!poll.closed ? (
          <button className={styles.voteButton} type="button" disabled={!selectedChoice || alreadySelected} onClick={() => onVote(poll.id)}>
            {alreadySelected ? "Vote saved" : poll.selectedVote ? "Update vote" : "Cast your vote"}
          </button>
        ) : null}
      </div>
    </article>
  );
};

export { PollCard };