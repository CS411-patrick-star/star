import React from 'react';
import BookmarkOptions from '../Components/BookmarkOptions';
import PrimarySearchAppBar from '../Components/PrimarySearchBar';

const MainPage = () => {
  const handleAddBookmark = () => {
    console.log('Bookmark added!');
  };

  return (
    <div className="page">
      <PrimarySearchAppBar />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
      <BookmarkOptions />
       
      </div>
    </div>
  );
};

export default MainPage;
