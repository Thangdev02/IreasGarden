import React, { useState } from "react";
import { TextField, Button, Container, Typography, Alert } from "@mui/material";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://localhost:7132/api/Authentication/login",
        {
          username,
          password,
        }
      );

      // Save user data to cookies
      Cookies.set("user", JSON.stringify(response.data), { expires: 1 }); // Expires in 1 day
      navigate("/");
      setSuccess("Login successful");
      setError("");

      // Refresh the page to update UI
      window.location.reload();
    } catch (err) {
      setError("Invalid username or password");
      setSuccess("");
    }
  };


  return (
    <Container maxWidth="xs">
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}
      {success && <Alert severity="success">{success}</Alert>}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Login
        </Button>
        <Typography>Don't have account yet? <Link to='/register'><span style={{color:'green',fontWeight:'bold'}}>Register!</span></Link></Typography>
        <Link to='/changepass'><span style={{color:'green',fontWeight:'bold'}}>Change Password!</span></Link>
      </form>
    </Container>
  );
};

export default Login;
