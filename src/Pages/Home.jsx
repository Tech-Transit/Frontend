// import React, { useState, useEffect, useRef } from "react";
// import {
//   Box,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   Button,
//   CircularProgress,
//   Typography,
//   TextField,
// } from "@mui/material";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";
// import axios from "axios";

// // List of all ports, airports, and rail terminals (national and international)
// const facilities = [
//   // Indian Ports
//   { name: "Mundra Port", city: "Mundra", country: "India" },
//   { name: "Nhava Sheva (Jawaharlal Nehru Port)", city: "Navi Mumbai", country: "India" },
//   { name: "Port of Chennai", city: "Chennai", country: "India" },
//   { name: "Port of Visakhapatnam", city: "Visakhapatnam", country: "India" },
//   { name: "Deendayal Port Trust (Kandla)", city: "Kandla", country: "India" },
//   { name: "Paradip Port", city: "Paradip", country: "India" },
//   { name: "Haldia Dock Complex", city: "Haldia", country: "India" },
//   { name: "Kolkata Dock System", city: "Kolkata", country: "India" },
//   { name: "V.O. Chidambaranar Port Trust (Tuticorin)", city: "Tuticorin", country: "India" },
//   { name: "New Mangalore Port", city: "Mangalore", country: "India" },
//   { name: "Cochin Port", city: "Kochi", country: "India" },
//   { name: "Kamarajar Port (Ennore)", city: "Ennore", country: "India" },

//   // Indian Airports
//   { name: "Indira Gandhi International Airport (DEL)", city: "Delhi", country: "India" },
//   { name: "Chhatrapati Shivaji Maharaj International Airport (BOM)", city: "Mumbai", country: "India" },
//   { name: "Chennai International Airport (MAA)", city: "Chennai", country: "India" },
//   { name: "Kempegowda International Airport (BLR)", city: "Bangalore", country: "India" },
//   { name: "Rajiv Gandhi International Airport (HYD)", city: "Hyderabad", country: "India" },

//   // Indian Rail Terminals
//   { name: "Delhi Inland Container Depot", city: "Delhi", country: "India" },
//   { name: "Mumbai Goods Terminus", city: "Mumbai", country: "India" },
//   { name: "Chennai Central Freight Hub", city: "Chennai", country: "India" },

//   // International Ports (China)
//   { name: "Port of Shanghai", city: "Shanghai", country: "China" },
//   { name: "Port of Shenzhen", city: "Shenzhen", country: "China" },
//   { name: "Port of Ningbo-Zhoushan", city: "Ningbo-Zhoushan", country: "China" },

//   // International Airports (China)
//   { name: "Shanghai Pudong International Airport (PVG)", city: "Shanghai", country: "China" },
//   { name: "Beijing Capital International Airport (PEK)", city: "Beijing", country: "China" },

//   // International Rail Terminals (China)
//   { name: "Chengdu Railway Container Center Station", city: "Chengdu", country: "China" },
//   { name: "Manzhouli Railway Station", city: "Manzhouli", country: "China" },

//   // International Ports (Russia)
//   { name: "Port of Novorossiysk", city: "Novorossiysk", country: "Russia" },
//   { name: "Port of Saint Petersburg", city: "Saint Petersburg", country: "Russia" },

//   // International Airports (Russia)
//   { name: "Sheremetyevo International Airport (SVO)", city: "Moscow", country: "Russia" },
//   { name: "Domodedovo International Airport (DME)", city: "Moscow", country: "Russia" },

//   // International Rail Terminals (Russia)
//   { name: "Moscow-Tovarnaya-Kurskaya Railway Station", city: "Moscow", country: "Russia" },
//   { name: "Vladivostok-Tovarny Railway Station", city: "Vladivostok", country: "Russia" },

//   // International Ports (Finland)
//   { name: "Port of Helsinki", city: "Helsinki", country: "Finland" },

//   // International Airports (Finland)
//   { name: "Helsinki-Vantaa Airport (HEL)", city: "Helsinki", country: "Finland" },

//   // International Rail Terminals (Finland)
//   { name: "Helsinki Vuosaari Harbour Railway Yard", city: "Helsinki", country: "Finland" },

//   // International Ports (Greece)
//   { name: "Port of Piraeus", city: "Piraeus", country: "Greece" },

//   // International Airports (Greece)
//   { name: "Athens International Airport (ATH)", city: "Athens", country: "Greece" },
// ];

// // Transport modes
// const transportModes = ["Seaport", "Rail Terminal", "Airport"];

// // Shipment categories and weight limits
// const shipmentCategories = [
//   { name: "Airport (Air Cargo)", minWeight: 30, maxWeight: 100000 },
//   { name: "Seaport (Sea Freight)", minWeight: 1000, maxWeight: 30000 },
//   { name: "Railway (Rail Cargo)", minWeight: 10000, maxWeight: 120000 },
// ];

// const Home = () => {
//   const [source, setSource] = useState("");
//   const [destination, setDestination] = useState("");
//   const [mode, setMode] = useState("");
//   const [category, setCategory] = useState("");
//   const [weight, setWeight] = useState("");
//   const [routeData, setRouteData] = useState([]);
//   const [rankedRoutes, setRankedRoutes] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const mapRef = useRef(null);
//   const mapInstanceRef = useRef(null);

//   // Function to fetch coordinates dynamically
//   const fetchCoordinates = async () => {
//     try {
//       const response = await axios.post("http://127.0.0.1:5000/api/calculate_routes", {
//         source: source,
//         target: destination,
//         preferred_mode: mode,
//       });

//       if (response.data && response.data.length > 0) {
//         setRouteData(response.data);
//       }
//     } catch (error) {
//       setError("Error fetching coordinates");
//     }
//   };

//   // Function to fetch ranked routes
//   const fetchRankedRoutes = async () => {
//     try {
//       const response = await axios.post("http://127.0.0.1:5000/api/ranked_routes", {
//         source: source,
//         target: destination,
//         preferred_mode: mode,
//       });

