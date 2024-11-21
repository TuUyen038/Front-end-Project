import { Avatar } from '@mui/material';
import ShareIcon from '@mui/icons-material/ShareOutlined';
import MoreIcon from '@mui/icons-material/MoreHoriz';
import { Link, Outlet, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getProjectBySlug } from '../../../Data/project_service';
import { useEffect } from 'react';

export default function AppBar({ users }) {
  const { projectSlug } = useParams();
  const project = getProjectBySlug(projectSlug);

  useEffect(() => {
    console.log(project);
  });
  return (
    <>
      <div className="AppBar">
        <div className="LeftSide">
          <div className="ProjectTitle">
            <Link to="" className="ProjectName">
              <h2>{project.name}</h2>
            </Link>
          </div>
          <div className="Others">
            <Link to="meeting" className="MeetLink">
              Meeting
            </Link>
            <Link to="filemanager" className="FileManager">
              FileManager
            </Link>
          </div>
        </div>
        <div className="RightSide">
          <div className="AvatarContainer">
            {users.map((user) => {
              return (
                <Avatar
                  key={user.id}
                  alt={user.name}
                  src={user.avatar}
                  sx={{ width: '2.8rem', height: '2.8rem' }}
                ></Avatar>
              );
            })}
          </div>
          <div className="Icon">
            <ShareIcon sx={{ fontSize: '2.4rem' }} />
            <MoreIcon sx={{ fontSize: '2.4rem' }} />
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
