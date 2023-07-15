import React, { useState, useEffect } from 'react';

const PlacementPage = () => {
  const [placementData, setPlacementData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [editedPlacementData, setEditedPlacementData] = useState({});
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    fetchPlacementData();
  }, []);

  const fetchPlacementData = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/placehigh`);
      const data = await response.json();
      setPlacementData(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditPlacementData = () => {
    setIsEditing(true);
    setEditedPlacementData({ ...placementData });
    setShowPopup(true);
  };

  const handleUpdatePlacementData = async (data) => {
    try {
      const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      };
      await fetch(`${process.env.REACT_APP_BASE_URL}/placehigh`, requestOptions);
      setIsEditing(false);
      setShowPopup(false);
      fetchPlacementData();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-gray-800 text-white p-8 h-screen overflow-y-scroll" id='placement-highlights'>
      <h1 className="text-3xl mb-6">Placement Details</h1>

      {/* Placement Data */}
      <div className="bg-gray-700 p-4 rounded mb-4">
        <h2 className="text-xl">Number of Students Placed: {placementData.numOfStudentsPlaced}</h2>
        <h2 className="text-xl">Placement Percentage: {placementData.placementPercentage}</h2>
        <h2 className="text-xl">Number of Recruiters: {placementData.numOfRecruiters}</h2>
        <div className="mt-4 flex space-x-2">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded"
            onClick={handleEditPlacementData}
          >
            Edit
          </button>
        </div>
      </div>

      {/* Edit Placement Data Popup */}
      {showPopup && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-75 text-black">
          <div className="bg-gray-800 rounded p-4 w-1/2">
            <h2 className="text-2xl mb-4">Edit Placement Details</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const updatedData = {
                  numOfStudentsPlaced: Number(formData.get('numOfStudentsPlaced')),
                  placementPercentage: Number(formData.get('placementPercentage')),
                  numOfRecruiters: Number(formData.get('numOfRecruiters')),
                };
                handleUpdatePlacementData(updatedData);
              }}
            >
              <div className="mb-4">
                <label htmlFor="numOfStudentsPlaced">Number of Students Placed:</label>
                <input
                  type="number"
                  name="numOfStudentsPlaced"
                  id="numOfStudentsPlaced"
                  className="w-full rounded"
                  defaultValue={editedPlacementData.numOfStudentsPlaced}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="placementPercentage">Placement Percentage:</label>
                <input
                  type="number"
                  name="placementPercentage"
                  id="placementPercentage"
                  className="w-full rounded"
                  defaultValue={editedPlacementData.placementPercentage}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="numOfRecruiters">Number of Recruiters:</label>
                <input
                  type="number"
                  name="numOfRecruiters"
                  id="numOfRecruiters"
                  className="w-full rounded"
                  defaultValue={editedPlacementData.numOfRecruiters}
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
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlacementPage;
