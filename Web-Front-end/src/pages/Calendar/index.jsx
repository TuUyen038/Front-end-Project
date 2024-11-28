/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from "react";
import dayjs from "dayjs";
import Badge from "@mui/material/Badge";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { DayCalendarSkeleton } from "@mui/x-date-pickers/DayCalendarSkeleton";
import { red } from "@mui/material/colors";
import "./Calendar.css"

function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function fakeFetch(date, { signal }) {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      const daysInMonth = date.daysInMonth();
      const daysToHighlight = [1, 2, 3].map(() =>
        getRandomNumber(1, daysInMonth)
      );

      resolve({ daysToHighlight });
    }, 500);

    signal.onabort = () => {
      clearTimeout(timeout);
      reject(new DOMException("aborted", "AbortError"));
    };
  });
}
let currentDate = new Date();
const initialValue = dayjs(currentDate);

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
          border: '0.5px solid #9999', // Thêm border cho mỗi ngày (màu cam)
          borderRadius: '50%',         // Tạo hình tròn cho border
          '&:hover': {
            borderColor: '#7777',   // Đổi màu border khi hover
          },
        }}
      />
    </Badge>
  );
}

export default function Calendar() {
  const requestAbortController = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [highlightedDays, setHighlightedDays] = useState([1, 2, 15]);

  const fetchHighlightedDays = (date) => {
    const controller = new AbortController();
    fakeFetch(date, {
      signal: controller.signal,
    })
      .then(({ daysToHighlight }) => {
        setHighlightedDays(daysToHighlight);
        setIsLoading(false);
      })
      .catch((error) => {
        // Bỏ qua lỗi nếu là lỗi do `controller.abort`
        if (error.name !== "AbortError") {
          throw error;
        }
      });

    requestAbortController.current = controller;
  };

  useEffect(() => {
    fetchHighlightedDays(initialValue);
    // Hủy yêu cầu khi component unmount
    return () => requestAbortController.current?.abort();
  }, []);

// {  const handleMonthChange = (date) => {
//     if (requestAbortController.current) {
//       // Hủy bỏ yêu cầu không cần thiết nếu người dùng chuyển tháng nhanh chóng
//       requestAbortController.current.abort();
//     }

//     setIsLoading(true);
//     setHighlightedDays([]);
//     fetchHighlightedDays(date);
//   };}

  return (
    
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        defaultValue={initialValue}
        loading={isLoading}
        //onMonthChange={handleMonthChange}
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
          fontSize: '1.2rem',   // Tăng kích thước chữ
          width: '300px',       // Tăng chiều rộng calendar
          height: '700px',      // Tăng chiều cao calendar
          maxWidth: '100%',     // Đảm bảo không vượt quá chiều rộng của container cha
        }}
      />
    </LocalizationProvider>
  );
}
