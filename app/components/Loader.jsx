'use client';
import { useEffect, useRef, useState } from 'react';
import styles from './Loader.module.css';

export default function Loader({ onComplete }) {
    const [progress, setProgress] = useState(0);
    const [phase, setPhase] = useState('loading'); // 'loading' | 'done' | 'exit'
    const rafRef = useRef(null);
    const startRef = useRef(null);

    useEffect(() => {
        // Duration: ~3.5s total, eased so it crawls near 100
        const DURATION = 3500;

        const tick = (now) => {
            if (!startRef.current) startRef.current = now;
            const elapsed = now - startRef.current;
            const linear = Math.min(elapsed / DURATION, 1);

            // Ease: fast start, slow 90-95, even slower 96-100
            let eased;
            if (linear < 0.6) {
                // First 60% of time covers 0-90% of progress (fast)
                eased = (linear / 0.6) * 0.90;
            } else if (linear < 0.8) {
                // Next 20% of time covers 90-95% (slow)
                const t = (linear - 0.6) / 0.2;
                eased = 0.90 + t * 0.05;
            } else {
                // Final 20% of time covers 95-100% (extra slow)
                const t = (linear - 0.8) / 0.2;
                eased = 0.95 + t * 0.05;
            }

            const pct = Math.min(Math.round(eased * 100), 100);
            setProgress(pct);

            if (linear < 1) {
                rafRef.current = requestAnimationFrame(tick);
            } else {
                setProgress(100);
                setPhase('done');
                // Brief pause at 100, then exit
                setTimeout(() => {
                    setPhase('exit');
                    setTimeout(onComplete, 700);
                }, 400);
            }
        };

        rafRef.current = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(rafRef.current);
    }, [onComplete]);

    return (
        <div className={`${styles.overlay} ${phase === 'exit' ? styles.exit : ''}`}>
            {/* Background grid */}
            <div className={styles.grid} />

            {/* Brand */}
            <div className={styles.brand}>
                <span className={`${styles.brandRed} heading-display`}>RED</span>
                <span className={`${styles.brandGold} heading-display`}>BULL</span>
            </div>

            {/* Center progress block */}
            <div className={styles.center}>
                <p className={`${styles.label} heading-tech`}>Initializing Experience</p>

                {/* Number */}
                <div className={styles.number}>
                    <span className={`${styles.pct} heading-display`}>{progress}</span>
                    <span className={`${styles.sym} heading-tech`}>%</span>
                </div>

                {/* Bar */}
                <div className={styles.barWrap}>
                    <div className={styles.barTrack}>
                        <div className={styles.barFill} style={{ width: `${progress}%` }} />
                        {/* Glowing head */}
                        <div className={styles.barHead} style={{ left: `${progress}%` }} />
                    </div>
                    <div className={styles.barLabels}>
                        <span className={`${styles.barLabel} heading-tech`}>0</span>
                        <span className={`${styles.barLabel} heading-tech`}>100</span>
                    </div>
                </div>

                <p className={`${styles.sub} heading-tech`}>
                    {progress < 30 && 'Loading frames...'}
                    {progress >= 30 && progress < 70 && 'Preparing animation engine...'}
                    {progress >= 70 && progress < 95 && 'Warming up the wings...'}
                    {progress >= 95 && 'Almost there...'}
                </p>
            </div>

            {/* Footer tag */}
            <p className={`${styles.footer} heading-tech`}>
                Red Bull GmbH — Fuschl am See, Austria
            </p>
        </div>
    );
}
