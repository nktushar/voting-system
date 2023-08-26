export const yourApplicationLoader = async (user) => {
  const existingApplication = await fetch(
    `http://localhost:5000/api/v1/candidate/get-candidate/${user._id}`
  );

  return { existingApplication: await existingApplication.json() };
};