//       if (response.data && response.data.length > 0) {
//         setRankedRoutes(response.data);
//       }
//     } catch (error) {
//       setError("Error fetching ranked routes");
//     }
//   };

//   // Function to calculate distance between two coordinates
//   const calculateDistance = (lat1, lon1, lat2, lon2) => {
//     const R = 6371e3; // metres
//     const φ1 = (lat1 * Math.PI) / 180; // φ, λ in radians
//     const φ2 = (lat2 * Math.PI) / 180;
//     const Δφ = ((lat2 - lat1) * Math.PI) / 180;
//     const Δλ = ((lon1 - lon2) * Math.PI) / 180;

//     const a =
//       Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
//       Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
//     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

//     const d = R * c; // in metres
//     return d;
//   };

//   // Effect to handle map updates
//   useEffect(() => {
//     if (!mapInstanceRef.current) {
//       mapInstanceRef.current = L.map(mapRef.current).setView([20.5937, 78.9629], 5);

//       L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
//         attribution: "&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors",
//       }).addTo(mapInstanceRef.current);
//     }

//     mapInstanceRef.current.eachLayer((layer) => {
//       if (layer instanceof L.Marker || layer instanceof L.Polyline) {
//         mapInstanceRef.current.removeLayer(layer);
//       }
//     });

//     routeData.forEach((route, routeIndex) => {
//       const latLngs = route.coordinates.map(([lat, lng]) => [lat, lng]);

//       latLngs.forEach(([lat, lng], index) => {
//         L.marker([lat, lng])
//           .addTo(mapInstanceRef.current)
//           .bindPopup(`Route ${routeIndex + 1} - Point ${index + 1}: ${lat}, ${lng}`);
//       });

//       for (let i = 0; i < latLngs.length - 1; i++) {
//         const [lat1, lng1] = latLngs[i];
//         const [lat2, lng2] = latLngs[i + 1];
//         const distance = calculateDistance(lat1, lng1, lat2, lng2);
//         const midPoint = [(lat1 + lat2) / 2, (lng1 + lng2) / 2];
//         L.polyline([latLngs[i], latLngs[i + 1]], { color: routeIndex === 0 ? "red" : "green", dashArray: "4 4" }).addTo(mapInstanceRef.current);
//         L.marker(midPoint, {
//           icon: L.divIcon({
//             className: "distance-marker",
//             html: `<span style="background-color: rgba(255, 255, 255, 0.8); padding: 2px 5px; border-radius: 5px;">${(distance / 1000).toFixed(2)} km</span>`,
//           }),
//         }).addTo(mapInstanceRef.current);
//       }
//     });

//     if (routeData.length > 0) {
//       const allLatLngs = routeData.flatMap((route) => route.coordinates.map(([lat, lng]) => [lat, lng]));
//       const bounds = L.latLngBounds(allLatLngs);
//       if (bounds.isValid()) {
//         mapInstanceRef.current.fitBounds(bounds);
//       }
//     }
//   }, [routeData]);

//   const findRoute = async () => {
//     if (!isFormValid()) {
//       alert("Please fill in all fields correctly.");
//       return;
//     }

//     setLoading(true);
//     setError(null);

//     try {
//       await fetchCoordinates();
//       await fetchRankedRoutes();
//       setLoading(false);
//     } catch (error) {
//       setLoading(false);
//       setError("Error fetching route data.");
//     }
//   };

//   const handleCategoryChange = (event) => {
//     setCategory(event.target.value);
//   };

//   const handleWeightChange = (event) => {
//     setWeight(event.target.value);
//   };

//   const isWeightValid = () => {
//     const selectedCategory = shipmentCategories.find((cat) => cat.name === category);
//     if (!selectedCategory) return false;
//     const weightValue = parseFloat(weight);
//     return weightValue >= selectedCategory.minWeight && weightValue <= selectedCategory.maxWeight;
//   };

//   const isFormValid = () => {
//     return source && destination && mode && category && isWeightValid();
//   };

//   return (
//     <Box sx={{ display: "flex", height: "100vh" }}>
//       {/* Left Section (Form) */}
//       <Box sx={{ flex: 4, padding: 3, borderRight: "1px solid #ccc", overflowY: "auto" }}>
//         <Typography variant="h5" gutterBottom>
//           Shipment Details
//         </Typography>

//         <FormControl variant="standard" fullWidth sx={{ mb: 2 }}>
//           <InputLabel>Category</InputLabel>
//           <Select value={category} onChange={handleCategoryChange}>
//             {shipmentCategories.map((cat) => (
//               <MenuItem key={cat.name} value={cat.name}>
//                 {cat.name}
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl>

//         <TextField
//           variant="standard"
//           fullWidth
//           label="Total Weight (kg)"
//           value={weight}
//           onChange={handleWeightChange}
//           type="number"
//           sx={{ mb: 8 }}
//           error={!isWeightValid()}
//           helperText={
//             !isWeightValid()
//               ? `Weight must be between ${shipmentCategories.find((cat) => cat.name === category)?.minWeight} kg and ${shipmentCategories.find((cat) => cat.name === category)?.maxWeight} kg`
//               : ""
//           }
//         />

//         <Typography variant="h5" gutterBottom>
//           Transport Route Finder
//         </Typography>

//         <FormControl variant="standard" fullWidth sx={{ mb: 2 }}>
//           <InputLabel>Source</InputLabel>
//           <Select value={source} onChange={(e) => setSource(e.target.value)}>
//             {facilities.map((facility) => (
//               <MenuItem key={facility.name} value={facility.name}>
//                 {facility.name} - {facility.country}
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl>

