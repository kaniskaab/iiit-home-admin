import React, { useState, useEffect } from 'react';

const NoticesPage = () => {
  const [notices, setNotices] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedNotice, setEditedNotice] = useState({});
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/notices`);
      const data = await response.json();
      setNotices(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditNotice = (notice) => {
    setIsEditing(true);
    setEditedNotice(notice);
    setShowPopup(true);
  };

  const handleDeleteNotice = async (noticeId) => {
    try {
      await fetch(`${process.env.REACT_APP_BASE_URL}/notices/${noticeId}`, {
        method: 'DELETE',
      });
      fetchNotices();
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreateNotice = async (notice) => {
    try {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...notice, attachment: notice.attachment || '' }),
      };
      await fetch(`${process.env.REACT_APP_BASE_URL}/notices`, requestOptions);
      setShowPopup(false);
      fetchNotices();
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateNotice = async (notice) => {
    try {
      const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...notice, attachment: notice.attachment || '' }),
      };
      await fetch(`${process.env.REACT_APP_BASE_URL}/notices/${notice._id}`, requestOptions);
      setIsEditing(false);
      setShowPopup(false);
      fetchNotices();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-gray-800 text-white p-8 h-screen overflow-y-scroll" id='notices'>
      <h1 className="text-3xl mb-6">Notices</h1>

      {/* Create Notice Button */}
      <button
        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded mb-4"
        onClick={() => {
          setIsEditing(false);
          setShowPopup(true);
        }}
      >
        Create Notice
      </button>

      {/* Notices */}
      {notices.map((notice) => (
        <div key={notice._id} className="bg-gray-700 p-4 rounded mb-4">
          <h2 className="text-xl">{notice.title}</h2>
          <p className="text-sm text-gray-400">Posted by: {notice.postedBy}</p>
          <p className="mt-2">{notice.content}</p>
          {notice.attachment && (
            <a href={notice.attachment} className="text-blue-400 hover:text-blue-600" target="_blank" rel="noreferrer">
              View Attachment
            </a>
          )}
          <div className="mt-4 flex space-x-2">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded"
              onClick={() => handleEditNotice(notice)}
            >
              Edit
            </button>
            <button
              className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
              onClick={() => handleDeleteNotice(notice._id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}

      {/* Edit Notice Popup */}
      {showPopup && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-75 text-black">
          <div className="bg-gray-800 rounded p-4 w-1/2">
            <h2 className="text-2xl mb-4">{isEditing ? 'Edit Notice' : 'Create Notice'}</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const notice = {
                  title: formData.get('title'),
                  postedBy: formData.get('postedBy'),
                  content: formData.get('content'),
                //   attachment: formData.get('attachment'),
                };
                if (isEditing) {
                  handleUpdateNotice({ ...notice, _id: editedNotice._id });
                } else {
                  handleCreateNotice(notice);
                }
              }}
            >
              <div className="mb-4">
                <label htmlFor="title">Title:</label>
                <input type="text" name="title" id="title" className="w-full rounded" />
              </div>
              <div className="mb-4">
                <label htmlFor="postedBy">Posted by:</label>
                <input type="text" name="postedBy" id="postedBy" className="w-full rounded"  />
              </div>
              <div className="mb-4">
                <label htmlFor="content">Content:</label>
                <textarea name="content" id="content" rows="4" className="w-full rounded"/>
              </div>
              <div className="mb-4">
                <label htmlFor="attachment">Attachment:</label>
                <input type="file" name="attachment" id="attachment" className="w-full rounded" />
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
                  {isEditing ? 'Save Changes' : 'Create Notice'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default NoticesPage;

