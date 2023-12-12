import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkRemoveIcon from '@mui/icons-material/BookmarkRemove';
import EditIcon from '@mui/icons-material/Edit';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import { useNavigate } from 'react-router-dom';

import * as React from 'react';


const actions = [
  { icon: <EditIcon />, name: 'Edit Bookmarks', path: '/bookmarks' },
  { icon: <BookmarkRemoveIcon />, name: 'Delete Bookmarks', path: '/delete-bookmarks' },
  { icon: <BookmarkBorderIcon />, name: 'Go To Bookmarks', path: '/bookmarks' },
];

export default function BookmarkOptions() {
    const navigate = useNavigate();

    const handleClick = (path) => {
      navigate(path);
    };
  return (
    <Box sx={{ height: 320, transform: 'translateZ(0px)', flexGrow: 1 }}>
      <SpeedDial
        ariaLabel="SpeedDial openIcon example"
        sx={{position: 'absolute', bottom: 16, right: 16 }}
        icon={<SpeedDialIcon icon={<StarBorderIcon />} openIcon={<EditIcon />} />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={() => handleClick(action.path)}
          />
        ))}
      </SpeedDial>
    </Box>
  );
}
