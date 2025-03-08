// import React, { useState } from "react";
// import { Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, Collapse, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
// import { LocalShipping, Map, Info, Inventory, Directions } from "@mui/icons-material";
// import { Link } from "react-router-dom";

// const Sidebar = () => {
//     const [openFindRoute, setOpenFindRoute] = useState(false);
//     const [source, setSource] = useState("");
//     const [destination, setDestination] = useState("");

//     return (
//         <Drawer
//             variant="permanent"
//             sx={{
//                 width: 550,
//                 flexShrink: 0,
//                 [`& .MuiDrawer-paper`]: { width: 550, marginTop: "64px" }, // Pushes it below navbar
//             }}
//         >
//             <Toolbar /> {/* Keeps sidebar content below navbar */}
//             <List>
//                 <ListItem button component={Link} to="/">
//                     <ListItemIcon><Map /></ListItemIcon>
//                     <ListItemText primary="Track Shipment" />
//                 </ListItem>
//                 <ListItem button component={Link} to="/route-details">
//                     <ListItemIcon><LocalShipping /></ListItemIcon>
//                     <ListItemText primary="Route Details" />
//                 </ListItem>
//                 <ListItem button component={Link} to="/transport-modes">
//                     <ListItemIcon><Inventory /></ListItemIcon>
//                     <ListItemText primary="Transport Modes" />
//                 </ListItem>
//                 <ListItem button component={Link} to="/info">
//                     <ListItemIcon><Info /></ListItemIcon>
//                     <ListItemText primary="Weather & Info" />
//                 </ListItem>

//                 {/* Find Route Expandable Section */}
//                 <ListItem button onClick={() => setOpenFindRoute(!openFindRoute)}>
//                     <ListItemIcon><Directions /></ListItemIcon>
//                     <ListItemText primary="Find Route" />
//                 </ListItem>
//                 <Collapse in={openFindRoute} timeout="auto" unmountOnExit>
//                     <List component="div" disablePadding sx={{ paddingLeft: 4, paddingRight: 4 }}>
//                         <FormControl fullWidth sx={{ marginTop: 1 }}>
//                             <InputLabel>Source</InputLabel>
//                             <Select value={source} onChange={(e) => setSource(e.target.value)}>
//                                 <MenuItem value="New York">New York</MenuItem>
//                                 <MenuItem value="Los Angeles">Los Angeles</MenuItem>
//                                 <MenuItem value="Chicago">Chicago</MenuItem>
//                             </Select>
//                         </FormControl>
//                         <FormControl fullWidth sx={{ marginTop: 2 }}>
//                             <InputLabel>Destination</InputLabel>
//                             <Select value={destination} onChange={(e) => setDestination(e.target.value)}>
//                                 <MenuItem value="Houston">Houston</MenuItem>
//                                 <MenuItem value="Miami">Miami</MenuItem>
//                                 <MenuItem value="San Francisco">San Francisco</MenuItem>
//                             </Select>
//                         </FormControl>
//                     </List>
//                 </Collapse>
//             </List>
//         </Drawer>
//     );
// };

// export default Sidebar;



// import React, { useState } from "react";
// import {
//     Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, Box, FormControl, InputLabel, Select, MenuItem, Collapse, Button, CircularProgress
// } from "@mui/material";
// import { LocalShipping, Map, Info, Directions } from "@mui/icons-material";
// import { Link } from "react-router-dom";

// // List of all ports, airports, and rail terminals
// const facilities = [
//     // Indian Ports
//     { name: "Mundra Port", city: "Mundra", country: "India" },
//     { name: "Nhava Sheva (Jawaharlal Nehru Port)", city: "Navi Mumbai", country: "India" },
//     { name: "Port of Chennai", city: "Chennai", country: "India" },
//     { name: "Port of Visakhapatnam", city: "Visakhapatnam", country: "India" },
//     { name: "Deendayal Port Trust (Kandla)", city: "Kandla", country: "India" },
//     { name: "Paradip Port", city: "Paradip", country: "India" },
//     { name: "Haldia Dock Complex", city: "Haldia", country: "India" },
//     { name: "Kolkata Dock System", city: "Kolkata", country: "India" },
//     { name: "V.O. Chidambaranar Port Trust (Tuticorin)", city: "Tuticorin", country: "India" },
//     { name: "New Mangalore Port", city: "Mangalore", country: "India" },
//     { name: "Cochin Port", city: "Kochi", country: "India" },
//     { name: "Kamarajar Port (Ennore)", city: "Ennore", country: "India" },

