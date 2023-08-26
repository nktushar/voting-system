import React, { Suspense, useEffect, useRef, useState } from "react";
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
import moment from "moment";
import { classNames } from "../../utils";

const Notice = () => {
  const actionData = useActionData();
  const navigation = useNavigation();
  // const { user } = useAuth();

  const loaderData = useLoaderData();
  console.log("loaderData ", loaderData);

  const notices = loaderData.notice;

  console.log("notices ", notices);

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [editNoticeId, setEditNoticeId] = useState(null);
  const [deleteNoticeId, setDeleteNoticeId] = useState(null);

  useEffect(() => {
    if (actionData?.data?.message) {
      setTitle("");
      setBody("");
      setEditNoticeId(null);
    }
  }, [actionData]);

  // const handleDeleteNotice = (noticeId) => {
  //   setDeleteNoticeId(noticeId);
  // };

  const handleEditNotice = (noticeId) => {
    const noticeToEdit = notices.find((notice) => notice._id === noticeId);
    setTitle(noticeToEdit.title);
    setBody(noticeToEdit.body);
    setEditNoticeId(noticeId);
  };

  // const handleUpdateNotice = () => {
  //   setNoticess((prevNotices) =>
  //     prevNotices.map((notice) =>
  //       notice.id === editNoticeId ? { ...notice, title, body } : notice
  //     )
  //   );
  //   setTitle("");
  //   setBody("");
  //   setEditNoticeId(null);
  // };

  return (
    <AdminDashboard>
      <div className="container mx-auto mt-8 px-4">
        <h1 className="text-2xl font-bold mb-4">Manage Notices</h1>

        {/* Notice Form */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Write and Post Notice</h2>
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
                placeholder="Enter notice title..."
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Body
              </label>
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                rows="5"
                name="body"
                className="border border-gray-300 rounded-lg px-4 py-2 w-full"
                placeholder="Enter notice body..."
              />
            </div>
            {actionData?.error ? (
              <div>
                <p className="text-red-500 text-sm">
                  {actionData.message.message}
                </p>
              </div>
            ) : null}
            {actionData?.data?.message ? (
              <div>
                <p className="text-green-500 text-sm">
                  {actionData.data.message}
                </p>
              </div>
            ) : null}
            <input type="hidden" name="noticeId" value={editNoticeId} />
            <button
              type="submit"
              name="intend"
              value={editNoticeId ? "update" : "add"}
              className={classNames(
                " text-white py-2 px-4 rounded-md hover:bg-blue-600",
                editNoticeId ? "bg-green-500" : "bg-blue-500"
              )}
            >
              {editNoticeId ? "Update Notice" : "Post Notice"}
            </button>
          </Form>
        </div>

        {/* Posted Notices */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4">Posted Notices</h2>
          {notices.map((notice) => (
            <div key={notice._id} className="mb-4">
              <h3 className="text-lg font-semibold">{notice.title}</h3>
              <p className="text-lg text-gray-600">{notice.body}</p>
              <p className="text-sm text-gray-500">
                Posted on{" "}
                {moment(notice.createdAt).format("MMM D, YYYY, h:mm A")}
              </p>
              <div className="flex mt-2">
                <button
                  onClick={() => handleEditNotice(notice._id)}
                  className="bg-blue-500 text-white py-1 px-2 rounded-md hover:bg-blue-600 mr-2"
                >
                  Edit
                </button>
                <Form method="POST">
                  <input type="hidden" name="noticeId" value={notice._id} />
                  <button
                    type="submit"
                    name="intend"
                    value="delete"
                    className="bg-red-500 text-white py-1 px-2 rounded-md hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={
                      navigation.state === "submitting" &&
                      navigation.formData.get("noticeId") === notice._id &&
                      navigation.formData.get("intend") === "delete"
                    }
                  >
                    {navigation.state === "submitting" &&
                    navigation.formData.get("noticeId") === notice._id &&
                    navigation.formData.get("intend") === "delete"
                      ? "Deleting..."
                      : "Delete"}
                  </button>
                </Form>
              </div>
            </div>
          ))}
          {notices.length === 0 && <p>No notices posted yet.</p>}
        </div>
      </div>
    </AdminDashboard>
  );
};

export default Notice;
