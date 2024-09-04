import React from "react";
import { Grid, Typography, Rating, TextField, Button } from "@mui/material";

const ReviewForm = ({
  selectedReview,
  newReview,
  handleRatingChange,
  handleReviewChange,
  handleReviewSubmit,
}) => {
  return (
    <>
      <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: "16px" }}>
        {selectedReview ? "Edit Your Review" : "Add a Review"}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Rating
            name="rating"
            value={newReview.rating}
            onChange={handleRatingChange}
            precision={1}
            max={5}
            sx={{ marginBottom: "16px" }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="comment"
            label="Comment"
            variant="outlined"
            fullWidth
            value={newReview.comment}
            onChange={handleReviewChange}
            sx={{ marginBottom: "16px" }}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            onClick={handleReviewSubmit}
            sx={{
              backgroundColor: "#ff4081",
              color: "#fff",
              fontWeight: "bold",
              padding: "10px 20px",
              borderRadius: "20px",
            }}
          >
            {selectedReview ? "Update Review" : "Submit Review"}
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default ReviewForm;
