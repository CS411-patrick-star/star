import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import React from 'react';
import PrimarySearchAppBar from '../Components/PrimarySearchBar';
import '../Styles/index.css';

const MainPage = () => {

    const handleAddBookmark = async () => {
        const websiteId = "your-website-id";
        const bookmarkName = "your-bookmark-name";
        const bookmarkDescription = "your-bookmark-description";
        const dateAdded = "your-date-added";
        const addition = "your-addition";
        const baseUrl = "your-base-url";
      
        const formData = new FormData();
        formData.append("websiteId", websiteId);
        formData.append("bookmarkName", bookmarkName);
        formData.append("bookmarkDescription", bookmarkDescription);
        formData.append("dateAdded", dateAdded);
        formData.append("addition", addition);
        formData.append("baseUrl", baseUrl);
      
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