//         <FormControl variant="standard" fullWidth sx={{ mb: 2 }}>
//           <InputLabel>Destination</InputLabel>
//           <Select value={destination} onChange={(e) => setDestination(e.target.value)}>
//             {facilities.map((facility) => (
//               <MenuItem key={facility.name} value={facility.name}>
//                 {facility.name} - {facility.country}
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl>

//         <FormControl variant="standard" fullWidth sx={{ mb: 8 }}>
//           <InputLabel>Mode</InputLabel>
//           <Select value={mode} onChange={(e) => setMode(e.target.value)}>
//             {transportModes.map((modeOption) => (
//               <MenuItem key={modeOption} value={modeOption}>
//                 {modeOption}
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl>

//         <Button variant="contained" onClick={findRoute} sx={{ mt: 2, width: "100%" }}>
//           Find Route
//         </Button>

//         {loading && <CircularProgress sx={{ mt: 2 }} />}
//         {error && <Box sx={{ mt: 2, color: "red" }}>{error}</Box>}
//         {rankedRoutes.length > 0 && (
//           <Box sx={{ mt: 2 }}>
//             <Typography variant="h6">Ranked Routes:</Typography>
//             <ul>
//               {rankedRoutes.map((route, index) => (
//                 <li key={index}>{`Route ${index + 1}: ${route}`}</li>
//               ))}
//             </ul>
//           </Box>
//         )}
//       </Box>

//       {/* Right Section (Map) */}
//       <Box sx={{ flex: 6 }}>
//         <Box ref={mapRef} style={{ height: "100%", width: "100%" }} />
//       </Box>
//     </Box>
//   );
// };

// export default Home;

























// import React, { useState, useEffect, useRef } from "react";
// import {
//   Box,
//   FormControl,
//   InputLabel,
//   MenuItem,
//   Button,
//   CircularProgress,
//   Typography,
//   TextField,
//   Select,
//   OutlinedInput,
// } from "@mui/material";
// import { useTheme } from '@mui/material/styles';
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";
// import axios from "axios";
// import { motion } from 'framer-motion';

// // List of all ports, airports, and rail terminals (national and international)
// const facilities = [
//   // Indian Ports
//   { name: "Mundra Port", city: "Mundra", country: "India" },
//   { name: "Nhava Sheva (Jawaharlal Nehru Port)", city: "Navi Mumbai", country: "India" },
//   { name: "Port of Chennai", city: "Chennai", country: "India" },
//   { name: "Port of Visakhapatnam", city: "Visakhapatnam", country: "India" },
//   { name: "Deendayal Port Trust (Kandla)", city: "Kandla", country: "India" },
//   { name: "Paradip Port", city: "Paradip", country: "India" },
//   { name: "Haldia Dock Complex", city: "Haldia", country: "India" },
//   { name: "Kolkata Dock System", city: "Kolkata", country: "India" },
//   { name: "V.O. Chidambaranar Port Trust (Tuticorin)", city: "Tuticorin", country: "India" },
//   { name: "New Mangalore Port", city: "Mangalore", country: "India" },
//   { name: "Cochin Port", city: "Kochi", country: "India" },
//   { name: "Kamarajar Port (Ennore)", city: "Ennore", country: "India" },

//   // Indian Airports
//   { name: "Indira Gandhi International Airport (DEL)", city: "Delhi", country: "India" },
//   { name: "Chhatrapati Shivaji Maharaj International Airport (BOM)", city: "Mumbai", country: "India" },
//   { name: "Chennai International Airport (MAA)", city: "Chennai", country: "India" },
//   { name: "Kempegowda International Airport (BLR)", city: "Bangalore", country: "India" },
//   { name: "Rajiv Gandhi International Airport (HYD)", city: "Hyderabad", country: "India" },

//   // Indian Rail Terminals
//   { name: "Delhi Inland Container Depot", city: "Delhi", country: "India" },
//   { name: "Mumbai Goods Terminus", city: "Mumbai", country: "India" },
//   { name: "Chennai Central Freight Hub", city: "Chennai", country: "India" },

//   // International Ports (China)
//   { name: "Port of Shanghai", city: "Shanghai", country: "China" },
//   { name: "Port of Shenzhen", city: "Shenzhen", country: "China" },
//   { name: "Port of Ningbo-Zhoushan", city: "Ningbo-Zhoushan", country: "China" },

//   // International Airports (China)
//   { name: "Shanghai Pudong International Airport (PVG)", city: "Shanghai", country: "China" },
//   { name: "Beijing Capital International Airport (PEK)", city: "Beijing", country: "China" },

//   // International Rail Terminals (China)
//   { name: "Chengdu Railway Container Center Station", city: "Chengdu", country: "China" },
//   { name: "Manzhouli Railway Station", city: "Manzhouli", country: "China" },

//   // International Ports (Russia)
//   { name: "Port of Novorossiysk", city: "Novorossiysk", country: "Russia" },
//   { name: "Port of Saint Petersburg", city: "Saint Petersburg", country: "Russia" },

//   // International Airports (Russia)
//   { name: "Sheremetyevo International Airport (SVO)", city: "Moscow", country: "Russia" },
//   { name: "Domodedovo International Airport (DME)", city: "Moscow", country: "Russia" },

//   // International Rail Terminals (Russia)
//   { name: "Moscow-Tovarnaya-Kurskaya Railway Station", city: "Moscow", country: "Russia" },
//   { name: "Vladivostok-Tovarny Railway Station", city: "Vladivostok", country: "Russia" },

//   // International Ports (Finland)
//   { name: "Port of Helsinki", city: "Helsinki", country: "Finland" },

//   // International Airports (Finland)
//   { name: "Helsinki-Vantaa Airport (HEL)", city: "Helsinki", country: "Finland" },

//   // International Rail Terminals (Finland)
//   { name: "Helsinki Vuosaari Harbour Railway Yard", city: "Helsinki", country: "Finland" },

//   // International Ports (Greece)
//   { name: "Port of Piraeus", city: "Piraeus", country: "Greece" },

