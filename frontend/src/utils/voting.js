export const votingLoader = async (token) => {
  // console.log("token", token);
  const clubsRes = await fetch("http://localhost:5000/api/v1/club/get-club");
  const positionsRes = await fetch(
    "http://localhost:5000/api/v1/position/get-position"
  );
  const candidatesRes = await fetch(
    "http://localhost:5000/api/v1/candidate/get-candidate"
  );
  const myVotesRes = await fetch("http://localhost:5000/api/v1/vote/my-vote", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  // console.log("myVotes", await myVotesRes.json());
  const myVotes = await myVotesRes.json();
  const positions = await positionsRes.json();
  const candidates = await candidatesRes.json();
  const clubs = await clubsRes.json();
  const data = clubs.club.map((club) => {
    const clubPositions = positions.position.filter(
      (position) => position.club._id === club._id
    );
    clubPositions.forEach((position) => {
      position.candidates = candidates.candidate.filter(
        (candidate) => candidate.position._id === position._id
      );
      position.myVote = myVotes.vote.find(
        (vote) => vote.position === position._id
      );
    });

    return {
      ...club,
      positions: clubPositions,
    };
  });
  return { data };
};

export const votingSubmit = async ({ request }) => {
  let formData = await request.formData();
  const candidate = formData.get("candidate");
  const position = formData.get("position");
  const token = formData.get("token");
  const data = {
    candidate,
    position,
  };
  // console.log("data", data);
  const myVotesRes = await fetch(
    "http://localhost:5000/api/v1/vote/post-vote",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }
  );
  const myVotes = await myVotesRes.json();
  return null;
};
