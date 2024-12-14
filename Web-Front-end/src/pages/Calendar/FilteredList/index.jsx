/* eslint-disable react/prop-types */
import FullDeadline from "../FullDeadline";

export const FilteredList = ({ list, dark }) => {
  if (list.length === 0) {
    return <p>No deadlines available.</p>;
  }
  return (
    <div>
      <ul style={{display: "block", height: "540px"}}>
        {list.map((item) => {
          const deadline = item.deadline ? new Date(item.deadline) : null;
          if (deadline ) {
            const formattedDeadline = deadline.toLocaleDateString("vi-VN");
            return (
              <li key={item._id}>
                <FullDeadline title={item.title} time={formattedDeadline} initialStatus={item.deadlinestatus} id={item._id} dark={dark}/>
              </li>
            );
          }
          return null;
        })}
      </ul>
    </div>
  );
};

