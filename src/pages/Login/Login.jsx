import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loader, setLoader] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      navigate("/messages");
    }
  });
  const navigate = useNavigate();

  const handleLogin = (e) => {
    setLoader(true);
    e.preventDefault();
    axios
      .post(`https://saraha-api-83ja.onrender.com/signIn`, { email, password })
      .then((response) => {
        let { token, message, user } = response.data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        setLoader(false);
        toast.success(`Success ${message} !`, {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 1000,
        });
        navigate("/messages");
      })
      .catch((error) => {
        setLoader(false);
        toast.error(` ${error.response.data.message} !`, {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 1000,
        });
      });
  };
  return (
    <>
      <ToastContainer />
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <div className="card">
              <div className="card-body p-4">
                <h3 className="text-center mb-4">Login</h3>
                <form>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email address
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      required
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      name="password"
                      required
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                    />
                  </div>

                  <div className="d-grid gap-2 mb-3">
                    {!loader ? (
                      <button
                        type="submit"
                        className="btn btn-primary"
                        onClick={handleLogin}
                      >
                        Login
                      </button>
                    ) : (
                      <button
                        className="btn btn-primary"
                        type="button"
                        disabled
                      >
                        <span
                          className="spinner-grow spinner-grow-sm"
                          role="status"
                          aria-hidden="true"
                        ></span>
                        Loading...
                      </button>
                    )}
                  </div>
                </form>
                <div className="text-center">
                  <span>I Forget My Password</span>
                </div>
                <div className="text-center mt-4">
                  <Link
                    to="/register"
                    type="submit"
                    className="btn btn-outline-primary"
                  >
                    Register
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
