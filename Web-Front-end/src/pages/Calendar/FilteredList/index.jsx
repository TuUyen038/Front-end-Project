/* eslint-disable react/prop-types */
import FullDeadline from "../FullDeadline";

export const FilteredList = ({ list}) => {
  const check = list.filter((item) => item)
  if (list.length === 0 || !list || check.length === 0) {
    return <p style={{fontSize: "1.5rem", height: "540px", marginLeft: "30px"}}>No deadlines available.</p>;
  }
  return (
    <div>
      <ul style={{display: "block", height: "540px"}}>
        {list.map((item) => {
          if(!item) return null
          const deadline = item.deadline ? new Date(item.deadline) : null;
          if (deadline ) {
            const formattedDeadline = deadline.toLocaleDateString("vi-VN");
            return (
              <li key={item._id}>
                <FullDeadline title={item.title} time={formattedDeadline} initialStatus={item.deadlinestatus} id={item._id}/>
              </li>
            );
          }
          return null;
        })}
      </ul>
    </div>
  );
};

