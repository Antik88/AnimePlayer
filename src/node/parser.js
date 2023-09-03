import cheerio from 'cheerio';
import axios from 'axios';
import fs from 'fs'

const url = 'https://animenime.ru/anime-online/sinyaya-tyurma-blyu-lok';

async function fetchHTML(url) {
  const { data } = await axios.get(url);
  return data;
}

function parseAllEpisode(html) {
  const data = [];
  const $ = cheerio.load(html);

  const allEpisodes = $('div.ttl_sub').next('div.svb').children('a');

  allEpisodes.each((index, element) => {
    const episode = $(element).attr('onclick');
    const [id] = episode.match(/\d+/g);
    data.push({ episode: index + 1, id });
    console.log(`Episode: ${index + 1}, ID: ${id}`);
  });

  const jsonContent = JSON.stringify(data, null, 2);

  fs.writeFile('blyu-lok.json', jsonContent, 'utf8', (err) => {
    if (err) {
      console.error('Error writing to JSON file:', err);
    } else {
      console.log('Pairs extracted and saved to pairs.json');
    }
  });
}


// Load HTML and parse
fetchHTML(url)
  .then(parseAllEpisode)
  .catch(console.error);