export const noticeLoader = async () => {
  const noticeRes = await fetch(
    "http://localhost:5000/api/v1/notice/get-notice"
  );
  const notice = await noticeRes.json();
  return { notice };
};

export const postNotice = async ({ request }) => {
  let formData = await request.formData();
  const intend = await formData.get("intend");
  const title = formData.get("title");
  const body = formData.get("body");
  const noticeId = formData.get("noticeId");

  // add
  if (intend === "add") {
    if (!title || !body) {
      return {
        error: true,
        message: {
          message: "Please provide all the required fields",
        },
      };
    }
    const noticeData = { title, body };
    try {
      const notice = await fetch(
        "http://localhost:5000/api/v1/notice/post-notice",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(noticeData),
        }
      );
      const data = await notice.json();
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
  else if (intend === "update") {
    if (!title || !body || !noticeId) {
      return {
        error: true,
        message: {
          message: "Please provide all the required fields",
        },
      };
    }

    const noticeData = { title, body };
    try {
      const notice = await fetch(
        "http://localhost:5000/api/v1/notice/update-notice/" + noticeId,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(noticeData),
        }
      );
      const data = await notice.json();
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
  else if (intend === "delete") {
    if (!noticeId) {
      return {
        error: true,
        message: {
          message: "Please provide all the required fields",
        },
      };
    }

    try {
      const notice = await fetch(
        "http://localhost:5000/api/v1/notice/delete-notice/" + noticeId,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await notice.json();
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
