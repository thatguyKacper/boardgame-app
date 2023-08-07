import Footer from '../components/Footer';
import Nav from '../components/Nav';
import { ReactNode } from 'react';

export default function MainLayout({ children }: { children?: ReactNode }) {
    return (
        <>
            <Nav />
            <main>
                <div className="container mt-5 pt-5">
                    {children}
                    <hr className="featurette-divider" />
                </div>
            </main>
            <Footer />
        </>
    );
}
