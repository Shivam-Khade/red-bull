'use client';
import { useEffect, useRef } from 'react';
import styles from './About.module.css';

export default function About() {
    const imgRef = useRef(null);
    const textRef = useRef(null);
    const sectionRef = useRef(null);
    const gridRef = useRef(null);

    useEffect(() => {
        const initGSAP = async () => {
            const gsapMod = await import('gsap');
            const stMod = await import('gsap/ScrollTrigger');
            const gsap = gsapMod.default || gsapMod.gsap;
            const { ScrollTrigger } = stMod;
            gsap.registerPlugin(ScrollTrigger);

            // Create a timeline for the entire section
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: gridRef.current, // Target the actual content grid
                    start: 'top 60%',          // when top of grid hits 60% of viewport
                    end: 'top 20%',
                    toggleActions: 'play none none reverse',
                    // markers: true,
                },
            });

            // 1. Image comes in from fully off-screen left, then exits to the right
            tl.fromTo(
                imgRef.current,
                {
                    x: '-100vw',
                    rotation: -15,
                    opacity: 0,
                },
                {
                    x: '0vw',
                    rotation: 0,
                    opacity: 1,
                    duration: 3,
                    ease: 'expo.out',
                }
            );

            // Image enters and stays in the left column


            // 2. Text lines reveal (starting slightly before the image finishes entering)
            const textItems = textRef.current?.querySelectorAll('.gsap-reveal');
            if (textItems) {
                tl.fromTo(
                    textItems,
                    { x: 50, opacity: 0 },
                    {
                        x: 0,
                        opacity: 1,
                        duration: 1,
                        stagger: 0.12,
                        ease: 'power3.out',
                    },
                    '-=2' // starts during the tail of the image animation
                );
            }
        };

        initGSAP();

        // Cleanup to prevent memory leaks on route changes
        return () => {
            import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
                const allTriggers = ScrollTrigger.getAll();
                allTriggers.forEach(trigger => trigger.kill());
            });
        };
    }, []);

    return (
        <section
            id="about"
            ref={sectionRef}
            className={styles.section}
            style={{ overflowX: 'hidden' }} // Prevents horizontal scroll while image moves off-screen
        >
            <div className={styles.grid} ref={gridRef}>
                {/* Left: Image Column */}
                <div className={styles.imageCol}>
                    <div className={styles.imageFrame}>
                        <div
                            ref={imgRef}
                            className={styles.imageWrapper}
                            style={{
                                opacity: 0,
                                willChange: 'transform',
                            }}
                        >
                            <img
                                src="/locked-img.png"
                                alt="Locked Red Bull"
                                className={`${styles.img} ${styles.lockedImg}`}
                            />
                            <img
                                src="/imgg.png"
                                alt="Red Bull Frosted Can"
                                className={`${styles.img} ${styles.hoverImg}`}
                            />
                        </div>
                    </div>

                    {/* Stats Row */}
                    <div className={styles.statsRow}>
                        <div className={styles.stat}>
                            <span className={`${styles.statNum} heading-display text-gold`}>12.2B</span>
                            <span className={`${styles.statLabel} heading-tech`}>Cans Sold '23</span>
                        </div>
                        <div className={styles.statDivider} />
                        <div className={styles.stat}>
                            <span className={`${styles.statNum} heading-display text-gold`}>175+</span>
                            <span className={`${styles.statLabel} heading-tech`}>Countries</span>
                        </div>
                        <div className={styles.statDivider} />
                        <div className={styles.stat}>
                            <span className={`${styles.statNum} heading-display text-gold`}>1987</span>
                            <span className={`${styles.statLabel} heading-tech`}>Founded</span>
                        </div>
                    </div>
                </div>

                {/* Right: Content Column */}
                <div ref={textRef} className={styles.content}>
                    <p className={`${styles.sectionTag} heading-tech gsap-reveal`}>— The Energy Engine —</p>
                    <h2 className={`${styles.heading} heading-display gsap-reveal`}>
                        <span className="text-silver">Industrial</span>
                        <br />
                        <span className="text-gold">Strength</span>
                        <br />
                        <span className="text-silver">Science</span>
                    </h2>
                    <p className={`${styles.body} gsap-reveal`}>
                        Born in the mountains of Austria, refined in labs, proven on circuits and peaks across the globe.
                        Red Bull isn't just energy — it's precision-engineered performance in a can.
                    </p>
                    <p className={`${styles.body} gsap-reveal`}>
                        Taurine. B-vitamins. Caffeine. A formula that awakens every synapse,
                        sharpens every edge, and turns the impossible into launch-ready.
                    </p>
                    <div className={`${styles.ingredientsGrid} gsap-reveal`}>
                        {['Taurine', 'Caffeine', 'B-Vitamins', 'Sucrose', 'Alpine Water'].map((item) => (
                            <span key={item} className={`${styles.ingredient} heading-tech`}>{item}</span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}