/* eslint-disable react/prop-types */
import Typography from "@mui/material/Typography";
import { Switch } from "@mui/material";


export default function Setting({ checked, onChange }) {
  return (
    <div>
      <Typography id="modal-modal-title" variant="h7" component="h2">
        <div
        
          style={{
            display: "flex",
            alignItems: "center",
            
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <p style={{ fontSize: "1.5rem", color: "#fff" }}>DARK MODE</p>
            <Switch
            sx={{
              '& .MuiSwitch-track': {
                backgroundColor: '#fff', 
              },
              '& .Mui-checked + .MuiSwitch-track': {
                backgroundColor: 'black!important', 
              }
            }}
              checked={checked}
              onChange={onChange}
              style={{ color: "#fff" }}
            />
          </div>
        </div>
      </Typography>
    </div>
  );
}
