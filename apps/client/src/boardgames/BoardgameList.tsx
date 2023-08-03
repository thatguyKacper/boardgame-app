import { useState } from 'react';
import { isAuthenticated } from '../auth/auth-helper';
import { capitalizeFirstLetter } from '../helpers/string-helper';
import useSearchStore from '../searchStore';
import BoardgameListItem from './BoardgameListItem';
import { Boardgame } from '../interfaces/boardgame';


export default function BoardgameList({ boardgames }: { boardgames: Boardgame[] }) {
  const session = isAuthenticated();
  const { searchCategory } = useSearchStore();

  const [sortOrder, setSortOrder] = useState('ASC');

  const { handleSortBy, handleSortOrder } = useSearchStore();

  const handleClick = (name: string) => {
    handleSortBy(name);
    setSortOrder((prevOrder) => (prevOrder === 'ASC' ? 'DESC' : 'ASC'));
    handleSortOrder(sortOrder);
  };

  return (
    <div className="table">
      <table className="table table-striped table-sm table-hover">
        <thead>
          <tr>
            <th scope="col" role="button" onClick={() => handleClick('id')}>
              #
            </th>
            <th scope="col" role="button" onClick={() => handleClick('name')}>
              Name
            </th>
            {searchCategory && !session && (
              <th
                scope="col"
                role="button"
                onClick={() => handleClick(searchCategory)}
              >
                {capitalizeFirstLetter(searchCategory)}
              </th>
            )}
            {searchCategory && session && (
              <>
                <th scope="col">{capitalizeFirstLetter(searchCategory)}</th>
                <th scope="col">Actions</th>
              </>
            )}
            {!searchCategory && session && (
              <>
                <th
                  scope="col"
                  role="button"
                  onClick={() => handleClick('minplayers')}
                >
                  Min Players
                </th>
                <th
                  scope="col"
                  role="button"
                  onClick={() => handleClick('maxplayers')}
                >
                  Max Players
                </th>
                <th
                  scope="col"
                  role="button"
                  onClick={() => handleClick('playingtime')}
                >
                  Playing time
                </th>
                <th
                  scope="col"
                  role="button"
                  onClick={() => handleClick('category')}
                >
                  Category
                </th>
                <th scope="col">Actions</th>
              </>
            )}
            {!searchCategory && !session && (
              <>
                <th
                  scope="col"
                  role="button"
                  onClick={() => handleClick('minplayers')}
                >
                  Min Players
                </th>
                <th
                  scope="col"
                  role="button"
                  onClick={() => handleClick('maxplayers')}
                >
                  Max Players
                </th>
                <th
                  scope="col"
                  role="button"
                  onClick={() => handleClick('playingtime')}
                >
                  Playing time
                </th>
                <th
                  scope="col"
                  role="button"
                  onClick={() => handleClick('category')}
                >
                  Category
                </th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {boardgames?.map((boardgame) => (
            <BoardgameListItem boardgame={boardgame} key={boardgame.id} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
