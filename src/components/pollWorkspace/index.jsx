import { useMemo, useState } from "react";
import { FiArrowUpRight, FiPlus, FiUsers, FiVolume2 } from "react-icons/fi";
import { PollCard } from "./pollCard/index.jsx";
import { PollModal } from "./pollModal/index.jsx";
import { ConfirmationModal } from "./confirmationModal/index.jsx";
import styles from "./styles.module.css";

const dateAfterDays = (days) => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return [date.getFullYear(), String(date.getMonth() + 1).padStart(2, "0"), String(date.getDate()).padStart(2, "0")].join("-");
};

const startingPolls = [
  {
    id: "trees",
    question: "Where should the new shade trees go first?",
    topic: "Public spaces",
    closeDate: dateAfterDays(8),
    closed: false,
    selectedVote: "",
    options: [
      { label: "Cedar Avenue", votes: 24 },
      { label: "The school walk", votes: 17 },
      { label: "Maple Square", votes: 11 },
    ],
  },
  {
    id: "market",
    question: "What would make the Saturday market more useful?",
    topic: "Community events",
    closeDate: dateAfterDays(11),
    closed: false,
    selectedVote: "",
    options: [
      { label: "More local produce", votes: 20 },
      { label: "Earlier opening time", votes: 15 },
      { label: "Kids activity table", votes: 9 },
    ],
  },
  {
    id: "bus",
    question: "Which evening bus needs a later final run?",
    topic: "Local services",
    closeDate: dateAfterDays(14),
    closed: false,
    selectedVote: "",
    options: [
      { label: "Route 4", votes: 12 },
      { label: "Route 7", votes: 19 },
      { label: "Route 12", votes: 8 },
    ],
  },
  {
    id: "garden",
    question: "Which weekend worked best for the garden opening?",
    topic: "Neighborhood",
    closeDate: dateAfterDays(-5),
    closed: true,
    selectedVote: "",
    options: [
      { label: "September 26", votes: 31 },
      { label: "October 3", votes: 27 },
    ],
  },
];

const readPolls = () => {
  try {
    const stored = localStorage.getItem("commonvoice-polls-v1");
    if (!stored) return startingPolls;
    const savedPolls = JSON.parse(stored);
    return Array.isArray(savedPolls) ? savedPolls : startingPolls;
  } catch {
    return startingPolls;
  }
};

const hasPollClosed = (poll) => {
  if (poll.closed) return true;
  return new Date(poll.closeDate + "T23:59:59").getTime() < Date.now();
};

const getResponseCount = (poll) => poll.options.reduce((sum, option) => sum + option.votes, 0);

