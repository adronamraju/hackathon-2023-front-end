import React, { useState, useCallback } from 'react';
import './App.css';

function App() {
  const firstNames = ["John", "Jane", "Bob", "Alice", "Michael", "Sarah", "David", "Emma"];
  const lastNames = ["Smith", "Johnson", "Brown", "Williams", "Jones", "Miller", "Wilson", "Davis"];
  const isTransferFlight = () => {
    const randomNumber = Math.random();
    return (randomNumber < 0.1) ? true : false;
  };

  const generateRandomName = () => {
    const randomFirstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const randomLastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    return `${randomFirstName} ${randomLastName}`;
  };

  const today = new Date().toLocaleDateString();
  const initialButtons = [];
  for (let i=0; i < 30; i++) {
    const isTransfer = isTransferFlight();
    const initButton = {
      name: generateRandomName(),
      status: isTransfer ? "Transfer" : "",
      flightNumber: isTransfer ? "WN1508" : "WN225",
      route: isTransfer ? "DAL - PHX - SFO" : "DAL - PHX"
    };
    initialButtons.push(initButton);
  }

  const [buttons, setButtons] = useState(initialButtons);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedPassenger, setSelectedPassenger] = useState(null);
  const [selectedButtonIndex, setSelectedButtonIndex] = useState(null);

  const handleDetailsToggle = (button, index) => {
    setShowDetails(true);
    setSelectedPassenger(button);
    setSelectedButtonIndex(index);
  };

  return (
    <div className="container">
      <div className={`left-column ${!showDetails ? "full-width" : ""}`}>
        <button key="button-label" className="title-button">
          <span className="button-aligned-name">Passenger Name</span>
          <span className="button-aligned-note">Note</span>
          <span className="button-aligned-flight">Flight#</span>
          <span className="button-aligned-route">Route</span>
        </button>
        {buttons.map((button, index) => (
          <button
            key={index}
            onClick={() => handleDetailsToggle(button, index)}
            className={`info-button ${selectedButtonIndex === index ? 'highlighted' : ''}`}
          >
            <span className="button-aligned-name">{button.name}</span>
            <span className="button-aligned-note">{button.status}</span>
            <span className="button-aligned-flight">{button.flightNumber}</span>
            <span className="button-aligned-route">{button.route}</span>
          </button>
        ))}
      </div>
      {showDetails && (
        <div className="right-column">
          <div className="image-container">
            <img src="/images/sample.png" alt="Sample" />
          </div>
          <div className="text-details">
            <div>{selectedPassenger ? selectedPassenger.name : ""}</div>
            <div>{selectedPassenger ? selectedPassenger.flightNumber : ""}</div>
            <div>{selectedPassenger ? selectedPassenger.route : ""}</div>
            <br></br>
            <div className='text-details-status'>ZONE 1</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
