import {
    FaCodepen,
    FaFacebookF,
    FaGithub,
    FaLinkedinIn,
    FaYoutube,
} from "react-icons/fa6";
import { FiCoffee, FiHeart, FiMail, FiShield } from "react-icons/fi";
import styles from "./styles.module.css";

const footerLinks = [
    { label: "Portfolio", href: "https://www.ashishranjan.net", Icon: FiHeart },
    { label: "GitHub", href: "https://github.com/a2rp", Icon: FaGithub },
    { label: "CodePen", href: "https://codepen.io/ash1198", Icon: FaCodepen },
    {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/aashishranjan",
        Icon: FaLinkedinIn,
    },
    {
        label: "Facebook",
        href: "https://www.facebook.com/theash.ashish/",
        Icon: FaFacebookF,
    },
    {
        label: "YouTube",
        href: "https://www.youtube.com/@ashishranjan-ashz?sub_confirmation=1",
        Icon: FaYoutube,
    },
    { label: "Email", href: "mailto:ash.ranjan09@gmail.com", Icon: FiMail },
    {
        label: "Support",
        href: "https://a2rp-donation-page.netlify.app/",
        Icon: FiHeart,
    },
    {
        label: "Buy Me a Coffee",
        href: "https://buymeacoffee.com/ashishranjan",
        Icon: FiCoffee,
    },
    {
        label: "Patreon",
        href: "https://www.patreon.com/ashishranjan",
        Icon: FiShield,
    },
    {
        label: "Source code",
        href: "https://github.com/a2rp/community-poll-builder",
        Icon: FaGithub,
    },
];

const SiteFooter = () => (
    <footer className={styles.siteFooter}>
        <div className={styles.inner}>
            <div className={styles.copyright}>
                <a
                    className={styles.logoLink}
                    href="https://www.ashishranjan.net"
                    target="_blank"
                    rel="noreferrer"
                >
                    <img
                        src={import.meta.env.BASE_URL + "logo.png"}
                        alt="Ashish Ranjan logo"
                    />
                </a>
                <p>
                    © {new Date().getFullYear()}{" "}
                    <a href="https://github.com/a2rp" target="_blank" rel="noreferrer">
                        Ashish Ranjan
                    </a>
                    . All rights reserved.
                </p>
            </div>

            <nav className={styles.footerLinks} aria-label="Footer links">
                {footerLinks.map(({ label, href, Icon }) => (
                    <a
                        className={styles.footerLink}
                        key={label}
                        href={href}
                        target={href.startsWith("http") ? "_blank" : undefined}
                        rel={href.startsWith("http") ? "noreferrer" : undefined}
                    >
                        <Icon aria-hidden="true" />
                        <span>{label}</span>
                    </a>
                ))}
            </nav>
        </div>
    </footer>
);

export { SiteFooter };
