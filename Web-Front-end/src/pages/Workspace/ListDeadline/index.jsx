/* eslint-disable react/prop-types */
import Deadline from "../Deadline";

const ListItem = ({ list }) => {
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
            const formattedDeadline = deadline.toLocaleString();
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
