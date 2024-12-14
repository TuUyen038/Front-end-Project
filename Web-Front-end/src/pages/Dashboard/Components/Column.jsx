import { Button, Input, Stack } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreIcon from '@mui/icons-material/MoreHoriz';
import Task from './Task';
import PropTypes from 'prop-types';
import DeletePopUp from '../../../components/DeletePopUp/DeletePopUp';
import AddNewTask from './AddNewTask';
import { getCardList } from '../service/card_service';
import { socket } from '../../../../setting/socket';
import { useDrop } from 'react-dnd';
import { ItemTypes } from '../dnd/constants';

export default function Column(props) {
  const [title, setTitle] = useState(props.title || 'New');
  const [tasks, setTasks] = useState([]);
  const [openDeletePopUp, setOpenDeletePopUp] = useState(false);
  const [openTaskPopUp, setOpenTaskPopUp] = useState(false);
  const [tempTask, setTempTask] = useState({});
  const ref = useRef();

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        if (title.trim() && title !== props.title) {
          console.log(title);
          socket.emit('updateColumn', props.column_id, { title });
          console.log('emit update column title');
        } else if (!title.trim()) {
          // toast
          setTitle(props.title);
        }
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        console.log(title);
        if (title.trim() && title !== props.title) {
          socket.emit('updateColumn', props.column_id, { title });
          console.log('emit update column title');
        } else if (!title.trim()) {
          // toast
          setTitle(props.title);
        }
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [title, props.title]);

  useEffect(() => {
    getCardList(props.column_id)
      .then((data) => {
        if (!data) console.log('COLUMN: can get card list');
        else {
          setTasks(data);
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [props.column_id]);

  useEffect(() => {
    const addCard = (newCard) => {
      console.log('BE emit lai');
      if (newCard.columnId === props.column_id)
        setTasks((prev) => [...prev, newCard]);
    };

    const deleteCard = (id) => {
      setTasks((prev) => prev.filter((card) => card._id !== id));
    };

    socket.on('cardAdded', addCard);
    socket.on('cardDeleted', deleteCard);

    return () => {
      socket.off('cardAdded', addCard);
      socket.off('cardDeleted', deleteCard);
    };
  });

  const handleAddCard = (payload) => {
    let newCard = {
      ...payload,
      columnId: props.column_id,
      boardId: props.board_id,
    };
    socket.emit('addCard', newCard, (response) => {
      if (response.success) {
        console.log('da emit add card thanh cong');
        // const cardData = response.data;
        // setTasks(cardData);
      } else {
        console.log('COLUMN: Fail to add card, Error: ' + response.error);
      }
    });

    setTempTask({});

    // else pop up sth like "make a new task unsuccess cause of null error"
    setOpenTaskPopUp(false);
  };

  const handleDeleteCard = (id) => {
    setTasks((prev) => prev.filter((card) => card._id !== id));
    socket.emit('deleteCard', id);
  };

  const columnRef = useRef(null);
  const [hoverIndex, setHoverIndex] = useState(0);
  const hoverIndexRef = useRef(hoverIndex);

  useEffect(() => {
    hoverIndexRef.current = hoverIndex; // Cập nhật ref khi hoverIndex thay đổi
  }, [hoverIndex]);

  const getHoverIndex = (monitor, ref, cardCount) => {
    if (!ref.current) return cardCount;

    const hoverBoundingRect = ref.current.getBoundingClientRect(); // Kích thước container
    const clientOffset = monitor.getClientOffset(); // Tọa độ con trỏ chuột

    if (!clientOffset) return cardCount;

    const hoverClientY =
      clientOffset.y - hoverBoundingRect.top + ref.current.scrollTop;

    const childNodes = ref.current.children;

    if (!childNodes.length) return 0;

    if (childNodes.length === 1) {
      const cardTop = childNodes[0].offsetTop;
      const cardHeight = childNodes[0].offsetHeight;

      // Nếu hover nằm ở phía trên thẻ duy nhất, trả về index 0
      if (hoverClientY < cardTop + cardHeight / 2) {
        return 0;
      }

      // Nếu hover nằm ở phía dưới thẻ duy nhất, trả về index 1 (thêm vào cuối)
      return 1;
    }

    let cumulativeHeight = 0;
    for (let i = 0; i < childNodes.length; i++) {
      const cardHeight = childNodes[i].offsetHeight;

      if (
        hoverClientY >= cumulativeHeight &&
        hoverClientY < cumulativeHeight + cardHeight
      ) {
        return i; // Vị trí chuột nằm trong thẻ này
      }

      cumulativeHeight += cardHeight;
    }

    // Nếu vượt qua chiều cao của tất cả các thẻ, trả về cardCount
    return cardCount;
  };

  const [, drop] = useDrop(() => ({
    accept: ItemTypes.CARD,
    hover: (item, monitor) => {
      if (!monitor.isOver()) return;
      if (
        item.index === hoverIndexRef.current &&
        item.columnId === props.column_id
      )
        return;

      const calculatedHoverIndex = getHoverIndex(
        monitor,
        columnRef,
        tasks.length
      );

      if (
        calculatedHoverIndex !== hoverIndex ||
        item.columnId !== props.column_id
      ) {
        setHoverIndex(calculatedHoverIndex);
        hoverIndexRef.current = calculatedHoverIndex; // Cập nhật giá trị ref ngay lập tức
      }

      console.log('hover index', calculatedHoverIndex);
      console.log('Hover index', hoverIndexRef.current);
    },
    drop: (item, monitor) => {
      if (!item || monitor.didDrop() || !monitor.isOver()) return undefined;

      if (props.column_id === item.columnId) {
        setTasks((pre) => {
          const updatedTasks = [...pre];
          updatedTasks.splice(item.index, 1);
          return updatedTasks;
        });
      }

      setTasks((pre) => {
        const updatedTasks = [...pre];
        updatedTasks.splice(hoverIndexRef.current, 0, item);
        item.index = hoverIndexRef.current;
        return updatedTasks;
      });

      socket.emit(
        'moveCard',
        item._id,
        props.column_id.toString(),
        parseInt(hoverIndexRef.current)
      );

      return { columnId: props.column_id };
    },
  }));

  useEffect(() => {
    const handleCardMoved = (oldCol, newCol) => {
      if (props.column_id === oldCol._id) {
        getCardList(oldCol._id).then(setTasks);
      }
      if (props.column_id === newCol._id) {
        getCardList(newCol._id).then(setTasks);
      }
    };

    socket.on('cardMoved', handleCardMoved);
    return () => {
      socket.off('cardMoved', handleCardMoved);
    };
  }, [props.column_id]);

  return (
    <Stack
      ref={ref}
      className="Column"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        /* dang dung theo thong so tren may, can dieu chinh lai */
      }} // not this one
    >
      <Stack className="Top">
        <Stack className="Title" direction="row">
          <Input
            value={title}
            onChange={(e) => {
              console.log(title);
              setTitle(e.target.value);
            }}
            sx={{ fontSize: '1.6rem' }}
          />
          <MoreIcon sx={{ fontSize: '2.4rem' }} />
        </Stack>
        <Stack
          className="Main"
          ref={(node) => {
            columnRef.current = node;
            drop(node);
          }}
          sx={{
            height: 'auto',
            paddingTop: 2,
            minHeight: 100,
          }}
        >
          {tasks.map((task, index) => {
            return (
              <Task
                key={task._id}
                task={task}
                index={index}
                className="Task"
                onDelete={() => handleDeleteCard(task._id)}
                member={props.member}
                // onSetTasks={setTasks}
              ></Task>
            );
          })}
        </Stack>
      </Stack>
      <Stack
        className="Bottom"
        direction="row"
        sx={{
          display: 'flex',
          justifyContent: 'space-between', // cho 2 cai icon nam o 2 ben
          height: '2.4rem',
          width: '100%',
          // border: 'solid black 1px',
          marginTop: '1.5rem', // not this one
        }}
      >
        <Button onClick={() => setOpenTaskPopUp(true)} title="add">
          <AddIcon className="Icon" sx={{ fontSize: '2.4rem' }} />
        </Button>

        <Button onClick={() => setOpenDeletePopUp(true)} title="delete">
          <DeleteIcon className="Icon" sx={{ fontSize: '2.4rem' }} />
        </Button>
      </Stack>
      <DeletePopUp
        open={openDeletePopUp}
        onClose={() => setOpenDeletePopUp(false)}
        onDelete={props.delete}
      />
      <AddNewTask
        open={openTaskPopUp}
        onClose={() => setOpenTaskPopUp(false)}
        onSave={() =>
          handleAddCard({
            title: tempTask.title,
            description: tempTask.description,
          })
        }
        setTempTask={(payload) =>
          setTempTask((pre) => ({ ...pre, ...payload }))
        }
      />
    </Stack>
  );
}

Column.propTypes = {
  title: PropTypes.string,
  column_id: PropTypes.string,
  board_id: PropTypes.string,
  delete: PropTypes.func,
  moveCard: PropTypes.func,
  member: PropTypes.array,
  onUpdate: PropTypes.func,
};
