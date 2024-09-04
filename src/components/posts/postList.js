import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Grid,
  Card,
  Typography,
  Avatar,
  CardMedia,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Snackbar,
  Alert,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FavoriteIcon from "@mui/icons-material/Favorite";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ShareIcon from "@mui/icons-material/Share";
import CommentIcon from "@mui/icons-material/Comment";
import Cookies from "js-cookie";
import environment from "../../environment";

const PostList = ({ onEditPost }) => {
    const [posts, setPosts] = useState([]);
    const [currentUserId, setCurrentUserId] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedPostId, setSelectedPostId] = useState(null);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  
    useEffect(() => {
      const userCookie = Cookies.get("user");
      if (userCookie) {
        const userData = JSON.parse(decodeURIComponent(userCookie));
        setCurrentUserId(userData.userId);
      }
  
      axios
        .get(`${environment.apiBaseUrl}${environment.endpoints.posts}`)
        .then((response) => {
          const postsWithLikes = response.data.map(post => ({
            ...post,
            likeCount: 1206,
            liked: false,
          }));
          setPosts(postsWithLikes);
        })
        .catch((error) => {
          console.error("There was an error fetching the posts!", error);
        });
    }, []);
  
    const handleLikeClick = (postId) => {
      setPosts(prevPosts =>
        prevPosts.map(post =>
          post.postId === postId
            ? { ...post, likeCount: post.likeCount + 1, liked: !post.liked }
            : post
        )
      );
    };
  
    const handleMoreClick = (event, postId) => {
      setAnchorEl(event.currentTarget);
      setSelectedPostId(postId);
    };
  
    const handleCloseMenu = () => {
      setAnchorEl(null);
      setSelectedPostId(null);
    };
  
    const handleUpdatePost = () => {
      const postToEdit = posts.find(post => post.postId === selectedPostId);
      if (postToEdit) {
        onEditPost(postToEdit); // Pass the post data to the parent component
      }
      handleCloseMenu();
    };
  
    const handleDeletePost = () => {
      axios
        .delete(`${environment.apiBaseUrl}${environment.endpoints.posts}/${selectedPostId}`)
        .then((response) => {
          console.log("Post deleted successfully:", response.data);
          setSnackbarMessage("Post deleted successfully!");
          setSnackbarSeverity("success");
          setOpenSnackbar(true);
          // Remove the deleted post from the list
          setPosts(posts.filter(post => post.postId !== selectedPostId));
        })
        .catch((error) => {
          console.error("There was an error deleting the post!", error);
          setSnackbarMessage("Failed to delete the post. Please try again.");
          setSnackbarSeverity("error");
          setOpenSnackbar(true);
        });
      handleCloseMenu();
    };
  
    const handleCloseSnackbar = () => {
      setOpenSnackbar(false);
    };
  
    return (
      <Container>
        <Grid container direction="column" spacing={3}>
          {posts.map((post) => (
            <Grid item key={post.postId}>
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                  justifyContent: "center",
                  marginBottom: 3,
                  padding: 2,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 2,
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Avatar
                      src={post.user?.imageUrl}
                      alt={post.user?.username}
                      sx={{ width: 56, height: 56, marginRight: 2 }}
                    />
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: "bold", fontFamily: "PlayfairDisplay" }}
                      >
                        {post.user?.username}
                      </Typography>
                      <Typography
                        variant="h6"
                        sx={{
                          color: "grey",
                          fontSize: "14px",
                          fontFamily: "PlayfairDisplay",
                        }}
                      >
                        {post.user?.email}
                      </Typography>
                    </div>
                  </Box>
                  {post.userId === currentUserId && (
                    <IconButton
                      onClick={(event) => handleMoreClick(event, post.postId)}
                    >
                      <MoreVertIcon />
                    </IconButton>
                  )}
                </Box>
                <Typography
                  sx={{ fontFamily: "PlayfairDisplay" }}
                  variant="h4"
                >
                  {post.title}
                </Typography>
                {post.imageUrl && (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      marginTop: 2,
                    }}
                  >
                    <CardMedia
                      component="img"
                      sx={{ width: "70%", height: "500px", borderRadius: "12px" }}
                      image={post.imageUrl}
                      title={post.title}
                    />
                  </Box>
                )}
                <Typography
                  variant="body1"
                  sx={{
                    marginTop: 2,
                    color: "text.primary",
                    fontSize: "18px",
                    fontFamily: "PlayfairDisplay",
                  }}
                >
                  {post.content}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: 3,
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <IconButton onClick={() => handleLikeClick(post.postId)}>
                      <FavoriteIcon
                        sx={{
                          color: post.liked ? "red" : "grey",
                          transition: "color 0.8s ease",
                        }}
                      />
                    </IconButton>
                    <Typography variant="body2" sx={{ fontFamily: "PlayfairDisplay" }}>
                      {post.likeCount} Likes
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <IconButton>
                      <VisibilityIcon sx={{ color: "blue" }} />
                    </IconButton>
                    <Typography variant="body2" sx={{ fontFamily: "PlayfairDisplay" }}>
                      456 Views
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <IconButton>
                      <CommentIcon sx={{ color: "green" }} />
                    </IconButton>
                    <Typography variant="body2" sx={{ fontFamily: "PlayfairDisplay" }}>
                      78 Comments
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <IconButton>
                      <ShareIcon sx={{ color: "purple" }} />
                    </IconButton>
                    <Typography variant="body2" sx={{ fontFamily: "PlayfairDisplay" }}>
                      12 Shares
                    </Typography>
                  </Box>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
  
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleCloseMenu}
        >
          <MenuItem onClick={handleUpdatePost}>Update</MenuItem>
          <MenuItem onClick={handleDeletePost}>Delete</MenuItem>
        </Menu>
  
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
        >
          <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Container>
    );
  };
  
  export default PostList;
  