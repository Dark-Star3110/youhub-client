import { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import Contact from "./components/Contact";
import Explore from "./components/Explore";
import Home from "./components/Home";
import Library from "./components/Library";
import Navbar from "./components/Navbar";
import Subscriptions from "./components/Subscriptions";
import TopBar from "./components/TopBar";
import { NavContext } from "./contexts/NavContext";

import "./styles/App.scss";

function App() {
  // context
  const { action } = useContext(NavContext);

  return (
    <div className="container">
      <Navbar />
      <div className={`App ${action}`}>
        <TopBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/subscriptions" element={<Subscriptions />} />
          <Route path="/library" element={<Library />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
