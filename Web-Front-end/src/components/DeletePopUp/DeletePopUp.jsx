import { Box, Button, Modal, Stack } from "@mui/material";
import PropTypes from "prop-types";

export default function DeletePopUp({ open, onClose, onDelete }) {
  var dark = localStorage.getItem("darkMode") === "true";
  return (
    <div>
      <Modal
        open={open}
        onClose={onClose}
        sx={{
          height: "100vh",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          border: "solid 1px black",
        }}
      >
        <Box
          sx={{
            height: "10rem",
            width: "16rem",
            backgroundColor: dark ? "#555" : "white",
            // border: 'solid 1px black',
            borderRadius: "5px",
          }}
        >
          <h4
            style={{
              textAlign: "left",
              marginLeft: "1rem",
              //   border: 'solid 1px black',
            }}
          >
            Delete this?
          </h4>
          <Stack
            direction="row"
            sx={{ display: "flex", justifyContent: "space-around" }}
          >
            <Button
              variant="contained"
              onClick={onDelete}
              sx={{ backgroundColor: "#2D9596" }}
            >
              Sure
            </Button>
            <Button onClick={onClose} color="black">
              Cancel
            </Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}

DeletePopUp.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onDelete: PropTypes.func,
};
