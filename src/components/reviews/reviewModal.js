import React from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Rating,
  Button,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

const ReviewModal = ({
  open,
  handleClose,
  review,
  handleRatingChange,
  handleReviewChange,
  handleReviewSubmit,
  handleDeleteClick,
}) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyle}>
        <Box display="flex" justifyContent="space-between">
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit Review
          </Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Box>
          <Rating
            name="rating"
            value={review.rating}
            onChange={(event, newValue) => handleRatingChange(event, newValue)}
            precision={1}
            sx={{ mt: 2, mb: 2 }}
          />
          <TextField
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            label="Comment"
            name="comment"
            value={review.comment}
            onChange={handleReviewChange}
            sx={{ mb: 2 }}
          />
          <Box display="flex" justifyContent="space-between">
            <Button
              variant="contained"
              color="error"
              onClick={() => handleDeleteClick(review.reviewId)}
            >
              Delete
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleReviewSubmit}
            >
              Save
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default ReviewModal;
