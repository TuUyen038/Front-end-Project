/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import Badge from "@mui/material/Badge";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { DayCalendarSkeleton } from "@mui/x-date-pickers/DayCalendarSkeleton";
import { red } from "@mui/material/colors";
import "./Calendar.css";
import { getDeadline, getListDeadline } from "../Workspace/services";
import { FilteredList } from "./FilteredList";

const initialValue = dayjs();

function ServerDay(props) {
  const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;

  const isSelected =
    !outsideCurrentMonth && highlightedDays.indexOf(day.date()) >= 0;

  return (
    <Badge
      key={day.toString()}
      overlap="circular"
      badgeContent={
        isSelected ? (
          <span
            style={{
              display: "inline-block",
              width: "0.5rem",
              height: "0.5rem",
              borderRadius: "50%",
              backgroundColor: red[500],
            }}
          />
        ) : undefined
      }
    >
      <PickersDay
        {...other}
        outsideCurrentMonth={outsideCurrentMonth}
        day={day}
        sx={{
          fontSize: "1.2rem",
          border: "0.5px solid #9999",
          borderRadius: "50%",
          "&:hover": {
            borderColor: "#7777",
          },
        }}
      />
    </Badge>
  );
}

export default function Calendar() {
  var dark = localStorage.getItem("darkMode")
  const selectedDate = initialValue;
  const [highlightedDays, setHighlightedDays] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(dayjs().month());
  const [selectedYear, setSelectedYear] = useState(dayjs().year());
  const [filteredLs, setFilteredLs] = useState([]);
  const handleMonthChange = (newDate) => {
    setSelectedMonth(newDate.month());
    setSelectedYear(newDate.year());
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const deadlineIds = await getListDeadline();
        const deadlines = await Promise.all(
          deadlineIds.map((id) => getDeadline(id))
        );

        setFilteredLs(
          deadlines.sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
        );
        const highlighted = deadlines
          .filter((item) => {
            const dl = dayjs(item.deadline);
            return (
              dl.year() === selectedYear &&
              dl.month() === selectedMonth &&
              initialValue <= dl
            );
          })
          .map((item) => dayjs(item.deadline).date());
        setHighlightedDays(highlighted);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu deadline: ", error);
      }
    };
    fetchData();
  }, [selectedMonth]);

  return (
    <div className="calendar">
      <LocalizationProvider dateAdapter={AdapterDayjs} className="calen">
        <DateCalendar
          value={selectedDate}
          onMonthChange={handleMonthChange}
          renderLoading={() => <DayCalendarSkeleton />}
          slots={{
            day: ServerDay,
          }}
          slotProps={{
            day: {
              highlightedDays,
            },
          }}
          sx={{
            fontSize: "1.2rem",
            width: "300px",
            height: "700px",
            maxWidth: "100%",
          }}
        />
      </LocalizationProvider>
      <div
        className="calendar-content"
        style={{
          backgroundColor: dark
            ? "hsla(163, 36%, 71%, 0.288)"
            : "rgb(243, 239, 239)",
        }}
      >
        <div className="name">
          <p className="titleC"> List Deadline</p>
        </div>
        <div className="calender-main-content">
          {filteredLs.length !== 0 ? (
            <FilteredList list={filteredLs}/>
          ) : (
            <p style={{ fontSize: "1.5rem", height: "540px" }}>No deadline</p>
          )}
        </div>
      </div>
    </div>
  );
}
