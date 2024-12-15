/* eslint-disable react/prop-types */
import style from './ListItem.module.css';
import Item from '../Item';
import { Link } from 'react-router-dom';

const ListItem = ({ list, setLs, searchKey, setDl }) => {
  const filteredList = list.filter(
    (item) => item.title?.toLowerCase().includes(searchKey?.toLowerCase() || "")
  );
  return (
    <div>
      <ul className={style.Listitem}>
        {filteredList.length > 0 ? (
          filteredList.map((item) => (
            <li key={item._id}>
              <Link to={`${item.slug}`} className={style.link}>
              <Item setLs={setLs} item={item} setDl={setDl}/>
              </Link>
            </li>
          ))
        ) : (
          <p className="NoProject">No projects found</p>
        )}
      </ul>
    </div>
  );
};

export default ListItem;
