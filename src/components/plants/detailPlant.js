import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Grid, Box, Typography, Button, Snackbar, Alert, IconButton } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { addItemToCart } from "../../redux/cartSlice";

const PlantDetail = ({ plant }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);  // State to manage quantity
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleIncreaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecreaseQuantity = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  const addToCartHandler = () => {
    dispatch(
      addItemToCart({
        id: plant.id,
        name: plant.name,
        price: plant.price,
        imageUrl: plant.imageUrl,
        quantity: quantity,
      })
    );
    setOpenSnackbar(true);  // Show the Snackbar
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Box
            component="img"
            src={plant.imageUrl}
            alt={plant.name}
            sx={{
              width: "100%",
              borderRadius: "8px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h4" sx={{ fontWeight: "bold", marginBottom: "16px" }}>
            {plant.name}
          </Typography>
          <Typography variant="h6" sx={{ color: "#666", marginBottom: "16px" }}>
            Type: {plant.type}
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: "16px" }}>
            {plant.description}
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: "16px" }}>
            Price: ${plant.price}
          </Typography>
          <Typography variant="h6" sx={{ color: "#666", marginBottom: "16px" }}>
            Stock: {plant.stock}
          </Typography>
          
          {/* Quantity control */}
          <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
            <IconButton onClick={handleDecreaseQuantity}>
              <RemoveIcon />
            </IconButton>
            <Typography variant="body1" sx={{ margin: '0 16px' }}>
              {quantity}
            </Typography>
            <IconButton onClick={handleIncreaseQuantity}>
              <AddIcon />
            </IconButton>
          </Box>

          <Button
            variant="contained"
            sx={{
              backgroundColor: "#ff4081",
              color: "#fff",
              fontWeight: "bold",
              padding: "10px 20px",
              borderRadius: "20px",
            }}
            onClick={addToCartHandler}
          >
            Add to Cart
          </Button>
        </Grid>
      </Grid>

      {/* Snackbar Notification */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}  // Duration to show the Snackbar
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          Added {quantity} {plant.name}(s) to cart successfully!
        </Alert>
      </Snackbar>
    </>
  );
};

export default PlantDetail;
