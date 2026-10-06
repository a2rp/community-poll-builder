import styles from "./styles.module.css";

const footerLinks = [
  ["Portfolio", "https://www.ashishranjan.net"],
  ["GitHub", "https://github.com/a2rp"],
  ["CodePen", "https://codepen.io/ash1198"],
  ["LinkedIn", "https://www.linkedin.com/in/aashishranjan"],
  ["Facebook", "https://www.facebook.com/theash.ashish/"],
  ["YouTube", "https://www.youtube.com/@ashishranjan-ashz?sub_confirmation=1"],
  ["Email", "mailto:ash.ranjan09@gmail.com"],
  ["Support", "https://a2rp-donation-page.netlify.app/"],
  ["Buy Me a Coffee", "https://buymeacoffee.com/ashishranjan"],
  ["Patreon", "https://www.patreon.com/ashishranjan"],
  ["Source code", "https://github.com/a2rp/community-poll-builder"],
];

const SiteFooter = () => (
  <footer className={styles.footer}>
    <div className={styles.inner}>
      <div className={styles.copyright}>
        <a className={styles.logoLink} href="https://www.ashishranjan.net" target="_blank" rel="noreferrer">
          <img src={import.meta.env.BASE_URL + "logo.png"} alt="Ashish Ranjan logo" />
        </a>
        <p>
          {"\u00a9"} {new Date().getFullYear()} <a href="https://github.com/a2rp">Ashish Ranjan</a>. All rights reserved.
        </p>
      </div>
      <nav className={styles.footerLinks} aria-label="Footer links">
        {footerLinks.map(([label, url]) => (
          <a
            key={label}
            href={url}
            target={url.startsWith("http") ? "_blank" : undefined}
            rel={url.startsWith("http") ? "noreferrer" : undefined}
          >
            {label}
          </a>
        ))}
      </nav>
    </div>
  </footer>
);

export { SiteFooter };
