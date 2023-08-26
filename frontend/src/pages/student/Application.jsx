import React, { Suspense, useState } from "react";
import { Await, Form, useLoaderData, useSubmit } from "react-router-dom";
import Dashboard from "../../components/layouts/Dashboard";
import { useAuth } from "../../context/AuthProvider";
import Spinner from "../../components/common/spinner";

const Application = () => {
  const { yourApplicationLoader } = useLoaderData();
  const { user } = useAuth();
  return (
    <Dashboard>
      <Suspense fallback={<Spinner />}>
        <Await
          resolve={yourApplicationLoader(user.user)}
          errorElement={<p>Something went wrong!</p>}
          children={(data) => {
            console.log("resolveData: ", data);

            return (
              <div className="container mx-auto mt-8 px-4">
                <h1 className="text-2xl font-bold mb-12 text-center">
                  See your application
                </h1>

                {/* Application Form*/}
                <div className="mt-8">
                  {!data.existingApplication.candidate ? (
                    <div>You didnt apply for any position yet</div>
                  ) : (
                    <div>
                      <h2>
                        Hey {data.existingApplication.candidate.fullName} !!
                      </h2>
                      <h3>
                        You have applied for{" "}
                        <span className="font-bold">
                          {data.existingApplication.candidate.position.position}
                        </span>{" "}
                        position
                      </h3>
                      {data.existingApplication.candidate.paymentMethod ===
                      "cash" ? (
                        <h3>
                          Your{" "}
                          {data.existingApplication.candidate.paymentMethod}{" "}
                          payment is{" "}
                          {data.existingApplication.candidate.paymentStatus}
                        </h3>
                      ) : (
                        <h3>
                          Your{" "}
                          <span className="font-bold">
                            {data.existingApplication.candidate.paymentMethod}
                          </span>{" "}
                          payment is{" "}
                          <span className="font-bold">
                            {data.existingApplication.candidate.paymentStatus}
                          </span>
                          and your transaction id is{" "}
                          <span className="font-bold">
                            {data.existingApplication.candidate.transactionId}
                          </span>
                        </h3>
                      )}
                      <h3>
                        Your application status is{" "}
                        <span className="font-bold">
                          {data.existingApplication.candidate.status}
                        </span>
                      </h3>
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

export default Application;
