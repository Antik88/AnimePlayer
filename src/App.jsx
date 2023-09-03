import './App.css'
import { BrowserRouter as Router, Route, Link, Routes, Outlet } from 'react-router-dom';
import React from 'react';
import { useState, useEffect } from 'react';
import AnimePage from './AnimePage';

function App() {
  document.title = "アニメ"

  const [isHidden, setIsHidden] = useState(false);

  const handleLinkClick = () => {
    setIsHidden(true);
  }

  useEffect(() => {
    setIsHidden(false);
  }, [location]);

  return (
    <>
      <Router>
        {!isHidden && (
          <Link to="/anime/0" onClick={handleLinkClick}>
            <img src='https://desu.shikimori.me/uploads/poster/animes/49596/main-7f81a80dde5049fef4ddc7963fa4b2f4.webp' />
          </Link>
        )}
        <Routes>
          <Route path="/anime/:title_id" element={<AnimePage />} />
        </Routes>
      </Router> 
    </>
  );
}

export default App;