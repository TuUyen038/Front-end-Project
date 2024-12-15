import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

export default function JoinIn({
  member,
  cardMem,
  onAddMemLs,
  onClose,
  CloseJoinIn,
}) {
  console.log('Props member: ', member);

  const [searchInput, setSearchInput] = useState('');
  const [tmpLs, setTmpLs] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);

  // Kiểm tra thành viên đã được chọn chưa
  const isSelected = (mem) => tmpLs.some((item) => item.name === mem.name);

  useEffect(() => {
    const notInCardMem = cardMem
      ? member.filter(
          (mem) =>
            !cardMem.some((cm) => cm.id === mem.id) &&
            !tmpLs.some((tm) => tm.id === mem.id)
        )
      : member.filter((mem) => !tmpLs.some((tm) => tm.id === mem.id));

    setFilteredMembers(
      notInCardMem.filter((mem) => {
        console.log('NOT in card member: ', notInCardMem);
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
          <>Mem just added: </>
          {tmpLs.map((i) => (
            <p key={i}>{i.name}</p>
          ))}
          <br />
          <>Search result: </>
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
            onAddMemLs(tmpLs);
            onClose();
          }}
        >
          Add
        </button>
        <button className="cus-btn" onClick={CloseJoinIn}>
          Cancel
        </button>
      </div>
    </div>
  );
}

JoinIn.propTypes = {
  member: PropTypes.array.isRequired,
  cardMem: PropTypes.array,
  onAddMemLs: PropTypes.func,
  onClose: PropTypes.func.isRequired,
  CloseJoinIn: PropTypes.func,
};
