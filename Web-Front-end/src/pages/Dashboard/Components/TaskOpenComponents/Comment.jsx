import { useEffect, useState } from 'react';
import { getUser } from '../../service/user_service';
import { Avatar } from '@mui/material';
import PropTypes from 'prop-types';

export default function Comment({ comment }) {
  const [username, setUsername] = useState('');

  // lấy user từ comment.userId
  useEffect(() => {
    getUser(comment.userId)
      .then((data) => {
        console.log('lay data tu fetch user thanh cong', data);
        setUsername(data.name);
      })
      .catch((error) => console.log(error.message));
  }, []);

  return (
    <div className="comment">
      <Avatar>{username}</Avatar>
      <span>{comment.description}</span>
    </div>
  );
}

Comment.propTypes = {
  comment: PropTypes.object,
};
