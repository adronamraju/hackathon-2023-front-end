// components/BaggageBarGraph.js
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const BaggageBarGraph = () => {
    const data = [
        { date: 'Oct 17', 'Total Baggage': 345987, 'Delayed Baggage': 2842 },
        { date: 'Oct 18', 'Total Baggage': 432573, 'Delayed Baggage': 1983 },
        { date: 'Oct 19', 'Total Baggage': 637254, 'Delayed Baggage': 6542 },
        { date: 'Oct 20', 'Total Baggage': 476532, 'Delayed Baggage': 3142 },
        { date: 'Oct 21', 'Total Baggage': 425635, 'Delayed Baggage': 1867 },
        { date: 'Oct 22', 'Total Baggage': 526534, 'Delayed Baggage': 2307 },
        { date: 'Oct 23', 'Total Baggage': 526354, 'Delayed Baggage': 2654 },
        { date: 'Oct 24', 'Total Baggage': 452343, 'Delayed Baggage': 2052 },
        { date: 'Oct 25', 'Total Baggage': 389865, 'Delayed Baggage': 1756 },
        { date: 'Oct 26', 'Total Baggage': 410006, 'Delayed Baggage': 3500 },
        // ... add more data points as needed
    ];

    return (
        <div>
            <h3>Last 10 Days Baggage Comparison</h3>
            <BarChart
                width={600}
                height={300}
                data={data}
                margin={{
                    top: 5, right: 30, left: 20, bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Total Baggage" fill="#82ca9d" />
                <Bar dataKey="Delayed Baggage" fill="#8884d8" />
            </BarChart>
        </div>
    );
};

export default BaggageBarGraph;
