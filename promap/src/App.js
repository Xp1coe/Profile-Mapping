import Header from "./Components/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLogin from "./Components/AdminLogin";

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/admin" element={<AdminLogin />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
