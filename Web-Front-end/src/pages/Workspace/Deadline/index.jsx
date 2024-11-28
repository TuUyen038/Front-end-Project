/* eslint-disable react/prop-types */
import style from "./Deadline.module.css";

function Deadline({ title, time }) {
  return (
    <div className={style.Item}>
      <div className={style.Time}>
        <p>{time}</p>
      </div>
      <div className={style.Name}>
        <p>{title}</p>
      </div>
    </div>
  );
}
export default Deadline;
