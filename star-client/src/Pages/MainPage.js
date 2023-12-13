import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { styled } from '@mui/material/styles';
import React from 'react';
import BookmarkOptions from '../Components/BookmarkOptions';
import PrimarySearchAppBar from '../Components/PrimarySearchBar';
import '../Styles/index.css';
import patrick from '../patrick.png';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: '100px',
    backgroundColor: '#FFBF96 ',
    '&:hover': {
        backgroundColor: '#FFFFFF',
    },
    marginTop: theme.spacing(2),
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
    color: 'red',
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


const MainPage = () => {
    return (
        <div className="page">
            <PrimarySearchAppBar />
           
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '70vh',
            }}>
                <div style={{ marginTop:'100px', display: 'flex', alignItems: 'center' }}>
                    <label style={{ fontSize: '50px', marginRight: '50px' }}>Patrick Star</label>
                    <img src={patrick} alt="patrickicon" style={{ borderRadius: '20%', width: '100px', height: '100px' }} />
                </div>


                <Search>
                    <SearchIconWrapper>
                        <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                        placeholder="Search…"
                        inputProps={{ 'aria-label': 'search' }}
                    />
                </Search>
                <BookmarkOptions />
            </div>
        </div>
    );
};

export default MainPage;