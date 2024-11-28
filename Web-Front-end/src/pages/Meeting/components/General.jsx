import React from "react";
import { Box } from "@mui/material";
import PropTypes from "prop-types";
import TabPanel from "./TabPanel";
import CommentBox from "./CommentBox";

export default function General({ onTogglePage, value }) {
  return (
    <Box>
      <Box
        sx={{
          maxWidth: "120rem",
          margin: "auto",
        }}
      >
        <TabPanel onTogglePage={onTogglePage} value={value} />
        <Box
          sx={{
            backgroundColor: "#ffffff",
            marginTop: 3,
            padding: 3,
            borderRadius: "12px",
            boxShadow: 2,
            width: "100%",
          }}
        >
          <CommentBox />
        </Box>
      </Box>
    </Box>
  );
}

General.propTypes = {
  onTogglePage: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};
