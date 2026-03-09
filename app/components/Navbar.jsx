'use client';
import { useEffect, useRef, useState } from 'react';
import styles from './Navbar.module.css';

const links = [
    { label: 'Home', href: '#home' },
    { label: 'Energy', href: '#energy' },
    { label: 'Partners', href: '#partners' },
    { label: 'Connect', href: '#contact' },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // Lock body scroll when menu is open
    useEffect(() => {
        if (menuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [menuOpen]);

    const handleAnchor = (e, href) => {
        e.preventDefault();
        setMenuOpen(false);
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <nav className={`${styles.nav} ${scrolled ? styles.navScrolled : ''}`}>
            <a href="#home" className={styles.logo} onClick={(e) => handleAnchor(e, '#home')}>
                <span className={`${styles.logoRed} heading-display`}>RED</span>
                <span className={`${styles.logoGold} heading-display`}>BULL</span>
            </a>

            {/* Desktop links */}
            <ul className={styles.links}>
                {links.map((l) => (
                    <li key={l.label}>
                        <a href={l.href} className={styles.link} onClick={(e) => handleAnchor(e, l.href)}>
                            <span className="heading-tech">{l.label}</span>
                            <span className={styles.underline} />
                        </a>
                    </li>
                ))}
            </ul>

            <a href="#contact" onClick={(e) => handleAnchor(e, '#contact')} className={styles.ctaBtn}>
                <span className="heading-tech">Get Yours</span>
            </a>

            {/* Hamburger button (mobile only) */}
            <button
                className={`${styles.hamburger} ${menuOpen ? styles.hamburgerOpen : ''}`}
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle menu"
            >
                <span className={styles.hamburgerLine} />
                <span className={styles.hamburgerLine} />
                <span className={styles.hamburgerLine} />
            </button>

            {/* Mobile overlay menu */}
            <div className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ''}`}>
                <ul className={styles.mobileLinks}>
                    {links.map((l, i) => (
                        <li key={l.label} style={{ transitionDelay: menuOpen ? `${i * 0.08 + 0.1}s` : '0s' }}>
                            <a
                                href={l.href}
                                className={styles.mobileLink}
                                onClick={(e) => handleAnchor(e, l.href)}
                            >
                                <span className="heading-display">{l.label}</span>
                            </a>
                        </li>
                    ))}
                </ul>
                <a
                    href="#contact"
                    onClick={(e) => handleAnchor(e, '#contact')}
                    className={styles.mobileCta}
                >
                    <span className="heading-tech">Get Yours</span>
                </a>
            </div>
        </nav>
    );
}
