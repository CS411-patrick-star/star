import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import React from 'react';
import PrimarySearchAppBar from '../Components/PrimarySearchBar';
import '../Styles/index.css';

const MainPage = () => {

    const handleAddBookmark = () => {
    
        console.log('Bookmark added!');
    };


    return (
        <div className="page">
            <PrimarySearchAppBar />
            <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '80vh',
                    backgroundColor: 'azure'}} >
                <Fab size="small" color="secondary" aria-label="add" onClick={handleAddBookmark} >
                    <AddIcon />
                </Fab>
            </div>
        </div>
    );
};

export default MainPage;
