import { useLoaderData } from "react-router-dom";

import Dashboard from "../../components/layouts/Dashboard";
import { useState } from "react";
import moment from "moment/moment";

const StudentDashboard = () => {
  const loaderData = useLoaderData();
  console.log("loaderData ", loaderData);

  const notices = loaderData.notice;



  const memberCount = 2000;
  const upcomingEvents = [
    { id: 1, title: 'Event 1' },
    { id: 2, title: 'Event 2' },
    // ...
  ];
  return (
    <Dashboard>
      <div className="flex-1 p-4">
      {/* Top Section */}
      <div className="mb-12 text-center">
        <h1 className="text-2xl font-bold">
          Welcome to the family of <br /> {memberCount} members
        </h1>
      </div>

      {/* Two Sections */}
      <div className="flex">
        {/* Upcoming Events */}
        <div className="w-1/2 pr-2">
          <div className="bg-blue-200 rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-2 text-center">Upcoming Events</h2>
            <ul>
              {upcomingEvents.map(event => (
                <li key={event.id} className="mb-2">
                  {event.title}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Notice Board */}
        <div className="w-1/2 pl-2">
          <div className="bg-green-200 rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-2 text-center">Notice Board</h2>
            <ul>
              {notices.map(notice => (
                <li key={notice._id} className="mb-4">
                  <h3 className="font-semibold mb-1">{notice.title}</h3>
                  <p className="mb-1">{notice.body}</p>
                  <p className="text-gray-500 text-sm text-right">
                    {moment(notice.createdAt).format('MMM D, YYYY, h:mm A')}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
    </Dashboard>
  );
};

export default StudentDashboard;











  // const [openPositions, setOpenPositions] = useState([
  //   {
  //     id: 1,
  //     title: "President for IT Society",
  //     description:
  //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis at cursus odio.",
  //   },
  //   {
  //     id: 2,
  //     title: "Vice President",
  //     description:
  //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis at cursus odio.",
  //   },
  //   {
  //     id: 3,
  //     title: "Programming Club Manager",
  //     description:
  //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis at cursus odio.",
  //   },
  //   {
  //     id: 4,
  //     title: "Programming Club Manager",
  //     description:
  //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis at cursus odio.",
  //   },
  //   // Add more open positions here
  // ]);




  // const [notices, setNotices] = useState([
  //   {
  //     id: 1,
  //     title: "Important Announcement 1",
  //     content:
  //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis at cursus odio.",
  //   },
  //   {
  //     id: 2,
  //     title: "Important Announcement 2",
  //     content:
  //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis at cursus odio.",
  //   },
  //   {
  //     id: 3,
  //     title: "Event Notification",
  //     content:
  //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis at cursus odio.",
  //   },
  //   // Add more notices here
  // ]);





  // const [applicants, setApplicants] = useState({
  //   President: [
  //     { id: 1, name: "John Doe", semester: "8th" },
  //     { id: 2, name: "Jane Smith", semester: "7th" },
  //     // Add more applicants for President position here
  //   ],
  //   "Vice President": [
  //     { id: 3, name: "Alex Johnson", semester: "6th" },
  //     { id: 4, name: "Sarah Lee", semester: "5th" },
  //     // Add more applicants for Vice President position here
  //   ],
  //   "Programming Club Manager": [
  //     { id: 5, name: "Michael Brown", semester: "7th" },
  //     { id: 6, name: "Emily Davis", semester: "6th" },
  //     // Add more applicants for Programming Club Manager position here
  //   ],
  //   // Add more applicants for other positions here
  // });

  // const [selectedPosition, setSelectedPosition] = useState(null);
  // const [selectedApplicant, setSelectedApplicant] = useState(null);
  // const [showForm, setShowForm] = useState(false);
  // const [formData, setFormData] = useState({
  //   fullName: "",
  //   studentID: "",
  //   email: "",
  //   phone: "",
  //   address: "",
  //   interests: "",
  //   reasonToApply: "",
  //   revolution: "",
  // });
  // const [showPaymentModal, setShowPaymentModal] = useState(false);
  // const [transactionNumber, setTransactionNumber] = useState("");

  // const handlePositionClick = (position) => {
  //   setSelectedPosition(position);
  //   setSelectedApplicant(null);
  // };

  // const handleVote = (applicantId) => {
  //   setSelectedApplicant(applicantId);
  // };

  // const handleApply = (positionId) => {
  //   setSelectedPosition(positionId);
  //   setShowForm(true);
  // };

  // const handleSubmitApplication = () => {
  //   // Handle form submission logic here (can be sending data to backend)
  //   setShowForm(false);
  //   setShowPaymentModal(true);
  // };

  // const handleSubmitPayment = () => {
  //   // Handle payment submission logic here (can be sending data to backend)
  //   setShowPaymentModal(false);
  //   // Reset form data here if needed
  //   setFormData({
  //     fullName: "",
  //     studentID: "",
  //     email: "",
  //     phone: "",
  //     address: "",
  //     interests: "",
  //     reasonToApply: "",
  //     revolution: "",
  //   });
  //   setTransactionNumber("");
  // };