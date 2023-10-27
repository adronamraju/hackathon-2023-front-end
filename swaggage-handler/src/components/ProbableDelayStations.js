// components/ProbableDelayStations.js
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';

const ProbableDelayStations = () => {
    // Mocked data. Replace with actual data when available.
    const data = [
        { station: 'HOU', delayedBags: 150 },
        { station: 'LAS', delayedBags: 122 },
        { station: 'DAL', delayedBags: 131 },
        { station: 'PHX', delayedBags: 512 },
        { station: 'ORD', delayedBags: 96 },
        { station: 'MDW', delayedBags: 145 },
        { station: 'LGA', delayedBags: 187 },
        { station: 'AUS', delayedBags: 154 },
        { station: 'BLE', delayedBags: 137 },
        { station: 'SJC', delayedBags: 161 },
    ];

    return (
        <div>
            <h3>Stations with Probable Baggage Delays Today</h3>
            <BarChart width={600} height={300} data={data}>
                <XAxis dataKey="station" />
                <YAxis />
                <Tooltip />
                <CartesianGrid stroke="#f5f5f5" />
                <Bar dataKey="delayedBags" fill="#304cb2" />
            </BarChart>
        </div>
    );
};

export default ProbableDelayStations;
