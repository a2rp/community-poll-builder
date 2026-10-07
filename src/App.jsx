import { useState } from "react";
import { CommunityIntro } from "./components/communityIntro/index.jsx";
import { SiteHeader } from "./components/siteHeader/index.jsx";
import {
    getPollResponseCount,
    isPollClosed,
    startingPolls,
} from "./data/polls.js";
import styles from "./App.module.css";

const App = () => {
    const [polls] = useState(startingPolls);
    const openCount = polls.filter((poll) => !isPollClosed(poll)).length;
    const responseCount = getPollResponseCount(polls);
    const topicCount = new Set(polls.map((poll) => poll.topic)).size;

    return (
        <div className={styles.appShell} id="top">
            <SiteHeader />
            <main className={styles.pageContent}>
                <CommunityIntro
                    openCount={openCount}
                    responseCount={responseCount}
                    topicCount={topicCount}
                />
                <section className={styles.firstSection} id="polls">
                    <h2>Polls are taking shape.</h2>
                </section>
                <section className={styles.secondSection} id="how-it-works">
                    <h2>How it works</h2>
                </section>
            </main>
        </div>
    );
};

export default App;
