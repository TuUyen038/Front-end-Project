import { useState } from 'react';
import PropTypes from 'prop-types';

export default function JoinIn({ member, onAddMemLs, onClose }) {
  console.log('Props member: ', member);

  const [searchInput, setSearchInput] = useState('');
  const [tmpLs, setTmpLs] = useState([]);

  const filteredMembers = member.filter((mem) => {
    console.log('member: ', member);
    return (
      mem.name.toLowerCase().includes(searchInput.toLowerCase()) ||
      mem.email.toLowerCase().includes(searchInput.toLowerCase())
    );
  });

  // Kiểm tra thành viên đã được chọn chưa
  const isSelected = (mem) => tmpLs.some((item) => item.id === mem.id);

  return (
    <div className="task-join-in">
      <input
        placeholder="Search member"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
      <div className="member-list">
        {tmpLs.map((i) => (
          <>{i.name}</>
        ))}
        {filteredMembers.map((mem) => (
          <p
            key={mem.id}
            className={`member-item ${isSelected(mem) ? 'selected' : ''}`}
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
  member: PropTypes.array.isRequired,
  onAddMemLs: PropTypes.func,
  onClose: PropTypes.func.isRequired,
};
