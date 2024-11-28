/* eslint-disable react/prop-types */
import Deadline from "../Deadline";

const ListItem = ({ list }) => {
  if (list.length === 0) {
    return <p>Not have deadline</p>;
  }
  let countDeadline = 0;
  return (
    <div>
      <ul>
        {list.map((item) => {
          if (item.isHaveDeadline) {
            countDeadline++;
            if (countDeadline <= 4) {
              return (
                <li key={item.id}>
                  <Deadline name={item.name} time={item.time} />
                </li>
              );
            }
            return null;
          }
          return null;
        })}
      </ul>
    </div>
  );
};

export default ListItem;
