/* eslint-disable react/prop-types */
import Deadline from "../Deadline";

const ListItem = ({ list }) => {
  if (list.length === 0) {
    return <p>No deadlines available.</p>;
  }
  let count = 0;
  return (
    <div>
      <ul>
        {list.map((item) => {
          count++;
          const deadline = item.deadline ? new Date(item.deadline) : null;
          if (count <= 3 && deadline) {
            const formattedDeadline = deadline.toLocaleDateString("vi-VN");
            return (
              <li key={item.id}>
                <Deadline title={item.title} time={formattedDeadline} />
              </li>
            );
          }
          return null;
        })}
      </ul>
    </div>
  );
};

export default ListItem;
