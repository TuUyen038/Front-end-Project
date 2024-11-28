import React from "react";
import { Box, Avatar, Typography, IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

function CommentBox() {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        padding: 2,
        backgroundColor: "#f9f9f9",
        borderRadius: "8px",
        boxShadow: 1,
      }}
    >
      <Avatar sx={{ bgcolor: "#ef5350", marginRight: 2 }}>A</Avatar>
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
          Mai Thành Công
        </Typography>
        <Typography variant="caption" color="text.secondary">
          1 hour ago
        </Typography>
      </Box>
      <IconButton aria-label="options">
        <MoreVertIcon />
      </IconButton>
    </Box>
  );
}

export default CommentBox;
