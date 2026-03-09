'use client';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import About from './components/About';
import Energy from './components/Energy';
import Partners from './components/Partners';
import Contact from './components/Contact';
import Footer from './components/Footer';

// Hero must be client-only (canvas + GSAP)
const Hero = dynamic(() => import('./components/Hero'), { ssr: false });

export default function Home() {
    const [loaded, setLoaded] = useState(false);

    // Prevent scrolling while the initial loader is active, and ensure we start at the top
    useEffect(() => {
        if (typeof window !== 'undefined') {
            if ('scrollRestoration' in window.history) {
                window.history.scrollRestoration = 'manual';
            }
            if (!loaded) {
                document.body.style.overflow = 'hidden';
                window.scrollTo(0, 0);
            } else {
                document.body.style.overflow = '';
            }
        }
    }, [loaded]);

    return (
        <>
            {/* Full-page loader — mounts on top until complete */}
            {!loaded && (
                <Loader
                    onComplete={() => {
                        setLoaded(true);
                    }}
                />
            )}

            {/* Site content — rendered beneath loader, snaps in after exit */}
            <main
                id="home"
                style={{
                    opacity: loaded ? 1 : 0,
                    transition: 'opacity 0.5s ease 0.1s',
                    pointerEvents: loaded ? 'all' : 'none',
                }}
            >
                <Navbar />
                <Hero />
                <About />
                <Energy />
                <Partners />
                <Contact />
                <Footer />
            </main>
        </>
    );
}
