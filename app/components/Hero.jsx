'use client';
import { useEffect, useRef, useState } from 'react';
import styles from './Hero.module.css';

const TOTAL_FRAMES = 200;

function padFrame(n) {
    return String(n).padStart(3, '0');
}

export default function Hero() {
    const canvasRef = useRef(null);
    const sectionRef = useRef(null);
    const framesRef = useRef([]);
    const [loaded, setLoaded] = useState(false);
    const [loadProgress, setLoadProgress] = useState(0);
    const [shockwave, setShockwave] = useState(false);
    const lastPhaseRef = useRef(-1);

    /* ─── 1. Preload all 200 frames ─── */
    useEffect(() => {
        let count = 0;
        framesRef.current = new Array(TOTAL_FRAMES);

        const onLoad = () => {
            count++;
            setLoadProgress(Math.round((count / TOTAL_FRAMES) * 100));
            if (count === TOTAL_FRAMES) setLoaded(true);
        };

        for (let i = 1; i <= TOTAL_FRAMES; i++) {
            const img = new Image();
            img.src = `/frames/ezgif-frame-${padFrame(i)}.jpg`;
            img.onload = onLoad;
            img.onerror = onLoad; // don't hang on missing frames
            framesRef.current[i - 1] = img;
        }
    }, []);

    /* ─── 2. Fit canvas to window ─── */
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const resize = () => {
            const dpr = window.devicePixelRatio || 1;
            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;
            canvas.style.width = `${window.innerWidth}px`;
            canvas.style.height = `${window.innerHeight}px`;

            const ctx = canvas.getContext('2d');
            ctx.scale(dpr, dpr);
        };
        resize();
        window.addEventListener('resize', resize);
        return () => window.removeEventListener('resize', resize);
    }, []);

    /* ─── 3. Draw a single frame ─── */
    const drawFrame = (idx) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';

        const clamped = Math.max(0, Math.min(Math.round(idx), TOTAL_FRAMES - 1));
        const img = framesRef.current[clamped];
        if (!img?.complete || !img.naturalWidth) return;

        // Use CSS pixels for drawing logic to match the scale(dpr) context
        const cw = window.innerWidth;
        const ch = window.innerHeight;

        // Scale down the drawing area to 75% so the ENTIRE can is perfectly visible
        const paddingFactor = 0.75;
        const paddedCw = cw * paddingFactor;
        const paddedCh = ch * paddingFactor;

        const ir = img.naturalWidth / img.naturalHeight;
        const cr = paddedCw / paddedCh;

        // Small offset (40px) to dodge the navbar without pushing the can off the bottom edge
        const navbarOffset = 40;

        let dw, dh, dx, dy;
        if (cr > ir) {
            dw = paddedCw;
            dh = paddedCw / ir;
            dx = (cw - dw) / 2;
            dy = ((ch - dh) / 2) + navbarOffset;
        } else {
            dh = paddedCh;
            dw = paddedCh * ir;
            dy = ((ch - dh) / 2) + navbarOffset;
            dx = (cw - dw) / 2;
        }

        ctx.clearRect(0, 0, cw, ch);
        ctx.drawImage(img, dx, dy, dw, dh);
    };

    /* ─── 4. GSAP ScrollTrigger with pin:true ─── */
    useEffect(() => {
        if (!loaded) return;

        drawFrame(0); // show first frame immediately

        let ctx;
        const initGSAP = async () => {
            const { default: gsap } = await import('gsap');
            const { ScrollTrigger } = await import('gsap/ScrollTrigger');
            gsap.registerPlugin(ScrollTrigger);

            const obj = { frame: 0 };

            ctx = gsap.context(() => {
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top top',
                        pin: true,
                        scrub: 0.5,
                        end: '+=300%', // decreased scroll distance to make frames move faster
                    }
                });

                // Phase 1: Scrub the frames while text is hidden (takes up first 80% of timeline)
                tl.to(obj, {
                    frame: TOTAL_FRAMES - 1,
                    snap: 'frame',
                    ease: 'none',
                    duration: 6,
                    onUpdate() {
                        requestAnimationFrame(() => drawFrame(obj.frame));
                        const p = obj.frame / TOTAL_FRAMES;
                        const phase = p < 0.3 ? 0 : p < 0.6 ? 1 : 2;
                        if (phase === 1 && lastPhaseRef.current !== 1) {
                            setShockwave(true);
                            setTimeout(() => setShockwave(false), 500);
                        }
                        lastPhaseRef.current = phase;
                    }
                });

                // Phase 2: Fade and scale text up perfectly staggered at the end
                tl.fromTo(
                    '.hero-stagger',
                    { y: 80, opacity: 0, scale: 0.9 },
                    { y: 0, opacity: 1, scale: 1, stagger: 0.15, duration: 1.5, ease: 'power2.out' },
                    '+=0.2' // tiny pause after frames finish
                );
            }, sectionRef);
        };

        initGSAP();
        return () => ctx?.revert();
    }, [loaded]);

    const scrollToAbout = () => {
        document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        /* No explicit height here — GSAP pin adds spacer automatically */
        <section id="hero" ref={sectionRef} className={styles.section}>
            <div className={`${styles.canvasWrap} ${shockwave ? 'shockwave-active' : ''}`}>
                <canvas ref={canvasRef} className={styles.canvas} />
                <div className={styles.vignette} />

                {/* ── Loader ── */}
                {!loaded && (
                    <div className={styles.loader}>
                        <p className={`${styles.loaderLabel} heading-tech`}>Loading</p>
                        <div className={styles.loaderBar}>
                            <div className={styles.loaderFill} style={{ width: `${loadProgress}%` }} />
                        </div>
                        <p className={`${styles.loaderPct} heading-display text-gold`}>{loadProgress}%</p>
                    </div>
                )}

                {/* ── Overlay ── */}
                {loaded && (
                    <div className={styles.overlay}>
                        <div className={styles.heroText}>
                            <p className={`${styles.eyebrow} heading-tech hero-stagger`}>Red Bull Energy</p>
                            <h1 className={`${styles.headline} heading-display hero-stagger`}>
                                <span className={styles.headlineGold}>Gives You</span>
                                <br />
                                <span className={styles.headlineWhite}>Wings</span>
                            </h1>
                            <button onClick={scrollToAbout} className={`${styles.ghostBtn} hero-stagger`}>
                                <span className="heading-tech">Experience the Power</span>
                                <span className={styles.ghostBtnArrow}>↓</span>
                            </button>
                        </div>
                        <div className={`${styles.scrollHint} hero-stagger`}>
                            <div className={styles.scrollLine} />
                            <span className={`${styles.scrollText} heading-tech`}>Scroll</span>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
