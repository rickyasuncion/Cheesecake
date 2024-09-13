import { React } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import { AuthContextProvider } from "./_utils/auth-context";

function App() {
  return (
    <AuthContextProvider>
    <BrowserRouter>
      <Routes>
        <Route index element={<Home></Home>}></Route>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/home" element={<Home></Home>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="*" element={<NotFound></NotFound>}></Route>
      </Routes>
    </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App;
