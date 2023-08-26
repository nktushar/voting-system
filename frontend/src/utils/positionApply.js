export const positionApplyLoader = async (user) => {
  console.log("user", user);
  // console.log("token", token);
  const clubsRes = await fetch("http://localhost:5000/api/v1/club/get-club");
  const positionsRes = await fetch(
    "http://localhost:5000/api/v1/position/get-position"
  );
  const existingApplication = await fetch(
    `http://localhost:5000/api/v1/candidate/get-candidate/${user._id}`
  );

  const positions = await positionsRes.json();

  const clubs = await clubsRes.json();
  const data = clubs.club.map((club) => {
    const clubPositions = positions.position.filter(
      (position) => position.club._id === club._id
    );

    return {
      ...club,
      positions: clubPositions,
    };
  });
  return { data, existingApplication: await existingApplication.json() };
};

export const positionApply = async ({ request }) => {
  let formData = await request.formData();
  const user = formData.get("user");
  const fullName = await formData.get("fullName");
  const studentId = formData.get("studentId");
  const email = formData.get("email");
  const phone = formData.get("phone");
  const address = formData.get("address");
  const position = formData.get("position");
  const reasonToApply = formData.get("reasonToApply");
  const revolutionGoal = formData.get("revolutionGoal");
  const interests = formData.get("interests");
  const paymentMethod = formData.get("paymentMethod");
  const transactionId = formData.get("transactionId");
  const image = formData.get("image");
  // console.log("image", image);

  if (
    !user ||
    !fullName ||
    !studentId ||
    !email ||
    !phone ||
    !address ||
    !position ||
    !reasonToApply ||
    !revolutionGoal ||
    !interests ||
    !paymentMethod ||
    !image
  ) {
    return {
      error: true,
      message: {
        message: "Please provide all the required fields",
      },
    };
  }

  try {
    const imageFormData = new FormData();
    imageFormData.append("file", image);
    imageFormData.append("upload_preset", "ml_default");
    imageFormData.append("api_key", 672981666184864);
    const imageUploadRes = await fetch(
      "https://api.cloudinary.com/v1_1/ddvnlkhym/image/upload",
      {
        method: "post",
        body: imageFormData,
      }
    );

    const cloudinaryImage = await imageUploadRes.json();

    const candidateData = {
      user,
      fullName,
      studentId,
      email,
      phone,
      address,
      position,
      reasonToApply,
      revolutionGoal,
      interests,
      paymentMethod,
      transactionId,
      paymentStatus: paymentMethod === "cash" ? "unpaid" : "paid",
      profilePicture: cloudinaryImage.url,
    };
    const candidate = await fetch(
      "http://localhost:5000/api/v1/candidate/post-candidate",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(candidateData),
      }
    );
    const data = await candidate.json();
    return { data };
  } catch (error) {
    if (error.error) return { data: error };
    return {
      data: {
        error: true,
        message: {
          message: "Something went wrong",
        },
      },
    };
  }
};
