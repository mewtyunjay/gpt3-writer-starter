import Head from 'next/head';
import Image from 'next/image';
import buildspaceLogo from '../assets/buildspace-logo.png';
import { useState } from 'react';    //added

const Home = () => {
  const [userInput, setUserInput] = useState('');    //added
  const [apiOutput, setApiOutput] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

  //openAI call to generate.js
  const callGenerateEndpoint = async () => {
    setIsGenerating(true);
    console.log("Calling OpenAI...")
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userInput }),
    });

  const data = await response.json();
  const { output } = data;
  console.log("OpenAI replied...", output.text)

  setApiOutput(`${output.text}`);
  setIsGenerating(false);
}

  const onUserChangedText = (event) => {
    // console.log(event.target.value);
    setUserInput(event.target.value);
  };
  return (
    <div className="root">
      <Head>
        <title>recipe generator</title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>ez recipe generator</h1>
          </div>
          <div className="header-subtitle">
            <h2>list a few ingredients with you rn and i'll generate a recipe for you </h2>
          </div>
        </div>
        <div className="prompt-container">
          <textarea placeholder="cheese, bread, butter" className="prompt-box" value={userInput} onChange={onUserChangedText}/>
        </div>
        <div className="prompt-buttons">
          <a 
            className={isGenerating ? 'generate-button loading' : 'generate-button'} 
            onClick={callGenerateEndpoint}
          >
            <div className="generate">
              {isGenerating ? <span class="loader"></span> : <p>Generate</p>}
            </div>
          </a>
        </div>
        {apiOutput && (
        <div className="output">
          <div className="output-header-container">
            <div className="output-header">
              <h3>Output</h3>
            </div>
          </div>
          <div className="output-content">
            <p>{apiOutput}</p>
          </div>
        </div>
)}
      </div>
    </div>
  );
};

export default Home;
