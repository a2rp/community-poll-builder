import { PollWorkspace } from "./components/pollWorkspace/index.jsx";
import { SiteHeader } from "./components/siteHeader/index.jsx";
import styles from "./App.module.css";

const App = () => (
    <div className={styles.appShell} id="top">
        <SiteHeader />
        <main className={styles.pageContent}>
            <PollWorkspace />
        </main>
    </div>
);

export default App;
