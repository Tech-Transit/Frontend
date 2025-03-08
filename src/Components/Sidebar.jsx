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





import React, { useState } from "react";
import {
    Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, Box, FormControl, InputLabel, Select, MenuItem, Collapse
} from "@mui/material";
import { LocalShipping, Map, Info, Inventory, Directions } from "@mui/icons-material";
import { Link } from "react-router-dom";

const ports = [
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
    { name: "Indira Gandhi International Airport", city: "Delhi", country: "India" },
    { name: "Chhatrapati Shivaji Maharaj International Airport", city: "Mumbai", country: "India" },
    { name: "Chennai International Airport", city: "Chennai", country: "India" },
    { name: "Kempegowda International Airport", city: "Bangalore", country: "India" },
    { name: "Rajiv Gandhi International Airport", city: "Hyderabad", country: "India" },
    { name: "Delhi Inland Container Depot", city: "Delhi", country: "India" },
    { name: "Mumbai Goods Terminus", city: "Mumbai", country: "India" },
    { name: "Chennai Central Freight Hub", city: "Chennai", country: "India" },
];

const transportModes = ["Sea", "Land", "Air"];

const Sidebar = () => {
    const [showRoutePanel, setShowRoutePanel] = useState(false);
    const [source, setSource] = useState("");
    const [destination, setDestination] = useState("");
    const [mode, setMode] = useState("");

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: 600,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: { width: 600, marginTop: "64px" },
            }}
        >
            <Toolbar /> {/* Keeps sidebar content below navbar */}
            <List>
                <ListItem button onClick={() => setShowRoutePanel(!showRoutePanel)}>
                    <ListItemIcon><Directions /></ListItemIcon>
                    <ListItemText primary="Find Route" />
                </ListItem>
                <ListItem button component={Link} to="/">
                    <ListItemIcon><Map /></ListItemIcon>
                    <ListItemText primary="Track Shipment" />
                </ListItem>
                <ListItem button component={Link} to="/route-details">
                    <ListItemIcon><LocalShipping /></ListItemIcon>
                    <ListItemText primary="Route Details" />
                </ListItem>
                <ListItem button component={Link} to="/info">
                    <ListItemIcon><Info /></ListItemIcon>
                    <ListItemText primary="Weather & Info" />
                </ListItem>
                <Collapse in={showRoutePanel} timeout="auto" unmountOnExit>
                    <Box sx={{ p: 2 }}>
                        {/* Source Selection */}
                        <FormControl fullWidth sx={{ mb: 2 }}>
                            <InputLabel>Source</InputLabel>
                            <Select value={source} onChange={(e) => setSource(e.target.value)}>
                                {ports.map((port, index) => (
                                    <MenuItem key={index} value={port.name}>
                                        {port.name} - {port.city}, {port.country}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        {/* Destination Selection */}
                        <FormControl fullWidth sx={{ mb: 2 }}>
                            <InputLabel>Destination</InputLabel>
                            <Select value={destination} onChange={(e) => setDestination(e.target.value)}>
                                {ports.map((port, index) => (
                                    <MenuItem key={index} value={port.name}>
                                        {port.name} - {port.city}, {port.country}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        {/* Transport Mode Selection */}
                        <FormControl fullWidth sx={{ mb: 2 }}>
                            <InputLabel>Mode of Transport</InputLabel>
                            <Select value={mode} onChange={(e) => setMode(e.target.value)}>
                                {transportModes.map((m, index) => (
                                    <MenuItem key={index} value={m}>{m}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        {/* Display Selected Values */}
                        {source && destination && mode && (
                            <Box sx={{ mt: 2, p: 2, bgcolor: "#f5f5f5", borderRadius: "5px" }}>
                                <strong>Selected Route:</strong> <br />
                                {source} → {destination} via {mode}
                            </Box>
                        )}
                    </Box>
                </Collapse>
            </List>
        </Drawer>
    );
};

export default Sidebar;
