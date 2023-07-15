import React, { useState, useEffect } from 'react';

const StoriesPage = () => {
  const [stories, setStories] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedStory, setEditedStory] = useState({});
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    fetchStories();
  }, []);

  const fetchStories = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/stories`);
      const data = await response.json();
      setStories(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditStory = (story) => {
    setIsEditing(true);
    setEditedStory(story);
    setShowPopup(true);
  };

  const handleDeleteStory = async (storyId) => {
    try {
      await fetch(`${process.env.REACT_APP_BASE_URL}/stories/${storyId}`, { method: 'DELETE' });
      fetchStories();
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreateOrUpdateStory = async (story) => {
    try {
      const requestOptions = {
        method: isEditing ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(story),
      };

      await fetch(`${process.env.REACT_APP_BASE_URL}/stories${isEditing ? `/${editedStory._id}` : ''}`, requestOptions);
      setIsEditing(false);
      setShowPopup(false);
      fetchStories();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-gray-800 text-white p-8 h-screen overflow-y-scroll" id='stories'>
      <h1 className="text-3xl mb-6">Stories</h1>

      {/* Create Story Button */}
      <button
        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded mb-4"
        onClick={() => {
          setIsEditing(false);
          setShowPopup(true);
        }}
      >
        Create Story
      </button>

      {/* Stories */}
      {stories.map((story) => (
        <div key={story._id} className="bg-gray-700 p-4 rounded mb-4">
          <div className="flex items-center">
            <img src={story.image} alt={story.name} className="w-12 h-12 rounded-full mr-4" />
            <div>
              <h2 className="text-xl">{story.name}</h2>
              <p className="text-sm text-gray-400">{story.branch}, {story.batch}</p>
            </div>
          </div>
          <p className="mt-4">{story.testimonials}</p>
          <div className="mt-4 flex space-x-2">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded"
              onClick={() => handleEditStory(story)}
            >
              Edit
            </button>
            <button
              className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
              onClick={() => handleDeleteStory(story._id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}

      {/* Edit Story Popup */}
      {showPopup && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-75">
          <div className="bg-gray-800 rounded p-4 w-1/2">
            <h2 className="text-2xl mb-4">{isEditing ? 'Edit Story' : 'Create Story'}</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const story = {
                  image: formData.get('image'),
                  name: formData.get('name'),
                  branch: formData.get('branch'),
                  batch: formData.get('batch'),
                  testimonials: formData.get('testimonials'),
                };
                handleCreateOrUpdateStory(story);
              }}
            >
              <div className="mb-4">
                <label htmlFor="image">Image:</label>
                <input type="text" name="image" id="image" className="w-full rounded text-black" required />
              </div>
              <div className="mb-4">
                <label htmlFor="name">Name:</label>
                <input type="text" name="name" id="name" className="w-full rounded text-black"  required />
              </div>
              <div className="mb-4">
                <label htmlFor="branch">Branch:</label>
                <input type="text" name="branch" id="branch" className="w-full rounded text-black"  required />
              </div>
              <div className="mb-4">
                <label htmlFor="batch">Batch:</label>
                <input type="text" name="batch" id="batch" className="w-full rounded text-black"  required />
              </div>
              <div className="mb-4">
                <label htmlFor="testimonials">Testimonials:</label>
                <textarea
                  name="testimonials"
                  id="testimonials"
                  rows="4"
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
                  {isEditing ? 'Save Changes' : 'Create Story'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default StoriesPage;
