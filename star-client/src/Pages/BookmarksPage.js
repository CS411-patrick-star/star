import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import Fab from '@mui/material/Fab';
import Grid from '@mui/material/Grid';

import PrimarySearchAppBar from '../Components/PrimarySearchBar';
import '../Styles/index.css';

import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import React, { useState } from 'react';


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

function BookmarkFolderContents({ folderName, handleClose }) {
    // Adjust the implementation as needed
    const [open, setOpen] = React.useState(true);

  return (
    <React.Fragment>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          bookmark folder name
        </DialogTitle>
        <IconButton aria-label="close" onClick={handleClose}
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
          <Typography gutterBottom>
           all bookmarks in the folder will be shown here
          </Typography>
        
        </DialogContent>
      </BootstrapDialog>
    </React.Fragment>
  );
}
const BookmarksPage = () => {
    const [selectedFolder, setSelectedFolder] = useState(null);

    const goToBookmark = (folderName) => {
        console.log(`Go to bookmark in ${folderName}!`);
        setSelectedFolder(folderName); // Set the selected folder name
    
    };

    const closeDialog = () => {
        setSelectedFolder(null); // Reset the selected folder name to close the dialog
    };
    const folders = [
        { id: 1, name: 'Folder 1' },
        { id: 2, name: 'Folder 2' },
        { id: 3, name: 'Folder 3' },
    ];
    return (
        <div className="page">
            <div className="b"></div>
            <PrimarySearchAppBar />
            <Grid container justifyContent="center" alignItems="center" style={{ height: '80vh' }}>
                {folders.map((folder) => (
                    <Fab
                        key={folder.id}
                        aria-label={`open ${folder.name}`}
                        onClick={() => goToBookmark(folder.name)}
                        style={{
                            width: '100px',
                            height: '100px',
                            margin: '0 10px',
                        }}
                    >
                        <FolderOpenIcon fontSize="large" />
                    </Fab>
                ))}
            </Grid>
            {/* Conditionally render BookmarkFolderContents based on the selected folder */}
            {selectedFolder && (
                <BookmarkFolderContents
                    folderName={selectedFolder}
                    handleClose={closeDialog}
                />
            )}
        </div>
    );
};
export default BookmarksPage;