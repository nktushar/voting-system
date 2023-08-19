export const getUserData = (token) => {
  console.log("token", token);
  return new Promise((resolve) => {
    const user = window.localStorage.getItem("user");
    resolve(user);
  });
};

export const studentLogin = async ({ request }) => {
  let formData = await request.formData();
  const studentId = formData.get("studentId");
  const password = formData.get("password");
  if (!studentId || !password) {
    return {
      error: true,
      message: {
        message: "Please provide all the required fields",
      },
    };
  }
  const loginData = { studentId, password };
  try {
    const user = await fetch("http://localhost:5000/api/v1/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    });
    const data = await user.json();
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

export const studentRegister = async ({ request }) => {
  let formData = await request.formData();
  const fullName = formData.get("fullName");
  const email = formData.get("email");
  const studentId = formData.get("studentId");
  const password = formData.get("password");
  if (!studentId || !password || !fullName || !email) {
    return {
      error: true,
      message: {
        message: "Please provide all the required fields",
      },
    };
  }
  const registerData = { studentId, password, fullName, email };
  try {
    const user = await fetch("http://localhost:5000/api/v1/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registerData),
    });
    const data = await user.json();
    return { data };
  } catch (error) {
    return {
      data: {
        error: true,
        message: {
          message: "Something went wrong. Please try again later",
        },
      },
    };
  }
};
