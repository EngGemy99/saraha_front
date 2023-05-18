import { useEffect } from "react";
import ModelLogin from "../../components/Model";
import { Link, useNavigate } from "react-router-dom";

function Home() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  useEffect(() => {
    if (token) {
      navigate("/messages");
    }
  });
  return (
    <div className="container text-center mt-5">
      <h3 className="lead mb-5">
        Sarhah allows you to receive constructive feedback from your friends and
        co-works
      </h3>
      <div className="d-flex flex-column align-items-center">
        <Link
          className="btn btn-outline-primary w-25 mb-5 rounded-3"
          to="/login"
        >
          Login
        </Link>
        <Link className="btn btn-outline-primary w-25 rounded-3" to="/register">
          Register
        </Link>
      </div>

      <ModelLogin id="exampleModal" />
    </div>
  );
}

export default Home;
