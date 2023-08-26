import React, { Suspense, useState } from "react";
import { Await, Form, useLoaderData, useSubmit } from "react-router-dom";
import Dashboard from "../../components/layouts/Dashboard";
import { useAuth } from "../../context/AuthProvider";
import Spinner from "../../components/common/spinner";

const VotingPage = () => {
  const { votingLoader } = useLoaderData();
  console.log("votingLoader :", votingLoader);
  // const actionData = useActionData();
  const { user } = useAuth();

  return (
    <Dashboard>
      <Suspense fallback={<Spinner />}>
        <Await
          resolve={votingLoader(user.token)}
          errorElement={<p>Something went wrong!</p>}
          children={(data) => {
            const clubs = data.data;
            console.log("clubs ", clubs);
            const [selectedClub, setSelectedClub] = useState(null);
            const [selectedPosition, setSelectedPosition] = useState(null);
            const [votedCandidates, setVotedCandidates] = useState({});

            const handleClubClick = (club) => {
              setSelectedClub(club);
              setSelectedPosition(null);
            };

            const handlePositionClick = (position) => {
              setSelectedPosition(position);
            };

            const submit = useSubmit();
            return (
              <div className="container mx-auto mt-8 px-4">
                <h1 className="text-2xl font-bold mb-12 text-center">
                  Voting System
                </h1>

                <div className="grid grid-cols-3 gap-4">
                  {/* Club List */}
                  <div>
                    <h2 className="text-xl font-bold mb-4">Clubs</h2>
                    <ul className="list-none">
                      {clubs.map((club) => (
                        <li
                          key={club._id}
                          className={`cursor-pointer mb-2 ${
                            selectedClub?._id === club._id
                              ? "font-semibold"
                              : ""
                          }`}
                          onClick={() => handleClubClick(club)}
                        >
                          {club.heading}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Position List */}
                  {selectedClub !== null && (
                    <div>
                      <h2 className="text-xl font-bold mb-4">
                        Positions for {selectedClub?.heading}
                      </h2>
                      <ul className="list-none">
                        {selectedClub?.positions.map((position) => (
                          <li
                            key={position._id}
                            className={`cursor-pointer mb-2 ${
                              selectedPosition?._id === position._id
                                ? "font-semibold"
                                : ""
                            }`}
                            onClick={() => handlePositionClick(position)}
                          >
                            {position.position}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Candidate List */}
                  {selectedPosition !== null && (
                    <div>
                      <h2 className="text-xl font-bold mb-4">
                        Candidates for {selectedPosition?.position}
                      </h2>
                      <ul className="list-none">
                        {selectedPosition?.candidates.map((candidate) => (
                          <li
                            key={candidate._id}
                            className="flex items-center gap-4"
                          >
                            {candidate.fullName}
                            <Form
                              method="post"
                              onSubmit={(event) => {
                                setSelectedPosition(null);
                                setSelectedClub(null);
                                submit(event.currentTarget);
                              }}
                            >
                              <input
                                type="hidden"
                                name="candidate"
                                value={candidate._id}
                              />
                              <input
                                type="hidden"
                                name="position"
                                value={selectedPosition._id}
                              />
                              <input
                                type="hidden"
                                name="token"
                                value={user.token}
                              />
                              <button
                                type="submit"
                                className={`ml-2 ${
                                  selectedPosition.myVote?.candidate ===
                                  candidate._id
                                    ? "bg-green-500 text-white"
                                    : "bg-blue-500 text-white hover:bg-blue-600"
                                } py-1 px-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed`}
                                disabled={selectedPosition.myVote?.voter}
                              >
                                {selectedPosition.myVote?.candidate ===
                                candidate._id
                                  ? "Voted"
                                  : "Vote"}
                              </button>
                            </Form>
                          </li>
                        ))}
                      </ul>
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

export default VotingPage;
