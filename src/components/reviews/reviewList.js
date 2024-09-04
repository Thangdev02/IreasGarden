import React, { useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  Avatar,
  Typography,
  Rating,
  IconButton,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ReviewModal from "./reviewModal";

const ReviewList = ({
  reviews,
  userMap,
  userId,
  handleRatingChange,
  handleReviewChange,
  handleReviewSubmit,
  handleDeleteClick,
}) => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);

  const handleMoreClick = (review) => {
    setSelectedReview(review);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedReview(null);
  };

  return (
    <>
      <Grid container spacing={2}>
        {reviews.length > 0 &&
          reviews.map((review) => (
            <Grid item xs={12} sm={6} md={4} key={review.reviewId}>
              <Card sx={{ mb: 2, boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
                <CardContent>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item>
                      <Avatar
                        src={userMap[review.userId]?.imageUrl}
                        alt={userMap[review.userId]?.name}
                      />
                    </Grid>
                    <Grid item xs>
                      <Typography variant="body1">
                        <strong>{userMap[review.userId]?.name}</strong>
                      </Typography>
                      <Rating value={review.rating} readOnly />
                      <Typography variant="body2" sx={{ color: "#666" }}>
                        {review.comment}
                      </Typography>
                    </Grid>
                    {userId === review.userId && (
                      <Grid item>
                        <IconButton
                          aria-label="more"
                          onClick={() => handleMoreClick(review)}
                        >
                          <MoreVertIcon />
                        </IconButton>
                      </Grid>
                    )}
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          ))}
      </Grid>

      {selectedReview && (
        <ReviewModal
          open={openModal}
          handleClose={handleCloseModal}
          review={selectedReview}
          handleRatingChange={handleRatingChange}
          handleReviewChange={handleReviewChange}
          handleReviewSubmit={() => {
            handleReviewSubmit();
            handleCloseModal();
          }}
          handleDeleteClick={(reviewId) => {
            handleDeleteClick(reviewId);
            handleCloseModal();
          }}
        />
      )}
    </>
  );
};

export default ReviewList;
