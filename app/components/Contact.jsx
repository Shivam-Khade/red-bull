'use client';
import { useRef, useState } from 'react';
import styles from './Contact.module.css';

export default function Contact() {
    const formRef = useRef(null);
    const [ripple, setRipple] = useState(false);
    const [sent, setSent] = useState(false);
    const [form, setForm] = useState({ name: '', email: '', message: '' });

    const handleChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setRipple(true);
        setTimeout(() => {
            setRipple(false);
            setSent(true);
        }, 800);
    };

    return (
        <section id="contact" className={styles.section}>
            <div className={styles.inner}>
                <p className={`${styles.tag} heading-tech`}>— Get In Touch —</p>
                <h2 className={`${styles.heading} heading-display`}>
                    <span className="text-silver">Feel The</span>
                    <br />
                    <span className="text-gold">Pulse</span>
                </h2>
                <p className={styles.sub}>
                    Got a partnership idea, a collab, or just want to talk energy?<br />
                    Drop us a message — we reply at the speed of wings.
                </p>

                <div ref={formRef} className={`${styles.formWrap} ${ripple ? styles.rippleFx : ''}`}>
                    {ripple && <div className={styles.rippleCircle} />}

                    {sent ? (
                        <div className={styles.successMsg}>
                            <span className={`${styles.successIcon} heading-display text-gold`}>✓</span>
                            <p className={`${styles.successText} heading-tech`}>Message Received</p>
                            <p className={styles.successSub}>We&apos;ll be in touch at the speed of wings.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className={styles.form}>
                            <div className={styles.row}>
                                <div className={styles.field}>
                                    <label className={`${styles.label} heading-tech`}>Name</label>
                                    <input
                                        name="name"
                                        value={form.name}
                                        onChange={handleChange}
                                        className={styles.input}
                                        placeholder="Your name"
                                        required
                                    />
                                </div>
                                <div className={styles.field}>
                                    <label className={`${styles.label} heading-tech`}>Email</label>
                                    <input
                                        name="email"
                                        type="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        className={styles.input}
                                        placeholder="your@email.com"
                                        required
                                    />
                                </div>
                            </div>
                            <div className={styles.field}>
                                <label className={`${styles.label} heading-tech`}>Message</label>
                                <textarea
                                    name="message"
                                    value={form.message}
                                    onChange={handleChange}
                                    className={`${styles.input} ${styles.textarea}`}
                                    placeholder="Tell us your vision..."
                                    rows={5}
                                    required
                                />
                            </div>
                            <button type="submit" className={styles.submitBtn}>
                                <span className="heading-tech">Send It</span>
                                <span className={styles.btnArrow}>→</span>
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </section>
    );
}
