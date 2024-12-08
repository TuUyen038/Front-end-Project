import { useState } from 'react';
import PropTypes from 'prop-types';

export default function JoinIn({ memberList, onAddMemLs, onClose }) {
  const [searchInput, setSearchInput] = useState('');
  const [tmpLs, setTmpLs] = useState([]);
  return (
    <div className="task-join-in">
      <input
        placeholder="search member"
        onChange={(e) => setSearchInput(e.target.value)}
      />
      {memberList.map((mem) => {
        mem.name.toLowerCase().includes(searchInput.toLowerCase()) ? (
          <p onClick={() => setTmpLs((prev) => [...prev, mem])}>{mem.name}</p>
        ) : null;
      })}
      <button
        onClick={() => {
          onAddMemLs(tmpLs);
          onClose();
        }}
      >
        Add
      </button>
    </div>
  );
}

JoinIn.propTypes = {
  memberList: PropTypes.array,
  onAddMemLs: PropTypes.func,
  onClose: PropTypes.func,
};
