import './App.css';
import Header from './components/Header';
import Workspace from './pages/Workspace';
import { Routes, Route } from 'react-router-dom';
import Calendar from './pages/Calendar';
import Dashboard from './pages/Dashboard/Dashboard';
import AppBar from './pages/Dashboard/Components/Appbar';
import Meeting from './pages/Meeting/Meeting';
import FileManager from './pages/FileManager/FileManager';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import LoginForm from './pages/Login/LoginForm';
import SignupForm from './pages/Login/SignupForm';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import { useState } from 'react';
import { getProjects } from './Data/project_service';

function App() {
  // const deadline = [
  //   {
  //     img: '../image/img1.jfif',
  //     isHaveDeadline: true,
  //     time: '29-10-2024',
  //     name: 'Lap trinh truc quan',
  //   },
  //   {
  //     img: '../image/img2.jfif',
  //     isHaveDeadline: true,
  //     time: '28-10-2024',
  //     name: 'Dennis Robin(1) Dennis Robin(2) Dennis Robin(3)',
  //   },
  //   {
  //     img: '../image/img4.jfif',
  //     isHaveDeadline: true,
  //     time: '01-12-2024',
  //     name: 'Nhập môn mạng',
  //   },
  //   {
  //     img: '../image/img5.jfif',
  //     isHaveDeadline: false,
  //     name: 'Trường đại học công nghệ thông tin - Đại học quốc gia thành phố Hồ Chí Minh',
  //   },
  //   {
  //     img: '../image/img5.jfif',
  //     isHaveDeadline: false,
  //     name: 'Khoa Công nghệ phần mềm - Trường đại học công nghệ thông tin',
  //   },
  //   {
  //     img: '../image/img5.jfif',
  //     isHaveDeadline: true,
  //     time: '01-12-2024',
  //     name: 'Khoa Hệ thống thông tin - Trường đại học công nghệ thông tin',
  //   },
  //   {
  //     img: '../image/img5.jfif',
  //     isHaveDeadline: true,
  //     time: '20-11-2024',
  //     name: 'Khoa Mạng máy tính và truyền thông - Trường đại học công nghệ thông tin',
  //   },
  // ];
  const users = [
    {
      id: '001',
      name: 'Alex',
      avatar: '../images/alex.jpg',
      color: '',
    },

    {
      id: '002',
      name: 'Anna',
      avatar: '../images/anna.jpg',
      color: '',
    },
    {
      id: '003',
      name: 'Thomas',
      avatar: '../images/thomas.jpg',
      color: '',
    },
    {
      id: '004',
      name: 'Katty',
      avatar: '../images/katty.jpg',
      color: '',
    },
  ];

  // const boards = [
  //   {
  //     id: 1,
  //     title: 'Board 1',
  //     columns: [
  //       {
  //         id: 0,
  //         title: 'TO DO board 1',
  //         tasks: [
  //           {
  //             id: 0,
  //             title: 'Learn JS',
  //           },
  //           {
  //             id: 1,
  //             title: 'Learn C#',
  //           },
  //           {
  //             id: 2,
  //             title: 'Learn PHP',
  //           },
  //         ],
  //       },
  //       {
  //         id: 1,
  //         title: 'DOING',
  //         tasks: [
  //           {
  //             id: 0,
  //             title: 'Learn JS',
  //           },
  //           {
  //             id: 1,
  //             title: 'Learn C#',
  //           },
  //           {
  //             id: 2,
  //             title: 'Learn PHP',
  //           },
  //         ],
  //       },
  //       {
  //         id: 2,
  //         title: 'DONE',
  //         tasks: [
  //           {
  //             id: 0,
  //             title: 'Learn JS',
  //           },
  //           {
  //             id: 1,
  //             title: 'Learn C#',
  //           },
  //           {
  //             id: 2,
  //             title: 'Learn PHP',
  //           },
  //         ],
  //       },
  //       {
  //         id: 3,
  //         title: 'PLANNING',
  //         tasks: [
  //           {
  //             id: 0,
  //             title: 'Learn JS',
  //           },
  //           {
  //             id: 1,
  //             title: 'Learn C#',
  //           },
  //           {
  //             id: 2,
  //             title: 'Learn PHP',
  //           },
  //         ],
  //       },
  //       {
  //         id: 4,
  //         title: 'OTHERS',
  //         tasks: [
  //           {
  //             id: 0,
  //             title: 'Learn JS',
  //           },
  //           {
  //             id: 1,
  //             title: 'Learn C#',
  //           },
  //           {
  //             id: 2,
  //             title: 'Learn PHP',
  //           },
  //         ],
  //       },
  //     ],
  //   },
  //   {
  //     id: 2,
  //     title: 'Board 2',
  //     columns: [
  //       {
  //         id: 0,
  //         title: 'TO DO board 2',
  //         tasks: [
  //           {
  //             id: 0,
  //             title: 'Learn JS',
  //           },
  //           {
  //             id: 1,
  //             title: 'Learn C#',
  //           },
  //           {
  //             id: 2,
  //             title: 'Learn PHP',
  //           },
  //         ],
  //       },
  //       {
  //         id: 1,
  //         title: 'DOING',
  //         tasks: [
  //           {
  //             id: 0,
  //             title: 'Learn JS',
  //           },
  //           {
  //             id: 1,
  //             title: 'Learn C#',
  //           },
  //           {
  //             id: 2,
  //             title: 'Learn PHP',
  //           },
  //         ],
  //       },
  //       {
  //         id: 2,
  //         title: 'DONE',
  //         tasks: [
  //           {
  //             id: 0,
  //             title: 'Learn JS',
  //           },
  //           {
  //             id: 1,
  //             title: 'Learn C#',
  //           },
  //           {
  //             id: 2,
  //             title: 'Learn PHP',
  //           },
  //         ],
  //       },
  //       {
  //         id: 3,
  //         title: 'PLANNING',
  //         tasks: [
  //           {
  //             id: 0,
  //             title: 'Learn JS',
  //           },
  //           {
  //             id: 1,
  //             title: 'Learn C#',
  //           },
  //           {
  //             id: 2,
  //             title: 'Learn PHP',
  //           },
  //         ],
  //       },
  //       {
  //         id: 4,
  //         title: 'OTHERS',
  //         tasks: [
  //           {
  //             id: 0,
  //             title: 'Learn JS',
  //           },
  //           {
  //             id: 1,
  //             title: 'Learn C#',
  //           },
  //           {
  //             id: 2,
  //             title: 'Learn PHP',
  //           },
  //         ],
  //       },
  //     ],
  //   },
  //   {
  //     id: 3,
  //     title: 'Board 3',
  //     columns: [
  //       {
  //         id: 0,
  //         title: 'TO DO board 3',
  //         tasks: [
  //           {
  //             id: 0,
  //             title: 'Learn JS',
  //           },
  //           {
  //             id: 1,
  //             title: 'Learn C#',
  //           },
  //           {
  //             id: 2,
  //             title: 'Learn PHP',
  //           },
  //         ],
  //       },
  //       {
  //         id: 1,
  //         title: 'DOING',
  //         tasks: [
  //           {
  //             id: 0,
  //             title: 'Learn JS',
  //           },
  //           {
  //             id: 1,
  //             title: 'Learn C#',
  //           },
  //           {
  //             id: 2,
  //             title: 'Learn PHP',
  //           },
  //         ],
  //       },
  //       {
  //         id: 2,
  //         title: 'DONE',
  //         tasks: [
  //           {
  //             id: 0,
  //             title: 'Learn JS',
  //           },
  //           {
  //             id: 1,
  //             title: 'Learn C#',
  //           },
  //           {
  //             id: 2,
  //             title: 'Learn PHP',
  //           },
  //         ],
  //       },
  //       {
  //         id: 3,
  //         title: 'PLANNING',
  //         tasks: [
  //           {
  //             id: 0,
  //             title: 'Learn JS',
  //           },
  //           {
  //             id: 1,
  //             title: 'Learn C#',
  //           },
  //           {
  //             id: 2,
  //             title: 'Learn PHP',
  //           },
  //         ],
  //       },
  //       {
  //         id: 4,
  //         title: 'OTHERS',
  //         tasks: [
  //           {
  //             id: 0,
  //             title: 'Learn JS',
  //           },
  //           {
  //             id: 1,
  //             title: 'Learn C#',
  //           },
  //           {
  //             id: 2,
  //             title: 'Learn PHP',
  //           },
  //         ],
  //       },
  //     ],
  //   },
  //   {
  //     id: 4,
  //     title: 'Board 4',
  //     columns: [
  //       {
  //         id: 0,
  //         title: 'board 4 TO DO',
  //         tasks: [
  //           {
  //             id: 0,
  //             title: 'Learn JS',
  //           },
  //           {
  //             id: 1,
  //             title: 'Learn C#',
  //           },
  //           {
  //             id: 2,
  //             title: 'Learn PHP',
  //           },
  //         ],
  //       },
  //       {
  //         id: 1,
  //         title: 'DOING',
  //         tasks: [
  //           {
  //             id: 0,
  //             title: 'Learn JS',
  //           },
  //           {
  //             id: 1,
  //             title: 'Learn C#',
  //           },
  //           {
  //             id: 2,
  //             title: 'Learn PHP',
  //           },
  //         ],
  //       },
  //       {
  //         id: 2,
  //         title: 'DONE',
  //         tasks: [
  //           {
  //             id: 0,
  //             title: 'Learn JS',
  //           },
  //           {
  //             id: 1,
  //             title: 'Learn C#',
  //           },
  //           {
  //             id: 2,
  //             title: 'Learn PHP',
  //           },
  //         ],
  //       },
  //       {
  //         id: 3,
  //         title: 'PLANNING',
  //         tasks: [
  //           {
  //             id: 0,
  //             title: 'Learn JS',
  //           },
  //           {
  //             id: 1,
  //             title: 'Learn C#',
  //           },
  //           {
  //             id: 2,
  //             title: 'Learn PHP',
  //           },
  //         ],
  //       },
  //       {
  //         id: 4,
  //         title: 'OTHERS',
  //         tasks: [
  //           {
  //             id: 0,
  //             title: 'Learn JS',
  //           },
  //           {
  //             id: 1,
  //             title: 'Learn C#',
  //           },
  //           {
  //             id: 2,
  //             title: 'Learn PHP',
  //           },
  //         ],
  //       },
  //     ],
  //   },
  // ];

  // const files = [
  //   {
  //     id: 0,
  //     name: 'File word',
  //   },
  //   {
  //     id: 1,
  //     name: 'File pdf',
  //   },
  //   {
  //     id: 2,
  //     name: 'File ppt',
  //   },
  //   {
  //     id: 3,
  //     name: 'File png',
  //   },
  //   {
  //     id: 4,
  //     name: 'File mp3',
  //   },
  //   {
  //     id: 5,
  //     name: 'File mp4',
  //   },
  // ];

  const projects = getProjects(1);

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
      mode: toggleDarkMode ? 'dark' : 'light',
      primary: {
        main: '#2D9596',
      },
      secondary: {
        main: '#131052',
      },
    },
  });
  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Header checked={toggleDarkMode} onChange={toggleDarkTheme} />

        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/" element={<Workspace list={projects} />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path={'/:projectSlug/*'} element={<AppBar users={users} />}>
            <Route index element={<Dashboard />} />
            <Route path="meeting" element={<Meeting />}></Route>
            <Route path="filemanager" element={<FileManager />}></Route>
          </Route>
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/:name" />
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
