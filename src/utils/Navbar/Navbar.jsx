import ModelLogin from "../../components/Model";
import { Link, useNavigate } from "react-router-dom";
function Navbar() {
  const navigate = useNavigate();
  //? come from local storage
  let token = localStorage.getItem("token") ? true : false;
  let user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : false;

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-primary shadow">
        <div className="container">
          <Link
            className="navbar-brand text-white"
            to={token ? "/messages" : "/login"}
          >
            Saraha
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto d-flex flex-row align-items-center justify-content-center">
              {!token ? (
                <>
                  <li className="nav-item mx-2">
                    <Link
                      className="btn btn-success mx-3 rounded-3"
                      to="/login"
                    >
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="btn btn-secondary text-white rounded-3"
                      to="/register"
                    >
                      Register
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item ">
                    <span className=" rounded-3 text-white">{user?.name}</span>
                  </li>
                  <li className="nav-item mx-3">
                    <button
                      className="btn btn-danger rounded-3 text-white"
                      onClick={logout}
                    >
                      Logout
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
      <ModelLogin id="exampleModal" />
    </div>
  );
}

export default Navbar;
