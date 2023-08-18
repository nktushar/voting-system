import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthProvider";
import { useLoaderData } from "react-router-dom";

const StudentDashboard = () => {
  const loaderData = useLoaderData();
  console.log("loaderData ", loaderData);
  const [post, setPost] = useState(loaderData.post);
  const [photos, setPhotos] = useState(loaderData.photos);

  useEffect(() => {
    const dashboardLoader = async () => {
      const postRes = await fetch("https://jsonplaceholder.typicode.com/posts");
      const photosRes = await fetch("https://jsonplaceholder.typicode.com/photos");
      const post = await postRes.json();
      const photos = await photosRes.json();
      return { post, photos };
    };

    (async () => {
      const { post, photos } = await dashboardLoader();
      setPost(post);
      setPhotos(photos);
    })();
  },[])
  const [openPositions, setOpenPositions] = useState([
    {
      id: 1,
      title: "President for IT Society",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis at cursus odio.",
    },
    {
      id: 2,
      title: "Vice President",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis at cursus odio.",
    },
    {
      id: 3,
      title: "Programming Club Manager",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis at cursus odio.",
    },
    {
      id: 4,
      title: "Programming Club Manager",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis at cursus odio.",
    },
    // Add more open positions here
  ]);

  const [notices, setNotices] = useState([
    {
      id: 1,
      title: "Important Announcement 1",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis at cursus odio.",
    },
    {
      id: 2,
      title: "Important Announcement 2",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis at cursus odio.",
    },
    {
      id: 3,
      title: "Event Notification",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis at cursus odio.",
    },
    // Add more notices here
  ]);

  const [applicants, setApplicants] = useState({
    President: [
      { id: 1, name: "John Doe", semester: "8th" },
      { id: 2, name: "Jane Smith", semester: "7th" },
      // Add more applicants for President position here
    ],
    "Vice President": [
      { id: 3, name: "Alex Johnson", semester: "6th" },
      { id: 4, name: "Sarah Lee", semester: "5th" },
      // Add more applicants for Vice President position here
    ],
    "Programming Club Manager": [
      { id: 5, name: "Michael Brown", semester: "7th" },
      { id: 6, name: "Emily Davis", semester: "6th" },
      // Add more applicants for Programming Club Manager position here
    ],
    // Add more applicants for other positions here
  });

  const [selectedPosition, setSelectedPosition] = useState(null);
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    studentID: "",
    email: "",
    phone: "",
    address: "",
    interests: "",
    reasonToApply: "",
    revolution: "",
  });
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [transactionNumber, setTransactionNumber] = useState("");

  const handlePositionClick = (position) => {
    setSelectedPosition(position);
    setSelectedApplicant(null);
  };

  const handleVote = (applicantId) => {
    setSelectedApplicant(applicantId);
  };

  const handleApply = (positionId) => {
    setSelectedPosition(positionId);
    setShowForm(true);
  };

  const handleSubmitApplication = () => {
    // Handle form submission logic here (can be sending data to backend)
    setShowForm(false);
    setShowPaymentModal(true);
  };

  const handleSubmitPayment = () => {
    // Handle payment submission logic here (can be sending data to backend)
    setShowPaymentModal(false);
    // Reset form data here if needed
    setFormData({
      fullName: "",
      studentID: "",
      email: "",
      phone: "",
      address: "",
      interests: "",
      reasonToApply: "",
      revolution: "",
    });
    setTransactionNumber("");
  };

  const { logout } = useAuth();

  return (
    <div className="bg-gray-100">
      <nav className="bg-blue-500 py-4 px-8 text-white">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold">Student Access Dashboard</h1>
          <button
            className="border-2 border-white rounded-md px-4 py-2"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="container mx-auto mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Open Positions Section */}
          <section className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4">Open Positions</h2>
            <ul>
              {openPositions.slice(0, 3).map((position) => (
                <li key={position.id} className="mb-4">
                  <h3 className="text-lg font-semibold">{position.title}</h3>
                  <p className="text-sm text-gray-600">
                    {position.description}
                  </p>
                  <button
                    onClick={() => handleApply(position.id)}
                    className="bg-blue-500 text-white py-2 px-4 mt-2 rounded-md hover:bg-blue-600"
                  >
                    Apply
                  </button>
                </li>
              ))}
            </ul>
            {openPositions.length > 3 && (
              <button className="bg-blue-500 text-white py-2 px-4 mt-4 rounded-md hover:bg-blue-600">
                See More
              </button>
            )}
          </section>

          {/* Notice Board Section */}
          <section className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4">Notice Board</h2>
            <ul>
              {notices.slice(0, 3).map((notice) => (
                <li key={notice.id} className="mb-4">
                  <h3 className="text-lg font-semibold">{notice.title}</h3>
                  <p className="text-sm text-gray-600">{notice.content}</p>
                </li>
              ))}
            </ul>
            {notices.length > 3 && (
              <button className="bg-blue-500 text-white py-2 px-4 mt-4 rounded-md hover:bg-blue-600">
                See All Notices
              </button>
            )}
          </section>
        </div>

        {/* Additional Positions and Notices Section */}
        <section className="bg-white rounded-lg shadow-lg p-6 mt-8">
          <h2 className="text-xl font-bold mb-4">Additional Positions</h2>
          <ul>
            {openPositions.slice(3).map((position) => (
              <li key={position.id} className="mb-4">
                <h3 className="text-lg font-semibold">{position.title}</h3>
                <p className="text-sm text-gray-600">{position.description}</p>
                <button
                  onClick={() => handleApply(position.id)}
                  className="bg-blue-500 text-white py-2 px-4 mt-2 rounded-md hover:bg-blue-600"
                >
                  Apply
                </button>
              </li>
            ))}
          </ul>
          {openPositions.length > 3 && (
            <button className="bg-blue-500 text-white py-2 px-4 mt-4 rounded-md hover:bg-blue-600">
              See All Positions
            </button>
          )}
        </section>

        {/* Additional Notices Section */}
        <section className="bg-white rounded-lg shadow-lg p-6 mt-8">
          <h2 className="text-xl font-bold mb-4">Additional Notices</h2>
          <ul>
            {notices.slice(3).map((notice) => (
              <li key={notice.id} className="mb-4">
                <h3 className="text-lg font-semibold">{notice.title}</h3>
                <p className="text-sm text-gray-600">{notice.content}</p>
              </li>
            ))}
          </ul>
          {notices.length > 3 && (
            <button className="bg-blue-500 text-white py-2 px-4 mt-4 rounded-md hover:bg-blue-600">
              See All Notices
            </button>
          )}
        </section>

        {/* Voting Section */}
        <section className="bg-white rounded-lg shadow-lg p-6 mt-8">
          <h2 className="text-xl font-bold mb-4">Vote for Positions</h2>
          <ul>
            {Object.keys(applicants).map((position) => (
              <li key={position} className="mb-4">
                <h3 className="text-lg font-semibold">{position}</h3>
                <ul>
                  {applicants[position].map((applicant) => (
                    <li key={applicant.id}>
                      <span>{applicant.name}</span>
                      <button
                        onClick={() => handleVote(applicant.id)}
                        className={`ml-2 px-4 py-1 rounded-md ${
                          selectedApplicant === applicant.id
                            ? "bg-blue-500 text-white"
                            : "bg-gray-300"
                        }`}
                      >
                        Vote
                      </button>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* Application Form Modal */}
      {showForm && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setShowForm(false)}
        >
          <div className="bg-white p-8 rounded-lg z-50">
            <h2 className="text-xl font-bold mb-4">Apply for Position</h2>
            <form>
              {/* Form fields here */}
              <form action="">
                <label htmlFor="">
                  Full Name
                  <input
                    type="text"
                    className="border border-gray-300 rounded-lg px-4 py-2 mt-2 w-full"
                  />
                </label>
                <label htmlFor="">
                  Student ID
                  <input
                    type="text"
                    className="border border-gray-300 rounded-lg px-4 py-2 mt-2 w-full"
                  />
                </label>
                <label htmlFor="">
                  Email
                  <input
                    type="text"
                    className="border border-gray-300 rounded-lg px-4 py-2 mt-2 w-full"
                  />
                </label>
                <label htmlFor="">
                  Phone
                  <input
                    type="text"
                    className="border border-gray-300 rounded-lg px-4 py-2 mt-2 w-full"
                  />
                </label>
                <label htmlFor="">
                  Address
                  <input
                    type="text"
                    className="border border-gray-300 rounded-lg px-4 py-2 mt-2 w-full"
                  />
                </label>
                <label htmlFor="">
                  Interests
                  <input
                    type="text"
                    className="border border-gray-300 rounded-lg px-4 py-2 mt-2 w-full"
                  />
                </label>
                <label htmlFor="">
                  Reason to Apply
                  <input
                    type="text"
                    className="border border-gray-300 rounded-lg px-4 py-2 mt-2 w-full"
                  />
                </label>
                <label htmlFor="">
                  Revolution you want to bring
                  <input
                    type="text"
                    className="border border-gray-300 rounded-lg px-4 py-2 mt-2 w-full"
                  />
                </label>
              </form>
              <button
                type="button"
                onClick={handleSubmitApplication}
                className="bg-blue-500 text-white py-2 px-4 mt-4 rounded-md hover:bg-blue-600"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Payment Modal */}
      {showPaymentModal && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setShowPaymentModal(false)}
        >
          <div className="bg-white p-8 rounded-lg z-50">
            <h2 className="text-xl font-bold mb-4">Payment Submission</h2>
            <p>Please enter your transaction number for Bkash payment:</p>
            <input
              type="text"
              value={transactionNumber}
              onChange={(e) => setTransactionNumber(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 mt-2 w-full"
            />
            <button
              type="button"
              onClick={handleSubmitPayment}
              className="bg-blue-500 text-white py-2 px-4 mt-4 rounded-md hover:bg-blue-600"
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;
