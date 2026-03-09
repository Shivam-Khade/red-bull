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

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const handleAnchor = (e, href) => {
        e.preventDefault();
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <nav className={`${styles.nav} ${scrolled ? styles.navScrolled : ''}`}>
            <a href="#home" className={styles.logo} onClick={(e) => handleAnchor(e, '#home')}>
                <span className={`${styles.logoRed} heading-display`}>RED</span>
                <span className={`${styles.logoGold} heading-display`}>BULL</span>
            </a>
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
        </nav>
    );
}