const PollWorkspace = () => {
  const [polls, setPolls] = useState(readPolls);
  const [selectedChoices, setSelectedChoices] = useState({});
  const [activeTab, setActiveTab] = useState("Open");
  const [topic, setTopic] = useState("All topics");
  const [search, setSearch] = useState("");
  const [createOpen, setCreateOpen] = useState(false);
  const [pollToDelete, setPollToDelete] = useState(null);

  const savePolls = (nextPolls) => {
    setPolls(nextPolls);
    try {
      localStorage.setItem("commonvoice-polls-v1", JSON.stringify(nextPolls));
    } catch {
      // The page remains usable when browser storage is unavailable.
    }
  };

  const visiblePolls = useMemo(() => polls.filter((poll) => {
    const closed = hasPollClosed(poll);
    const statusMatches = activeTab === "All" || (activeTab === "Open" ? !closed : closed);
    const topicMatches = topic === "All topics" || poll.topic === topic;
    const searchMatches = (poll.question + " " + poll.topic).toLowerCase().includes(search.toLowerCase());
    return statusMatches && topicMatches && searchMatches;
  }), [polls, activeTab, topic, search]);

  const topics = ["All topics", ...new Set(polls.map((poll) => poll.topic))];
  const openCount = polls.filter((poll) => !hasPollClosed(poll)).length;
  const responseCount = polls.reduce((sum, poll) => sum + getResponseCount(poll), 0);

  const chooseOption = (pollId, choice) => {
    setSelectedChoices({ ...selectedChoices, [pollId]: choice });
  };

  const castVote = (pollId) => {
    const poll = polls.find((item) => item.id === pollId);
    const choice = selectedChoices[pollId] || poll?.selectedVote;
    if (!poll || !choice || hasPollClosed(poll)) return;

    const nextPolls = polls.map((item) => {
      if (item.id !== pollId) return item;
      const options = item.options.map((option) => {
        const oldVote = item.selectedVote === option.label ? 1 : 0;
        const newVote = choice === option.label ? 1 : 0;
        return { ...option, votes: Math.max(0, option.votes - oldVote + newVote) };
      });
      return { ...item, options, selectedVote: choice };
    });
    savePolls(nextPolls);
    setSelectedChoices({ ...selectedChoices, [pollId]: choice });
  };

  const addPoll = (newPoll) => {
    savePolls([newPoll, ...polls]);
    setActiveTab("Open");
    setTopic("All topics");
    setSearch("");
    setCreateOpen(false);
  };

  const deletePoll = () => {
    if (!pollToDelete) return;
    savePolls(polls.filter((poll) => poll.id !== pollToDelete.id));
    setPollToDelete(null);
  };

  return (
    <div className={styles.workspace}>
      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <p className={styles.label}>PINE HILL COMMUNITY BOARD</p>
          <h1>Choose what<br />happens <em>next.</em></h1>
          <p className={styles.description}>Small local questions can bring a whole neighborhood together. Add your voice and help set the next direction.</p>
          <button className={styles.createButton} type="button" onClick={() => setCreateOpen(true)}>
            <FiPlus aria-hidden="true" /> Start a poll
          </button>
        </div>
        <div className={styles.voiceCard} aria-label={responseCount + " community responses"}>
          <div className={styles.voiceCircle}><FiVolume2 aria-hidden="true" /><span>LOCAL<br />VOICES</span></div>
          <div className={styles.voiceNumber}>{responseCount}</div>
          <p>answers shared<br />by your neighbors</p>
          <span className={styles.circleDot} aria-hidden="true" />
          <span className={styles.circleLine} aria-hidden="true" />
        </div>
        <div className={styles.heroNote}><FiUsers aria-hidden="true" /><span>Every voice shapes the block.</span><FiArrowUpRight aria-hidden="true" /></div>
      </section>

      <section className={styles.summary} aria-label="Community poll summary">
        <div><strong>{openCount}</strong><span>open questions</span></div>
        <div><strong>{responseCount}</strong><span>responses received</span></div>
        <div><strong>{topics.length - 1}</strong><span>local topics</span></div>
        <p>Good decisions start with listening.</p>
      </section>

      <section className={styles.pollSection} id="active-polls">
        <div className={styles.sectionHeading}>
          <div>
            <p className={styles.label}>YOUR NEIGHBORS ARE ASKING</p>
            <h2>On the table</h2>
          </div>
          <button className={styles.textButton} type="button" onClick={() => setCreateOpen(true)}>
            Ask a question <FiArrowUpRight aria-hidden="true" />
          </button>
        </div>

        <div className={styles.toolbar}>
          <div className={styles.tabs} role="group" aria-label="Filter polls by status">
            {["Open", "Closed", "All"].map((tab) => (
              <button
                className={activeTab === tab ? styles.activeTab : ""}
                key={tab}
                type="button"
                aria-pressed={activeTab === tab}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
          <label className={styles.srOnly} htmlFor="topic-select">Filter by topic</label>
          <select id="topic-select" value={topic} onChange={(event) => setTopic(event.target.value)}>
            {topics.map((name) => <option key={name}>{name}</option>)}
          </select>
          <label className={styles.search}>
            <span className={styles.srOnly}>Search polls</span>
            <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search questions" />
          </label>
        </div>

        {visiblePolls.length ? (
          <div className={styles.pollGrid}>
            {visiblePolls.map((poll) => {
              const pollForCard = { ...poll, closed: hasPollClosed(poll) };
              return (
                <PollCard
                  key={poll.id}
                  poll={pollForCard}
                  selectedChoice={selectedChoices[poll.id] ?? poll.selectedVote}
                  onSelectChoice={chooseOption}
                  onVote={castVote}
                  onDelete={() => setPollToDelete(poll)}
                />
              );
            })}
          </div>
        ) : (
          <p className={styles.empty}>No polls match. Try another topic or search.</p>
        )}
        <p className={styles.storageNote}>Polls and votes are saved in this browser on this device.</p>
      </section>

      <section className={styles.howItWorks} id="how-it-works">
        <div className={styles.howHeading}>
          <p className={styles.label}>A SIMPLE WAY TO TAKE PART</p>
          <h2>Ask. Listen. Decide.</h2>
        </div>
        <div className={styles.steps}>
          <article><span>01</span><h3>Ask clearly</h3><p>Write one question and add a few choices people can answer.</p></article>
          <article><span>02</span><h3>Choose together</h3><p>Pick an answer on an open poll. You can change your vote before it closes.</p></article>
          <article><span>03</span><h3>See the result</h3><p>After voting, compare totals and percentages for each choice.</p></article>
        </div>
      </section>

      {createOpen ? <PollModal onClose={() => setCreateOpen(false)} onSave={addPoll} /> : null}
      {pollToDelete ? (
        <ConfirmationModal
          question={pollToDelete.question}
          onCancel={() => setPollToDelete(null)}
          onConfirm={deletePoll}
        />
      ) : null}
    </div>
  );
};

export { PollWorkspace };
