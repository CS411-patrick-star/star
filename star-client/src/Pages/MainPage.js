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
                    height: '70vh',
                    marginRight:'20vh'}} >
                <BookmarkOptions  />
            </div>
        </div>
    );
};

export default MainPage;
