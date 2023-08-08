import { useEffect } from 'react';
import { ModalInterface } from '../interfaces/components';
import { Modal as BootstrapModal } from 'bootstrap';

const Modal = ({
  title,
  message,
  buttonColor,
  buttonText,
  onClose,
  onAction
}: ModalInterface) => {

  // TO DO fix nav no clikable without this useeffect
  useEffect(() => {
    const modalElement = document.getElementById('exampleModal');
    if (modalElement) {
      new BootstrapModal(modalElement);
    }
  }, []);

  return (
    <div
      className='modal fade show'
      tabIndex={-1}
      aria-labelledby="exampleModalLabel"
      role='dialog'
      style={{ display: 'block' }}
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