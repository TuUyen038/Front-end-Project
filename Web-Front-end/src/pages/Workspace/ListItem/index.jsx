/* eslint-disable react/prop-types */
import style from "./ListItem.module.css";
import Item from "../Item";
import { Link } from "react-router-dom";

const ListItem = ({ list, setLs, searchKey }) => {
  const filteredList = list.filter(
    (item) => item.title.toLowerCase().includes(searchKey.toLowerCase()) // Case insensitive search
  );

  return (
    <div>
      <ul className={style.Listitem}>
        {filteredList.length > 0 ? (
          filteredList.map((item) => (
            <li key={item._id}>
              <Link to={`${item.title}`} className={style.link}>
                <Item setLs={setLs} item={item} />
              </Link>
            </li>
          ))
        ) : (
          <p>No projects found</p>
        )}
      </ul>
    </div>
  );
};

export default ListItem;
