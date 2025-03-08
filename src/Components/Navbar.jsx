import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <AppBar position="fixed" color="primary">
            <Toolbar>
                {/* Shipment Tracker now clickable */}
                <Typography 
                    variant="h6" 
                    component={Link} 
                    to="/" 
                    sx={{ flexGrow: 1, textDecoration: "none", color: "inherit", cursor: "pointer" }}
                >
                    Shipment Tracker
                </Typography>
                
                <Box>
                    <Button color="inherit" component={Link} to="/">Home</Button>
                    <Button color="inherit" component={Link} to="/pricing">Pricing</Button>
                    <Button color="inherit" component={Link} to="/resources">Resources</Button>
                    <Button color="inherit" component={Link} to="/company">Company</Button>
                    <Button color="inherit" component={Link} to="/product">Product</Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
