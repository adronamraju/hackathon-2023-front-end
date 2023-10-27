import React, { useState, useEffect } from 'react';
import BaggageBarGraph from './BaggageBarGraph';
import LostBaggageCount from './LostBaggageCount';
import AnticipatedBagWeightGraph from './AnticipatedBagWeightGraph';
import ProbableDelayStations from './ProbableDelayStations';
import '../styles/Dashboard.css';
import '../styles/MollyApp.css';
import AverageTimeToLoadABag from "./AverageTimeToLoadABag";
import flightsData from '../assets/flights.json';

const Dashboard = () => {
    const [flightFilter, setFlightFilter] = useState("");
    const [selectedLeg, setSelectedLeg] = useState(null);
    const [flightLegs, setFlightLegs] = useState([]);

    // State definitions for graphs data
    const [baggageData, setBaggageData] = useState([]);
    const [lostBaggageCount, setLostBaggageCount] = useState(0);
    const [anticipatedWeightData, setAnticipatedWeightData] = useState([]);
    const [delayStations, setDelayStations] = useState([]);
    const [timeToLoad, setTimeToLoad] = useState([]);

    const firstNames = ["Ava", "Liam", "Zara", "Ethan", "Isabella", "Juan", "Sophia", "Oliver", "Mia", "Hiroshi", "Emily", "Santiago", "Aria", "Noah", "Chloe", "Raj", "Grace", "Mohammed", "Emma", "Alexander", "Luna", "Yuki", "Charlotte", "Finn", "Ivy"];
    const lastNames = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez", "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson", "Thomas", "Taylor", "Moore", "Jackson", "Martin", "Lee", "Perez", "Thompson", "White", "Harris"];
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
            flightNumber: "WN435",
            route: isTransfer ? "DAL - PHX - SFO" : "DAL - PHX"
        };
        initialButtons.push(initButton);
    }

    const [buttons, setButtons] = useState(initialButtons);
    const [showDetails, setShowDetails] = useState(false);
    const [showDashboard, setShowDashboard] = useState(false);
    const [selectedPassenger, setSelectedPassenger] = useState(null);
    const [selectedButtonIndex, setSelectedButtonIndex] = useState(null);

    const handleDetailsToggle = (button, index) => {
        setShowDetails(true);
        setSelectedPassenger(button);
        setSelectedButtonIndex(index);
    };

    const handleSelectedLeg = (leg) => {
        setSelectedLeg(leg);
        setShowDashboard(true);
    };

    const handleSetFlightFilter = (value) => {
        setFlightFilter(value)
        setShowDashboard(false);
        setSelectedButtonIndex(null);
        setSelectedPassenger(null);
        setShowDetails(false);
    };

    useEffect(() => {
        if (flightFilter) {
            const matchingFlights = flightsData.filter(flight => flight.flight_number === flightFilter);
            const routesForMatchingFlights = matchingFlights.map(flight => flight.route);
            setFlightLegs(routesForMatchingFlights);
        } else {
            setFlightLegs([]);
        }

        // Dummy data for graphs. Replace this with your actual data fetching logic.
        setBaggageData([
            { date: '2022-01-01', total: 100, delayed: 5 },
            { date: '2022-01-02', total: 105, delayed: 3 },
            // ... more data
        ]);

        setLostBaggageCount(12);

        setAnticipatedWeightData([
            { date: '2022-01-03', weight: 1500 },
            { date: '2022-01-04', weight: 1520 },
            // ... more data
        ]);

        setDelayStations(['HOU', 'LAS', 'NYC']);

        setTimeToLoad([
            { date: 'Oct 17', timeToLoad: 1.6 },
            { date: 'Oct 18', timeToLoad: 2.1 },
            { date: 'Oct 19', timeToLoad: 1.9 },
            { date: 'Oct 20', timeToLoad: 2.2},
            { date: 'Oct 21', timeToLoad: 1.6 },
            { date: 'Oct 22', timeToLoad: 1.3 },
            { date: 'Oct 23', timeToLoad: 1.8 },
            { date: 'Oct 24', timeToLoad: 1.9 },
            { date: 'Oct 25', timeToLoad: 2.1 },
            { date: 'Oct 26', timeToLoad: 1.9 }
        ]);
    }, [flightFilter]);


    return (
        <div className="dashboard">
            {/* Flight Filter */}
            <div className="filter">
                <label>Flight Number:</label>
                <input
                    value={flightFilter}
                    onChange={e => handleSetFlightFilter(e.target.value)}
                />
            </div>

            {/* Flight Legs Filter */}
            {flightLegs.length > 0 && (
                <div className="flight-legs">
                    <h4>Select a Flight Leg:</h4>
                    {flightLegs.map(leg => (
                        // Removed the inline comment from here
                        <button
                            key={leg}
                            onClick={() => handleSelectedLeg(leg)}
                            className={selectedLeg === leg ? 'selected' : ''}
                        >
                            {leg}
                        </button>
                    ))}
                </div>
            )}

            
            {/* <div className="dashboard-grid">
                <div className="dashboard-card">
                    <BaggageBarGraph data={baggageData} />
                </div>

                <div className="dashboard-card">
                    <LostBaggageCount count={lostBaggageCount} />
                </div>

                <div className="dashboard-card">
                    <AnticipatedBagWeightGraph data={anticipatedWeightData} />
                </div>

                <div className="dashboard-card">
                    <ProbableDelayStations stations={delayStations} />
                </div>

                <div className="dashboard-card">
                    <AverageTimeToLoadABag data={timeToLoad} />
                </div>
            </div> */}
            {showDashboard && (
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
                                <img src="images/sample.png" alt="Sample" />
                            </div>
                            <div className="text-details">
                                <div>{selectedPassenger ? selectedPassenger.name : ""}</div>
                                <div>{selectedPassenger ? selectedPassenger.flightNumber : ""}</div>
                                <div>{selectedPassenger ? selectedPassenger.route : ""}</div>
                                <div className='text-details-status'>ZONE 1</div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Dashboard;
