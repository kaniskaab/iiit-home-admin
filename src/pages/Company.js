import React, { useState, useEffect } from 'react';

const PlacementElement = () => {
  const [placements, setPlacements] = useState([]);
  const [newPlacement, setNewPlacement] = useState({ name: '', link: '' });

  useEffect(() => {
    fetchPlacements();
  }, []);

  const fetchPlacements = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/placement`);
      const data = await response.json();
      setPlacements(data);
    } catch (error) {
      console.error(error);
    }
  };

  const createPlacement = async () => {
    try {
      await fetch(`${process.env.REACT_APP_BASE_URL}/placement`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPlacement),
      });
      setNewPlacement({ name: '', link: '' });
      fetchPlacements();
    } catch (error) {
      console.error(error);
    }
    fetchPlacements()
  };

  const deletePlacement = async (placementId) => {
    try {
      await fetch(`${process.env.REACT_APP_BASE_URL}/placement/${placementId}`, {
        method: 'DELETE',
      });
      fetchPlacements();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-gray-800 text-white p-8">
      <h1 className="text-3xl mb-6">Placement Elements</h1>

      {/* Create Placement Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createPlacement();
        }}
        className="mb-4"
      >
        <input
          type="text"
          placeholder="Name"
          className="w-full px-4 py-2 mb-2 rounded text-black"

          onChange={(e) => setNewPlacement({ ...newPlacement, name: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Link"
          className="w-full px-4 py-2 mb-2 rounded text-black"

          onChange={(e) => setNewPlacement({ ...newPlacement, link: e.target.value })}
          required
        />
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
        >
          Add Placement
        </button>
      </form>

      {/* Placement List */}
      {placements.map((placement) => (
        <div key={placement._id} className="bg-gray-700 p-4 rounded mb-4">
          <h2 className="text-xl">{placement.name}</h2>
          <p className="mt-2">
            Link: <a href={placement.link} className="text-blue-400 hover:text-blue-600" target="_blank" rel="noreferrer">{placement.link}</a>
          </p>
          <button
            className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded mt-4"
            onClick={() => deletePlacement(placement._id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default PlacementElement;
