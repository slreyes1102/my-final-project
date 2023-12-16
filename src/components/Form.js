import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { toast, ToastContainer } from 'react-toastify'; // Import the toast functions
import 'react-datepicker/dist/react-datepicker.css';
import './Form.css'; // Import the CSS file for styling

const Form = ({ onFormSubmit, editIndex, formData: initialFormData, onPreview, onPrint }) => {
  const [formData, setFormData] = useState(initialFormData || {});
  const [fileAttachment, setFileAttachment] = useState(formData.fileAttachment || null);
  const [documentDate, setDocumentDate] = useState(formData.documentDate || new Date());
  const [dateReceived, setDateReceived] = useState(formData.dateReceived || new Date());

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedFormData = {
      ...formData,
      fileAttachment,
      documentDate,
      dateReceived,
    };

    onFormSubmit(updatedFormData);
    setFormData({});
    setFileAttachment(null);
  };

  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFileAttachment(selectedFile);
  };

  return (
    <div>
      <h2>Communication Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="documentOwner">Document Owner:</label>
          <input
            type="text"
            id="documentOwner"
            value={formData.documentOwner || ''}
            onChange={(e) => handleInputChange('documentOwner', e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="receivedThroughEmail">Received through email:</label>
          <select
            id="receivedThroughEmail"
            value={formData.receivedThroughEmail || ''}
            onChange={(e) => handleInputChange('receivedThroughEmail', e.target.value)}
          >
            <option value="">Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        <div className="form-group">
  <label htmlFor="category">Category:</label>
  <select
    id="category"
    value={formData.category || ''}
    onChange={(e) => handleInputChange('category', e.target.value)}
  >
    <option value="">Select</option>
    <option value="Annual Turnover">Annual Turnover</option>
    <option value="ATN">ATN</option>
    <option value="ATN Others">ATN Others</option>
    <option value="Consular">Consular</option>
    <option value="Consular Others">Consular Others</option>
    <option value="Fiscal">Fiscal</option>
    <option value="GAD">GAD</option>
    <option value="Org Dev Admin Report">Org Dev Admin Report</option>
    <option value="Org Dev Others">Org Dev Others</option>
    <option value="Property">Property</option>
    <option value="Records">Records</option>
    <option value="Trainings">Trainings</option>
    <option value="Void">Void</option>
  </select>
</div>

        <div className="form-group">
          <label htmlFor="documentNumber">Document Number:</label>
          <input
            type="text"
            id="documentNumber"
            value={formData.documentNumber || ''}
            onChange={(e) => handleInputChange('documentNumber', e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="subject">Subject:</label>
          <input
            type="text"
            id="subject"
            value={formData.subject || ''}
            onChange={(e) => handleInputChange('subject', e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="documentDate">Document Date:</label>
          <DatePicker
            id="documentDate"
            selected={documentDate}
            onChange={(date) => setDocumentDate(date)}
            dateFormat="yyyy-MM-dd"
          />
        </div>

        <div className="form-group">
          <label htmlFor="dateReceived">Date Received:</label>
          <DatePicker
            id="dateReceived"
            selected={dateReceived}
            onChange={(date) => setDateReceived(date)}
            dateFormat="yyyy-MM-dd"
          />
        </div>

        <div className="form-group">
          <label htmlFor="initialActionTaken">Initial Action Taken:</label>
          <input
            type="text"
            id="initialActionTaken"
            value={formData.initialActionTaken || ''}
            onChange={(e) => handleInputChange('initialActionTaken', e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="receivedBy">Received By:</label>
          <input
            type="text"
            id="receivedBy"
            value={formData.receivedBy || ''}
            onChange={(e) => handleInputChange('receivedBy', e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="remarks">Remarks:</label>
          <input
            type="text"
            id="remarks"
            value={formData.remarks || ''}
            onChange={(e) => handleInputChange('remarks', e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="fileAttachment">File Attachment (pdf, xls, ppt, doc):</label>
          <input
            type="file"
            id="fileAttachment"
            name="fileAttachment"
            accept=".pdf,.xls,.xlsx,.ppt,.pptx,.doc,.docx"
            onChange={handleFileChange}
          />
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Form;
