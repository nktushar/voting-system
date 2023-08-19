import React, { useState } from "react";

const Notice = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [notices, setNotices] = useState([]);
  const [editNoticeId, setEditNoticeId] = useState(null);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleBodyChange = (e) => {
    setBody(e.target.value);
  };

  const handlePostNotice = () => {
    if (title.trim() !== "" && body.trim() !== "") {
      const newNotice = {
        id: new Date().getTime(),
        title,
        body,
        timestamp: new Date().toLocaleString(),
      };

      setNotices([...notices, newNotice]);
      setTitle("");
      setBody("");
    }
  };

  const handleDeleteNotice = (noticeId) => {
    setNotices(notices.filter((notice) => notice.id !== noticeId));
  };

  const handleEditNotice = (noticeId) => {
    const noticeToEdit = notices.find((notice) => notice.id === noticeId);
    setTitle(noticeToEdit.title);
    setBody(noticeToEdit.body);
    setEditNoticeId(noticeId);
  };

  const handleUpdateNotice = () => {
    setNotices((prevNotices) =>
      prevNotices.map((notice) =>
        notice.id === editNoticeId ? { ...notice, title, body } : notice
      )
    );
    setTitle("");
    setBody("");
    setEditNoticeId(null);
  };

  return (
    <div className="container mx-auto mt-8 px-4">
      <h1 className="text-2xl font-bold mb-4">Admin Notice Page</h1>

      {/* Notice Form */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-xl font-bold mb-4">Write and Post Notice</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            className="border border-gray-300 rounded-lg px-4 py-2 w-full"
            placeholder="Enter notice title..."
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Body
          </label>
          <textarea
            value={body}
            onChange={handleBodyChange}
            rows="5"
            className="border border-gray-300 rounded-lg px-4 py-2 w-full"
            placeholder="Enter notice body..."
          />
        </div>
        {!editNoticeId ? (
          <button
            onClick={handlePostNotice}
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Post Notice
          </button>
        ) : (
          <button
            onClick={handleUpdateNotice}
            className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
          >
            Update Notice
          </button>
        )}
      </div>

      {/* Posted Notices */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4">Posted Notices</h2>
        {notices.map((notice) => (
          <div key={notice.id} className="mb-4">
            <h3 className="text-lg font-semibold">{notice.title}</h3>
            <p className="text-lg text-gray-600">{notice.body}</p>
            <p className="text-sm text-gray-500">
              Posted on {notice.timestamp}
            </p>
            <div className="flex mt-2">
              <button
                onClick={() => handleEditNotice(notice.id)}
                className="bg-blue-500 text-white py-1 px-2 rounded-md hover:bg-blue-600 mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteNotice(notice.id)}
                className="bg-red-500 text-white py-1 px-2 rounded-md hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
        {notices.length === 0 && <p>No notices posted yet.</p>}
      </div>
    </div>
  );
};

export default Notice;
