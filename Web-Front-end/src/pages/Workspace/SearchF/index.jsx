/* eslint-disable react/prop-types */
import { Button } from "@mui/material";
import "./SearchF.css";

export default function Search({ setKeySearch }) {
  const handleInput = (e) => {
    setKeySearch(e.target.value); 
  };

  return (
    <div>
      <input 
        className="keySearch" 
        type="text" 
        placeholder="Search..." 
        onChange={handleInput} 
      />
      <Button
      className="SearchF"
        sx={{
          fontSize: "1.1rem",
          background: "rgba(45, 149, 150, 0.04)",
          padding: "5px 0px",
        }}
      >
        Search
      </Button>
    </div>
  );
}
