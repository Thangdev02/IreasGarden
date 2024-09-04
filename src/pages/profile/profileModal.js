import React, { useEffect, useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography, CircularProgress, Avatar, Grid } from '@mui/material';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';

const ProfileModal = ({ open, onClose }) => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userCookie = Cookies.get('user');
                if (userCookie) {
                    const { userId } = JSON.parse(userCookie);
                    const response = await axios.get(`https://localhost:7132/api/User/${userId}`);
                    setUserData(response.data);
                }
            } catch (err) {
                setError('Failed to fetch user data');
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [open]);

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle sx={{display:'flex', justifyContent:'space-between'}}><div>User Profile</div> <div><Link to='changepass'><Button variant='contained'>Change Password</Button></Link></div></DialogTitle>
            <DialogContent>
                {loading ? (
                    <CircularProgress />
                ) : error ? (
                    <Typography color="error">{error}</Typography>
                ) : (
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12} sm={4} container justifyContent="center">
                            <Avatar
                                src={userData?.imageUrl || 'https://via.placeholder.com/150'}
                                alt="User Avatar"
                                sx={{ width: 150, height: 150 }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={8}>
                            <Typography variant="h6">Username: {userData?.username}</Typography>
                            <Typography variant="body1">Email: {userData?.email}</Typography>
                            <Typography variant="body1">Role: {userData?.role}</Typography>
                            <Typography variant="body1">Registration Date: {new Date(userData?.registrationDate).toLocaleDateString()}</Typography>
                        </Grid>
                    </Grid>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ProfileModal;
