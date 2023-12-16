import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-modal'; // Import the Modal component

// Set the app element to the root element of your application
Modal.setAppElement('#root');

const Dashboard = ({ location, formSubmissions }) => {
  const formSubmission = location?.state?.formSubmission || {};

  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };

  const [isModalOpen, setModalOpen] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);

  const handleEdit = (index) => {
    // Implement your edit logic here
  };

  const handleDelete = (index) => {
    setDeleteIndex(index);
    setModalOpen(true);
  };

  const handleDeleteConfirmation = () => {
    // Implement your delete logic here
    if (deleteIndex !== null) {
      // Delete the entry at the specified index
      // Example: formSubmissions.splice(deleteIndex, 1);
      // Notify user or update state accordingly
      toast.success('Entry deleted successfully!', { position: toast.POSITION.TOP_RIGHT });
    }

    // Close the modal and reset deleteIndex
    setModalOpen(false);
    setDeleteIndex(null);
  };

  const handleDeleteCancel = () => {
    // Close the modal and reset deleteIndex
    setModalOpen(false);
    setDeleteIndex(null);
  };

  return (
    <div>
      <h2>Dashboard</h2>

      {Object.keys(formSubmission).length > 0 && (
        <div>
          <h3>Form Submission Data</h3>
          <table>
            <thead>
              <tr>
                <th>Label</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(formSubmission).map(([label, value]) => (
                <tr key={label}>
                  <td>{label}</td>
                  <td>{value instanceof Date ? formatDate(value) : value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div>
        <h3>Your Existing Data</h3>
        <table style={{ borderCollapse: 'collapse', width: '100%' }}>
          <thead>
            <tr>
              <th>Document Owner</th>
              <th>Received Through Email</th>
              <th>Category</th>
              <th>Document Number</th>
              <th>Subject</th>
              <th>Document Date</th>
              <th>Date Received</th>
              <th>Initial Action Taken</th>
              <th>Received By</th>
              <th>Remarks</th>
              <th>Modify</th>
            </tr>
          </thead>
          <tbody>
            {formSubmissions.map((submission, index) => (
              <tr key={index} style={{ borderBottom: '1px solid #ddd' }}>
                <td>{submission?.documentOwner || 'N/A'}</td>
                <td>{submission?.receivedThroughEmail || 'N/A'}</td>
                <td>{submission?.category || 'N/A'}</td>
                <td>{submission?.documentNumber || 'N/A'}</td>
                <td>{submission?.subject || 'N/A'}</td>
                <td>{submission?.documentDate instanceof Date ? formatDate(submission?.documentDate) : 'N/A'}</td>
                <td>{submission?.dateReceived instanceof Date ? formatDate(submission?.dateReceived) : 'N/A'}</td>
                <td>{submission?.initialActionTaken || 'N/A'}</td>
                <td>{submission?.receivedBy || 'N/A'}</td>
                <td>{submission?.remarks || 'N/A'}</td>
                <td>
                  <button onClick={() => handleEdit(index)}>Edit</button>
                  <button onClick={() => handleDelete(index)}>Delete</button>
                </td>
              </tr>
            ))}
            {formSubmissions.length === 0 && (
              <tr>
                <td colSpan="11">No existing data available.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Confirmation Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setModalOpen(false)}
        style={{
          content: {
            width: '300px',
            margin: 'auto',
            textAlign: 'center',
          },
        }}
      >
        <p>Are you sure you want to delete this entry?</p>
        <button onClick={handleDeleteConfirmation}>Yes</button>
        <button onClick={handleDeleteCancel}>No</button>
      </Modal>

      <ToastContainer />
    </div>
  );
};

export default Dashboard;
