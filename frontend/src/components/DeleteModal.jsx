import React from 'react';
import './DeleteModal.css'; // Make sure this is in the same folder

const DeleteModal = ({ onConfirm, onCancel }) => {
  return (
    <div
      className="modal fade show d-block modal-backdrop-custom"
      tabIndex="-1"
      role="dialog"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content custom-modal shadow-lg rounded-4 animate-pop">
          <div className="modal-header bg-gradient-danger text-white rounded-top-4">
            <h5 className="modal-title fw-bold">⚠️ Confirm Deletion</h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={onCancel}
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <p className="fs-5 text-center text-light">
              Are you sure you want to permanently delete this event?
            </p>
          </div>
          <div className="modal-footer d-flex justify-content-between">
            <button
              type="button"
              className="btn btn-outline-light w-45 rounded-pill scale-hover"
              onClick={onCancel}
            >
              ❌ Cancel
            </button>
            <button
              type="button"
              className="btn btn-danger w-45 rounded-pill scale-hover"
              onClick={onConfirm}
            >
              ✅ Yes, Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
