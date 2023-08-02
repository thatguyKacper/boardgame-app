import { isAuthenticated } from '../auth/auth-helper';
import useDelete from '../hooks/useDelete';

export default function Modal( title: string, message: string, buttonColor: string, buttonText: string) {
  const { token, id } = isAuthenticated();
  const { remove } = useDelete();

  const handleDelete = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!token) {
      return;
    }

    remove({ id, token });
  };

  return (
    <div
      className="modal fade"
      id="exampleModal"
      // tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <p>{message}</p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              className={`btn btn-${buttonColor}`}
              onClick={handleDelete}
            >
              {buttonText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
