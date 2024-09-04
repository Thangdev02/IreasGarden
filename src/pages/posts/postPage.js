import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import PostBanner from "../../components/posts/postBanner";
import PostList from "../../components/posts/postList";
import CreatePost from "./createPost";

const PostPage = () => {
  const [open, setOpen] = useState(false);
  const [editPostData, setEditPostData] = useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditPostData(null); // Reset edit data when closing
  };

  const handlePostCreatedOrUpdated = () => {
    handleClose();
    window.location.reload(); // Refresh the page after creating or updating a post
  };

  const handleEditPost = (post) => {
    setEditPostData(post); // Set the post data to be edited
    handleClickOpen(); // Open the modal
  };

  return (
    <div>
      <PostBanner />
      <div style={{display:'flex', justifyContent:'end', padding:'0 4% 2% 0'}}>
        <Button variant="contained" color="success" onClick={handleClickOpen}>
          Create Post
        </Button>
      </div>
      <PostList onEditPost={handleEditPost} />

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Typography variant="h6" component="div">
            {editPostData ? "Edit Post" : "Create New Post"}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <CreatePost
            onPostCreatedOrUpdated={handlePostCreatedOrUpdated}
            editPostData={editPostData}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PostPage;
