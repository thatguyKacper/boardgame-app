import { isAuthenticated } from '../auth/auth-helper';
import useAddAsPlayed from '../hooks/useAddAsPlayed';
import useAddToWishlist from '../hooks/useAddToWishlist';

export default function AddTo({ gameId }) {
  const { token } = isAuthenticated();

  const { addAsPlayed } = useAddAsPlayed();
  const { addToWishlist } = useAddToWishlist();

  const handlePlayed = () => {
    if (!token) {
      return;
    }

    addAsPlayed({ gameId, token });
  };

  const handleWishlist = () => {
    if (!token) {
      return;
    }

    addToWishlist({ gameId, token });
  };

  return (
    <div
      className="btn-group"
      role="group"
      aria-label="Basic mixed styles example"
    >
      <button type="button" className="btn btn-primary" onClick={handlePlayed}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-plus-circle-fill"
          viewBox="0 0 16 16"
        >
          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
        </svg>
      </button>
      <button
        type="button"
        className="btn btn-primary"
        onClick={handleWishlist}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-suit-heart-fill"
          viewBox="0 0 16 16"
        >
          <path d="M4 1c2.21 0 4 1.755 4 3.92C8 2.755 9.79 1 12 1s4 1.755 4 3.92c0 3.263-3.234 4.414-7.608 9.608a.513.513 0 0 1-.784 0C3.234 9.334 0 8.183 0 4.92 0 2.755 1.79 1 4 1z" />
        </svg>
      </button>
    </div>
  );
}