//   // International Airports (Greece)
//   { name: "Athens International Airport (ATH)", city: "Athens", country: "Greece" },
// ];

// // Transport modes
// const transportModes = ["Seaport", "Rail Terminal", "Airport"];

// // Shipment categories and weight limits
// const shipmentCategories = [
//   { name: "Airport (Air Cargo)", minWeight: 30, maxWeight: 100000 },
//   { name: "Seaport (Sea Freight)", minWeight: 1000, maxWeight: 30000 },
//   { name: "Railway (Rail Cargo)", minWeight: 10000, maxWeight: 120000 },
// ];

// const ITEM_HEIGHT = 48;
// const ITEM_PADDING_TOP = 8;
// const MenuProps = {
//   PaperProps: {
//     style: {
//       maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//       width: 250,
//     },
//   },
// };

// function getStyles(name, selectedValue, theme) {
//   return {
//     fontWeight: selectedValue.includes(name)
//       ? theme.typography.fontWeightMedium
//       : theme.typography.fontWeightRegular,
//   };
// }

// const Home = () => {
//   const theme = useTheme();
//   const [source, setSource] = useState([]);
//   const [destination, setDestination] = useState([]);
//   const [mode, setMode] = useState("");
//   const [category, setCategory] = useState([]);
//   const [weight, setWeight] = useState("");
//   const [routeData, setRouteData] = useState([]);
//   const [rankedRoutes, setRankedRoutes] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const mapRef = useRef(null);
//   const mapInstanceRef = useRef(null);

//   // Function to fetch coordinates dynamically
//   const fetchCoordinates = async () => {
//     try {
//       const response = await axios.post("http://127.0.0.1:5000/api/calculate_routes", {
//         source: source[0],
//         target: destination[0],
//         preferred_mode: mode,
//       }, {
//         headers: {
//           'Content-Type': 'application/json'
//         }
//       });

//       if (response.data && response.data.length > 0) {
//         setRouteData(response.data);
//       }
//     } catch (error) {
//       setError("Error fetching coordinates");
//     }
//   };

//   // Function to fetch ranked routes
//   const fetchRankedRoutes = async () => {
//     try {
//       const response = await axios.post("http://127.0.0.1:5000/api/ranked_routes", {
//         source: source[0],
//         target: destination[0],
//         preferred_mode: mode,
//       }, {
//         headers: {
//           'Content-Type': 'application/json'
//         }
//       });

//       if (response.data && response.data.length > 0) {
//         setRankedRoutes(response.data);
//       }
//     } catch (error) {
//       setError("Error fetching ranked routes");
//     }
//   };

//   // Function to calculate distance between two coordinates
//   const calculateDistance = (lat1, lon1, lat2, lon2) => {
//     const R = 6371e3; // metres
//     const φ1 = (lat1 * Math.PI) / 180; // φ, λ in radians
//     const φ2 = (lat2 * Math.PI) / 180;
//     const Δφ = ((lat2 - lat1) * Math.PI) / 180;
//     const Δλ = ((lon1 - lon2) * Math.PI) / 180;

//     const a =
//       Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
//       Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
//     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

//     const d = R * c; // in metres
//     return d;
//   };

//   // Effect to handle map updates
//   useEffect(() => {
//     if (!mapInstanceRef.current) {
//       mapInstanceRef.current = L.map(mapRef.current).setView([20.5937, 78.9629], 5);

//       L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
//         attribution: "&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors",
//       }).addTo(mapInstanceRef.current);
//     }

//     mapInstanceRef.current.eachLayer((layer) => {
//       if (layer instanceof L.Marker || layer instanceof L.Polyline) {
//         mapInstanceRef.current.removeLayer(layer);
//       }
//     });

//     routeData.forEach((route, routeIndex) => {
//       const latLngs = route.coordinates.map(([lat, lng]) => [lat, lng]);

//       latLngs.forEach(([lat, lng], index) => {
//         L.marker([lat, lng])
//           .addTo(mapInstanceRef.current)
//           .bindPopup(`Route ${routeIndex + 1} - Point ${index + 1}: ${lat}, ${lng}`);
//       });

//       for (let i = 0; i < latLngs.length - 1; i++) {
//         const [lat1, lng1] = latLngs[i];
//         const [lat2, lng2] = latLngs[i + 1];
//         const distance = calculateDistance(lat1, lng1, lat2, lng2);
//         const midPoint = [(lat1 + lat2) / 2, (lng1 + lng2) / 2];
//         L.polyline([latLngs[i], latLngs[i + 1]], { color: routeIndex === 0 ? "red" : "green", dashArray: "4 4" }).addTo(mapInstanceRef.current);
//         L.marker(midPoint, {
//           icon: L.divIcon({
//             className: "distance-marker",
//             html: `<span style="background-color: rgba(255, 255, 255, 0.8); padding: 2px 5px; border-radius: 5px;">${(distance / 1000).toFixed(2)} km</span>`,
//           }),
//         }).addTo(mapInstanceRef.current);
//       }
//     });

//     if (routeData.length > 0) {
//       const allLatLngs = routeData.flatMap((route) => route.coordinates.map(([lat, lng]) => [lat, lng]));
//       const bounds = L.latLngBounds(allLatLngs);
//       if (bounds.isValid()) {
//         mapInstanceRef.current.fitBounds(bounds);
//       }
//     }
//   }, [routeData]);

//   const findRoute = async () => {
//     if (!isFormValid()) {
//       alert("Please fill in all fields correctly.");
//       return;
//     }

//     setLoading(true);
//     setError(null);

//     try {
//       await fetchCoordinates();
//       await fetchRankedRoutes();
//       setLoading(false);
//     } catch (error) {
//       setLoading(false);
//       setError("Error fetching route data.");
//     }
//   };

