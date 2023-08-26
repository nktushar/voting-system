import React, { Suspense, useEffect, useRef, useState } from "react";
import { Await, Form, useActionData, useLoaderData } from "react-router-dom";
import Dashboard from "../../components/layouts/Dashboard";
import { useAuth } from "../../context/AuthProvider";
import Spinner from "../../components/common/spinner";

const Position = () => {
  const { positionApplyLoader } = useLoaderData();
  const { user } = useAuth();
  return (
    <Dashboard>
      <Suspense fallback={<Spinner />}>
        <Await
          resolve={positionApplyLoader(user.user)}
          errorElement={<p>Something went wrong!</p>}
          children={(data) => {
            console.log("resolveData: ", data);
            const actionData = useActionData();

            const clubs = data.data;
            console.log("clubs ", clubs);
            const [selectedClub, setSelectedClub] = useState(null);
            const [paymentMethod, setPaymentMethod] = useState(null);

            const handleClubClick = (e) => {
              setSelectedClub(e.target.value);
            };
            const formRef = useRef();

            useEffect(() => {
              if (actionData?.data?.message) {
                formRef?.current?.reset();
              }
            }, [actionData]);

            return (
              <div className="container mx-auto mt-8 px-4">
                <h1 className="text-2xl font-bold mb-12 text-center">
                  Apply for Executive Position
                </h1>

                {/* Application Form*/}
                <div className="mt-8">
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
                  {!data.existingApplication.candidate ? (
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
                            ?.find((item) => item._id === selectedClub)
                            ?.positions.map((position) => (
                              <option key={position._id} value={position._id}>
                                {position.position}
                              </option>
                            ))}
                        </select>

                        <label className="block text-sm font-medium text-gray-700 mt-3">
                          Why do you want to apply for this position?
                        </label>
                        <textarea
                          name="reasonToApply"
                          className="border border-gray-300 rounded-lg px-4 py-2 w-full"
                          rows="5"
                        ></textarea>

                        <label className="block text-sm font-medium text-gray-700 mt-3">
                          What revolutionary changes do you want to bring in
                          this club?
                        </label>
                        <textarea
                          name="revolutionGoal"
                          className="border border-gray-300 rounded-lg px-4 py-2 w-full"
                          rows="5"
                        ></textarea>

                        <label className="block text-sm font-medium text-gray-700 mt-3">
                          Your Interests
                        </label>
                        <textarea
                          name="interests"
                          className="border border-gray-300 rounded-lg px-4 py-2 w-full"
                          rows="5"
                        ></textarea>

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
                          onChange={(e) => setPaymentMethod(e.target.value)}
                        >
                          <option value="">Choose...</option>
                          <option value="bkash">Bkash</option>
                          <option value="rocket">Rocket</option>
                          <option value="nagad">Nagad</option>
                          <option value="cash">Cash</option>
                        </select>

                        {paymentMethod != "cash" && paymentMethod != "" && (
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
                  ) : (
                    <div>
                      <p className="text-red-500 text-sm">
                        You have already applied for a position
                      </p>
                    </div>
                  )}
                </div>
              </div>
            );
          }}
        />
      </Suspense>
    </Dashboard>
  );
};

export default Position;
