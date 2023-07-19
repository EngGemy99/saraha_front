import { useRef } from "react";
import QRCode from "qrcode.react";
const Model = ({ modelId, qr = false }) => {
  const textRef = useRef(null);
  const handleCopy = () => {
    const text = textRef.current.innerText;
    navigator.clipboard.writeText(text);
  };
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : undefined;
  return (
    <div
      className="modal fade"
      id={modelId}
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content ">
          <div className="modal-header">
            <h1 className="modal-title fs-5 " id="exampleModalLabel">
              Profile Link
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body text-center">
            {qr ? (
              <QRCode value={`http://localhost:5173/user/${user?._id}`} />
            ) : (
              <span
                className="text-primary text-break"
                style={{
                  cursor: "pointer",
                }}
                ref={textRef}
                onClick={handleCopy}
              >
                {`http://localhost:5173/user/${user?._id}`}
                {/* {`${window.location.origin}/user/${user?._id}`} */}
              </span>
            )}
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Model;
