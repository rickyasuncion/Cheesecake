import { React } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home></Home>}></Route> 
          <Route path="/home" element={<Home></Home>}></Route>
          <Route path="/login" element={<Login></Login>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
