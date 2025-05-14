import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import Home from "./pages/Home";
import { BlocksTestPage } from "./pages";
import { SampleResume } from "./pages";

const App = () => {
  return (
    <BrowserRouter>
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sample" element={<SampleResume />} />
          <Route path="/test-blocks" element={<BlocksTestPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
