import { useEffect, useRef, useState } from "react";
import { FaGithub } from "react-icons/fa";
import { FiMenu, FiX } from "react-icons/fi";
import styles from "./styles.module.css";

const navigation = [
    { label: "Polls", href: "#polls" },
    { label: "How it works", href: "#how-it-works" },
];

const SiteHeader = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const headerRef = useRef(null);

    useEffect(() => {
        if (!menuOpen) return undefined;

        const closeMenu = (event) => {
            if (!headerRef.current?.contains(event.target)) setMenuOpen(false);
            if (event.type === "keydown" && event.key === "Escape") {
                setMenuOpen(false);
            }
        };

        document.addEventListener("pointerdown", closeMenu);
        document.addEventListener("keydown", closeMenu);
        return () => {
            document.removeEventListener("pointerdown", closeMenu);
            document.removeEventListener("keydown", closeMenu);
        };
    }, [menuOpen]);

    const closeAfterNavigation = () => setMenuOpen(false);

    return (
        <header className={styles.siteHeader} id="top" ref={headerRef}>
            <div className={styles.inner}>
                <a
                    className={styles.brand}
                    href="#top"
                    aria-label="Civic Loop home"
                    onClick={closeAfterNavigation}
                >
                    <span className={styles.brandMark} aria-hidden="true">
                        CL
                    </span>
                    <span className={styles.brandName}>
                        Civic Loop<span>.</span>
                    </span>
                </a>

                <nav
                    className={
                        menuOpen ? styles.mainNavigationOpen : styles.mainNavigation
                    }
                    id="main-navigation"
                    aria-label="Main navigation"
                >
                    {navigation.map((item) => (
                        <a
                            href={item.href}
                            key={item.href}
                            onClick={closeAfterNavigation}
                        >
                            {item.label}
                        </a>
                    ))}
                </nav>

                <div className={styles.headerActions}>
                    <a
                        className={styles.repositoryLink}
                        href="https://github.com/a2rp/community-poll-builder"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <FaGithub aria-hidden="true" />
                        <span>Repository</span>
                    </a>
                    <button
                        className={styles.menuButton}
                        type="button"
                        aria-label={menuOpen ? "Close menu" : "Open menu"}
                        aria-expanded={menuOpen}
                        aria-controls="main-navigation"
                        onClick={() => setMenuOpen((open) => !open)}
                    >
                        {menuOpen ? <FiX aria-hidden="true" /> : <FiMenu aria-hidden="true" />}
                    </button>
                </div>
            </div>
        </header>
    );
};

export { SiteHeader };
