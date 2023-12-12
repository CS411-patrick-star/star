import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkRemoveIcon from '@mui/icons-material/BookmarkRemove';
import EditIcon from '@mui/icons-material/Edit';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';


import * as React from 'react';


const actions = [
  { icon: <BookmarkAddIcon />, name: 'Add Bookmark', path: '/add-bookmark' },
  { icon: <EditIcon />, name: 'Edit Bookmarks', path: '/edit-bookmarks' },
  { icon: <BookmarkRemoveIcon />, name: 'Delete Bookmarks', path: '/delete-bookmarks' },
  { icon: <BookmarkBorderIcon />, name: 'Go To Bookmarks', path: '/bookmarks' },
];

export default function BookmarkOptions() {
  const navigate = useNavigate();
  const [showAddBookmarkForm, setShowAddBookmarkForm] = React.useState(false);
  const [showDeleteBookmarkForm, setShowDeleteBookmarkForm] = React.useState(false);
  const [showEditBookmarkForm, setShowEditBookmarkForm] = React.useState(false);
  
  const handleClick = (path) => {
    if (path === '/add-bookmark') {
    
      setShowAddBookmarkForm(true);
      setShowDeleteBookmarkForm(false);
      setShowEditBookmarkForm(false);
    }
    else if (path === '/delete-bookmarks') {
      setShowDeleteBookmarkForm(true);
      setShowAddBookmarkForm(false);
      setShowEditBookmarkForm(false);
    }
    else if (path === '/edit-bookmarks') {
      setShowEditBookmarkForm(true);
      setShowAddBookmarkForm(false);
      setShowDeleteBookmarkForm(false);
    }
    else {
      navigate(path);
    }
  };

  const handleEditBookmark = async () => {

    // the logic to select a bookmark to edit will be implemented into the speed dial after bookmarks are being displayed


  }
  
  const handleAddBookmark = async () => {
    const websiteId = "your-website-id";
    const bookmarkName = "your-bookmark-name";
    const bookmarkDescription = "your-bookmark-description";
    const dateAdded = "your-date-added";
    const addition = "your-addition";
    const baseUrl = "your-base-url";

    const formData = new FormData();
    formData.append("websiteId", websiteId);
    formData.append("bookmarkName", bookmarkName);
    formData.append("bookmarkDescription", bookmarkDescription);
    formData.append("dateAdded", dateAdded);
    formData.append("addition", addition);
    formData.append("baseUrl", baseUrl);

    try {
      const response = await fetch("http://localhost:8080/api/v1/bookmarks/newBookmark", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log("Bookmark created successfully:", responseData);
      setShowAddBookmarkForm(false);

    } catch (error) {
      console.error("Error creating bookmark:", error.message);
    }
  };

    return (
      <Box sx={{ height: 320, transform: 'translateZ(0px)', flexGrow: 1 }}>
        <SpeedDial
          ariaLabel="SpeedDial openIcon example"
          sx={{ position: 'absolute', bottom: 16, right: 16 }}
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
  
        {showAddBookmarkForm && (
          <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
            <form>
              <TextField label="Bookmark Name" fullWidth margin="normal" />
              <TextField label="Bookmark Description" fullWidth margin="normal" />
              <TextField label="Website URL" fullWidth margin="normal" />
              <Button variant="contained" color="primary" onClick={handleAddBookmark}>
                Add Bookmark
              </Button>
            </form>
          </Box>
        )}

        {showEditBookmarkForm && (
                  <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                    <form>
                      <TextField label="New Bookmark Name" fullWidth margin="normal" />
                      <TextField label="New Bookmark Description" fullWidth margin="normal" />
                      <TextField label="New Website URL" fullWidth margin="normal" />
                      <Button variant="contained" color="primary" onClick={handleEditBookmark}>
                        Confirm
                      </Button>
                    </form>
                  </Box>
                )}
              </Box>
    );
  }