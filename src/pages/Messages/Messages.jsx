import { useEffect, useState } from "react";
import Model from "../../components/Model";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
function Messages() {
  const [userData, setUserData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : "";

  const time = (date) => {
    const now = new Date(date);
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const amOrPm = hours >= 12 ? "PM" : "AM";
    const hour = hours % 12 || 12;
    const timeString = `${hour}:${
      minutes < 10 ? "0" + minutes : minutes
    } ${amOrPm}`;
    return timeString;
  };
  const deleteMessage = (event, id) => {
    axios
      .delete("https://saraha-api-83ja.onrender.com/user", {
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
      console.count("how many this run");
      axios
        .get(`https://saraha-api-83ja.onrender.com/user?page=${page}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          console.log("page number ", page);
          setUserData((prevData) => {
            let all = [...prevData, ...res.data.data];
            const uniqueArr = all.filter((item, index) => {
              return (
                index ===
                all.findIndex((obj) => {
                  return JSON.stringify(obj) === JSON.stringify(item);
                })
              );
            });
            return uniqueArr;
          });
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [page]);

  function handleScroll() {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      // At the bottom of the page
      if (!loading) {
        setPage((prevPage) => prevPage + 1);
      }
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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
          {userData &&
            userData.map((item) => {
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
                    {item.createdAt ? time(item.createdAt) : ""}
                  </div>
                </div>
              );
            })}
          {userData.length === 0 && (
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
