import StarIcon from '@mui/icons-material/Star';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import React, { useEffect, useState } from 'react';
import BookmarkFolderContents from '../Components/BookmarkFolderContents';
import PrimarySearchAppBar from '../Components/PrimarySearchBar';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const BookmarksPage = () => {
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [selectedBookmark, setSelectedBookmark] = useState(null);
  const [allBookmarks, setAllBookmarks] = useState([]);

  const goToBookmark = (folderId) => {
    console.log(`Go to bookmark in ${folderId}!`);
    setSelectedFolder(folderId);
  };

  const openBookmarkDialog = (bookmark) => {
    setSelectedBookmark(bookmark);
  };

  const closeDialog = () => {
    setSelectedFolder(null);
    setSelectedBookmark(null);
  };

  const fetchAllBookmarks = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/v1/bookmarks");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const bookmarksData = await response.json();
      setAllBookmarks(bookmarksData);
    } catch (error) {
      console.error('Error fetching bookmarks:', error.message);
    }
  };

  useEffect(() => {
    fetchAllBookmarks();
  }, []);

  // const folders = [
  //   { id: '6575a0da537ab4ae239016fc', name: 'Folder 1' },
  //   { id: 2, name: 'Folder 2' },
  //   { id: 3, name: 'Folder 3' },
  // ];

  return (
    <div className="page">
      <div className="b"></div>
      <PrimarySearchAppBar />
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
  <label style={{ fontSize: '24px', fontWeight: 'bold' }}>My Bookmarks</label>
</div>

      <Grid container justifyContent="center" alignItems="center" style={{ height: '70vh' }}>
     
{/*
        {folders.map((folder) => (
          <Fab
            key={folder.id}
            aria-label={`open ${folder.id}`}
            onClick={() => goToBookmark(folder.id)}
            style={{
              width: '100px',
              height: '100px',
              margin: '0 10px',
            }}
          >
            <FolderOpenIcon fontSize="large" />
          </Fab>
        ))}
         */}
      {selectedFolder ? (
        <BookmarkFolderContents folderId={selectedFolder} handleClose={closeDialog} />
      ) : (
        <div className="displaybookmarks" style={{ display: 'flex', flexWrap: 'wrap' }}>
         
          {allBookmarks.map((bookmark) => (
            <div key={bookmark.id} style={{ margin: '10px' }}>
          
              <IconButton
                onClick={() => openBookmarkDialog(bookmark)}
                color="primary"
                aria-label="open bookmark"
                style={{
                  width: '100px',
                  height: '100px',
                }}
              >
                <StarIcon fontSize="large" />
              </IconButton>
              <hr />
            </div>
          ))}
        </div>
      )}

      <BootstrapDialog onClose={closeDialog} open={selectedBookmark !== null}>
        <DialogTitle>Bookmark Details</DialogTitle>
        <DialogContent>
          {selectedBookmark && (
            <>
              <p><strong>Title:</strong> {selectedBookmark.bookmarkName}</p>
              <p><strong>Content:</strong> {selectedBookmark.bookmarkDescription}</p>
              <p><strong>Date:</strong> {selectedBookmark.date}</p>
              <p><strong>Website:</strong> {selectedBookmark.websiteId}</p>

            </>
          )}
        </DialogContent>
      </BootstrapDialog>
      </Grid>
    </div>
  );
};
export default BookmarksPage;
