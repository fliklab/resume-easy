import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import Home from "./pages/Home";
import { BlocksTestPage } from "./pages";
import { SampleResume } from "./pages";
import DefaultResume from "./pages/DefaultResume";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sample" element={<SampleResume />} />
        <Route path="/default" element={<DefaultResume />} />
        <Route path="/test-blocks" element={<BlocksTestPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
