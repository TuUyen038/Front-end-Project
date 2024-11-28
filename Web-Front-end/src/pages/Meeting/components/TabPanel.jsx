import React from "react";
import { Box, IconButton, Stack } from "@mui/material";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import VideocamIcon from "@mui/icons-material/Videocam";

function TabPanel({ onTogglePage, value }) {
  return (
    <Box
      sx={{
        borderBottom: 1,
        borderColor: "divider",
        paddingBottom: "1.5rem",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          paddingLeft: 5,
          paddingRight: 5,
          paddingTop: 2,
        }}
      >
        <Box
          onClick={() => onTogglePage()}
          sx={{
            fontWeight: value === "general" ? "bold" : "normal",
            textDecoration: value === "general" ? "underline" : "none",
            color: "black",
            cursor: "pointer",
            marginRight: 2.5,
            fontSize: "2.2rem",
          }}
        >
          General
        </Box>

        <Box
          onClick={() => onTogglePage()}
          sx={{
            fontWeight: value === "schedule" ? "bold" : "normal",
            textDecoration: value === "schedule" ? "underline" : "none",
            cursor: "pointer",
            marginRight: "auto",
            fontSize: "2.2rem",
          }}
        >
          Schedule
        </Box>

        <Stack direction="row" sx={{ gap: "1rem" }}>
          <IconButton
            sx={{
              backgroundColor: "#2D9596",
              "&:hover": {
                backgroundColor: "#2D9596",
              },
            }}
          >
            <VideocamIcon sx={{ color: "white", fontSize: "2.4rem" }} />
          </IconButton>
          <IconButton color="inherit">
            <NotificationsOutlinedIcon
              sx={{ color: "black", fontSize: "2.4rem" }}
            />
          </IconButton>
        </Stack>
      </Box>
    </Box>
  );
}

export default TabPanel;
