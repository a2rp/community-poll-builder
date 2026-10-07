import styles from "./App.module.css";

const App = () => (
    <div className={styles.appShell} id="top">
        <main className={styles.pageContent}>
            <span className={styles.mark}>CL</span>
            <h1>Civic Loop</h1>
            <p>Small questions can help a neighborhood move together.</p>
        </main>
    </div>
);

export default App;
