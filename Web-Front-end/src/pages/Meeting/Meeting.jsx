// export default function Meeting() {
//   return <div>Welcome to meeting space</div>;
// }

import React, { useState } from "react";
import { Box } from "@mui/material";
import General from "./components/General";
import Schedule from "./components/Schedule";

export default function Meeting() {
  const [pageMode, setPageMode] = useState("general");

  const togglePageMode = () => {
    setPageMode((prevMode) =>
      prevMode === "general" ? "schedule" : "general"
    );
  };

  return (
    <Box
      sx={{
        height: "100vh",
        backgroundColor: "rgba(189, 220, 229, 0.5)",
      }}
    >
      {pageMode === "general" ? (
        <General onTogglePage={togglePageMode} value={pageMode} />
      ) : (
        <Schedule onTogglePage={togglePageMode} value={pageMode} />
      )}
    </Box>
  );
}
