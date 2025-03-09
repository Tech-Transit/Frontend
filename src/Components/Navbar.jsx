import React from "react";
import { AppBar, Toolbar, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import logo from '../assets/logo.png'; // Import the logo from the assets folder

const Navbar = () => {
    return (
        <AppBar position="fixed" color="primary">
            <Toolbar sx={{ justifyContent: 'space-between' }}>
                {/* Logo */}
                <Box component={Link} to="/" sx={{ display: 'flex', alignItems: 'center', textDecoration: "none", color: "inherit" }}>
                    <img src={logo} alt="Logo" style={{ height: 50, marginRight: 10 }} />
                </Box>
                
                {/* Navbar Buttons */}
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