//     // Indian Airports
//     { name: "Indira Gandhi International Airport (DEL)", city: "Delhi", country: "India" },
//     { name: "Chhatrapati Shivaji Maharaj International Airport (BOM)", city: "Mumbai", country: "India" },
//     { name: "Chennai International Airport (MAA)", city: "Chennai", country: "India" },
//     { name: "Kempegowda International Airport (BLR)", city: "Bangalore", country: "India" },
//     { name: "Rajiv Gandhi International Airport (HYD)", city: "Hyderabad", country: "India" },

//     // Indian Rail Terminals
//     { name: "Delhi Inland Container Depot", city: "Delhi", country: "India" },
//     { name: "Mumbai Goods Terminus", city: "Mumbai", country: "India" },
//     { name: "Chennai Central Freight Hub", city: "Chennai", country: "India" },

//     // International Ports (China)
//     { name: "Port of Shanghai", city: "Shanghai", country: "China" },
//     { name: "Port of Shenzhen", city: "Shenzhen", country: "China" },
//     { name: "Port of Ningbo-Zhoushan", city: "Ningbo-Zhoushan", country: "China" },

//     // International Airports (China)
//     { name: "Shanghai Pudong International Airport (PVG)", city: "Shanghai", country: "China" },
//     { name: "Beijing Capital International Airport (PEK)", city: "Beijing", country: "China" },

//     // International Rail Terminals (China)
//     { name: "Chengdu Railway Container Center Station", city: "Chengdu", country: "China" },
//     { name: "Manzhouli Railway Station", city: "Manzhouli", country: "China" },

//     // International Ports (Russia)
//     { name: "Port of Novorossiysk", city: "Novorossiysk", country: "Russia" },
//     { name: "Port of Saint Petersburg", city: "Saint Petersburg", country: "Russia" },

//     // International Airports (Russia)
//     { name: "Sheremetyevo International Airport (SVO)", city: "Moscow", country: "Russia" },
//     { name: "Domodedovo International Airport (DME)", city: "Moscow", country: "Russia" },

//     // International Rail Terminals (Russia)
//     { name: "Moscow-Tovarnaya-Kurskaya Railway Station", city: "Moscow", country: "Russia" },
//     { name: "Vladivostok-Tovarny Railway Station", city: "Vladivostok", country: "Russia" },

//     // International Ports (Finland)
//     { name: "Port of Helsinki", city: "Helsinki", country: "Finland" },

//     // International Airports (Finland)
//     { name: "Helsinki-Vantaa Airport (HEL)", city: "Helsinki", country: "Finland" },

//     // International Rail Terminals (Finland)
//     { name: "Helsinki Vuosaari Harbour Railway Yard", city: "Helsinki", country: "Finland" },

//     // International Ports (Greece)
//     { name: "Port of Piraeus", city: "Piraeus", country: "Greece" },

//     // International Airports (Greece)
//     { name: "Athens International Airport (ATH)", city: "Athens", country: "Greece" },

//     // International Rail Terminals (Greece)
//     { name: "Thriasio Freight Center", city: "Athens", country: "Greece" },
// ];

// const transportModes = ["Sea", "Land", "Air"];

// const Sidebar = () => {
//     const [showRoutePanel, setShowRoutePanel] = useState(false);
//     const [source, setSource] = useState("");
//     const [destination, setDestination] = useState("");
//     const [mode, setMode] = useState("");
//     const [routeData, setRouteData] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);

//     // Function to call backend API
//     const findRoute = async () => {
//         if (!source || !destination || !mode) {
//             alert("Please select source, destination, and transport mode.");
//             return;
//         }

//         setLoading(true);
//         setError(null);
//         setRouteData(null);

//         try {
//             const response = await fetch("http://127.0.0.1:5000/api/calculate_routes", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({ source, target: destination, preferred_mode: mode })
//             });

//             if (!response.ok) {
//                 throw new Error("Failed to fetch route data");
//             }

