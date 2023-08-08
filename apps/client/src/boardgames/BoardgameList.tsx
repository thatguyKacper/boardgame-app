import { useState } from 'react';
import { isAuthenticated } from '../auth/auth-helper';
import { capitalizeFirstLetter } from '../helpers/string-helper';
import useSearchStore from '../searchStore';
import BoardgameListItem from './BoardgameListItem';
import { Boardgame } from '../interfaces/boardgame';
import Table from '../components/Table';

export default function BoardgameList({ boardgames }: { boardgames: Boardgame[] }) {
  const session = isAuthenticated();

  const {searchCategory, sortOrder, handleSortBy, handleSortOrder } = useSearchStore();

  const [sort, setSort] = useState(sortOrder);

  const handleClick = (name: string) => {
    handleSortBy(name);
    setSort((prevOrder) => (prevOrder === 'ASC' ? 'DESC' : 'ASC'));
    handleSortOrder(sort);
  };

  const tableHeaders = ['id', 'name', 'minplayers', 'maxplayers', 'playingtime', 'category']

  return (
    <Table>
      <thead className='text-center'>
        <tr>
          {session && searchCategory && (
            tableHeaders.splice(2, 5, searchCategory, 'Actions'),
            tableHeaders.map((th, i) => (
              <th scope="col" key={i}>
                <button className="btn btn-link text-dark" role="button" onClick={() => handleClick(th)}>
                  {capitalizeFirstLetter(th)}
                </button>
              </th>
            ))
          )}
          {session && !searchCategory && (
            tableHeaders.push('Actions'),
            tableHeaders.map((th, i) => (
              <th scope="col" key={i}>
                <button className="btn btn-link text-dark" role="button"onClick={() => handleClick(th)}>
                  {capitalizeFirstLetter(th)}
                </button>
              </th>
            ))
          )}
          {!session && searchCategory && (
            tableHeaders.splice(2, 5, searchCategory,),
            tableHeaders.map((th, i) => (
              <th scope="col" key={i}>
                <button className="btn btn-link text-dark" role="button" onClick={() => handleClick(th)}>
                  {capitalizeFirstLetter(th)}
                </button>
              </th>
            ))
          )}
          {!session && !searchCategory && (
            tableHeaders.map((th, i) => (
              <th scope="col" key={i}>
                <button className="btn btn-link text-dark" role="button" onClick={() => handleClick(th)}>
                  {capitalizeFirstLetter(th)}
                </button>
              </th>
            ))
          )}
        </tr>
      </thead>
      <tbody className='text-center'>
        {boardgames?.map((boardgame) => (
          <BoardgameListItem boardgame={boardgame} key={boardgame.id} />
        ))}
      </tbody>
    </Table>
  );
}
