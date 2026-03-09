'use client';
import styles from './Footer.module.css';

const projectLinks = ['Hero Experience', 'About Us', 'Partners', 'Contact'];
const socials = ['Instagram', 'Twitter / X', 'YouTube', 'TikTok'];

export default function Footer() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer id="footer" className={styles.footer}>
            <div className={styles.topBorder} />

            <div className={styles.grid}>
                {/* Brand */}
                <div className={styles.col}>
                    <div className={styles.brandLogo}>
                        <span className={`${styles.logoRed} heading-display`}>RED</span>
                        <span className={`${styles.logoGold} heading-display`}>BULL</span>
                    </div>
                    <p className={styles.brandTagline}>
                        Red Bull gives you wings. Since 1987, we have been fueling the extraordinary.
                    </p>
                    <p className={styles.brandCopy}>© 2025 Red Bull GmbH, Fuschl am See, Austria</p>
                </div>

                {/* Project Links */}
                <div className={styles.col}>
                    <h4 className={`${styles.colTitle} heading-tech`}>Project</h4>
                    <ul className={styles.colList}>
                        {projectLinks.map((l) => (
                            <li key={l}>
                                <a href={`#${l.toLowerCase().replace(/\s+/g, '-')}`} className={styles.colLink}>
                                    {l}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Socials */}
                <div className={styles.col}>
                    <h4 className={`${styles.colTitle} heading-tech`}>Socials</h4>
                    <ul className={styles.colList}>
                        {socials.map((s) => (
                            <li key={s}>
                                <a href="#footer" className={styles.colLink}>{s}</a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Newsletter */}
                <div className={styles.col}>
                    <h4 className={`${styles.colTitle} heading-tech`}>Newsletter</h4>
                    <p className={styles.newsletterDesc}>
                        Get exclusive drops, events, and energy updates.
                    </p>
                    <div className={styles.newsletterForm}>
                        <input
                            type="email"
                            placeholder="your@email.com"
                            className={styles.newsletterInput}
                        />
                        <button className={`${styles.newsletterBtn} heading-tech`}>Subscribe</button>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className={styles.bottomBar}>
                <p className={styles.legal}>
                    Red Bull Energy Drink — Revitalize body and mind.
                </p>
                <button onClick={scrollToTop} className={styles.backToTop}>
                    <span className={styles.backToTopTab} />
                    <span className={`${styles.backToTopText} heading-tech`}>Back to Top</span>
                    <span className={styles.backToTopFog} />
                </button>
                <p className={styles.legal}>
                    Designed with passion. Built for performance.
                </p>
            </div>
        </footer>
    );
}
