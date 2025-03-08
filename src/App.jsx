import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import Pricing from "./Pages/Pricing";
import { Box } from "@mui/material";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Box sx={{ display: "flex", marginTop: "64px" }}>
        <Box sx={{ flexGrow: 1, padding: 3 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pricing" element={<Pricing />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
};

export default App;