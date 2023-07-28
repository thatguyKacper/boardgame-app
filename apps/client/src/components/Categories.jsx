import { Link } from 'react-router-dom';
import wargames from '../assets/wargames.svg';
import fighting from '../assets/fighting.svg';
import adventure from '../assets/adventure.svg';
import economic from '../assets/economic.svg';
import horror from '../assets/horror.svg';
import puzzle from '../assets/puzzle.svg';
import cardgames from '../assets/cardgames.svg';
import dice from '../assets/dice.svg';
import fantasy from '../assets/fantasy.svg';
import sf from '../assets/sf.svg';
import party from '../assets/party.svg';
import child from '../assets/child.svg';
import useSearchStore from '../searchStore';

export default function Categories() {
  const {
    handleSearchCategory,
    handleSearchText,
    handleSortBy,
    handleSortOrder,
  } = useSearchStore();

  const handleClick = (name) => {
    handleSearchCategory('category');
    handleSearchText(name);
    handleSortBy('category');
    handleSortOrder('DESC');
  };

  return (
    <div className="container px-4 py-5" id="icon-grid">
      <h2 className="pb-2 border-bottom">Top Categories</h2>

      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-5 py-5">
        <Link
          to="/boardgames?category=war-games"
          className="text-decoration-none text-dark"
          onClick={() => handleClick('wargame')}
        >
          <div className="col d-flex flex-column align-items-center">
            <img src={wargames} alt="wargames" />
            <h4 className="fs-4 pt-2">Wargames</h4>
          </div>
        </Link>
        <Link
          to="/boardgames?category=fighting"
          className="text-decoration-none text-dark"
          onClick={() => handleClick('fighting')}
        >
          <div className="col d-flex flex-column align-items-center">
            <img src={fighting} alt="fighting" />
            <h4 className="fs-4 pt-2">Fighting</h4>
          </div>
        </Link>
        <Link
          to="/boardgames?category=adventure"
          className="text-decoration-none text-dark"
          onClick={() => handleClick('adventure')}
        >
          <div className="col d-flex flex-column align-items-center">
            <img src={adventure} alt="adventure" />
            <h4 className="fs-4 pt-2">Adventure</h4>
          </div>
        </Link>
        <Link
          to="/boardgames?category=economic"
          className="text-decoration-none text-dark"
          onClick={() => handleClick('economic')}
        >
          <div className="col d-flex flex-column align-items-center">
            <img src={economic} alt="economic" />
            <h4 className="fs-4 pt-2">Economic</h4>
          </div>
        </Link>
        <Link
          to="/boardgames?category=horror"
          className="text-decoration-none text-dark"
          onClick={() => handleClick('horror')}
        >
          <div className="col d-flex flex-column align-items-center">
            <img src={horror} alt="horror" />
            <h4 className="fs-4 pt-2">Horror</h4>
          </div>
        </Link>
        <Link
          to="/boardgames?category=puzzle"
          className="text-decoration-none text-dark"
          onClick={() => handleClick('puzzle')}
        >
          <div className="col d-flex flex-column align-items-center">
            <img src={puzzle} alt="puzzle" />
            <h4 className="fs-4 pt-2">Puzzle</h4>
          </div>
        </Link>
        <Link
          to="/boardgames?category=card-games"
          className="text-decoration-none text-dark"
          onClick={() => handleClick('card game')}
        >
          <div className="col d-flex flex-column align-items-center">
            <img src={cardgames} alt="cardgames" />
            <h4 className="fs-4 pt-2">Card Games</h4>
          </div>
        </Link>
        <Link
          to="/boardgames?category=dice"
          className="text-decoration-none text-dark"
          onClick={() => handleClick('dice')}
        >
          <div className="col d-flex flex-column align-items-center">
            <img src={dice} alt="dice" />
            <h4 className="fs-4 pt-2">Dice</h4>
          </div>
        </Link>
        <Link
          to="/boardgames?category=fantasy"
          className="text-decoration-none text-dark"
          onClick={() => handleClick('fantasy')}
        >
          <div className="col d-flex flex-column align-items-center">
            <img src={fantasy} alt="fantasy" />
            <h4 className="fs-4 pt-2">Fantasy</h4>
          </div>
        </Link>
        <Link
          to="/boardgames?category=science-fiction"
          className="text-decoration-none text-dark"
          onClick={() => handleClick('science fiction')}
        >
          <div className="col d-flex flex-column align-items-center">
            <img src={sf} alt="sf" />
            <h4 className="fs-4 pt-2">Science Fiction</h4>
          </div>
        </Link>
        <Link
          to="/boardgames?category=party-game"
          className="text-decoration-none text-dark"
          onClick={() => handleClick('party game')}
        >
          <div className="col d-flex flex-column align-items-center">
            <img src={party} alt="party" />
            <h4 className="fs-4 pt-2">Party Games</h4>
          </div>
        </Link>
        <Link
          to="/boardgames?category=childrens-game"
          className="text-decoration-none text-dark"
          onClick={() => handleClick('childrens game')}
        >
          <div className="col d-flex flex-column align-items-center">
            <img src={child} alt="child" />
            <h4 className="fs-4 pt-2">Children's Games</h4>
          </div>
        </Link>
      </div>
    </div>
  );
}
