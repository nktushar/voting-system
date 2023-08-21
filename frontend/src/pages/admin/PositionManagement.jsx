import React, { Suspense, useState } from "react";
import { Await, Form, useLoaderData, useSubmit } from "react-router-dom";
// import Dashboard from "../../components/layouts/Dashboard";
import { useAuth } from "../../context/AuthProvider";
import AdminDashboard from "../../components/layouts/AdminDashboard";

const OpenPositionsPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [status, setStatus] = useState("open");
  const [positions, setPositions] = useState([]);
  const [editPositionId, setEditPositionId] = useState(null);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleDeadlineChange = (e) => {
    setDeadline(e.target.value);
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handlePostPosition = () => {
    if (title.trim() !== "" && description.trim() !== "" && deadline !== "") {
      const newPosition = {
        id: new Date().getTime(),
        title,
        description,
        deadline,
        status,
      };

      setPositions([...positions, newPosition]);
      setTitle("");
      setDescription("");
      setDeadline("");
      setStatus("open");
    }
  };

  const handleDeletePosition = (positionId) => {
    setPositions(positions.filter((position) => position.id !== positionId));
  };

  const handleEditPosition = (positionId) => {
    const positionToEdit = positions.find(
      (position) => position.id === positionId
    );
    setTitle(positionToEdit.title);
    setDescription(positionToEdit.description);
    setDeadline(positionToEdit.deadline);
    setStatus(positionToEdit.status);
    setEditPositionId(positionId);
  };

  const handleUpdatePosition = () => {
    setPositions((prevPositions) =>
      prevPositions.map((position) =>
        position.id === editPositionId
          ? { ...position, title, description, deadline, status }
          : position
      )
    );
    setTitle("");
    setDescription("");
    setDeadline("");
    setStatus("open");
    setEditPositionId(null);
  };

  return (
    <AdminDashboard>
      <div className="container mx-auto mt-8 px-4">
        <h1 className="text-2xl font-bold mb-4">Admin Open Positions</h1>

        {/* Position Form */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Post Open Position</h2>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={handleTitleChange}
              className="border border-gray-300 rounded-lg px-4 py-2 w-full"
              placeholder="Enter position title..."
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              value={description}
              onChange={handleDescriptionChange}
              rows="5"
              className="border border-gray-300 rounded-lg px-4 py-2 w-full"
              placeholder="Enter position description..."
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Deadline
            </label>
            <input
              type="date"
              value={deadline}
              onChange={handleDeadlineChange}
              className="border border-gray-300 rounded-lg px-4 py-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <select
              value={status}
              onChange={handleStatusChange}
              className="border border-gray-300 rounded-lg px-4 py-2 w-full"
            >
              <option value="open">Open</option>
              <option value="closed">Closed</option>
            </select>
          </div>
          {!editPositionId ? (
            <button
              onClick={handlePostPosition}
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            >
              Post Position
            </button>
          ) : (
            <button
              onClick={handleUpdatePosition}
              className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
            >
              Update Position
            </button>
          )}
        </div>

        {/* Posted Positions */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4">Posted Positions</h2>
          {positions.map((position) => (
            <div key={position.id} className="mb-4">
              <h3 className="text-lg font-semibold">{position.title}</h3>
              <p className="text-sm text-gray-600">{position.description}</p>
              <p className="text-sm text-gray-600">
                Deadline: {position.deadline}
              </p>
              <p className="text-sm text-gray-500">Status: {position.status}</p>
              <div className="flex mt-2">
                <button
                  onClick={() => handleEditPosition(position.id)}
                  className="bg-blue-500 text-white py-1 px-2 rounded-md hover:bg-blue-600 mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeletePosition(position.id)}
                  className="bg-red-500 text-white py-1 px-2 rounded-md hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
          {positions.length === 0 && <p>No open positions posted yet.</p>}
        </div>
      </div>
    </AdminDashboard>
  );
};

export default OpenPositionsPage;
