import './App.css';
import './select-search.css';
import { useState } from 'react';
import SelectSearch, { fuzzySearch } from 'react-select-search';
import data from './memegen-info.json';

function App() {
  const [topText, setTopText] = useState(' ');
  const [bottomText, setBottomText] = useState(' ');
  const [memeType, setMemeType] = useState('regret');
  const [image, setImage] = useState(
    ' https://api.memegen.link/images/regret/_/i_immediately_regret_this_decision.png?width=300&frames=10 ',
  );
  const args = [];
  args[0] = memeType;
  args[1] = topText;
  args[2] = bottomText;
  const url = `https://api.memegen.link/images/${args[0]}/${args[1]}/${args[2]}.jpg`;
  console.log(url);
  const memegenData = data;
  const arr = [];
  const fileName = `/${args[0]}_${args[1]}_${args[2]}.jpeg`;
  for (let i = 0; i < Object.keys(memegenData).length; i++) {
    arr[i] = { name: memegenData[i].name, value: memegenData[i].id };
  }
  const handleGenerate = (event) => {
    event.preventDefault();
    setImage(url);
  };
  const handleMemeChange = (event) => {
    setMemeType(event);
  };
  const handleEnter = (event) => {
    if (event.keyCode === 13) {
      handleGenerate();
    }
  };
  const download = (event) => {
    event.preventDefault();
    fetch(url, {
      method: 'get',
      headers: {
        'Content-type': 'image/jpeg',
      },
    })
      .then((response) => response.blob())
      .then((blob) => {
        const fetchedUrl = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement('a');
        link.href = fetchedUrl;
        link.setAttribute('download', fileName);

        document.body.appendChild(link);

        link.click();

        link.parentNode.removeChild(link);
      })
      .catch((err) => console.log(err));
  };
  /*  const glorp = 'glorp?-------plop';
  function cleanInput(input) {
    let cleanString = input.replace(/?/g, '~q');

    return cleanString;
  }
  console.log(cleanInput(glorp)); */

  return (
    <div>
      <div>
        <h1>Meme generator</h1>
        {/* make alt text dynamic */}
        <img
          src={image}
          alt={`${args[0]}: ${args[1]} + ${args[2]} `}
          data-test-id="meme-image"
        />
      </div>
      <form>
        <label htmlFor="top">Top text</label>
        <input
          id="top"
          value={topText}
          onClick={() => setTopText('')}
          onChange={(event) => setTopText(event.currentTarget.value)}
          onKeyPress={handleEnter}
        />
        <br />
        <label htmlFor="bottom">Bottom text</label>
        <input
          id="bottom"
          value={bottomText}
          onClick={() => setBottomText('')}
          onChange={(event) => setBottomText(event.currentTarget.value)}
          onKeyPress={handleEnter}
        />
        <br />

        <br />
        <label>
          Meme template
          <SelectSearch
            onChange={handleMemeChange}
            options={arr}
            value={memeType}
            placeholder="Choose meme template"
            search
            filterOptions={fuzzySearch}
          />
          <input style={{ display: 'none' }} />
        </label>

        <button onClick={handleGenerate} data-test-id="generate-meme">
          Generate
        </button>

        <br />
        <br />
        <a href={url} onClick={download} download>
          <button>Download</button>
        </a>
      </form>
    </div>
  );
}

export default App;
