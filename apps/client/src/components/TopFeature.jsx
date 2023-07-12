import { Link } from 'react-router-dom';

export default function TopFeature() {
  return (
    <div className="container px-4 py-5" id="featured-3">
      <h2 className="pb-2 border-bottom">Top 10 boardgames</h2>
      <div className="row g-4 py-5 row-cols-1 row-cols-lg-3">
        <div className="feature col">
          <h3 className="fs-2">Most scored boardgames</h3>
          <p>Here you can see boardgames that have best score</p>
          <Link
            to="/boardgames/lists?top=score"
            state={{ query: '&score=score' }}
            className="icon-link d-inline-flex align-items-center"
          >
            See boardgames
          </Link>
        </div>
        <div className="feature col">
          <h3 className="fs-2">Most played boardgames</h3>
          <p>Here you can see boardgames that users played most</p>
          <Link
            to="/boardgames/lists?top=played"
            state={{ query: '&played=played' }}
            className="icon-link d-inline-flex align-items-center"
          >
            See boardgames
          </Link>
        </div>
        <div className="feature col">
          <h3 className="fs-2">Most wished boardgames</h3>
          <p>Here you can see boardgames that users add to wishlist most</p>
          <Link
            to="/boardgames/lists?top=wishlist"
            state={{ query: '&wishlist=wishlist' }}
            className="icon-link d-inline-flex align-items-center"
          >
            See boardgames
          </Link>
        </div>
      </div>
    </div>
  );
}
