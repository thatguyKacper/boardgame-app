import { ModalInterface } from '../interfaces/components';

const Modal = ({
  title,
  message,
  buttonColor,
  buttonText,
  show,
  onClose,
  onAction
} : ModalInterface) => {

  return (
    <div
      className={`modal ${show}`}
      tabIndex={-1}
      id="exampleModal"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
      style={{display: 'block'}}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              data-bs-dismiss="modal"
              onClick={onClose}
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
              onClick={onClose}
            >
              Close
            </button>
            <button
              type="button"
              className={`btn btn-${buttonColor}`}
              onClick={onAction}
            >
              {buttonText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
