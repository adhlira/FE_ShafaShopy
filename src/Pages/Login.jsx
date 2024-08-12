import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:4000/login", {
        username,
        password,
      });
      console.log(response);

      if (response.status === 200) {
        // Simpan data user di localStorage
        localStorage.setItem("user", JSON.stringify(response.data.user));
        alert("Succesfully Login!");
        navigate("/app/dashboard");
      } else {
        setMessage("Login failed: " + response.data.message);
      }
    } catch (error) {
      setMessage("Error: " + error.response?.data?.message || "There is An error");
    }
  };

  return (
    <div className="container mx-auto w-1/2 bg-blue-300 border items-center mt-10 rounded-lg shadow-lg">
      <div className="grid grid-cols-2 gap-7 mt-5">
        <div className="w-full h-auto mb-5 rounded-lg border-black ml-5">
          <img src="src/assets/sign_in2.jpg" alt="" className="rounded-lg" />
        </div>
        <div className="w-full mt-14">
          <h1 className="text-center font-bold text-2xl">Sign In</h1>
          <h2 className="text-center text-xl mt-2">Welcome to Shafashopy</h2>
          <form onSubmit={handleSubmit} className="p-6">
            <div className="mb-4 mt-5">
              <label className="block text-gray-700 md:text-sm text-base font-bold mb-2" htmlFor="username">
                Username
              </label>
              <input
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                id="username"
                type="text"
                name="username"
                placeholder="Input username"
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="mb-4 mt-5">
              <label className="block text-gray-700 md:text-sm text-base font-bold mb-2" htmlFor="name">
                Password
              </label>
              <div className="relative">
                <input
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Input password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button type="button" onClick={togglePasswordVisibility} className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-500 focus:outline-none">
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2.166 10.11C3.83 6.55 6.97 4 10 4c3.03 0 6.17 2.55 7.833 6.11a1.5 1.5 0 010 1.78C16.17 13.45 13.03 16 10 16c-3.03 0-6.17-2.55-7.833-6.11a1.5 1.5 0 010-1.78zM10 6a6.002 6.002 0 00-5.884 5.26C5.335 11.422 7.49 13 10 13c2.51 0 4.665-1.578 5.884-3.74A6.002 6.002 0 0010 6zm0 2a2 2 0 110 4 2 2 0 010-4z" />
                      <path d="M10 8a2 2 0 100 4 2 2 0 000-4zm0 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10 3a7 7 0 100 14 7 7 0 000-14zM10 1a9 9 0 110 18A9 9 0 0110 1z" />
                      <path d="M14.828 5.172a4 4 0 010 5.656 1 1 0 01-1.414-1.414 2 2 0 000-2.828 1 1 0 111.414-1.414zM5.172 5.172a4 4 0 015.656 0 1 1 0 11-1.414 1.414 2 2 0 00-2.828 0 1 1 0 11-1.414-1.414z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-lg">
              Sign In
            </button>
            <button type="button" className="w-full p-2 border rounded-lg mt-2">
              Create An Account
            </button>
          </form>
          {message && <p className="text-red-500">{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default Login;
