import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

export default function RemoveMem({
  cardMem,
  onRemoveMem,
  onClose,
  CloseRemoveMem,
}) {
  const [searchInput, setSearchInput] = useState('');
  const [tmpLs, setTmpLs] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);

  // Kiểm tra thành viên đã được chọn chưa
  const isSelected = (mem) => tmpLs.some((item) => item.name === mem.name);

  useEffect(() => {
    setFilteredMembers(
      cardMem.filter((mem) => {
        return (
          !isSelected(mem) &&
          (mem.name.toLowerCase().includes(searchInput.toLowerCase()) ||
            mem.email.toLowerCase().includes(searchInput.toLowerCase()))
        );
      })
    );
  }, [searchInput, tmpLs]);

  var dark = localStorage.getItem('darkMode') === 'true';
  return (
    <div
      style={{ background: dark ? '#999' : 'white' }}
      className="task-join-in"
    >
      <input
        placeholder="Search member"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
      <div className="container">
        <div className="member-list">
          <div className="mem-css">Mem just removed: </div>
          {tmpLs.map((i) => (
            <p key={i}>{i.name}</p>
          ))}
          <br />
          <div className="mem-css">Search result: </div>
          {filteredMembers.map((mem) => (
            <p
              key={mem.id}
              onClick={() => {
                if (!isSelected(mem)) {
                  setTmpLs((prev) => [...prev, mem]);
                }
              }}
            >
              {mem.name}
            </p>
          ))}
        </div>
        <button
          className="cus-btn"
          onClick={() => {
            onRemoveMem(tmpLs);
            onClose();
          }}
        >
          Remove
        </button>
        <button className="cus-btn" onClick={CloseRemoveMem}>
          Cancel
        </button>
      </div>
    </div>
  );
}

RemoveMem.propTypes = {
  cardMem: PropTypes.array,
  onRemoveMem: PropTypes.func,
  onClose: PropTypes.func.isRequired,
  CloseRemoveMem: PropTypes.func,
};
