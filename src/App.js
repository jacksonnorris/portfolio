import React from 'react';
import portfolioData from './data/portfolioData.json';
import Projects from './components/Projects';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>{portfolioData.name}</h1>
        <p>{portfolioData.title}</p>
      </header>
      <main>
        <Projects />
      </main>
    </div>
  );
}

export default App;