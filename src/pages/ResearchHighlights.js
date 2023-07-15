import React, { useState, useEffect } from 'react';

const ResearchHighlightsPage = () => {
  const [researchHighlights, setResearchHighlights] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [editedResearchHighlights, setEditedResearchHighlights] = useState({});
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    fetchResearchHighlights();
  }, []);

  const fetchResearchHighlights = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/researchhigh`);
      const data = await response.json();
      setResearchHighlights(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditResearchHighlights = () => {
    setIsEditing(true);
    setEditedResearchHighlights({ ...researchHighlights });
    setShowPopup(true);
  };

  const handleUpdateResearchHighlights = async (data) => {
    try {
      const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      };
      await fetch(`${process.env.REACT_APP_BASE_URL}/researchhigh`, requestOptions);
      setIsEditing(false);
      setShowPopup(false);
      fetchResearchHighlights();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-gray-800 text-white p-8 h-screen overflow-y-scroll" id='research-details'>
      <h1 className="text-3xl mb-6">Research Highlights</h1>

      {/* Research Highlights Data */}
      <div className="bg-gray-700 p-4 rounded mb-4">
        <h2 className="text-xl">Research Articles: {researchHighlights.researchArticles}</h2>
        <h2 className="text-xl">Funded Projects: {researchHighlights.fundedProjects}</h2>
        <h2 className="text-xl">Number of Research Scholars: {researchHighlights.numResearchScholars}</h2>
        <div className="mt-4 flex space-x-2">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded"
            onClick={handleEditResearchHighlights}
          >
            Edit
          </button>
        </div>
      </div>

      {/* Edit Research Highlights Popup */}
      {showPopup && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-75 text-black">
          <div className="bg-gray-800 rounded p-4 w-1/2">
            <h2 className="text-2xl mb-4">Edit Research Highlights</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const updatedData = {
                  researchArticles: Number(formData.get('researchArticles')),
                  fundedProjects: Number(formData.get('fundedProjects')),
                  numResearchScholars: Number(formData.get('numResearchScholars')),
                };
                handleUpdateResearchHighlights(updatedData);
              }}
            >
              <div className="mb-4">
                <label htmlFor="researchArticles">Research Articles:</label>
                <input
                  type="number"
                  name="researchArticles"
                  id="researchArticles"
                  className="w-full rounded"
                  defaultValue={editedResearchHighlights.researchArticles}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="fundedProjects">Funded Projects:</label>
                <input
                  type="number"
                  name="fundedProjects"
                  id="fundedProjects"
                  className="w-full rounded"
                  defaultValue={editedResearchHighlights.fundedProjects}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="numResearchScholars">Number of Research Scholars:</label>
                <input
                  type="number"
                  name="numResearchScholars"
                  id="numResearchScholars"
                  className="w-full rounded"
                  defaultValue={editedResearchHighlights.numResearchScholars}
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

export default ResearchHighlightsPage;
