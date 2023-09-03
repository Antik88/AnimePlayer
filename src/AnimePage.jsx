import './App.css'
import React, { useEffect, useState } from 'react';
import jsonData from '../src/node/anime_data.json';
import { useParams } from 'react-router-dom';

function AnimePage() {
  const { title_id } = useParams();
  const [episodeIndex, setEpisodeIndex] = useState(0);
  const [input, setInput] = useState(episodeIndex);
  const [episode, setEpisode] = useState('');
  const [id, setId] = useState('');

  useEffect(() => {
    const data = jsonData;

    setEpisode(data[title_id].episodes[episodeIndex].episode);
    setId(data[title_id].episodes[episodeIndex].id);

    document.title = `${data[title_id].name}`;
  }, [title_id, episodeIndex]);

  const handlePreviousEpisode = () => {
    setEpisodeIndex(prevIndex => prevIndex - 1);
  };

  const handleNextEpisode = () => {
    setEpisodeIndex(prevIndex => prevIndex + 1);
  };

  const handleInputChange = (event) => {
    const inputValue = parseInt(event.target.value);
    setInput(inputValue);
  };

  const handleInputSubmit = (event) => {
    event.preventDefault();
    if (input > 0 && input < jsonData[title_id].episodes.length) {
      setEpisodeIndex(input - 1);
    }
  };

  return (
    <>
      <h4>
        {jsonData[title_id].jap_name}
      </h4>
      <iframe
        width="640"
        height="384"
        src={`https://video.sibnet.ru/shell.php?videoid=${id}`}
        frameBorder="0"
        scrolling="no"
        allowFullScreen
      ></iframe>
      <p>Episode: {episode}</p>
      <div style={{ display: 'flex', width: '640px', justifyContent: 'space-between' }}>
        <button onClick={handlePreviousEpisode} disabled={episodeIndex === 0}>
          Previous Episode
        </button>
        <form onSubmit={handleInputSubmit}>
          <input
            type="number"
            value={input}
            onChange={handleInputChange}
            style={{ width: '50px' }}
          />
          <button type="submit">Go</button>
        </form>
        <button onClick={handleNextEpisode} disabled={episodeIndex === jsonData[title_id].episodes.length - 1}>
          Next Episode
        </button>
      </div>
    </>
  );
}

export default AnimePage;
