'use client';
import { useEffect, useRef } from 'react';
import styles from './Energy.module.css';

const features = [
    {
        title: 'The Spark',
        time: 'T+0:00',
        desc: 'The crisp, sharp hit of caffeine and B-vitamins wakes the system instantly.'
    },
    {
        title: 'The Lift',
        time: 'T+0:15',
        desc: 'Taurine aligns with your metabolism. Focus snaps into place. Jitters fade out.'
    },
    {
        title: 'The Wings',
        time: 'T+2:00',
        desc: 'Sustained, clean energy that carries you through the apex of your performance.'
    }
];

export default function Energy() {
    const sectionRef = useRef(null);

    useEffect(() => {
        const initGSAP = async () => {
            const gsapMod = await import('gsap');
            const stMod = await import('gsap/ScrollTrigger');
            const gsap = gsapMod.default || gsapMod.gsap;
            const { ScrollTrigger } = stMod;
            gsap.registerPlugin(ScrollTrigger);

            const cards = sectionRef.current?.querySelectorAll(`.${styles.card}`);
            if (cards) {
                gsap.fromTo(
                    cards,
                    { y: 100, opacity: 0, scale: 0.95 },
                    {
                        y: 0,
                        opacity: 1,
                        scale: 1,
                        duration: 1.2,
                        stagger: 0.2,
                        ease: 'expo.out',
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: 'top 75%',
                            toggleActions: 'play none none reverse',
                        },
                    }
                );
            }
        };

        initGSAP();
    }, []);

    return (
        <section id="energy" ref={sectionRef} className={styles.section}>
            <div className={styles.gridOverlay} />

            <div className={styles.header}>
                <p className={`${styles.tag} heading-tech`}>— The Physics of Flight —</p>
                <h2 className={`${styles.heading} heading-display`}>
                    <span className="text-silver">Pure</span> <span className="text-gold">Energy</span>
                </h2>
                <p className={styles.sub}>
                    A meticulously crafted formula designed for the moments that matter.
                </p>
            </div>

            <div className={styles.cardsWrap}>
                {features.map((f, i) => (
                    <div key={i} className={styles.card}>
                        <div className={styles.cardHeader}>
                            <span className={`${styles.cardTime} heading-tech`}>{f.time}</span>
                            <div className={styles.cardLine} />
                        </div>
                        <h3 className={`${styles.cardTitle} heading-display text-gold`}>{f.title}</h3>
                        <p className={styles.cardDesc}>{f.desc}</p>
                        {/* Ambient glow inside card */}
                        <div className={styles.cardGlow} />
                    </div>
                ))}
            </div>
        </section>
    );
}
