import Navbar from "./utils/Navbar/Navbar";
import Home from "./pages/Home/Home";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Messages from "./pages/Messages/Messages";
import User from "./pages/User/User";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/user/:id" element={<User />} />
        <Route path="*" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
