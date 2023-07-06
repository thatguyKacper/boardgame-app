import { Link } from 'react-router-dom';

export default function Jumbo() {
  return (
    <div className="p-4 p-md-5 mb-4 rounded text-bg-dark">
      <div className="col-md-6 px-0">
        <h1 className="display-4 fst-italic">Welcome on Boardgame App!</h1>
        <p className="lead my-3">
          Here you can browse boardgames, read detailed info, score, add to
          wishlist and many more!
        </p>
        <p className="lead mb-0">
          <Link to="/boardgames" className="text-white fw-bold">
            Browse boardgames
          </Link>
        </p>
      </div>
    </div>
  );
}
