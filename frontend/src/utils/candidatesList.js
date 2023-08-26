export const candidatesLoader = async () => {
  const clubsRes = await fetch("http://localhost:5000/api/v1/club/get-club");
  const positionsRes = await fetch(
    "http://localhost:5000/api/v1/position/get-position"
  );
  const candidatesRes = await fetch(
    "http://localhost:5000/api/v1/candidate/get-candidate"
  );

  const clubs = await clubsRes.json();
  const positions = await positionsRes.json();
  const candidates = await candidatesRes.json();

  const data = clubs.club.map((club) => {
    const clubPositions = positions.position.filter(
      (position) => position.club._id === club._id
    );

    return {
      ...club,
      positions: clubPositions,
    };
  });

  return { data, candidates };
};
