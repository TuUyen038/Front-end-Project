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
import ListDeadline from "../Workspace/ListDeadline"
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
  const [selectedDate, setSelectedDate] = useState(initialValue);
  const [highlightedDays, setHighlightedDays] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(dayjs().month()); // Tháng hiện tại
  const [selectedYear, setSelectedYear] = useState(dayjs().year()); // Năm hiện tại
  const [dl, setDl] = useState([])
  const handleMonthChange = (newDate) => {
    setSelectedMonth(newDate.month()); // Lấy tháng mới
    setSelectedYear(newDate.year()); // Lấy năm mới
  };
  const handleDateChange = (newDate) => {
    setSelectedDate(newDate); // Cập nhật ngày được chọn

    // Kiểm tra deadline của ngày được chọn
    const formattedDate = newDate.format("YYYY-MM-DD");
    const deadline = dl.find((d) => d.date === formattedDate);
    return (
<ListDeadline/>
    )
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const deadlineIds = await getListDeadline();
        const deadlines = await Promise.all(
          deadlineIds.map((id) => getDeadline(id))
        );
        setDl(deadlines)
        const highlighted = deadlines
        .filter((item) => {
          
          const dl = dayjs(item.deadline);
          return (
            dl.year() === selectedYear &&
            dl.month() === selectedMonth
          );
        })
        .map((item) => 
          dayjs(item.deadline).date()
        )
        setHighlightedDays(highlighted);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu deadline: ", error);
      }
    };
    fetchData();
  }, [selectedMonth]);

  return (
    <div className="calendar">
      <LocalizationProvider dateAdapter={AdapterDayjs} className="calendar">
        <DateCalendar
          value={selectedDate}
          onChange={handleDateChange} 
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
      <div className="calendar-content">
        <div className="calender-main-content">
          <h3></h3>
        </div>
      </div>
    </div>
  );
}
