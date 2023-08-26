import React, { Suspense, useEffect, useRef } from "react";
import AdminDashboard from "../../components/layouts/AdminDashboard";
import { Await, Form, useLoaderData } from "react-router-dom";
import Spinner from "../../components/common/spinner";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useAuth } from "../../context/AuthProvider";

const Candidates = () => {
  const { user } = useAuth();
  const { candidatesLoader } = useLoaderData();
  const tableRef = useRef();

  return (
    <AdminDashboard>
      <Suspense fallback={<Spinner />}>
        <Await
          resolve={candidatesLoader()}
          errorElement={<p>Something went wrong!</p>}
          children={(data) => {
            console.log("resolveData: ", data);

            const clubs = data.data;
            console.log("clubs ", clubs);
            const [selectedClub, setSelectedClub] = useState(null);
            const [paymentMethod, setPaymentMethod] = useState(null);

            const handleClubClick = (e) => {
              setSelectedClub(e.target.value);
            };
            const formRef = useRef();

            useEffect(() => {
              if (!tableRef.current) return;

              const table = new DataTable("#example", {
                dom: "Bfrtip",
                buttons: ["copy", "csv", "excel", "pdf", "print"],
              });

              () => {
                return table.destroy();
              };
            }, []);

            let [isOpen, setIsOpen] = useState(false);

            function closeModal() {
              setIsOpen(false);
            }

            function openModal() {
              setIsOpen(true);
            }

            return (
              <>
                <table
                  id="example"
                  className="display nowrap"
                  style={{ width: "100%" }}
                  ref={tableRef}
                >
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>StudentId</th>
                      <th>Phone</th>
                      <th>Pay_Method</th>
                      <th>TransactionId</th>
                      <th>PaymentStatus</th>
                      <th>ApplicationStatus</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.candidates.candidate.map((candidate) => {
                      return (
                        <tr key={candidate._id}>
                          <td className="flex items-center">
                            <img
                              src={candidate.profilePicture}
                              className="w-10 h-10 object-cover object-center rounded-full border-2 border-blue-400 mr-2"
                            />
                            <span>{candidate.fullName}</span>
                          </td>
                          <td>{candidate.studentId}</td>
                          <td>{candidate.phone}</td>
                          <td>{candidate.paymentMethod}</td>
                          <td>{candidate.transactionId}</td>
                          <td>{candidate.paymentStatus}</td>
                          <td>{candidate.status}</td>
                          <td>
                            <button
                              type="button"
                              className="bg-blue-200 px-2 py-1 rounded-md hover:bg-blue-300 font-semibold text-sm"
                              onClick={openModal}
                            >
                              Edit
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                  <tfoot>
                    <tr>
                      <th>Name</th>
                      <th>StudentId</th>
                      <th>Phone</th>
                      <th>Pay_Method</th>
                      <th>TransactionId</th>
                      <th>PaymentStatus</th>
                      <th>ApplicationStatus</th>
                      <th>Action</th>
                    </tr>
                  </tfoot>
                </table>

                {/* Modal */}
                <>
                  <Transition appear show={isOpen} as={Fragment}>
                    <Dialog
                      as="div"
                      className="relative z-50"
                      onClose={closeModal}
                    >
                      <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                      </Transition.Child>

                      <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                          <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                          >
                            <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                              <Dialog.Title
                                as="h3"
                                className="text-lg font-medium leading-6 text-gray-900"
                              >
                                Candidate Details Edit
                              </Dialog.Title>
                              <Form
                                method="post"
                                ref={formRef}
                                preventScrollReset={true}
                                className="mt-4"
                                encType="multipart/form-data"
                              >
                                <div className="mb-4">
                                  <label className="block text-sm font-medium text-gray-700 mt-3">
                                    Full Name
                                  </label>
                                  <input
                                    type="text"
                                    name="fullName"
                                    className="border border-gray-300 rounded-lg px-4 py-2 w-full"
                                    placeholder="Enter your full name"
                                  />

                                  <label className="block text-sm font-medium text-gray-700 mt-3">
                                    Student Id
                                  </label>
                                  <input
                                    type="text"
                                    name="studentId"
                                    className="border border-gray-300 rounded-lg px-4 py-2 w-full"
                                    placeholder="Enter your student id"
                                  />

                                  <label className="block text-sm font-medium text-gray-700 mt-3">
                                    Email
                                  </label>
                                  <input
                                    type="email"
                                    name="email"
                                    className="border border-gray-300 rounded-lg px-4 py-2 w-full"
                                    placeholder="Enter your email"
                                  />

                                  <label className="block text-sm font-medium text-gray-700 mt-3">
                                    Mobile Number
                                  </label>
                                  <input
                                    type="text"
                                    name="phone"
                                    className="border border-gray-300 rounded-lg px-4 py-2 w-full"
                                    placeholder="Enter your mobile number"
                                  />

                                  <label className="block text-sm font-medium text-gray-700 mt-3">
                                    Present Address
                                  </label>
                                  <input
                                    type="text"
                                    name="address"
                                    className="border border-gray-300 rounded-lg px-4 py-2 w-full"
                                    placeholder="Enter your mobile number"
                                  />

                                  <br />
                                  <br />

                                  <label className="block text-sm font-medium text-gray-700 mt-3">
                                    Select Club
                                  </label>
                                  <select
                                    className="border border-gray-300 rounded-lg px-4 py-2 w-full"
                                    onChange={handleClubClick}
                                  >
                                    <option value="">Choose...</option>
                                    {clubs.map((club) => (
                                      <option key={club._id} value={club._id}>
                                        {club.heading}
                                      </option>
                                    ))}
                                  </select>

                                  <label className="block text-sm font-medium text-gray-700 mt-3">
                                    Select Position
                                  </label>
                                  <select
                                    name="position"
                                    className="border border-gray-300 rounded-lg px-4 py-2 w-full"
                                  >
                                    <option value="">Choose...</option>
                                    {clubs
                                      ?.find(
                                        (item) => item._id === selectedClub
                                      )
                                      ?.positions.map((position) => (
                                        <option
                                          key={position._id}
                                          value={position._id}
                                        >
                                          {position.position}
                                        </option>
                                      ))}
                                  </select>

                                  <label className="block text-sm font-medium text-gray-700 mt-3">
                                    Your Image
                                  </label>
                                  <input
                                    type="file"
                                    name="image"
                                    className="border border-gray-300 rounded-lg px-4 py-2 w-full"
                                  />

                                  <br />
                                  <br />
                                  <label className="block text-sm font-medium text-gray-700 mt-3">
                                    Payment Method
                                  </label>
                                  <select
                                    name="paymentMethod"
                                    className="border border-gray-300 rounded-lg px-4 py-2 w-full"
                                    onChange={(e) =>
                                      setPaymentMethod(e.target.value)
                                    }
                                  >
                                    <option value="">Choose...</option>
                                    <option value="bkash">Bkash</option>
                                    <option value="rocket">Rocket</option>
                                    <option value="nagad">Nagad</option>
                                    <option value="cash">Cash</option>
                                  </select>

                                  {paymentMethod != "cash" &&
                                    paymentMethod != "" && (
                                      <>
                                        <label className="block text-sm font-medium text-gray-700 mt-3">
                                          Transaction Id
                                        </label>
                                        <input
                                          type="text"
                                          // hidden={paymentMethod === "cash"}
                                          name="transactionId"
                                          className="border border-gray-300 rounded-lg px-4 py-2 w-full"
                                          placeholder="Enter your transaction id"
                                        />
                                      </>
                                    )}

                                  <input
                                    type="hidden"
                                    name="user"
                                    value={user.user._id}
                                  ></input>

                                  <button
                                    type="submit"
                                    className="bg-blue-500 text-white py-2 px-3 mt-3 rounded-md hover:bg-blue-600"
                                  >
                                    Apply
                                  </button>
                                </div>
                              </Form>

                              <div className="mt-4">
                                <button
                                  type="button"
                                  className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                  onClick={closeModal}
                                >
                                  Got it, thanks!
                                </button>
                              </div>
                            </Dialog.Panel>
                          </Transition.Child>
                        </div>
                      </div>
                    </Dialog>
                  </Transition>
                </>
              </>
            );
          }}
        />
      </Suspense>
    </AdminDashboard>
  );
};

export default Candidates;
