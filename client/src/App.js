import { Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

import "./Style.scss";
import BoardComponent from "./view/board/Board.component";
import Login from "./view/login/Login";
import Register from "./view/login/Register";
import { UserContext } from "./view/UserContext";
import { useContext } from "react";
import OpenBoard from "./view/board/OpenBoard.component";
import {ToastContainer} from "react-toastify";

function App() {
  const { setUser } = useContext(UserContext);
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Login onDataReceived={setUser}/>}></Route>
        <Route path="/login" element={<Login onDataReceived={setUser}/>}></Route>
        <Route path="/register" element={<Register onDataReceived={setUser}/>}></Route>
        <Route path="/boards" element={<BoardComponent/>}></Route>
        <Route path="/boards/:id" element={<OpenBoard />} ></Route>
      </Routes>
      <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
        />
    </>
  );
}

export default App;
