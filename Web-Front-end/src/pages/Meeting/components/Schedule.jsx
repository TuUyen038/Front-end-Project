import React from "react";
import { Box } from "@mui/material";
import PropTypes from "prop-types";
import TabPanel from "./TabPanel";

export default function Schedule({ onTogglePage, value }) {
  return (
    <Box>
      <Box sx={{ maxWidth: "120rem", margin: "auto" }}>
        <TabPanel onTogglePage={onTogglePage} value={value} />
      </Box>
    </Box>
  );
}

Schedule.propTypes = {
  onTogglePage: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};
