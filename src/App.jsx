import styles from "./App.module.css";

const App = () => (
  <div className={styles.appShell}>
    <main className={styles.pageContent}>
      <h1>Commonvoice</h1>
      <p>Community questions start here.</p>
    </main>
  </div>
);

export default App;