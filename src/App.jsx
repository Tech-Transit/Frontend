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
			<Box sx={{ display: "flex", marginTop: 11 }}>
				<Box sx={{ flexGrow: 1 }}>
					<Routes>
						<Route path="/" element={<Home />} />
					</Routes>
				</Box>
			</Box>
		</Router>
	);
};

export default App;