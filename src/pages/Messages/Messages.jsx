import { useEffect, useState } from "react";
import Model from "../../components/Model";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { convertTime } from "../../shearFunction/sheacr";
function Messages() {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : "";
  let pages = 0;
  const apiKey = import.meta.env.VITE_API_URL;

  const deleteMessage = (event, id) => {
    axios
      .delete(`${apiKey}/user`, {
        headers: { Authorization: `Bearer ${token}` },
        data: {
          id,
        },
      })
      .then((res) => {
        //? to delete it from ui first
        event.target.parentNode.parentNode.remove();
        toast.success(res.data.message, {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 1000,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      setLoading(true);
      console.count("running");
      axios
        .get(`${apiKey}/user?page=${page}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          pages = res.data.pages;
          setMessage([...message, ...res.data.data]);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [page]);

  const handleScroll = () => {
    const scrollTop = document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const scrollHeight = document.documentElement.scrollHeight;
    if (scrollTop + windowHeight + 5 >= scrollHeight) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <>
      <ToastContainer />
      <div className="container mt-5">
        <div className="card p-4 text-center">
          <div
            className="rounded-circle m-auto mb-3 overflow-hidden"
            style={{
              width: "120px",
              height: "120px",
            }}
          >
            <img src={user?.profilePic} className="w-100" alt="..." />
          </div>
          <h2 className="lead">{user?.name}</h2>
          <div className="d-flex justify-content-center gap-2 mt-3 flex-wrap">
            <button
              className="btn btn-outline-primary"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal1"
            >
              Share Profile
            </button>
            <button
              className="btn btn-outline-success "
              data-bs-toggle="modal"
              data-bs-target="#exampleModal2"
            >
              QR Code
            </button>
          </div>
        </div>
        <div className="card p-5 text-center mt-5">
          <h3 className="mb-3">Messages</h3>
          {message &&
            message.map((item) => {
              return (
                <div className="card text-center mb-3" key={item._id}>
                  <div className="card-body">
                    <p className="card-text"> {item.message}</p>
                    <button
                      className="btn btn-danger"
                      onClick={(e) => deleteMessage(e, item._id)}
                    >
                      Deleted
                    </button>
                  </div>
                  <div className="card-footer text-muted">
                    {item.createdAt ? convertTime(item.createdAt) : ""}
                  </div>
                </div>
              );
            })}
          {message.length === 0 && (
            <h2 className="lead text-secondary">
              No Message Shear Your Profile To Receive Message
            </h2>
          )}
          {loading && <div>Loading...</div>}
        </div>
      </div>
      <Model modelId="exampleModal1" />
      <Model modelId="exampleModal2" qr="qrtext" />
    </>
  );
}

export default Messages;