//   const handleCategoryChange = (event) => {
//     const {
//       target: { value },
//     } = event;
//     setCategory(typeof value === 'string' ? value.split(',') : value);
//   };

//   const handleWeightChange = (event) => {
//     setWeight(event.target.value);
//   };

//   const handleSourceChange = (event) => {
//     const {
//       target: { value },
//     } = event;
//     setSource(typeof value === 'string' ? value.split(',') : value);
//   };

//   const handleDestinationChange = (event) => {
//     const {
//       target: { value },
//     } = event;
//     setDestination(typeof value === 'string' ? value.split(',') : value);
//   };

//   const isFormValid = () => {
//     return source.length > 0 && destination.length > 0 && mode && category.length > 0 && weight;
//   };

//   return (
//     <Box sx={{ display: "flex", height: "100vh", background: 'linear-gradient(90deg, hsla(236, 100%, 8%, 1) 0%, hsla(211, 100%, 28%, 1) 100%)', color: "white", fontFamily: "lato", overflow: "hidden" }}>
//       {/* Left Section (Form) */}
//       <Box sx={{ flex: 2, padding: 3, borderRight: "1px solid #ccc", overflowY: "auto" }}>
//         <Typography variant="h5" sx={{ fontWeight: 'bold', fontFamily: 'lato' }} gutterBottom>
//           Shipment Details
//         </Typography>

//         <FormControl variant="outlined" fullWidth sx={{ mb: 2 }}>
//           <InputLabel sx={{ color: "white", fontFamily: 'lato' }}>Category</InputLabel>
//           <Select
//             multiple
//             value={category}
//             onChange={handleCategoryChange}
//             input={
//               <OutlinedInput
//                 label="Category"
//                 sx={{
//                   '& .MuiOutlinedInput-notchedOutline': {
//                     borderColor: 'white',
//                   },
//                   '&:hover .MuiOutlinedInput-notchedOutline': {
//                     borderColor: 'white',
//                   },
//                   '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
//                     borderColor: 'white',
//                   },
//                   color: 'white',
//                 }}
//               />
//             }
//             MenuProps={MenuProps}
//             sx={{
//               color: "white",
//               '& .MuiOutlinedInput-root': {
//                 '& fieldset': {
//                   borderColor: 'white',
//                 },
//                 '&:hover fieldset': {
//                   borderColor: 'white',
//                 },
//                 '&.Mui-focused fieldset': {
//                   borderColor: 'white',
//                 },
//               },
//             }}
//           >
//             {shipmentCategories.map((cat) => (
//               <MenuItem key={cat.name} value={cat.name} style={getStyles(cat.name, category, theme)}>
//                 {cat.name}
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl>

//         <TextField
//           variant="outlined"
//           fullWidth
//           label="Total Weight (kg)"
//           value={weight}
//           onChange={handleWeightChange}
//           type="number"
//           sx={{ mb: 8 }}
//           InputLabelProps={{ style: { color: 'white' } }}
//           InputProps={{ style: { color: 'white' } }}
//         />

//         <Typography variant="h5" sx={{ fontWeight: 'bold', fontFamily: 'lato' }} gutterBottom>
//           Transport Route Finder
//         </Typography>

//         <FormControl variant="outlined" fullWidth sx={{ mb: 2, borderColor: "white" }}>
//           <InputLabel sx={{ color: "white" }}>Source</InputLabel>
//           <Select
//             multiple
//             value={source}
//             onChange={handleSourceChange}
//             input={<OutlinedInput label="Source" />}
//             MenuProps={MenuProps}
//             sx={{ color: "white", borderColor: "white" }}
//           >
//             {facilities.map((facility) => (
//               <MenuItem key={facility.name} value={facility.name} style={getStyles(facility.name, source, theme)}>
//                 {facility.name} - {facility.country}
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl>

//         <FormControl variant="outlined" fullWidth sx={{ mb: 2, borderColor: "white" }}>
//           <InputLabel sx={{ color: "white" }}>Destination</InputLabel>
//           <Select
//             multiple
//             value={destination}
//             onChange={handleDestinationChange}
//             input={<OutlinedInput label="Destination" />}
//             MenuProps={MenuProps}
//             sx={{ color: "white", borderColor: "white" }}
//           >
//             {facilities.map((facility) => (
//               <MenuItem key={facility.name} value={facility.name} style={getStyles(facility.name, destination, theme)}>
//                 {facility.name} - {facility.country}
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl>

//         <FormControl variant="outlined" fullWidth sx={{ mb: 4, borderColor: "white" }}>
//           <InputLabel sx={{ color: "white" }}>Mode</InputLabel>
//           <Select
//             value={mode}
//             onChange={(e) => setMode(e.target.value)}
//             input={<OutlinedInput label="Mode" />}
//             MenuProps={MenuProps}
//             sx={{ color: "white", borderColor: "white" }}
//           >
//             {transportModes.map((modeOption) => (
//               <MenuItem key={modeOption} value={modeOption}>
//                 {modeOption}
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl>

//         <motion.div
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//         >
//           <Button
//             variant="contained"
//             onClick={findRoute}
//             sx={{
//               mt: 2,
//               width: "100%",
//               backgroundColor: "white",
//               color: "black",
//               '&:hover': {
//                 backgroundColor: "#f0f0f0",
//               },
//             }}
//           >
//             Find Route
//           </Button>
//         </motion.div>

//         {loading && <CircularProgress sx={{ mt: 2 }} />}
//         {error && <Box sx={{ mt: 2, color: "red" }}>{error}</Box>}
//         {rankedRoutes.length > 0 && (
//           <Box sx={{ mt: 2 }}>
//             <Typography variant="h6">Ranked Routes:</Typography>
//             <ul>
//               {rankedRoutes.map((route, index) => (
//                 <li key={index}>{`Route ${index + 1}: ${route}`}</li>
//               ))}
//             </ul>
//           </Box>
//         )}
//       </Box>

