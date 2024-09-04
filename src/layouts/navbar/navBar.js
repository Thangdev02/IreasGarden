import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../assets/images/logo.png';
import { Button, Menu, MenuItem, Dialog } from '@mui/material';
import Cookies from 'js-cookie';
import ProfileModal from '../../pages/profile/profileModal';

const NavBar = () => {
    const [userData, setUserData] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const [openProfileModal, setOpenProfileModal] = useState(false); // State for controlling ProfileModal visibility
    const open = Boolean(anchorEl);
    const navigate = useNavigate();

    useEffect(() => {
        // Retrieve and parse cookie data
        const userCookie = Cookies.get('user');
        if (userCookie) {
            setUserData(JSON.parse(userCookie));
        }
    }, []);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        Cookies.remove('user'); // Remove the user cookie
        setUserData(null); // Clear user data from state
        navigate('/login'); // Redirect to login page
        window.location.reload(); // Optionally, force a page reload
    };
    const handleCart = () => {
        navigate('/cart'); // Redirect to login page
    };

    const handleProfile = () => {
        setOpenProfileModal(true); // Open the profile modal
        handleClose(); // Close the menu
    };

    const handleProfileModalClose = () => {
        setOpenProfileModal(false); // Close the profile modal
    };

    return (
        <div
            style={{
                fontFamily: 'Quicksand',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '1% 2%',
            }}
        >
            {/* Logo Section */}
            <div className="logo" style={{ flexBasis: '33%' }}>
                <img style={{ width: '16%' }} src={Logo} alt="Logo" />
            </div>

            {/* Navigation Links */}
            <div
                className="navigation"
                style={{
                    display: 'flex',
                    justifyContent: 'center', // Center the links
                    flexBasis: '33%',
                    gap: '1.5rem',
                }}
            >
                <Link
                    style={{
                        textDecoration: 'none',
                        color: '#2c2c2c',
                        fontSize: '20px',
                        fontWeight: '500',
                    }}
                    to="/"
                >
                    Home
                </Link>
                <Link
                    style={{
                        textDecoration: 'none',
                        color: '#2c2c2c',
                        fontSize: '20px',
                        fontWeight: '500',
                    }}
                    to="/store"
                >
                    Store
                </Link>
                <Link
                    style={{
                        textDecoration: 'none',
                        color: '#2c2c2c',
                        fontSize: '20px',
                        fontWeight: '500',
                    }}
                    to="/posts"
                >
                    Post
                </Link>
                <Link
                    style={{
                        textDecoration: 'none',
                        color: '#2c2c2c',
                        fontSize: '20px',
                        fontWeight: '500',
                    }}
                    to="/service"
                >
                    Service
                </Link>
                <Link
                    style={{
                        textDecoration: 'none',
                        color: '#2c2c2c',
                        fontSize: '20px',
                        fontWeight: '500',
                    }}
                    to="/about"
                >
                    About Us
                </Link>
            </div>

            {/* Profile Menu */}
            {userData ? (
                <div>
                    <Button
                        id="profile-button"
                        aria-controls={open ? 'profile-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                    >
                        Profile
                    </Button>
                    <Menu
                        id="profile-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'profile-button',
                        }}
                    >
                        <MenuItem onClick={handleProfile}>Profile</MenuItem>
                        <MenuItem onClick={handleCart}>Cart</MenuItem>
                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </Menu>
                </div>
            ) : (
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate('/login')}
                >
                    Login
                </Button>
            )}

            {/* Profile Modal */}
            <ProfileModal open={openProfileModal} onClose={handleProfileModalClose} />
        </div>
    );
};

export default NavBar;
