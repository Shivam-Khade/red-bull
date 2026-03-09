'use client';
import styles from './Partners.module.css';

const PARTNERS = [
    { name: 'F1', logo: 'F1' },
    { name: 'UFC', logo: 'UFC' },
    { name: 'Neymar Jr', logo: 'NEYMAR' },
    { name: 'NASCAR', logo: 'NASCAR' },
    { name: 'GoPro', logo: 'GoPro' },
    { name: 'Puma', logo: 'PUMA' },
    { name: 'PlayStation', logo: 'PS' },
    { name: 'Staple', logo: 'STAPLE' },
    { name: 'Alpecin', logo: 'ALPECIN' },
];

// Duplicate for seamless loop
const MARQUEE = [...PARTNERS, ...PARTNERS];

export default function Partners() {
    return (
        <section id="partners" className={styles.section}>
            <div className="gold-divider" />

            <div className={styles.header}>
                <p className={`${styles.tag} heading-tech`}>— Powered By —</p>
                <h2 className={`${styles.heading} heading-display`}>
                    <span className="text-silver">Our</span>{' '}
                    <span className="text-gold">Partners</span>
                </h2>
            </div>

            <div className={styles.marqueeWrapper}>
                <div className={styles.marqueeTrack}>
                    {MARQUEE.map((p, i) => (
                        <div key={`${p.name}-${i}`} className={styles.logoCard}>
                            <span className={`${styles.logoText} heading-display`}>{p.logo}</span>
                            <span className={styles.logoName}>{p.name}</span>
                        </div>
                    ))}
                </div>
                <div className={styles.marqueeTrack} aria-hidden="true">
                    {MARQUEE.map((p, i) => (
                        <div key={`${p.name}-dup-${i}`} className={styles.logoCard}>
                            <span className={`${styles.logoText} heading-display`}>{p.logo}</span>
                            <span className={styles.logoName}>{p.name}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="gold-divider" />
        </section>
    );
}
