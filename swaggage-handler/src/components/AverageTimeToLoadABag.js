// components/AverageTimeToLoadABag.js
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';

const AverageTimeToLoadABag = () => {
    // Mocked data. Replace with actual data when available.
    const data = [
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
    ];

    return (
        <div>
            <h3>Average Time to Load a Baggage</h3>
            <BarChart width={600} height={300} data={data}>
                <XAxis dataKey="station" />
                <YAxis />
                <Tooltip />
                <CartesianGrid stroke="#f5f5f5" />
                <Bar dataKey="timeToLoad" fill="#304cb2" />
            </BarChart>
        </div>
    );
};

export default AverageTimeToLoadABag;
