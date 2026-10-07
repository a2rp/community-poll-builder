import { useState } from "react";
import { FiArrowRight, FiSearch, FiSliders, FiX } from "react-icons/fi";
import { CommunityIntro } from "../communityIntro/index.jsx";
import {
    getPollResponseCount,
    isPollClosed,
    startingPolls,
} from "../../data/polls.js";
import { PollCard } from "./pollCard/index.jsx";
import { PollCreateModal } from "./pollCreateModal/index.jsx";
import { PollDeleteModal } from "./pollDeleteModal/index.jsx";
import styles from "./styles.module.css";

const readPolls = () => {
    try {
        const savedPolls = localStorage.getItem("civic-loop-polls");
        if (savedPolls === null) return startingPolls;

        const parsedPolls = JSON.parse(savedPolls);
        return Array.isArray(parsedPolls) ? parsedPolls : startingPolls;
    } catch {
        return startingPolls;
    }
};

const PollWorkspace = () => {
    const [polls, setPolls] = useState(readPolls);
    const [selectedChoices, setSelectedChoices] = useState(() =>
        Object.fromEntries(
            polls
                .filter((poll) => poll.selectedVote)
                .map((poll) => [poll.id, poll.selectedVote]),
        ),
    );
    const [activeStatus, setActiveStatus] = useState("Open");
    const [selectedTopic, setSelectedTopic] = useState("All topics");
    const [search, setSearch] = useState("");
    const [createOpen, setCreateOpen] = useState(false);
    const [pollToDelete, setPollToDelete] = useState(null);
    const [statusMessage, setStatusMessage] = useState("");

    const savePolls = (nextPolls) => {
        setPolls(nextPolls);

        try {
            localStorage.setItem("civic-loop-polls", JSON.stringify(nextPolls));
        } catch {
            setStatusMessage(
                "This browser could not save changes. The page is still usable.",
            );
        }
    };

    const topics = ["All topics", ...new Set(polls.map((poll) => poll.topic))];
    const openCount = polls.filter((poll) => !isPollClosed(poll)).length;
    const responseCount = getPollResponseCount(polls);
    const topicCount = topics.length - 1;
    const visiblePolls = polls.filter((poll) => {
        const closed = isPollClosed(poll);
        const matchesStatus =
            activeStatus === "All" ||
            (activeStatus === "Open" && !closed) ||
            (activeStatus === "Closed" && closed);
        const matchesTopic =
            selectedTopic === "All topics" || poll.topic === selectedTopic;
        const matchesSearch = (poll.question + " " + poll.topic)
            .toLowerCase()
            .includes(search.trim().toLowerCase());

        return matchesStatus && matchesTopic && matchesSearch;
    });
    const isFilterActive =
        selectedTopic !== "All topics" || search.trim() !== "";

    const resetFilters = () => {
        setActiveStatus("Open");
        setSelectedTopic("All topics");
        setSearch("");
    };

    const castVote = (pollId) => {
        const poll = polls.find((item) => item.id === pollId);
        const choice = selectedChoices[pollId];

        if (!poll || !choice || isPollClosed(poll)) return;

        const hadPreviousVote = Boolean(poll.selectedVote);
        const nextPolls = polls.map((item) => {
            if (item.id !== pollId) return item;

            const options = item.options.map((option) => {
                const oldVote = item.selectedVote === option.label ? 1 : 0;
                const newVote = choice === option.label ? 1 : 0;

                return {
                    ...option,
                    votes: Math.max(0, option.votes - oldVote + newVote),
                };
            });

            return { ...item, options, selectedVote: choice };
        });

        savePolls(nextPolls);
        setStatusMessage(
            hadPreviousVote
                ? "Your vote has been updated."
                : "Your vote has been added.",
        );
    };

    const addPoll = (newPoll) => {
        savePolls([newPoll, ...polls]);
        setActiveStatus("Open");
        setSelectedTopic("All topics");
        setSearch("");
        setCreateOpen(false);
        setStatusMessage("Your poll is now open.");
    };

    const deletePoll = () => {
        if (!pollToDelete) return;

        savePolls(polls.filter((poll) => poll.id !== pollToDelete.id));
        setSelectedChoices((current) => {
            const nextChoices = { ...current };
            delete nextChoices[pollToDelete.id];
            return nextChoices;
        });
        setPollToDelete(null);
        setStatusMessage("Poll removed from this browser.");
    };

    return (
        <div className={styles.pollWorkspace}>
            <CommunityIntro
                openCount={openCount}
                responseCount={responseCount}
                topicCount={topicCount}
            />

            <section
                className={styles.workspace}
                id="polls"
                aria-labelledby="polls-title"
            >
                <div className={styles.sectionHeading}>
                    <div>
                        <p className={styles.label}>The neighborhood board</p>
                        <h2 id="polls-title">Questions on the table</h2>
                    </div>
                    <button
                        className={styles.createButton}
                        type="button"
                        onClick={() => setCreateOpen(true)}
                    >
                        <span>Start a poll</span>
                        <FiArrowRight aria-hidden="true" />
                    </button>
                </div>

                <div className={styles.workspaceGrid}>
                    <aside className={styles.filters} aria-label="Poll filters">
                        <div className={styles.filterHeading}>
                            <FiSliders aria-hidden="true" />
                            <h3>Find a question</h3>
                        </div>

                        <label className={styles.searchField}>
                            <span>Search polls</span>
                            <span className={styles.searchInput}>
                                <FiSearch aria-hidden="true" />
                                <input
                                    type="search"
                                    value={search}
                                    onChange={(event) =>
                                        setSearch(event.target.value)
                                    }
                                    placeholder="Question or topic"
                                />
                            </span>
                        </label>

                        <fieldset className={styles.statusFilters}>
                            <legend>Poll status</legend>
                            {["Open", "Closed", "All"].map((status) => (
                                <button
                                    className={
                                        activeStatus === status
                                            ? styles.activeStatus
                                            : styles.statusButton
                                    }
                                    key={status}
                                    type="button"
                                    aria-pressed={activeStatus === status}
                                    onClick={() => setActiveStatus(status)}
                                >
                                    <span>{status}</span>
                                    {status === "Open" ? (
                                        <strong>{openCount}</strong>
                                    ) : null}
                                </button>
                            ))}
                        </fieldset>

                        <label className={styles.topicField}>
                            <span>Topic</span>
                            <select
                                value={selectedTopic}
                                onChange={(event) =>
                                    setSelectedTopic(event.target.value)
                                }
                            >
                                {topics.map((item) => (
                                    <option key={item}>{item}</option>
                                ))}
                            </select>
                        </label>

                        {isFilterActive ? (
                            <button
                                className={styles.clearButton}
                                type="button"
                                onClick={resetFilters}
                            >
                                <FiX aria-hidden="true" />
                                Clear search and topic
                            </button>
                        ) : null}
                    </aside>

                    <div className={styles.results}>
                        <div className={styles.resultHeading}>
                            <div>
                                <h3>{activeStatus} polls</h3>
                                <p>
                                    Showing {visiblePolls.length} of {polls.length}{" "}
                                    questions
                                </p>
                            </div>
                            <span className={styles.responseTotal}>
                                {responseCount} responses
                            </span>
                        </div>

                        {visiblePolls.length ? (
                            <div className={styles.pollList}>
                                {visiblePolls.map((poll) => (
                                    <PollCard
                                        key={poll.id}
                                        poll={{
                                            ...poll,
                                            closed: isPollClosed(poll),
                                        }}
                                        selectedChoice={
                                            selectedChoices[poll.id] ||
                                            poll.selectedVote
                                        }
                                        onSelectChoice={(pollId, choice) =>
                                            setSelectedChoices((current) => ({
                                                ...current,
                                                [pollId]: choice,
                                            }))
                                        }
                                        onVote={castVote}
                                        onDelete={() => setPollToDelete(poll)}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className={styles.emptyState}>
                                <span className={styles.emptyIcon}>
                                    <FiSearch aria-hidden="true" />
                                </span>
                                <h3>No matching polls</h3>
                                <p>Change a filter or start a new question.</p>
                                <button type="button" onClick={resetFilters}>
                                    Show open polls
                                </button>
                            </div>
                        )}

                        <p className={styles.statusMessage} role="status" aria-live="polite">
                            {statusMessage}
                        </p>
                    </div>

                    <aside className={styles.communityNotes}>
                        <section className={styles.guidanceCard}>
                            <p className={styles.label}>A fair poll</p>
                            <h3>One voice, one choice.</h3>
                            <p>
                                Votes stay on this device. Choose an answer,
                                then update it any time before a poll closes.
                            </p>
                            <a href="#how-it-works">
                                How voting works <FiArrowRight aria-hidden="true" />
                            </a>
                        </section>
                        <section className={styles.topicCard}>
                            <h3>Topics in this room</h3>
                            <ul>
                                {topics.slice(1).map((item) => (
                                    <li key={item}>
                                        <span>{item}</span>
                                        <strong>
                                            {polls.filter((poll) => poll.topic === item).length}
                                        </strong>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    </aside>
                </div>
            </section>

            <section
                className={styles.howItWorks}
                id="how-it-works"
                aria-labelledby="how-title"
            >
                <div>
                    <p className={styles.label}>Simple by design</p>
                    <h2 id="how-title">Ask. Choose. See the result.</h2>
                </div>
                <p>
                    Write a clear question, vote once, and compare the answers.
                    You can change your vote while the poll is open.
                </p>
            </section>

            {createOpen ? (
                <PollCreateModal
                    onClose={() => setCreateOpen(false)}
                    onSave={addPoll}
                />
            ) : null}
            {pollToDelete ? (
                <PollDeleteModal
                    question={pollToDelete.question}
                    onCancel={() => setPollToDelete(null)}
                    onConfirm={deletePoll}
                />
            ) : null}
        </div>
    );
};

export { PollWorkspace };
