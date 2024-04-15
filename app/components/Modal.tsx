import React from 'react';

interface ModalProps {
  modalOpen: boolean;
  setModalOpen: (open: boolean) => void; // Corrected the return type of setModalOpen to void
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ modalOpen, setModalOpen, children }) => {
  return (
    <div className={`modal ${modalOpen ? 'modal-open' : ''}`}>
      <div className="modal-box">
        {children}
        <div className="modal-action">
          <label htmlFor="my_modal_6" className="btn" onClick={() => setModalOpen(false)}>
            Close!
          </label>
        </div>
      </div>
    </div>
  );
};

export default Modal;
