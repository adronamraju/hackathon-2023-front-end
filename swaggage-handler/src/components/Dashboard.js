import React, { useState, useEffect } from 'react';
import BaggageBarGraph from './BaggageBarGraph';
import LostBaggageCount from './LostBaggageCount';
import AnticipatedBagWeightGraph from './AnticipatedBagWeightGraph';
import ProbableDelayStations from './ProbableDelayStations';
import '../styles/Dashboard.css';
import '../styles/MollyApp.css';
import AverageTimeToLoadABag from "./AverageTimeToLoadABag";
import flightsData from '../assets/flights.json';

const Dashboard = ({ uploadedImage, onImageUpload }) => {
    const [flightFilter, setFlightFilter] = useState("");
    const [selectedLeg, setSelectedLeg] = useState(null);
    const [flightLegs, setFlightLegs] = useState([]);

    // State definitions for graphs data
    const [baggageData, setBaggageData] = useState([]);
    const [lostBaggageCount, setLostBaggageCount] = useState(0);
    const [anticipatedWeightData, setAnticipatedWeightData] = useState([]);
    const [delayStations, setDelayStations] = useState([]);
    const [timeToLoad, setTimeToLoad] = useState([]);

    const [baggageInfo, setBaggageInfo] = useState([]);

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            onImageUpload(e.target.files[0]);
        }
    };

    const handleFindBagClick = () => {
        document.getElementById('hidden-file-input').click();
    };

    const firstNames = ["Ava", "Liam", "Zara", "Ethan", "Isabella", "Juan", "Sophia", "Oliver", "Mia", "Hiroshi", "Emily", "Santiago", "Aria", "Noah", "Chloe", "Raj", "Grace", "Mohammed", "Emma", "Alexander", "Luna", "Yuki", "Charlotte", "Finn", "Ivy"];
    const lastNames = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez", "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson", "Thomas", "Taylor", "Moore", "Jackson", "Martin", "Lee", "Perez", "Thompson", "White", "Harris"];

    const generateRandomName = () => {
        const randomFirstName = firstNames[Math.floor(Math.random() * firstNames.length)];
        const randomLastName = lastNames[Math.floor(Math.random() * lastNames.length)];
        return `${randomFirstName} ${randomLastName}`;
    };

    const [inputText, setInputText] = useState('');

    const handleInputChange = (event) => {
        setInputText(event.target.value);
    };


    const [apiResponse, setApiResponse] = useState(null);

    const handleButtonClick = () => {
        fetch(`https://nxyciq4wr2.execute-api.us-east-1.amazonaws.com/v1/search-by-bag-tag?bagTag=${inputText}`)
          .then((response) => response.json())
          .then((data) => {
            setApiResponse(data);
            // Handle the API response here
            console.log(data);
            setInitialButtons(data);
          })
          .catch((error) => {
            console.error('Error fetching data:', error);
          });
      };

    const today = new Date().toLocaleDateString();
    const [initialButtons, setInitialButtons] = useState([]);

    for (let i=0; i < 30; i++) {
        const initButton = {
            image: `images/default-luggage.jpg`,
            name: generateRandomName(),
            flightNumber: "WN435",
            route: "DAL - PHX",
            zone: Math.floor(Math.random() * 4),
            bagTag: Math.floor(Math.random() * (9999999999 - 1000000000 + 1)) + 1000000000
        };
        initialButtons.push(initButton);
    }

    const [buttons, setButtons] = useState(initialButtons);
    const [showDetails, setShowDetails] = useState(false);
    const [showDashboard, setShowDashboard] = useState(false);
    const [selectedPassenger, setSelectedPassenger] = useState(null);
    const [selectedButtonIndex, setSelectedButtonIndex] = useState(null);
    const [luggageImage, setLuggageImage] = useState("images/default-luggage.jpg");
    const [textDetailsBackground, setTextDetailsBackground] = useState("#ccffd8");

    const handleDetailsToggle = (button, index) => {
        setShowDetails(true);
        setSelectedPassenger(button);
        setSelectedButtonIndex(index);

        // TODO randomize luggage{i}.jpg
        setLuggageImage("images/default-luggage.jpg");
        setTextDetailsBackground("#ccffd8");
    };

    const handleSelectedLeg = (leg) => {
        setSelectedLeg(leg);
        setShowDashboard(true);
            // Make the API call when the component mounts
        fetch('https://nxyciq4wr2.execute-api.us-east-1.amazonaws.com/v1/flight-pax-bags-info')
            .then(response => response.json())
            .then(data => {
            // Handle the API response data here
            setBaggageInfo(data);
            setApiResponse(data);
            console.log(data);
            })
            .catch(error => {
            console.error('Error fetching data:', error);
            });
            // for (let i=0; i < 30; i++) {
            //     //initialButtons.at(i).name = apiResponse[i].passenger_name;
            //     initialButtons.at(i).flightNumber = [0][0].passenger_name;
            //     initialButtons.at(i).route = "DAL - PHXs";
            //     initialButtons.at(i).zone = "12";
            //     initialButtons.at(i).bagTag = "7123456";
            // }
        
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

    // Effect to change the background color of a random button when image is uploaded
    useEffect(() => {
        if (uploadedImage === "white-luggage-belt.jpg") {
            // update text details to show green
            fetch(
              `https://nxyciq4wr2.execute-api.us-east-1.amazonaws.com/v1/search-by-bag-tag?bagTag=${inputText}`
            )
              .then((response) => response.json())
              .then((data) => {
                // setApiResponse(data);
                // Handle the API response here
                console.log(data);
                // setInitialButtons(data);
              })
              .catch((error) => {
                console.error("Error fetching data:", error);
              });
            setLuggageImage("images/white-luggage.jpg");
            setTextDetailsBackground("#ccffd8");
            const randomIndex = Math.floor(Math.random() * 15);
            setSelectedButtonIndex(randomIndex);
        } else if (uploadedImage === "black-luggage-belt.jpg") {
            // update text details to show red
            setLuggageImage("images/black-luggage.jpg");
            setTextDetailsBackground("#ffd7d5");
            setSelectedButtonIndex(null);

            const badLuggage = {
                image: `images/black-luggage.jpg`,
                name: generateRandomName(),
                flightNumber: "WN1680",
                route: "DAL - AUS",
                zone: Math.floor(Math.random() * 4),
                bagTag: Math.floor(Math.random() * (9999999999 - 1000000000 + 1)) + 1000000000
            };
            setSelectedPassenger(badLuggage);
        }
        setShowDetails(true);
    }, [uploadedImage]); // Dependency on the image prop

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
            {showDashboard && baggageInfo && (
                <div className="container">
                    <div className={`left-column ${!showDetails ? "full-width" : ""}`}>
                        <button key="button-label" className="title-button">
                            <span className="button-aligned-name">Passenger Name</span>
                            <span className="button-aligned-flight">Flight#</span>
                            <span className="button-aligned-route">Route</span>
                            <span className="button-aligned-note">Zone</span>
                            <span className="button-aligned-bag">Bag#</span>
                        </button>
                        {buttons.map((button, index) => (
                            <button
                                key={index}
                                onClick={() => handleDetailsToggle(button, index)}
                                className={`info-button ${selectedButtonIndex === index ? 'highlighted' : ''}`}
                            >
                                <span className="button-aligned-name">{button.name}</span>
                                <span className="button-aligned-flight">{button.flightNumber}</span>
                                <span className="button-aligned-route">{button.route}</span>
                                <span className="button-aligned-note">{button.zone}</span>
                                <span className="button-aligned-bag">{button.bagTag}</span>
                            </button>
                        ))}
                    </div>
                    {showDetails && (
                        <div className="right-column">
                            <div className="image-container">
                                <img src={`${luggageImage}`} alt="Sample" />
                            </div>
                            <div className="text-details" style={{backgroundColor: `${textDetailsBackground}`}}>
                                <div>{selectedPassenger ? selectedPassenger.name : ""}</div>
                                <div>{selectedPassenger ? selectedPassenger.flightNumber : ""}</div>
                                <div>{selectedPassenger ? selectedPassenger.route : ""}</div>
                                <div className='text-details-status'>ZONE 1</div>
                                <div>
                                    {/* <div className='text-details-status'>Enter Bag Number or Picture of Bag</div> */}
                                    <input
                                        type="text"
                                        value={inputText}
                                        onChange={handleInputChange}
                                        placeholder="Enter bag number..."
                                    />
                                    <button onClick={handleButtonClick}>Submit</button>
                                </div>
                                {/* <div>
                                    <button onClick={handleFindBagClick}>Attach Picture</button>
                                    <input type="file" accept="image/*" id="hidden-file-input" style={{display: 'none'}} onChange={handleFileChange} />
                                </div> */}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Dashboard;
