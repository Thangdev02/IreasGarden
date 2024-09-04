import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Stepper, Step, StepLabel, Alert } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const steps = ['Enter Username', 'Change Password'];

const ChangePassword = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const initialUsername = location.state?.username || ''; // Retrieve username from state or set to empty string

    const [activeStep, setActiveStep] = useState(0);
    const [username, setUsername] = useState(initialUsername);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleNext = async () => {
        if (activeStep === 0) {
            // Validate username step
            if (!username) {
                setError('Username is required');
                return;
            }
            setActiveStep((prevStep) => prevStep + 1);
        } else if (activeStep === 1) {
            // Change password step
            try {
                await axios.post('https://localhost:7132/api/Authentication/change-password', {
                    username,
                    oldPassword,
                    newPassword
                });
                setSuccess('Password changed successfully');
                setError('');
                navigate('/'); // Redirect to home page or another page
            } catch (err) {
                setError('Failed to change password');
                setSuccess('');
            }
        }
    };

    const handleBack = () => {
        setActiveStep((prevStep) => prevStep - 1);
    };

    const renderStepContent = (step) => {
        switch (step) {
            case 0:
                return (
                    <Container maxWidth="xs">
                        <Typography variant="h4" gutterBottom>
                            Change Password - Step 1
                        </Typography>
                        {error && <Alert severity="error">{error}</Alert>}
                        {success && <Alert severity="success">{success}</Alert>}
                        <TextField
                            label="Username"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                        <Button type="button" variant="contained" color="primary" fullWidth onClick={handleNext}>
                            Next
                        </Button>
                    </Container>
                );
            case 1:
                return (
                    <Container maxWidth="xs">
                        <Typography variant="h4" gutterBottom>
                            Change Password - Step 2
                        </Typography>
                        {error && <Alert severity="error">{error}</Alert>}
                        {success && <Alert severity="success">{success}</Alert>}
                        <TextField
                            label="Old Password"
                            type="password"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                            required
                        />
                        <TextField
                            label="New Password"
                            type="password"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                        <Button type="button" variant="contained" color="primary" onClick={handleBack}>
                            Back
                        </Button>
                        <Button type="button" variant="contained" color="primary" onClick={handleNext}>
                            Submit
                        </Button>
                    </Container>
                );
            default:
                return <div>Unknown step</div>;
        }
    };

    return (
        <Container maxWidth="xs">
            <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            {renderStepContent(activeStep)}
        </Container>
    );
};

export default ChangePassword;
