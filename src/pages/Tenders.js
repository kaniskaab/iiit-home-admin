import React, { useState, useEffect } from 'react';

const TendersPage = () => {
  const [tenders, setTenders] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTender, setEditedTender] = useState({});
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    fetchTenders();
  }, []);

  const fetchTenders = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/tenders`);
      const data = await response.json();
      setTenders(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditTender = (tender) => {
    setIsEditing(true);
    setEditedTender(tender);
    setShowPopup(true);
  };

  const handleDeleteTender = async (tenderId) => {
    try {
      await fetch(`${process.env.REACT_APP_BASE_URL}/tenders/${tenderId}`, { method: 'DELETE' });
      fetchTenders();
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreateOrUpdateTender = async (tender) => {
    try {
      const requestOptions = {
        method: isEditing ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tender),
      };

      await fetch(`${process.env.REACT_APP_BASE_URL}/tenders${isEditing ? `/${editedTender._id}` : ''}`, requestOptions);
      setIsEditing(false);
      setShowPopup(false);
      fetchTenders();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-gray-800 text-white p-8 h-screen overflow-y-scroll" id='tenders'>
      <h1 className="text-3xl mb-6">Tenders</h1>

      {/* Create Tender Button */}
      <button
        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded mb-4"
        onClick={() => {
          setIsEditing(false);
          setShowPopup(true);
        }}
      >
        Create Tender
      </button>

      {/* Tenders */}
      {tenders.map((tender) => (
        <div key={tender._id} className="bg-gray-700 p-4 rounded mb-4">
          <h2 className="text-xl">{tender.name}</h2>
          <p className="text-sm text-gray-400">Reference Number: {tender.referenceNumber}</p>
          <p className="mt-2">{tender.publicationDetails}</p>
          <p>Website Publication Date: {tender.websitePublicationDate}</p>
          <p>Submission Last Date: {tender.submissionLastDate}</p>
          <p>Opening Bids DateTime: {tender.openingBidsDateTime}</p>
          <p>Opening Financial Bids DateTime: {tender.openingFinancialBidsDateTime}</p>
          {tender.note && <p>Note: {tender.note}</p>}
          <a href={tender.tenderDocumentLink} className="text-blue-400 hover:text-blue-600" target="_blank" rel="noreferrer">
            View Tender Document
          </a>
          <div className="mt-4 flex space-x-2">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded"
              onClick={() => handleEditTender(tender)}
            >
              Edit
            </button>
            <button
              className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
              onClick={() => handleDeleteTender(tender._id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}

      {/* Edit Tender Popup */}
      {showPopup && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-75">
          <div className="bg-gray-800 rounded p-4 w-1/2 overflow-y-scroll h-screen">
            <h2 className="text-2xl mb-4">{isEditing ? 'Edit Tender' : 'Create Tender'}</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const tender = {
                  name: formData.get('name'),
                  referenceNumber: formData.get('referenceNumber'),
                  publicationDetails: formData.get('publicationDetails'),
                  websitePublicationDate: formData.get('websitePublicationDate'),
                  submissionLastDate: formData.get('submissionLastDate'),
                  openingBidsDateTime: formData.get('openingBidsDateTime'),
                  openingFinancialBidsDateTime: formData.get('openingFinancialBidsDateTime'),
                  note: formData.get('note') || null,
                  tenderDocumentLink: formData.get('tenderDocumentLink'),
                };
                handleCreateOrUpdateTender(tender);
              }}
            >
              <div className="mb-4">
                <label htmlFor="name">Name:</label>
                <input type="text" name="name" id="name" className="w-full rounded text-black"  required/>
              </div>
              <div className="mb-4">
                <label htmlFor="referenceNumber">Reference Number:</label>
                <input
                  type="text"
                  name="referenceNumber"
                  id="referenceNumber"
                  className="w-full rounded text-black"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="publicationDetails">Publication Details:</label>
                <textarea
                  name="publicationDetails"
                  id="publicationDetails"
                  rows="4"
                  className="w-full rounded text-black"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="websitePublicationDate">Website Publication Date:</label>
                <input
                  type="date"
                  name="websitePublicationDate"
                  id="websitePublicationDate"
                  className="w-full rounded text-black"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="submissionLastDate">Submission Last Date:</label>
                <input
                  type="date"
                  name="submissionLastDate"
                  id="submissionLastDate"
                  className="w-full rounded text-black"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="openingBidsDateTime">Opening Bids DateTime:</label>
                <input
                  type="datetime-local"
                  name="openingBidsDateTime"
                  id="openingBidsDateTime"
                  className="w-full rounded text-black"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="openingFinancialBidsDateTime">Opening Financial Bids DateTime:</label>
                <input
                  type="datetime-local"
                  name="openingFinancialBidsDateTime"
                  id="openingFinancialBidsDateTime"
                  className="w-full rounded text-black"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="note">Note:</label>
                <textarea
                  name="note"
                  id="note"
                  rows="4"
                  className="w-full rounded text-black"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="tenderDocumentLink">Tender Document Link:</label>
                <input
                  type="text"
                  name="tenderDocumentLink"
                  id="tenderDocumentLink"
                  className="w-full rounded text-black"
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded mr-2"
                  onClick={() => {
                    setIsEditing(false);
                    setShowPopup(false);
                  }}
                >
                  Cancel
                </button>
                <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
                  {isEditing ? 'Save Changes' : 'Create Tender'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TendersPage;
