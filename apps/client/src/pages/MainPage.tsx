import { useLocation } from 'react-router-dom';
import Footer from '../components/Footer';
import Nav from '../components/Nav';
import Jumbo from '../components/Jumbo';
import TopFeature from '../components/TopFeature';
import Categories from '../components/Categories';
import { ReactNode } from 'react';

export default function MainPage({ children }: {children?: ReactNode}) {
  const { pathname } = useLocation();

  return (
    <>
      <Nav />
      <main>
        <div className="container mt-5 pt-5">
          {pathname === '/' ? (
            <>
              <Jumbo />
              <TopFeature />
              <Categories />
            </>
          ) : (
            children
          )}
          <hr className="featurette-divider" />
        </div>
      </main>
      <Footer />
    </>
  );
}
