import Header from "./Components/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLogin from "./Components/AdminLogin";
import Home from "./Components/Home";
import Maps from "./Components/Maps";

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/maps/:id" element={<Maps />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
