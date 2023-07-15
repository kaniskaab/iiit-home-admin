import React, { useState, useEffect } from 'react';

const NewsPage = () => {
  const [newsList, setNewsList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedNews, setEditedNews] = useState({});
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/news`);
      const data = await response.json();
      setNewsList(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditNews = (news) => {
    setIsEditing(true);
    setEditedNews(news);
    setShowPopup(true);
  };

  const handleDeleteNews = async (newsId) => {
    try {
      await fetch(`${process.env.REACT_APP_BASE_URL}/news/${newsId}`, {
        method: 'DELETE',
      });
      fetchNews();
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreateNews = async (news) => {
    try {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(news),
      };
      await fetch(`${process.env.REACT_APP_BASE_URL}/news`, requestOptions);
      setShowPopup(false);
      fetchNews();
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateNews = async (news) => {
    try {
      const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(news),
      };
      await fetch(`${process.env.REACT_APP_BASE_URL}/news/${news._id}`, requestOptions);
      setIsEditing(false);
      setShowPopup(false);
      fetchNews();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-gray-800 text-white p-8 h-screen overflow-y-scroll" id="news">
      <h1 className="text-3xl mb-6">News</h1>

      {/* Create News Button */}
      <button
        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded mb-4"
        onClick={() => {
          setIsEditing(false);
          setShowPopup(true);
        }}
      >
        Create News
      </button>

      {/* News List */}
      {newsList.map((news) => (
        <div key={news._id} className="bg-gray-700 p-4 rounded mb-4">
          <h2 className="text-xl">{news.title}</h2>
          <a href={news.link} className="text-blue-400 hover:text-blue-600" target="_blank" rel="noreferrer">
            {news.link}
          </a>
          <div className="mt-4 flex space-x-2">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded"
              onClick={() => handleEditNews(news)}
            >
              Edit
            </button>
            <button
              className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
              onClick={() => handleDeleteNews(news._id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}

      {/* Edit News Popup */}
      {showPopup && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-75 text-black">
          <div className="bg-gray-800 rounded p-4 w-1/2">
            <h2 className="text-2xl mb-4">{isEditing ? 'Edit News' : 'Create News'}</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const news = {
                  title: formData.get('title'),
                  link: formData.get('link'),
                };
                if (isEditing) {
                  handleUpdateNews({ ...news, _id: editedNews._id });
                } else {
                  handleCreateNews(news);
                }
              }}
            >
              <div className="mb-4">
                <label htmlFor="title">Title:</label>
                <input type="text" name="title" id="title" className="w-full rounded" />
              </div>
              <div className="mb-4">
                <label htmlFor="link">Link:</label>
                <input type="text" name="link" id="link" className="w-full rounded" />
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
                  {isEditing ? 'Save Changes' : 'Create News'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsPage;
