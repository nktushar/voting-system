import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassowrd] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/register", { name, studentId, email, password })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="bg-blue-950 bg-opacity-75">
      <div className="flex items-center justify-center h-screen">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
            
          <h2 className="text-2xl font-bold text-center mb-4 text-blue-950">REGISTER</h2>
          <img src="./images/iits.png
            " alt="" className="mx-auto w-24 mb-8"/>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="text-sm font-medium">
                Name
              </label>
              <input
                id="name"
                type="text"
                className="w-full border-gray-300 rounded-md ring-1 focus:ring-blue-500 focus:border-blue-500"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="student-id" className="text-sm font-medium">
                Student ID
              </label>
              <input
                id="student-id"
                type="text"
                className="w-full ring-1 border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                onChange={(e) => setStudentId(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <input
                id="email"
                type="email"
                className="w-full border-gray-300 rounded-md ring-1 focus:ring-blue-500 focus:border-blue-500"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <input
                id="password"
                type="password"
                className="w-full border-gray-300 rounded-md ring-1 focus:ring-blue-500 focus:border-blue-500"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {/* <div>
              <label htmlFor="confirm-password" className="text-sm font-medium">
                Confirm Password
              </label>
              <input
                id="confirm-password"
                type="password"
                className="w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                onChange={(e) => setConfirmPassowrd(e.target.value)}
              />
            </div> */}
            <button
              type="submit"
              className="w-full bg-blue-950 text-white py-2 px-4 rounded-md
              hover:bg-blue-900 "
            >
              Signup
            </button>
          </form>

          <div className="flex items-center justify-center mt-4">
            <p className="text-sm">Already have an account?</p>
            <Link to="/login" className="text-blue-500 ml-2">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
