import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Box, Typography, Button } from "@mui/material";
import { removeItemFromCart } from "../../redux/cartSlice";

// Utility function to format numbers as VND
const formatPriceVND = (price) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
};

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const totalAmount = useSelector((state) => state.cart.totalAmount);

  const handleRemoveItem = (id) => {
    dispatch(removeItemFromCart(id));
  };

  return (
    <Box sx={{ padding: "24px" }}>
      <Typography variant="h4" sx={{ fontWeight: "bold", marginBottom: "24px", fontFamily: 'Quicksand' }}>
        Your Shopping Cart
      </Typography>
      {cartItems.length === 0 ? (
        <Typography variant="h6">Your cart is empty.</Typography>
      ) : (
        <Grid container spacing={2}>
          {cartItems.map((item) => (
            <Grid item xs={12} key={item.id}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "16px",
                  borderBottom: "1px solid #ccc",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Box
                    component="img"
                    src={item.imageUrl}
                    alt={item.name}
                    sx={{
                      width: "100px",
                      height: "100px",
                      borderRadius: "8px",
                      marginRight: "16px",
                    }}
                  />
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                      {item.name}
                    </Typography>
                    <Typography variant="body1" sx={{ color: "#666" }}>
                      {formatPriceVND(item.price)} x {item.quantity}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography variant="h6" sx={{ fontWeight: "bold", marginRight: "16px" }}>
                    {formatPriceVND(item.totalPrice)}
                  </Typography>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#f44336",
                      color: "#fff",
                      fontWeight: "bold",
                      padding: "6px 12px",
                      borderRadius: "20px",
                    }}
                    onClick={() => handleRemoveItem(item.id)}
                  >
                    Delete
                  </Button>
                </Box>
              </Box>
            </Grid>
          ))}
          <Grid item xs={12}>
            <Box sx={{ marginTop: "24px", textAlign: "right" }}>
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                Total Amount: {formatPriceVND(totalAmount)}
              </Typography>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#ff4081",
                  color: "#fff",
                  fontWeight: "bold",
                  padding: "10px 20px",
                  borderRadius: "20px",
                  marginTop: "16px",
                }}
              >
                Proceed to Checkout
              </Button>
            </Box>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default Cart;
