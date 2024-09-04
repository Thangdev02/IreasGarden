import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";
import Cookies from "js-cookie";
import environment from "../../environment";

const CreatePost = ({ onPostCreatedOrUpdated, editPostData }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [userId, setUserId] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  useEffect(() => {
    const userCookie = Cookies.get("user");
    if (userCookie) {
      const userData = JSON.parse(decodeURIComponent(userCookie));
      setUserId(userData.userId);
    }

    if (editPostData) {
      setTitle(editPostData.title);
      setContent(editPostData.content);
      setImageUrl(editPostData.imageUrl);
    }
  }, [editPostData]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const postPayload = {
      postId: editPostData ? editPostData.postId : 0,
      userId: userId,
      title,
      content,
      imageUrl,
      createdAt: editPostData ? editPostData.createdAt : new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      user: editPostData ? editPostData.user : {
        userId: userId,
        username: "string",
        email: "string",
        role: "string",
        imageUrl: "string",
        registrationDate: new Date().toISOString(),
      },
    };

    const requestMethod = editPostData ? "put" : "post";
    const requestUrl = editPostData
      ? `${environment.apiBaseUrl}${environment.endpoints.posts}/${editPostData.postId}`
      : `${environment.apiBaseUrl}${environment.endpoints.posts}`;

    axios[requestMethod](requestUrl, postPayload)
      .then((response) => {
        console.log("Post saved successfully:", response.data);
        setSnackbarMessage(editPostData ? "Post updated successfully!" : "Post created successfully!");
        setSnackbarSeverity("success");
        setOpenSnackbar(true);

        setTitle("");
        setContent("");
        setImageUrl("");

        if (onPostCreatedOrUpdated) {
          onPostCreatedOrUpdated();
        }
      })
      .catch((error) => {
        console.error("There was an error saving the post!", error);
        setSnackbarMessage("Failed to save post. Please try again.");
        setSnackbarSeverity("error");
        setOpenSnackbar(true);
      });
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 5,
        }}
      >
        <Typography component="h1" variant="h5" sx={{ marginBottom: 3 }}>
          {editPostData ? "Edit Post" : "Create New Post"}
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ mt: 1, width: "100%" }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="title"
            label="Post Title"
            name="title"
            autoComplete="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="content"
            label="Post Content"
            name="content"
            autoComplete="content"
            multiline
            rows={4}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <TextField
            margin="normal"
            fullWidth
            id="imageUrl"
            label="Image URL"
            name="imageUrl"
            autoComplete="imageUrl"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
            disabled={!userId}
          >
            {editPostData ? "Update Post" : "Create Post"}
          </Button>
        </Box>
      </Box>
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

export default CreatePost;
