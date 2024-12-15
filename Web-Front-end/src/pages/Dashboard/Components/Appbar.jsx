// import { Avatar } from '@mui/material';
// import ShareIcon from '@mui/icons-material/ShareOutlined';
// import MoreIcon from '@mui/icons-material/MoreHoriz';
import { Link, Outlet, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { getProjectBySlug } from '../../../apis/project_service';
import NotFoundPage from '../../NotFoundPage/NotFoundPage';

export default function AppBar() {
  const { projectSlug } = useParams();
  const [project, setProject] = useState();

  useEffect(() => {
    getProjectBySlug(projectSlug).then((data) => {
      if (!data) console.log('no data');
      else setProject(data);
    });
  }, []);

  if (!project) return <NotFoundPage />;
  else
    return (
      <>
        <div className="AppBar">
          <div className="LeftSide">
            <div className="ProjectTitle">
              <Link to="" className="ProjectName">
                <h2>{project.title}</h2>
              </Link>
            </div>
            <div className="Others">
              {/* <Link to="meeting" className="MeetLink">
                Meeting
              </Link>
              <Link to="filemanager" className="FileManager">
                FileManager
              </Link> */}
            </div>
          </div>
          <div className="RightSide">
            {/* <div className="AvatarContainer">
              {project.userOrderIds.map((user) => {
                return (
                  <Avatar
                    key={user.id} // backend, chua thay co id cho user
                    alt={user.name}
                    src={user.avatar}
                    sx={{ width: '2.8rem', height: '2.8rem' }}
                  ></Avatar>
                );
              })}
            </div> */}
            <div className="Icon">
              {/* <ShareIcon sx={{ fontSize: '2.4rem' }} />
              <MoreIcon sx={{ fontSize: '2.4rem' }} /> */}
            </div>
          </div>
        </div>
        <Outlet context={{ project_id: project.id }} />
      </>
    );
}

AppBar.propTypes = {
  users: PropTypes.array,
};
