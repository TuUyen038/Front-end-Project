import "./App.css";
import Header from "./components/Header";
import Workspace from "./pages/Workspace";
import { Routes, Route, Navigate } from "react-router-dom";
import Calendar from "./pages/Calendar";
import Dashboard from "./pages/Dashboard/Dashboard";
import AppBar from "./pages/Dashboard/Components/Appbar";
import Meeting from "./pages/Meeting/Meeting";
import FileManager from "./pages/FileManager/FileManager";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import LoginForm from "./pages/Login/LoginForm";
import SignupForm from "./pages/Login/SignupForm";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import { useState, useEffect } from "react";
import ProtectedRoute from "./pages/Login/components/ProtectedRoute";
import ForgotPassword from "./pages/Login/ForgotPassword";
import VerifyAccount from "./pages/Login/VerifyAccount";
import ResetPassword from "./pages/Login/ResetPassword";

function App() {
  const users = [
    {
      id: "001",
      name: "Alex",
      avatar: "../images/alex.jpg",
      color: "",
    },

    {
      id: "002",
      name: "Anna",
      avatar: "../images/anna.jpg",
      color: "",
    },
    {
      id: "003",
      name: "Thomas",
      avatar: "../images/thomas.jpg",
      color: "",
    },
    {
      id: "004",
      name: "Katty",
      avatar: "../images/katty.jpg",
      color: "",
    },
  ];
  const [dl, setDl] = useState([]);


  const [toggleDarkMode, setToggleDarkMode] = useState(false);
  // const tasks = [
  //   {
  //     id: 1,
  //     description: 'doind somthing before this one',
  //     comments: [],
  //     members: [],
  //     deadline: '21/06/2024',
  //     attaches: [],
  //     doFollow: false,
  //   },
  // ];
  const toggleDarkTheme = () => {
    setToggleDarkMode(!toggleDarkMode);
  };
  const darkTheme = createTheme({
    palette: {
      mode: toggleDarkMode ? "dark" : "light",
      primary: {
        main: "#2D9596",
      },
      secondary: {
        main: "#131052",
      },
    },
  });

  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLoggedIn ? "true" : "false");
  }, [isLoggedIn]);

  return (
    <>
      {!isLoggedIn ? (
        <Routes>
          <Route
            path="/login"
            element={<LoginForm onLoginSuccess={() => setIsLoggedIn(true)} />}
          />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/forgot_password" element={<ForgotPassword />} />
          <Route path="/verify_account" element={<VerifyAccount />} />
          <Route path="/reset_password" element={<ResetPassword />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      ) : (
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <Header checked={toggleDarkMode} onChange={toggleDarkTheme} />

          <Routes>
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<Workspace dl={dl} setDl={setDl}/>} />
              <Route path="/calendar" element={<Calendar dl={dl} setDl={setDl} />} />
              <Route path="/:projectSlug/*" element={<AppBar users={users} />}>
                <Route index element={<Dashboard />} />
                <Route path="meeting" element={<Meeting />}></Route>
                <Route path="filemanager" element={<FileManager />}></Route>
              </Route>
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </ThemeProvider>
      )}
    </>
  );
}

export default App;
