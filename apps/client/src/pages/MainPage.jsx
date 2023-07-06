import Footer from '../components/Footer';
import Nav from '../components/Nav';

export default function MainPage({ children }) {
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