//       {/* Right Section (Map) */}
//       <Box sx={{ flex: 8, overflow: "hidden" }}>
//         <Box ref={mapRef} style={{ height: "70%", width: "100%" }} />
//       </Box>
//     </Box>
//   );
// };

// export default Home;





import React, { useState, useEffect, useRef } from "react";
import {
	Box,
	FormControl,
	InputLabel,
	MenuItem,
	Button,
	CircularProgress,
	Typography,
	TextField,
	Select,
	OutlinedInput,
	Paper,
} from "@mui/material";
import { useTheme } from '@mui/material/styles';
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import { motion } from 'framer-motion';

// List of all ports, airports, and rail terminals (national and international)
const facilities = [
	// Indian Ports
	{ name: "Mundra Port", city: "Mundra", country: "India" },
	{ name: "Nhava Sheva (Jawaharlal Nehru Port)", city: "Navi Mumbai", country: "India" },
	{ name: "Port of Chennai", city: "Chennai", country: "India" },
	{ name: "Port of Visakhapatnam", city: "Visakhapatnam", country: "India" },
	{ name: "Deendayal Port Trust (Kandla)", city: "Kandla", country: "India" },
	{ name: "Paradip Port", city: "Paradip", country: "India" },
	{ name: "Haldia Dock Complex", city: "Haldia", country: "India" },
	{ name: "Kolkata Dock System", city: "Kolkata", country: "India" },
	{ name: "V.O. Chidambaranar Port Trust (Tuticorin)", city: "Tuticorin", country: "India" },
	{ name: "New Mangalore Port", city: "Mangalore", country: "India" },
	{ name: "Cochin Port", city: "Kochi", country: "India" },
	{ name: "Kamarajar Port (Ennore)", city: "Ennore", country: "India" },

	// Indian Airports
	{ name: "Indira Gandhi International Airport (DEL)", city: "Delhi", country: "India" },
	{ name: "Chhatrapati Shivaji Maharaj International Airport (BOM)", city: "Mumbai", country: "India" },
	{ name: "Chennai International Airport (MAA)", city: "Chennai", country: "India" },
	{ name: "Kempegowda International Airport (BLR)", city: "Bangalore", country: "India" },
	{ name: "Rajiv Gandhi International Airport (HYD)", city: "Hyderabad", country: "India" },

	// Indian Rail Terminals
	{ name: "Delhi Inland Container Depot", city: "Delhi", country: "India" },
	{ name: "Mumbai Goods Terminus", city: "Mumbai", country: "India" },
	{ name: "Chennai Central Freight Hub", city: "Chennai", country: "India" },

	// International Ports (China)
	{ name: "Port of Shanghai", city: "Shanghai", country: "China" },
	{ name: "Port of Shenzhen", city: "Shenzhen", country: "China" },
	{ name: "Port of Ningbo-Zhoushan", city: "Ningbo-Zhoushan", country: "China" },

	// International Airports (China)
	{ name: "Shanghai Pudong International Airport (PVG)", city: "Shanghai", country: "China" },
	{ name: "Beijing Capital International Airport (PEK)", city: "Beijing", country: "China" },

	// International Rail Terminals (China)
	{ name: "Chengdu Railway Container Center Station", city: "Chengdu", country: "China" },
	{ name: "Manzhouli Railway Station", city: "Manzhouli", country: "China" },

	// International Ports (Russia)
	{ name: "Port of Novorossiysk", city: "Novorossiysk", country: "Russia" },
	{ name: "Port of Saint Petersburg", city: "Saint Petersburg", country: "Russia" },

	// International Airports (Russia)
	{ name: "Sheremetyevo International Airport (SVO)", city: "Moscow", country: "Russia" },
	{ name: "Domodedovo International Airport (DME)", city: "Moscow", country: "Russia" },

	// International Rail Terminals (Russia)
	{ name: "Moscow-Tovarnaya-Kurskaya Railway Station", city: "Moscow", country: "Russia" },
	{ name: "Vladivostok-Tovarny Railway Station", city: "Vladivostok", country: "Russia" },

	// International Ports (Finland)
	{ name: "Port of Helsinki", city: "Helsinki", country: "Finland" },

	// International Airports (Finland)
	{ name: "Helsinki-Vantaa Airport (HEL)", city: "Helsinki", country: "Finland" },

	// International Rail Terminals (Finland)
	{ name: "Helsinki Vuosaari Harbour Railway Yard", city: "Helsinki", country: "Finland" },

	// International Ports (Greece)
	{ name: "Port of Piraeus", city: "Piraeus", country: "Greece" },

	// International Airports (Greece)
	{ name: "Athens International Airport (ATH)", city: "Athens", country: "Greece" },
];

// Transport modes
const transportModes = ["Seaport", "Rail Terminal", "Airport"];

// Shipment categories and weight limits
const shipmentCategories = [
	{ name: "Airport (Air Cargo)", minWeight: 30, maxWeight: 100000 },
	{ name: "Seaport (Sea Freight)", minWeight: 1000, maxWeight: 30000 },
	{ name: "Railway (Rail Cargo)", minWeight: 10000, maxWeight: 120000 },
];

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250,
		},
	},
};

function getStyles(name, selectedValue, theme) {
	return {
		fontWeight: selectedValue.includes(name)
			? theme.typography.fontWeightMedium
			: theme.typography.fontWeightRegular,
	};
}

