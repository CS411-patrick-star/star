import React from 'react';
import { Route, Routes } from "react-router-dom";
import BookmarksPage from './Pages/BookmarksPage';
import MainPage from './Pages/MainPage';

const AppRoutes = () => {
  return (
      <Routes>
        <Route path="/" element={<MainPage/>} />
        <Route path="/bookmarks" element={<BookmarksPage />} />
      </Routes>

  );
};

export default AppRoutes;
