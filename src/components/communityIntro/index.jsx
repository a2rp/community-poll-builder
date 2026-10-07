import { FiArrowDown, FiBarChart2, FiCheckCircle } from "react-icons/fi";
import styles from "./styles.module.css";

const CommunityIntro = ({ openCount, responseCount, topicCount }) => (
    <section className={styles.communityIntro} aria-labelledby="intro-title">
        <div className={styles.copy}>
            <p className={styles.label}>Pine Hill neighborhood</p>
            <h1 id="intro-title">
                Local questions.
                <span>Clear choices.</span>
            </h1>
            <p className={styles.description}>
                Bring neighbors into the decisions that shape their streets,
                shared spaces, and daily routines.
            </p>
            <a className={styles.jumpLink} href="#polls">
                See what is open <FiArrowDown aria-hidden="true" />
            </a>
        </div>

        <aside className={styles.pulseCard} aria-label="Community poll summary">
            <div className={styles.cardTop}>
                <span>Community pulse</span>
                <FiBarChart2 aria-hidden="true" />
            </div>
            <div className={styles.responseCount}>
                <strong>{responseCount}</strong>
                <span>responses so far</span>
            </div>
            <div className={styles.quickFacts}>
                <div>
                    <span className={styles.factIcon}>
                        <FiCheckCircle aria-hidden="true" />
                    </span>
                    <span>Open polls</span>
                    <strong>{openCount}</strong>
                </div>
                <div>
                    <span className={styles.factIcon}>
                        <FiBarChart2 aria-hidden="true" />
                    </span>
                    <span>Topics</span>
                    <strong>{topicCount}</strong>
                </div>
            </div>
            <p className={styles.cardNote}>
                Your neighbors are helping set the next step.
            </p>
            <span className={styles.cornerMark} aria-hidden="true" />
        </aside>
    </section>
);

export { CommunityIntro };
