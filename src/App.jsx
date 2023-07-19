import Navbar from "./utils/Navbar/Navbar";
import Home from "./pages/Home/Home";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Messages from "./pages/Messages/Messages";
import User from "./pages/User/User";
import { useEffect } from "react";
import axios from "axios";

function App() {
  const apiKey = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const intervalId = setInterval(() => {
      console.log("work");
      axios
        .post(`${apiKey}/signIn`, {
          email: "ahmed@gmail.com",
          password: "055152325",
        })
        .then((res) => {
          console.log(res);
        });
    }, 600000); // 10 minutes in milliseconds

    return () => clearInterval(intervalId);
  }, []);
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/user/:id" element={<User />} />
        //! for not found page
        <Route path="*" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
