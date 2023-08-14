import React, { useState } from 'react';

const VotingPage = () => {
  const clubs = [
    {
      name: "Presidential Body",
      positions: ["President", "Vice President", "General Secretary", "Treasurer"],
    },
    {
      name: "Programming Club",
      positions: ["Manager", "Assistant Manager", "Deputy Manager", "Additional Manager"],
    },
    {
      name: "Robotics Club",
      positions: ["Manager", "Assistant Manager", "Deputy Manager", "Additional Manager"],
    },
    // Add more clubs with positions here
  ];

  const [selectedClub, setSelectedClub] = useState(null);
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [votedCandidates, setVotedCandidates] = useState({});

  const handleClubClick = (clubIndex) => {
    setSelectedClub(clubIndex);
    setSelectedPosition(null);
  };

  const handlePositionClick = (positionIndex) => {
    setSelectedPosition(positionIndex);
  };

  const handleVote = (candidate) => {
    if (selectedClub !== null && selectedPosition !== null) {
      const position = clubs[selectedClub].positions[selectedPosition];
      setVotedCandidates((prevVotes) => ({
        ...prevVotes,
        [position]: candidate,
      }));
    }
  };

  return (
    <div className="container mx-auto mt-8 px-4">
      <h1 className="text-2xl font-bold mb-4">Voting System</h1>

      <div className="grid grid-cols-3 gap-4">
        {/* Club List */}
        <div>
          <h2 className="text-xl font-bold mb-4">Clubs</h2>
          <ul className="list-none">
            {clubs.map((club, index) => (
              <li
                key={index}
                className={`cursor-pointer mb-2 ${selectedClub === index ? 'font-semibold' : ''}`}
                onClick={() => handleClubClick(index)}
              >
                {club.name}
              </li>
            ))}
          </ul>
        </div>

        {/* Position List */}
        {selectedClub !== null && (
          <div>
            <h2 className="text-xl font-bold mb-4">Positions for {clubs[selectedClub].name}</h2>
            <ul className="list-none">
              {clubs[selectedClub].positions.map((position, index) => (
                <li
                  key={index}
                  className={`cursor-pointer mb-2 ${selectedPosition === index ? 'font-semibold' : ''}`}
                  onClick={() => handlePositionClick(index)}
                >
                  {position}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Candidate List */}
        {selectedPosition !== null && (
          <div>
            <h2 className="text-xl font-bold mb-4">
              Candidates for {clubs[selectedClub].positions[selectedPosition]}
            </h2>
            <ul className="list-none">
              {/* Add candidate names here */}
              <li>
                Candidate A{" "}
                <button
                  onClick={() => handleVote("Candidate A")}
                  className={`ml-2 ${
                    votedCandidates[clubs[selectedClub].positions[selectedPosition]] === "Candidate A"
                      ? 'bg-green-500 text-white'
                      : 'bg-blue-500 text-white hover:bg-blue-600'
                  } py-1 px-2 rounded-md`}
                >
                  {votedCandidates[clubs[selectedClub].positions[selectedPosition]] === "Candidate A"
                    ? 'Voted'
                    : 'Vote'}
                </button>
              </li>
              <li>
                Candidate B{" "}
                <button
                  onClick={() => handleVote("Candidate B")}
                  className={`ml-2 ${
                    votedCandidates[clubs[selectedClub].positions[selectedPosition]] === "Candidate B"
                      ? 'bg-green-500 text-white'
                      : 'bg-blue-500 text-white hover:bg-blue-600'
                  } py-1 px-2 rounded-md`}
                >
                  {votedCandidates[clubs[selectedClub].positions[selectedPosition]] === "Candidate B"
                    ? 'Voted'
                    : 'Vote'}
                </button>
              </li>
              <li>
                Candidate C{" "}
                <button
                  onClick={() => handleVote("Candidate C")}
                  className={`ml-2 ${
                    votedCandidates[clubs[selectedClub].positions[selectedPosition]] === "Candidate C"
                      ? 'bg-green-500 text-white'
                      : 'bg-blue-500 text-white hover:bg-blue-600'
                  } py-1 px-2 rounded-md`}
                >
                  {votedCandidates[clubs[selectedClub].positions[selectedPosition]] === "Candidate C"
                    ? 'Voted'
                    : 'Vote'}
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default VotingPage;
