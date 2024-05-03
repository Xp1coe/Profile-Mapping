import Header from "./Components/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLogin from "./Components/AdminLogin";
import Home from "./Components/Home";
import Maps from "./Components/Maps";
import Info from "./Components/Info";

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/maps/:id" element={<Maps />} />
          <Route path="/info/:id" element={<Info />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
