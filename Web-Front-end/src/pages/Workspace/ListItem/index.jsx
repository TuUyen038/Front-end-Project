/* eslint-disable react/prop-types */
import style from "./ListItem.module.css";
import Item from "../Item";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";
const ListItem = ({ list, setLs }) => {
  return (
    <div>
      <ul className={style.Listitem}>
        {list.map((item) => (
          <li key={uuidv4()}>
            <Link to={`${item.title}`} className={style.link}>
              <Item setLs={setLs} item={item} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default ListItem;
