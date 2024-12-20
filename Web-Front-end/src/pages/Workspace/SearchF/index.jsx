/* eslint-disable react/prop-types */
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
      
    </div>
  );
}
