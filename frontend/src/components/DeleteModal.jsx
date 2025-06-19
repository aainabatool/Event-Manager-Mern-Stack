import React from 'react';
import './modalStyles.css'; // Optional: You can use this for custom fade-in/out animations.

const DeleteModal = ({ onConfirm, onCancel }) => {
  return (
    <div
      className="modal fade show d-block"
      tabIndex="-1"
      role="dialog"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content shadow-lg rounded-4">
          <div className="modal-header bg-danger text-white rounded-top-4">
            <h5 className="modal-title fw-bold">⚠️ Confirm Deletion</h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={onCancel}
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <p className="fs-5 text-center">
              Are you sure you want to permanently delete this event?
            </p>
          </div>
          <div className="modal-footer d-flex justify-content-between">
            <button
              type="button"
              className="btn btn-outline-secondary w-45"
              onClick={onCancel}
            >
              ❌ Cancel
            </button>
            <button
              type="button"
              className="btn btn-danger w-45"
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
