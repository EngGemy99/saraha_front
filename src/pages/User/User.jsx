import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

function User() {
  const { id: receivedId } = useParams();
  const [data, setData] = useState("");
  const [message, setMessage] = useState("");
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    axios
      .get(`https://saraha-api-83ja.onrender.com/user/${receivedId}`)
      .then((res) => {
        console.log(res);
        setData(res.data.user);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [receivedId]);

  const handleSendMessage = () => {
    setLoader(true);
    axios
      .post(`https://saraha-api-83ja.onrender.com/addMessage`, {
        message,
        receivedId,
      })
      .then((res) => {
        toast.success(res.data.message, {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 1000,
        });
        setMessage("");
        setLoader(false);
      })
      .catch((error) => {
        setLoader(false);
        console.log(error);
      });
  };
  return (
    <>
      <ToastContainer />
      <div className="container mt-5">
        <div className="card p-5 text-center">
          <div
            className="rounded-circle m-auto mb-3 overflow-hidden"
            style={{
              width: "120px",
              height: "120px",
            }}
          >
            <img src={data?.profilePic} className="w-100" alt="..." />
          </div>
          <h2 className="lead">{data.name}</h2>
          <div className="mb-3">
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
              name="message"
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter Your Message"
              value={message}
            ></textarea>
          </div>
          <div className="mb-3">
            {!loader ? (
              <button className="btn btn-primary" onClick={handleSendMessage}>
                Send
              </button>
            ) : (
              <button className="btn btn-primary" type="button" disabled>
                <span
                  className="spinner-grow spinner-grow-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
                Loading...
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default User;
