import React from 'react';
import BookmarkOptions from '../Components/BookmarkOptions';
import PrimarySearchAppBar from '../Components/PrimarySearchBar';

import '../Styles/index.css';

const MainPage = () => {
    return (
        <div className="page">
            <PrimarySearchAppBar />
            <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '80vh',
                    backgroundColor: 'azure'}} >
                <BookmarkOptions  />
            </div>
        </div>
    );
};

export default MainPage;
