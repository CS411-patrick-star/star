import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkRemoveIcon from '@mui/icons-material/BookmarkRemove';
import EditIcon from '@mui/icons-material/Edit';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
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
  
  const [bookmarkName, setBookmarkName] = React.useState('');
  const [bookmarkDescription, setBookmarkDescription] = React.useState('');
  const [websiteUrl, setWebsiteUrl] = React.useState('');
  const [bookmark, setSelectedBookmark] = React.useState(null);

  const handleCloseAdd = () => {
    setShowAddBookmarkForm(false);
  };
  
  const handleCloseEdit = () => {
    setShowEditBookmarkForm(false);
  };
  
  const handleOpenAdd = () => {
    setShowAddBookmarkForm(true);
  };

  const handleOpenEdit = () => {
    setShowEditBookmarkForm(true);
  };



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
    setSelectedBookmark(bookmark);


  }
  
  const handleAddBookmark = async () => {
    const formData = new FormData();
    formData.append("websiteId", "your-website-id");
    formData.append("bookmarkName", bookmarkName);
    formData.append("bookmarkDescription", bookmarkDescription);
    formData.append("dateAdded", "your-date-added");
    formData.append("addition", "your-addition");
    formData.append("baseUrl", websiteUrl);

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

    const addContent = (
      <Dialog open={showAddBookmarkForm} onClose={handleCloseAdd}>
      <DialogTitle> Add a bookmark </DialogTitle>
      <DialogContent>
        <TextField label="Bookmark Name" fullWidth margin="normal" onChange={(e) => setBookmarkName(e.target.value)} />
        <TextField label="Bookmark Description" fullWidth margin="normal" onChange={(e) => setBookmarkDescription(e.target.value)} />
        <TextField label="Website URL" fullWidth margin="normal" onChange={(e) => setWebsiteUrl(e.target.value)} />
      </DialogContent>
    <DialogActions>
      <Button variant="contained"  sx={{ backgroundColor: '#ff5722' }} onClick={handleAddBookmark}>
          Add Bookmark
      </Button>
    </DialogActions>
  </Dialog>
    );
    const editContent = (
      <Dialog open={showEditBookmarkForm} onClose={handleCloseEdit}>
      <DialogTitle> Edit a bookmark </DialogTitle>
      <DialogContent>
        <TextField label="New Bookmark Name" fullWidth margin="normal" onChange={(e) => setBookmarkName(e.target.value)} />
        <TextField label="New Bookmark Description" fullWidth margin="normal" onChange={(e) => setBookmarkDescription(e.target.value)} />
        <TextField label="New Website URL" fullWidth margin="normal" onChange={(e) => setWebsiteUrl(e.target.value)} />
      </DialogContent>
    <DialogActions>
      <Button variant="contained"  sx={{ backgroundColor: '#ff5722' }} onClick={handleEditBookmark}>
          Change Bookmark
      </Button>
    </DialogActions>
  </Dialog>
    );
  
    return (
      <Box sx={{ position: 'relative', flexGrow: 1 }}>
        <SpeedDial
          ariaLabel="SpeedDial openIcon example"
          sx={{ position: 'absolute', bottom: 16}}
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
  
        {showAddBookmarkForm && addContent}

        {showEditBookmarkForm && editContent}
        </Box>
    );
  }