// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Navbar from "./Components/Navbar";
// import Sidebar from "./Components/Sidebar";
// import Home from "./Pages/Home";
// import Pricing from "./Pages/Pricing";
// // import Resources from "./Pages/Resources";
// // import Company from "./Pages/Company";
// // import Product from "./Pages/Product";
// import { Box } from "@mui/material";
// import MapComponent from "./Components/MapComponent";


// const App = () => {
//   const coordinatesData = [
//     {
//       coordinates: [
//         [22.74, 69.7],
//         [28.5562, 77.1],
//         [40.0725, 116.5975],
//         [49.5937, 117.4333],
//         [55.4088, 37.9063],
//         [37.9364, 23.9445],
//         [37.95, 23.63],
//       ],
//       total_distance: 13234.5,
//     },
//   ];
//   return (
//     <Router>
//       <Navbar />
//       <Box sx={{ display: "flex", marginTop: "64px" }}>
//         <Sidebar />
//         <MapComponent coordinatesData={coordinatesData} />
//         <Box sx={{ flexGrow: 1, padding: 3 }}>
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/pricing" element={<Pricing />} />
//             {/* <Route path="/resources" element={<Resources />} />
//             <Route path="/company" element={<Company />} />
//             <Route path="/product" element={<Product />} /> */}
//           </Routes>
//         </Box>
//       </Box>
//     </Router>
//   );
// };

// export default App;



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
import MapComponent from "./Components/MapComponent";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Box sx={{ display: "flex", marginTop: "64px" }}>
        <Sidebar />
        {/* The MapComponent now takes care of fetching coordinates data */}
        <MapComponent />
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
