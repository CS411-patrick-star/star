import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import * as React from 'react';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const fetchBookmarksFromFolder = async (bookmarkFolderId) => {
  try {
    const response = await axios.get(`http://localhost:8080/api/v1/bookmarks/bookmark_folder/${bookmarkFolderId}`);
    const bookmarksInfo = response.data;

    const bookmarks = bookmarksInfo.map((bookmark) => {
      const senderInfo = bookmark.sender.userAccount.firstName + " " + bookmark.sender.userAccount.lastName;
      const titleInfo = bookmark.title;
      const contentInfo = bookmark.content;
      const dateInfo = bookmark.date;

      return {
        sender: senderInfo,
        title: titleInfo,
        content: contentInfo,
        date: dateInfo,
      };
    });
    console.log(bookmarks);
    return bookmarks;
  } catch (error) {
    console.error('Error fetching bookmarks:', error.message);
    throw error;
  }
};


export default function BookmarkFolderContents({ folderId, handleClose }) {
  const [open, setOpen] = React.useState(false);
  const [bookmarks, setBookmarks] = React.useState([]);

  const handleClickOpen = async () => {
    try {
      const fetchedBookmarks = await fetchBookmarksFromFolder(folderId);
      setBookmarks(fetchedBookmarks);
      setOpen(true);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const handleCloseDialog = () => {
    setOpen(false);
    handleClose();
  };

  React.useEffect(() => {
    handleClickOpen(); // Automatically open the dialog when the component mounts
  }, []); // Empty dependency array means it only runs once, like componentDidMount

  return (
    <React.Fragment>
      <BootstrapDialog
        onClose={handleCloseDialog}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Modal title
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleCloseDialog}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          {bookmarks.map((bookmark, index) => (
            <div key={index}>
              <p><strong>Sender:</strong> {bookmark.sender}</p>
              <p><strong>Title:</strong> {bookmark.title}</p>
              <p><strong>Content:</strong> {bookmark.content}</p>
              <p><strong>Date:</strong> {bookmark.date}</p>
              <hr />
            </div>
          ))}
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleCloseDialog}>
            Save changes
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}
