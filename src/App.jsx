import { BackToTop } from "./components/backToTop/index.jsx";
import { PollWorkspace } from "./components/pollWorkspace/index.jsx";
import { SiteFooter } from "./components/siteFooter/index.jsx";
import { SiteHeader } from "./components/siteHeader/index.jsx";
import styles from "./App.module.css";

const App = () => (
  <div className={styles.appShell}>
    <SiteHeader />
    <main className={styles.pageContent}>
      <PollWorkspace />
    </main>
    <SiteFooter />
    <BackToTop />
  </div>
);

export default App;
