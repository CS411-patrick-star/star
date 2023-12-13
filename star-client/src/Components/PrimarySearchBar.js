import AccountCircle from '@mui/icons-material/AccountCircle';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import CloseIcon from '@mui/icons-material/Close';
import HomeIcon from '@mui/icons-material/Home';
import MoreIcon from '@mui/icons-material/MoreVert';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import SearchIcon from '@mui/icons-material/Search';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Toolbar from '@mui/material/Toolbar';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TabComponent from './Tabs';

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: '100px',
  backgroundColor: '#FFF5E0 ',
  '&:hover': {
    backgroundColor: '#FFBF96',
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'black',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '300px',
      borderRadius: '50px !important',
      [theme.breakpoints.up('md')]: {
        width: '100vh',
      },
    },
  }));
  


export default function PrimarySearchAppBar() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [loginDialogOpen, setLoginDialogOpen] = React.useState(false);
  const [websiteDialogOpen, setWebsiteDialogOpen] = React.useState(false);
  const [bookmarkName, setBookmarkName] = React.useState('');
  
  const [bookmarkDescription, setBookmarkDescription] = React.useState('');
  const [websiteUrl, setWebsiteUrl] = React.useState('');



  const handleCloseLoginDialog = () => {
    setLoginDialogOpen(false);
  };

  const handleOpenLoginDialog = () => {
    setLoginDialogOpen(true);
  };

  const handleOpenWebsiteDialog = () => {
    console.log("entered openwebsitedialog");
    setWebsiteDialogOpen(true);
  };

  const handleCloseWebsiteDialog = () => {
    setWebsiteDialogOpen(false);
  };


  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };
  
  const addPageToBookmarks = async () => {
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

    } catch (error) {
      console.error("Error creating bookmark:", error.message);
    }
  };
  
  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('/api/login', {
        email,
        password,
      });
  
      // Check if the request was successful (status code 2xx)
      if (response.status >= 200 && response.status < 300) {
        // Authentication successful, close the dialog or redirect
        handleCloseLoginDialog();
      } else {
        // Authentication failed, handle the error (show an error message, etc.)
        console.error('Authentication failed');
      }
    } catch (error) {
      // Handle network errors, or errors thrown by Axios
      console.error('Error during authentication:', error);
    }
  };
  

   const loginDialogContent = (
    <Dialog open={loginDialogOpen} onClose={handleCloseLoginDialog}>
      <DialogTitle>Login</DialogTitle>
      <DialogContent>
        <TextField label="Email" fullWidth margin="normal" />
        <TextField label="Password" type="password" fullWidth margin="normal" />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseLoginDialog}>Cancel</Button>
        <Button onClick={handleLogin} color="primary">
          Login
        </Button>
      </DialogActions>
    </Dialog>
  );

  const websiteDialog = (
    <Dialog open={websiteDialogOpen} onClose={handleCloseWebsiteDialog}>
      <DialogTitle>Add Website to Bookmarks</DialogTitle>
      <DialogContent>
        <TextField label="Bookmark Name" fullWidth margin="normal" onChange={(e) => setBookmarkName(e.target.value)} />
        <TextField label="Bookmark Description" fullWidth margin="normal" onChange={(e) => setBookmarkDescription(e.target.value)} />
        <TextField label="Website URL: " fullWidth margin="normal" value={websiteUrl}readOnly/>

      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseWebsiteDialog}>Cancel</Button>
        <Button onClick={addPageToBookmarks} color="secondary">
          Add Bookmark
        </Button>
      </DialogActions>
    </Dialog>
  );

  const [loading, setLoading] = useState(false);


  const refresh = () => {
    setLoading(true);
    window.location.reload();
  };
  const goBack = () => {
    window.history.go(-1);
  };
  const goForward = () => {
    window.history.go(1);
  };

  const goToMainPage = () => {
    navigate('/');
  };

  const CustomComponentAboveSearchBar = () => {
    return (
      <Box sx={{ width:'100%', display: 'flex', alignItems: 'center', marginRight: 'auto' }}>
        <TabComponent />
      </Box>
    );
  };

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleOpenLoginDialog}>Login</MenuItem>
    </Menu>
  );
  
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit" >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div>
      <CustomComponentAboveSearchBar/>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static"
          sx={{ backgroundColor: '#FFCF96', height: '100px' }} >
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={goBack}
              sx={{ mr: 2 }} >
              <ArrowBackIosIcon />
            </IconButton>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={goForward}
              sx={{ mr: 2 }} >
              <ArrowForwardIosIcon />
            </IconButton>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={refresh}
              sx={{ mr: 2 }} >
              {loading ? ( <CloseIcon /> ) : (<RotateLeftIcon />  )}
            </IconButton>

             <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ ml: 2 }}
              onClick={goToMainPage} >
              <HomeIcon />
            </IconButton>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                onChange={(e) => setWebsiteUrl(e.target.value)}
              />
              <IconButton onClick={(e) => { e.preventDefault(); handleOpenWebsiteDialog(); }}>
                <StarBorderIcon />
              </IconButton>
            </Search>
            {websiteDialogOpen && websiteDialog}
            
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <IconButton
                size="large"
                edge="end"
                onClick={handleProfileMenuOpen}
                color="inherit"  >
                <AccountCircle />
              </IconButton>
            </Box>
            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                onClick={handleMobileMenuOpen}
                color="inherit" >
                <MoreIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
        {renderMenu}
        {loginDialogOpen && loginDialogContent}
      </Box>
    </div>
  );
}