import { SiteHeader } from "./components/siteHeader/index.jsx";
import styles from "./App.module.css";

const App = () => (
    <div className={styles.appShell} id="top">
        <SiteHeader />
        <main className={styles.pageContent}>
            <section className={styles.firstSection} id="polls">
                <span className={styles.mark}>CL</span>
                <h1>Civic Loop</h1>
                <p>Small questions can help a neighborhood move together.</p>
            </section>
            <section className={styles.secondSection} id="how-it-works">
                <h2>How it works</h2>
            </section>
        </main>
    </div>
);

export default App;
