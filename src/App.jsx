import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Sidebar from "./Components/Sidebar";
import Home from "./Pages/Home";
import Pricing from "./Pages/Pricing";
// import Resources from "./Pages/Resources";
// import Company from "./Pages/Company";
// import Product from "./Pages/Product";
import { Box } from "@mui/material";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Box sx={{ display: "flex", marginTop: "64px" }}>
        <Sidebar />
        <Box sx={{ flexGrow: 1, padding: 3 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pricing" element={<Pricing />} />
            {/* <Route path="/resources" element={<Resources />} />
            <Route path="/company" element={<Company />} />
            <Route path="/product" element={<Product />} /> */}
          </Routes>
        </Box>
      </Box>
    </Router>
  );
};

export default App;
