export const positionLoader = async () => {
  const positionRes = await fetch(
    "http://localhost:5000/api/v1/position/get-position"
  );
  const position = await positionRes.json();

  const clubRes = await fetch("http://localhost:5000/api/v1/club/get-club");
  const club = await clubRes.json();

  return { position, club };
};

export const managePosition = async ({ request }) => {
  let formData = await request.formData();
  const intent = await formData.get("intent");
  const position = formData.get("title");
  const club = formData.get("club");
  const description = formData.get("description");
  const deadline = formData.get("deadline");
  const positionStatus = formData.get("positionStatus");
  const positionId = formData.get("positionId");

  // add
  if (intent === "add") {
    if (!position || !club || !description || !deadline || !positionStatus) {
      return {
        error: true,
        message: {
          message: "Please provide all the required fields",
        },
      };
    }
    const positionData = {
      position,
      club,
      description,
      deadline,
      positionStatus,
    };
    try {
      const position = await fetch(
        "http://localhost:5000/api/v1/position/post-position",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(positionData),
        }
      );
      const data = await position.json();
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
  }
  // update
  else if (intent === "update") {
    if (!position || !club || !description || !deadline || !positionStatus) {
      return {
        error: true,
        message: {
          message: "Please provide all the required fields",
        },
      };
    }

    const positionData = {
      position,
      club,
      description,
      deadline,
      positionStatus,
    };
    try {
      const position = await fetch(
        "http://localhost:5000/api/v1/position/update-position" + positionId,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(positionData),
        }
      );
      const data = await position.json();
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
  }
  // delete
  else if (intent === "delete") {
    if (!positionId) {
      return {
        error: true,
        message: {
          message: "Please provide all the required fields",
        },
      };
    }

    try {
      const position = await fetch(
        "http://localhost:5000/api/v1/position/delete-position/" + positionId,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await position.json();
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
  }
  // unhandled request
  else {
    return {
      data: {
        error: true,
        message: {
          message: "Unhandled request",
        },
      },
    };
  }
};