const Home = () => {
	const theme = useTheme();
	const [source, setSource] = useState([]);
	const [destination, setDestination] = useState([]);
	const [mode, setMode] = useState("");
	const [category, setCategory] = useState([]);
	const [weight, setWeight] = useState("");
	const [routeData, setRouteData] = useState([]);
	const [rankedRoutes, setRankedRoutes] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const mapRef = useRef(null);
	const mapInstanceRef = useRef(null);

	// Function to fetch coordinates dynamically
	const fetchCoordinates = async () => {
		try {
			const response = await axios.post("http://127.0.0.1:5000/api/calculate_routes", {
				source: source[0],
				target: destination[0],
				preferred_mode: mode,
			}, {
				headers: {
					'Content-Type': 'application/json'
				}
			});

			if (response.data && response.data.length > 0) {
				setRouteData(response.data);
			}
		} catch (error) {
			setError("Error fetching coordinates");
		}
	};

	// Function to fetch ranked routes
	const fetchRankedRoutes = async () => {
		try {
			const response = await axios.post("http://127.0.0.1:5000/api/ranked_routes", {
				source: source[0],
				target: destination[0],
				preferred_mode: mode,
			}, {
				headers: {
					'Content-Type': 'application/json'
				}
			});

			if (response.data) {
				setRankedRoutes(response.data);
			}
		} catch (error) {
			setError("Error fetching ranked routes");
		}
	};

	// Function to calculate distance between two coordinates
	const calculateDistance = (lat1, lon1, lat2, lon2) => {
		const R = 6371e3; // metres
		const φ1 = (lat1 * Math.PI) / 180; // φ, λ in radians
		const φ2 = (lat2 * Math.PI) / 180;
		const Δφ = ((lat2 - lat1) * Math.PI) / 180;
		const Δλ = ((lon1 - lon2) * Math.PI) / 180;

		const a =
			Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
			Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
		const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

		const d = R * c; // in metres
		return d;
	};

	// Effect to handle map updates
	useEffect(() => {
		if (!mapInstanceRef.current) {
			mapInstanceRef.current = L.map(mapRef.current).setView([20.5937, 78.9629], 5);

			L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
				attribution: "&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors",
			}).addTo(mapInstanceRef.current);
		}

		mapInstanceRef.current.eachLayer((layer) => {
			if (layer instanceof L.Marker || layer instanceof L.Polyline) {
				mapInstanceRef.current.removeLayer(layer);
			}
		});

		routeData.forEach((route, routeIndex) => {
			const latLngs = route.coordinates.map(([lat, lng]) => [lat, lng]);

			latLngs.forEach(([lat, lng], index) => {
				L.marker([lat, lng])
					.addTo(mapInstanceRef.current)
					.bindPopup(`Route ${routeIndex + 1} - Point ${index + 1}: ${lat}, ${lng}`);
			});

			for (let i = 0; i < latLngs.length - 1; i++) {
				const [lat1, lng1] = latLngs[i];
				const [lat2, lng2] = latLngs[i + 1];
				const distance = calculateDistance(lat1, lng1, lat2, lng2);
				const midPoint = [(lat1 + lat2) / 2, (lng1 + lng2) / 2];
				L.polyline([latLngs[i], latLngs[i + 1]], { color: routeIndex === 0 ? "red" : "green", dashArray: "4 4" }).addTo(mapInstanceRef.current);
				L.marker(midPoint, {
					icon: L.divIcon({
						className: "distance-marker",
						html: `<span style="background-color: rgba(255, 255, 255, 0.8); color: 'black' ; padding: 2px 5px; border-radius: 5px;">${(distance / 1000).toFixed(2)} km</span>`,
					}),
				}).addTo(mapInstanceRef.current);
			}
		});

		if (routeData.length > 0) {
			const allLatLngs = routeData.flatMap((route) => route.coordinates.map(([lat, lng]) => [lat, lng]));
			const bounds = L.latLngBounds(allLatLngs);
			if (bounds.isValid()) {
				mapInstanceRef.current.fitBounds(bounds);
			}
		}
	}, [routeData]);

	const findRoute = async () => {
		if (!isFormValid()) {
			alert("Please fill in all fields correctly.");
			return;
		}

		setLoading(true);
		setError(null);

		try {
			await fetchCoordinates();
			await fetchRankedRoutes();
			setLoading(false);
		} catch (error) {
			setLoading(false);
			setError("Error fetching route data.");
		}
	};

	const handleCategoryChange = (event) => {
		const {
			target: { value },
		} = event;
		setCategory(typeof value === 'string' ? value.split(',') : value);
	};

	const handleWeightChange = (event) => {
		setWeight(event.target.value);
	};

	const handleSourceChange = (event) => {
		const {
			target: { value },
		} = event;
		setSource(typeof value === 'string' ? value.split(',') : value);
	};

	const handleDestinationChange = (event) => {
		const {
			target: { value },
		} = event;
		setDestination(typeof value === 'string' ? value.split(',') : value);
	};

	const isFormValid = () => {
		return source.length > 0 && destination.length > 0 && mode && category.length > 0 && weight;
	};

	return (
		<Box sx={{ display: "flex", height: "170vh", background: 'linear-gradient(90deg, hsla(236, 100%, 8%, 1) 0%, hsla(211, 100%, 28%, 1) 100%)', color: "white", fontFamily: "lato" }}>
			{/* Left Section (Form) */}
			<Box sx={{ flex: 2, padding: 3, borderRight: "1px solid #ccc" }}>
				<Typography variant="h5" sx={{ fontWeight: 'bold', fontFamily: 'lato', mb: 4 }} gutterBottom>
					Shipment Details
				</Typography>

				<FormControl variant="outlined" fullWidth sx={{ mb: 2 }}>
					<InputLabel sx={{ color: "white", fontFamily: 'lato' }}>Category</InputLabel>
					<Select
						multiple
						value={category}
						onChange={handleCategoryChange}
						input={
							<OutlinedInput
								label="Category"
								sx={{
									'& .MuiOutlinedInput-notchedOutline': {
										borderColor: 'white',
									},
									'&:hover .MuiOutlinedInput-notchedOutline': {
										borderColor: 'white',
									},
									'&.Mui-focused .MuiOutlinedInput-notchedOutline': {
										borderColor: 'white',
									},
									color: 'white',
								}}
							/>
						}
						MenuProps={MenuProps}
						sx={{
							color: "white",
							'& .MuiOutlinedInput-root': {
								'& fieldset': {
									borderColor: 'white',
								},
								'&:hover fieldset': {
									borderColor: 'white',
								},
								'&.Mui-focused fieldset': {
									borderColor: 'white',
								},
							},
						}}
					>
						{shipmentCategories.map((cat) => (
							<MenuItem key={cat.name} value={cat.name} style={getStyles(cat.name, category, theme)}>
								{cat.name}
							</MenuItem>
						))}
					</Select>
				</FormControl>

				<TextField
					variant="outlined"
					fullWidth
					label="Total Weight (kg)"
					value={weight}
					onChange={handleWeightChange}
					type="number"
					sx={{ mb: 8 }}
					InputLabelProps={{ style: { color: 'white' } }}
					InputProps={{ style: { color: 'white' } }}
				/>

				<Typography variant="h5" sx={{ fontWeight: 'bold', fontFamily: 'lato', mb: 4 }} gutterBottom>
					Transport Route Finder
				</Typography>

				<FormControl variant="outlined" fullWidth sx={{ mb: 2, borderColor: "white" }}>
					<InputLabel sx={{ color: "white" }}>Source</InputLabel>
					<Select
						multiple
						value={source}
						onChange={handleSourceChange}
						input={<OutlinedInput label="Source" />}
						MenuProps={MenuProps}
						sx={{ color: "white", borderColor: "white" }}
					>
						{facilities.map((facility) => (
							<MenuItem key={facility.name} value={facility.name} style={getStyles(facility.name, source, theme)}>
								{facility.name} - {facility.country}
							</MenuItem>
						))}
					</Select>
				</FormControl>

				<FormControl variant="outlined" fullWidth sx={{ mb: 2, borderColor: "white" }}>
					<InputLabel sx={{ color: "white" }}>Destination</InputLabel>
					<Select
						multiple
						value={destination}
						onChange={handleDestinationChange}
						input={<OutlinedInput label="Destination" />}
						MenuProps={MenuProps}
						sx={{ color: "white", borderColor: "white" }}
					>
						{facilities.map((facility) => (
							<MenuItem key={facility.name} value={facility.name} style={getStyles(facility.name, destination, theme)}>
								{facility.name} - {facility.country}
							</MenuItem>
						))}
					</Select>
				</FormControl>

				<FormControl variant="outlined" fullWidth sx={{ mb: 4, borderColor: "white" }}>
					<InputLabel sx={{ color: "white" }}>Mode</InputLabel>
					<Select
						value={mode}
						onChange={(e) => setMode(e.target.value)}
						input={<OutlinedInput label="Mode" />}
						MenuProps={MenuProps}
						sx={{ color: "white", borderColor: "white" }}
					>
						{transportModes.map((modeOption) => (
							<MenuItem key={modeOption} value={modeOption}>
								{modeOption}
							</MenuItem>
						))}
					</Select>
				</FormControl>

				<motion.div
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
				>
					<Button
						variant="contained"
						onClick={findRoute}
						sx={{
							mt: 2,
							width: "100%",
							backgroundColor: "white",
							color: "black",
							'&:hover': {
								backgroundColor: "#f0f0f0",
							},
						}}
					>
						Find Route
					</Button>
				</motion.div>

				{loading && <CircularProgress sx={{ mt: 2 }} />}
				{error && <Box sx={{ mt: 2, color: "red" }}>{error}</Box>}
			</Box>

			{/* Right Section (Map and Ranked Routes) */}
			<Box sx={{ flex: 8, display: "flex", flexDirection: "column" }}>
				<Box ref={mapRef} style={{ height: "60%", width: "100%" }} />

				{/* Ranked Routes */}
				<Paper sx={{ flex: 1, margin: 2, padding: 2, backgroundColor: "white", color: "black" }}>
					<Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 2 }}>Ranked Routes</Typography>
					{rankedRoutes.ranked_by_cost && rankedRoutes.ranked_by_cost.length > 0 && (
						<Box sx={{ marginBottom: 2 }}>
							<Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Ranked by Cost</Typography>
							{rankedRoutes.ranked_by_cost.map((route, index) => (
								<Paper key={index} sx={{ padding: 2, marginBottom: 2 }}>
									<Typography variant="body1"><strong>Rank:</strong> {route.rank}</Typography>
									<Typography variant="body1"><strong>Route:</strong> {route.route}</Typography>
									<Typography variant="body1"><strong>Total Carbon Emission:</strong> {route.total_carbon_emission}</Typography>
									<Typography variant="body1"><strong>Total Cost:</strong> ${route.total_cost.toFixed(2)}</Typography>
									<Typography variant="body1"><strong>Total Transit Time (hours):</strong> {route.total_transit_time_hours}</Typography>
								</Paper>
							))}
						</Box>
					)}
					{rankedRoutes.ranked_by_time && rankedRoutes.ranked_by_time.length > 0 && (
						<Box>
							<Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Ranked by Time</Typography>
							{rankedRoutes.ranked_by_time.map((route, index) => (
								<Paper key={index} sx={{ padding: 2, marginBottom: 2 }}>
									<Typography variant="body1"><strong>Rank:</strong> {route.rank}</Typography>
									<Typography variant="body1"><strong>Route:</strong> {route.route}</Typography>
									<Typography variant="body1"><strong>Total Carbon Emission:</strong> {route.total_carbon_emission}</Typography>
									<Typography variant="body1"><strong>Total Cost:</strong> ${route.total_cost.toFixed(2)}</Typography>
									<Typography variant="body1"><strong>Total Transit Time (hours):</strong> {route.total_transit_time_hours}</Typography>
								</Paper>
							))}
						</Box>
					)}
				</Paper>
			</Box>
		</Box>
	);
};

export default Home;