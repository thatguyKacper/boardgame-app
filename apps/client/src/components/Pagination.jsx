import useStore from '../store';

export default function Pagination({ meta }) {
  const { prev_page, next_page, curent_page, last_page } = meta;

  const { handleNextPage, handlePrevPage, handleSetPage } = useStore();

  return (
    <div className="py-2 border-bottom mb-3">
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
            {next_page && (
              <>
                {prev_page > 0 ? (
                  <li className="page-item">
                    <button
                      className="page-link"
                      onClick={() => handleSetPage(prev_page)}
                    >
                      {prev_page}
                    </button>
                  </li>
                ) : null}
                <li className="page-item">
                  <button className="page-link" disabled>
                    {curent_page}
                  </button>
                </li>
                <li className="page-item">
                  <button
                    className="page-link"
                    onClick={() => handleSetPage(next_page)}
                  >
                    {next_page}
                  </button>
                </li>
                <li className="page-item">
                  <span className="page-link">...</span>
                </li>
                <li className="page-item">
                  <button
                    className="page-link"
                    onClick={() => handleSetPage(last_page)}
                  >
                    {last_page}
                  </button>
                </li>
                <li className="page-item">
                  <button
                    className="page-link"
                    disabled={prev_page >= last_page}
                    onClick={handleNextPage}
                  >
                    Next
                  </button>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
}
