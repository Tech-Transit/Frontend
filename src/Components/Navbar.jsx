import React from "react";
import { AppBar, Toolbar, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import logo from '../assets/logo.png'; // Import the logo from the assets folder
import ShinyText from './ShinyText';

const Navbar = () => {
    return (
        <AppBar position="fixed" sx={{ backgroundColor: '#1c1c1c' }}> {/* Changed to a darker color */}
            <Toolbar sx={{ justifyContent: 'space-between' }}>
                {/* Logo */}
                <Box component={Link} to="/" sx={{ display: 'flex', alignItems: 'center', textDecoration: "none", color: "inherit" }}>
                    <img src={logo} alt="Logo" style={{ height: 90, marginRight: 40 }} />
                </Box>
                
                {/* Navbar Buttons */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <Button color="inherit" component={Link} to="/" sx={{ fontSize: '1.10rem' }}>Home</Button>
                    <Button color="inherit" component={Link} to="/pricing" sx={{ fontSize: '1.10rem' }}>Pricing</Button>
                    <Button color="inherit" component={Link} to="/company" sx={{ fontSize: '1.10rem' }}>Company</Button>

                    <Box sx={{ display: 'flex', gap: 4, ml: 2 }}>
                        <Button component={Link} to="/login" sx={{ background: 'linear-gradient(90deg, hsla(236, 100%, 8%, 1) 0%, hsla(211, 100%, 28%, 1) 100%)', color: '#fff', fontWeight: 'bold' , padding: '8px 15px'  , fontSize: '1.0rem'}}>
                            <ShinyText text="Login" />
                        </Button>

                        <Button component={Link} to="/signup" sx={{ background: 'linear-gradient(90deg, hsla(236, 100%, 8%, 1) 0%, hsla(211, 100%, 28%, 1) 100%)', color: '#fff', fontWeight: 'bold', marginRight: 10 , padding: '8px 15px' , fontSize: '1.0rem'}}>
                            <ShinyText text="Signup" />
                        </Button>
                    </Box>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;