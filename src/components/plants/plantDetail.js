import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { Box, CircularProgress, Divider, Snackbar, Alert, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import environment from "../../environment";
import PlantDetail from "./detailPlant";
import ReviewList from "../reviews/reviewList";
import ReviewForm from "../reviews/reviewForm";

const PlantDetailPage = () => {
  const { id } = useParams();
  const [plant, setPlant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userMap, setUserMap] = useState({});
  const [newReview, setNewReview] = useState({ rating: 0, comment: "" });
  const [userId, setUserId] = useState(null);
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "",
  });
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedReview, setSelectedReview] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlantAndReviews = async () => {
      try {
        const userCookie = Cookies.get("user");
        if (userCookie) {
          setUserId(JSON.parse(userCookie).userId);
        }

        const plantResponse = await axios.get(
          `${environment.apiBaseUrl}${environment.endpoints.plants}/${id}`
        );
        setPlant(plantResponse.data);

        const userRequests = plantResponse.data.reviews.map((review) =>
          axios.get(
            `${environment.apiBaseUrl}${environment.endpoints.users}/${review.userId}`
          )
        );

        const userResponses = await Promise.all(userRequests);
        const userDetails = userResponses.reduce((acc, response) => {
          const user = response.data;
          acc[user.userId] = { name: user.username, imageUrl: user.imageUrl };
          return acc;
        }, {});

        setUserMap(userDetails);
      } catch (error) {
        console.error("Error fetching plant details", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlantAndReviews();
  }, [id]);

  const handleReviewChange = (event) => {
    setNewReview({ ...newReview, [event.target.name]: event.target.value });
  };

  const handleRatingChange = (event, newValue) => {
    setNewReview({ ...newReview, rating: newValue });
  };

  const handleReviewSubmit = async () => {
    try {
      const url = selectedReview
        ? `${environment.apiBaseUrl}${environment.endpoints.reviews}/${selectedReview.reviewId}`
        : `${environment.apiBaseUrl}${environment.endpoints.reviews}`;

      const method = selectedReview ? "put" : "post";

      const payload = {
        rating: newReview.rating,
        comment: newReview.comment,
        userId,
        plantId: id,
        ...(selectedReview && { reviewId: selectedReview.reviewId }),
      };

      const response = await axios({
        method,
        url,
        data: payload,
      });

      setNotification({
        open: true,
        message: selectedReview ? "Review updated successfully" : "Review created successfully",
        severity: "success",
      });

      setNewReview({ rating: 0, comment: "" });
      setSelectedReview(null);

      const updatedPlantResponse = await axios.get(
        `${environment.apiBaseUrl}${environment.endpoints.plants}/${id}`
      );
      setPlant(updatedPlantResponse.data);
    } catch (error) {
      console.error("Error Response:", error.response ? error.response.data : error.message);
      setNotification({
        open: true,
        message: `Error ${selectedReview ? "updating" : "creating"} review`,
        severity: "error",
      });
    }
  };

  const handleReviewDelete = async (reviewId) => {
    try {
      console.log("Attempting to delete review with ID:", reviewId); // Log the reviewId for debugging
  
      if (typeof reviewId !== 'string' && typeof reviewId !== 'number') {
        console.error("Invalid reviewId:", reviewId);
        return;
      }
  
      const url = `${environment.apiBaseUrl}${environment.endpoints.reviews}/${reviewId}`;
      
      await axios.delete(url);
      
      setNotification({
        open: true,
        message: "Review deleted successfully",
        severity: "success",
      });
      
      const updatedPlantResponse = await axios.get(
        `${environment.apiBaseUrl}${environment.endpoints.plants}/${id}`
      );
      
      setPlant(updatedPlantResponse.data);
    } catch (error) {
      console.error("Error deleting review:", error.response ? error.response.data : error.message);
  
      setNotification({
        open: true,
        message: "Error deleting review",
        severity: "error",
      });
    }
  };

  const handleNotificationClose = () => {
    setNotification({ ...notification, open: false });
  };

  const handleMoreClick = (event, review) => {
    event.preventDefault(); // Prevent default behavior
    setAnchorEl(event.currentTarget);
    setSelectedReview(review); // Set the review to be edited or deleted
    console.log("More Clicked, Review ID:", review.reviewId); // Log the selected review ID
  };
  

  const handleMoreClose = () => {
    setAnchorEl(null);
  };

  const handleEditClick = () => {
    if (selectedReview) {
      setNewReview({ rating: selectedReview.rating, comment: selectedReview.comment });
      handleMoreClose();
    }
  };

  const handleCreateNewClick = () => {
    setNewReview({ rating: 0, comment: "" });
    setSelectedReview(null);
    handleMoreClose();
  };

  return (
    <Box p={3} sx={{ maxWidth: "1200px", margin: "auto", padding: "20px", backgroundColor: "#fafafa" }}>
      <IconButton onClick={() => navigate(-1)}>
        <ArrowBackIcon />
      </IconButton>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          {plant && (
            <>
              <PlantDetail plant={plant} />
              <Divider sx={{ my: 4 }} />
              <ReviewList
                reviews={plant.reviews}
                userMap={userMap}
                userId={userId}
                anchorEl={anchorEl}
                handleMoreClick={handleMoreClick}
                handleMoreClose={handleMoreClose}
                handleEditClick={handleEditClick}
                handleDeleteClick={handleReviewDelete}
                handleCreateNewClick={handleCreateNewClick}
                selectedReview={selectedReview}
              />
              <Divider sx={{ my: 4 }} />
              <ReviewForm
                selectedReview={selectedReview}
                newReview={newReview}
                handleRatingChange={handleRatingChange}
                handleReviewChange={handleReviewChange}
                handleReviewSubmit={handleReviewSubmit}
              />
            </>
          )}
        </>
      )}
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleNotificationClose}
      >
        <Alert onClose={handleNotificationClose} severity={notification.severity}>
          {notification.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default PlantDetailPage;
