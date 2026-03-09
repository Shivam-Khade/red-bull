import './globals.css';

export const metadata = {
    title: 'Red Bull — Gives You Wings',
    description: 'Experience the power. Red Bull Energy Drink — premium dark experience.',
};

export const viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
