import { SiteHeader } from "./components/siteHeader/index.jsx";
import { SiteFooter } from "./components/siteFooter/index.jsx";
import styles from "./App.module.css";

const App = () => (
  <div className={styles.appShell}>
    <SiteHeader />
    <main className={styles.pageContent}>
      <h1>Community polls</h1>
      <p>Ask your neighbors and decide together.</p>
    </main>
    <SiteFooter />
  </div>
);

export default App;