//             const data = await response.json();
//             setRouteData(data);
//         } catch (err) {
//             setError(err.message);
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <Drawer
//             variant="permanent"
//             sx={{
//                 width: 600,
//                 flexShrink: 0,
//                 [`& .MuiDrawer-paper`]: { width: 600, marginTop: "64px" },
//             }}
//         >
//             <Toolbar />
//             <List>
//                 <ListItem button onClick={() => setShowRoutePanel(!showRoutePanel)}>
//                     <ListItemIcon><Directions /></ListItemIcon>
//                     <ListItemText primary="Find Route" />
//                 </ListItem>
//                 <Collapse in={showRoutePanel} timeout="auto" unmountOnExit>
//                     <Box sx={{ p: 2 }}>
//                         <FormControl fullWidth sx={{ mb: 2 }}>
//                             <InputLabel>Source</InputLabel>
//                             <Select value={source} onChange={(e) => setSource(e.target.value)}>
//                                 {facilities.map((facility, index) => (
//                                     <MenuItem key={index} value={facility.name}>
//                                         {facility.name} - {facility.city}, {facility.country}
//                                     </MenuItem>
//                                 ))}
//                             </Select>
//                         </FormControl>

//                         <Button variant="contained" onClick={findRoute} sx={{ mt: 2, width: "100%" }}>
//                             Find Route
//                         </Button>
//                     </Box>
//                 </Collapse>
//             </List>
//         </Drawer>
//     );
// };

// export default Sidebar;



import React, { useState } from "react";
import {
    Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, Box, FormControl, InputLabel, Select, MenuItem, Collapse, Button, CircularProgress
} from "@mui/material";
import { Directions } from "@mui/icons-material";
import MapComponent from "./MapComponent";

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

    // International Rail Terminals (Greece)
    { name: "Thriasio Freight Center", city: "Athens", country: "Greece" },
];

const transportModes = ["Seaport", "Rail Terminal", "Airport"];


const Sidebar = () => {
    const [showRoutePanel, setShowRoutePanel] = useState(false);
    const [source, setSource] = useState("");
    const [destination, setDestination] = useState("");
    const [mode, setMode] = useState("");
    const [routeData, setRouteData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Function to call backend API
    const findRoute = async () => {
        if (!source || !destination || !mode) {
            alert("Please select source, destination, and transport mode.");
            return;
        }

        setLoading(true);
        setError(null);
        setRouteData(null);

        try {
            const response = await fetch("http://127.0.0.1:5000/api/calculate_routes", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ source, target: destination, preferred_mode: mode })
            });

            if (!response.ok) {
                throw new Error("Failed to fetch route data");
            }

            const data = await response.json();
            setRouteData(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };


    return (
        <Drawer
            variant="permanent"
            sx={{
                width: 600,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: { width: 600, marginTop: "64px" },
            }}
        >
            <Toolbar />
            <List>
                <ListItem button onClick={() => setShowRoutePanel(!showRoutePanel)}>
                    <ListItemIcon><Directions /></ListItemIcon>
                    <ListItemText primary="Find Route" />
                </ListItem>
                <Collapse in={showRoutePanel} timeout="auto" unmountOnExit>
                    <Box sx={{ p: 2 }}>
                        <FormControl fullWidth sx={{ mb: 2 }}>
                            <InputLabel>Source</InputLabel>
                            <Select value={source} onChange={(e) => setSource(e.target.value)}>
                                {/* Render list of facilities */}
                                {facilities.map((facility, index) => (
                                    <MenuItem key={index} value={facility.name}>
                                        {facility.name} ({facility.city}, {facility.country})
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControl fullWidth sx={{ mb: 2 }}>
                            <InputLabel>Destination</InputLabel>
                            <Select value={destination} onChange={(e) => setDestination(e.target.value)}>
                                {/* Render list of facilities */}
                                {facilities.map((facility, index) => (
                                    <MenuItem key={index} value={facility.name}>
                                        {facility.name} ({facility.city}, {facility.country})
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        {/* Transport Mode Dropdown */}
                        <FormControl fullWidth sx={{ mb: 2 }}>
                            <InputLabel>Transport Mode</InputLabel>
                            <Select value={mode} onChange={(e) => setMode(e.target.value)}>
                                {transportModes.map((mode, index) => (
                                    <MenuItem key={index} value={mode}>
                                        {mode}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <Button variant="contained" onClick={findRoute} sx={{ mt: 2, width: "100%" }}>
                            {loading ? <CircularProgress size={24} /> : "Find Route"}
                        </Button>
                    </Box>
                </Collapse>
            </List>

            {/* Pass routeData (which includes coordinates) to the MapComponent */}
            {routeData && <MapComponent routeData={routeData} />}
        </Drawer>
    );
};

export default Sidebar;