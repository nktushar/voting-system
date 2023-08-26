import React, { Suspense, useEffect, useState } from "react";
import {
  Await,
  Form,
  useActionData,
  useLoaderData,
  useNavigation,
  useSubmit,
} from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import AdminDashboard from "../../components/layouts/AdminDashboard";
import { classNames } from "../../utils";
import moment from "moment";

const OpenPositionsPage = () => {
  const actionData = useActionData();

  const navigation = useNavigation();

  const loaderData = useLoaderData();
  console.log("loaderData ", loaderData);

  const [title, setTitle] = useState("");
  const [club, setClub] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [positionStatus, setPositionStatus] = useState("open");
  const [positions, setPositions] = useState([]);
  const [editPositionId, setEditPositionId] = useState(null);

  useEffect(() => {
    if (actionData?.data?.message) {
      setTitle("");
      setDescription("");
      setDeadline("");
      setPositionStatus("open");
      setEditPositionId(null);
    }
  }, [actionData]);

  const handleEditPosition = (positionId) => {
    const positionToEdit = loaderData?.position?.position?.find(
      (position) => position?._id === positionId
    );
    setTitle(positionToEdit?.position);
    setClub(positionToEdit?.club?._id);
    setDescription(positionToEdit.description);
    setDeadline(positionToEdit?.deadline);
    setPositionStatus(positionToEdit.positionStatus);
    setEditPositionId(positionId);
  };

  return (
    <AdminDashboard>
      <div className="container mx-auto mt-8 px-4">
        <h1 className="text-2xl font-bold mb-4">Admin Open Positions</h1>

        {/* Position Form */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Post Open Position</h2>
          <Form method="POST" className="space-y-4">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                type="text"
                value={title}
                name="title"
                onChange={(e) => setTitle(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 w-full"
                placeholder="Enter position title..."
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Club
              </label>
              <select
                value={club}
                name="club"
                onChange={(e) => setClub(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 w-full"
              >
                <option value="">Choose...</option>
                {loaderData?.club?.club.map((club) => (
                  <option value={club?._id}>{club?.heading}</option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                value={description}
                name="description"
                onChange={(e) => setDescription(e.target.value)}
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
                value={moment(deadline).format("YYYY-MM-DD")}
                // value={deadline}
                name="deadline"
                onChange={(e) => setDeadline(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Status
              </label>
              <select
                value={positionStatus}
                name="positionStatus"
                onChange={(e) => setPositionStatus(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 w-full"
              >
                <option value="open">Open</option>
                <option value="closed">Closed</option>
              </select>
            </div>
            {actionData?.error ? (
              <div>
                <p className="text-red-500 text-sm">
                  {actionData?.message?.message}
                </p>
              </div>
            ) : null}
            {actionData?.data?.message ? (
              <div>
                <p className="text-green-500 text-sm">
                  {actionData?.data?.message}
                </p>
              </div>
            ) : null}
            <input type="hidden" name="positionId" value={editPositionId} />
            <button
              type="submit"
              name="intent"
              value={editPositionId ? "update" : "add"}
              className={classNames(
                " text-white py-2 px-4 rounded-md hover:bg-blue-600",
                editPositionId ? "bg-green-500" : "bg-blue-500"
              )}
            >
              {editPositionId ? "Update Position" : "Post Position"}
            </button>
          </Form>
        </div>

        {/* Posted Positions */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4">Posted Positions</h2>
          {loaderData?.position?.position?.map((position) => (
            <div key={position?._id} className="mb-4">
              <h3 className="text-lg font-semibold">{position?.position}</h3>
              <h4 className="text-md font-semibold text-gray-700">
                Club: {position?.club?.heading}
              </h4>
              <p className="text-sm text-gray-600">{position?.description}</p>
              <p className="text-sm text-gray-600">
                Deadline: {moment(position?.deadline).format("MMM D, YYYY")}
              </p>
              <p className="text-sm text-gray-500">
                Status: {position?.positionStatus}
              </p>
              <div className="flex mt-2">
                <button
                  onClick={() => handleEditPosition(position?._id)}
                  className="bg-blue-500 text-white py-1 px-2 rounded-md hover:bg-blue-600 mr-2"
                >
                  Edit
                </button>
                <Form method="POST">
                  <input type="hidden" name="positionId" value={position._id} />
                  <button
                    type="submit"
                    name="intent"
                    value="delete"
                    className="bg-red-500 text-white py-1 px-2 rounded-md hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={
                      navigation.state === "submitting" &&
                      navigation.formData.get("positionId") === position._id &&
                      navigation.formData.get("intent") === "delete"
                    }
                  >
                    {navigation.state === "submitting" &&
                    navigation.formData.get("positionId") === position._id &&
                    navigation.formData.get("intent") === "delete"
                      ? "Deleting..."
                      : "Delete"}
                  </button>
                </Form>
              </div>
            </div>
          ))}
          {loaderData?.position?.position?.length === 0 && (
            <p>No open positions posted yet.</p>
          )}
        </div>
      </div>
    </AdminDashboard>
  );
};

export default OpenPositionsPage;
