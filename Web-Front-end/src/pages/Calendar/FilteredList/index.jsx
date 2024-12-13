/* eslint-disable react/prop-types */
import FullDeadline from "../FullDeadline";

export const FilteredList = ({ list }) => {
  if (list.length === 0) {
    return <p>No deadlines available.</p>;
  }
  const currentDay = new Date();
  return (
    <div>
      <ul>
        {list.map((item) => {
          const deadline = item.deadline ? new Date(item.deadline) : null;
          if (deadline && deadline >= currentDay) {
            const formattedDeadline = deadline.toLocaleDateString("vi-VN");
            return (
              <li key={item._id}>
                <FullDeadline title={item.title} time={formattedDeadline} initialStatus={item.deadlinestatus} id={item._id} />
              </li>
            );
          }
          return null;
        })}
      </ul>
    </div>
  );
};

