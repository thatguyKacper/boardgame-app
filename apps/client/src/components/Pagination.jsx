import useSearchStore from '../searchStore';

export default function Pagination({ meta }) {
  const { prev_page, next_page, curent_page, last_page } = meta;

  const { handleNextPage, handlePrevPage, handleSetPage } = useSearchStore();

  return (
    <div className="py-2 mb-3">
      <div className="container d-flex flex-wrap justify-content-center">
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            <li className="page-item">
              <button
                className="page-link"
                disabled={prev_page < 1}
                onClick={handlePrevPage}
              >
                Previous
              </button>
            </li>
            {prev_page ? (
              <li className="page-item">
                <button
                  className="page-link"
                  onClick={() => handleSetPage(prev_page)}
                >
                  {prev_page}
                </button>
              </li>
            ) : null}
            {curent_page !== last_page ? (
              <li className="page-item">
                <button className="page-link active" disabled>
                  {curent_page}
                </button>
              </li>
            ) : null}
            {next_page ? (
              <li className="page-item">
                <button
                  className="page-link"
                  onClick={() => handleSetPage(next_page)}
                >
                  {next_page}
                </button>
              </li>
            ) : null}
            {!prev_page && !next_page ? null : (
              <li className="page-item">
                <span className="page-link">...</span>
              </li>
            )}
            <li className="page-item">
              <button
                className={
                  curent_page !== last_page ? 'page-link' : 'page-link active'
                }
                onClick={() => handleSetPage(last_page)}
              >
                {last_page}
              </button>
            </li>

            <li className="page-item">
              <button
                className="page-link"
                disabled={curent_page === last_page}
                onClick={handleNextPage}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
