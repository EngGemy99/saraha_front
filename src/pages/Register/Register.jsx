import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState(0);
  const [imagePath, setImagePath] = useState(null);
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token) {
      console.log("message");
      navigate("/messages");
    }
  });
  const handleSubmit = (e) => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("age", age);
    formData.append("imagePath", imagePath);
    e.preventDefault();
    setLoader(true);
    axios
      .post(`https://saraha-api-83ja.onrender.com/signup`, formData)
      .then((response) => {
        console.log(response);
        let { message } = response.data;
        setLoader(false);
        toast.success(message, {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 1000,
        });
        navigate("/login");
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
                <h3 className="text-center mb-4">Register</h3>
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                  <div className="mb-3">
                    <input
                      type="file"
                      className="form-control"
                      id="image"
                      name="imagePath"
                      required
                      onChange={(e) => {
                        setImagePath(e.target.files[0]);
                      }}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      required
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                    />
                  </div>
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
                  <div className="mb-3">
                    <label htmlFor="age" className="form-label">
                      age
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="age"
                      name="age"
                      required
                      onChange={(e) => {
                        setAge(e.target.value);
                      }}
                    />
                  </div>
                  <div className="d-grid gap-2 mb-3">
                    {!loader ? (
                      <button type="submit" className="btn btn-primary">
                        Register
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
                  <span>
                    Already have an account? <Link to="/login">Login</Link>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
