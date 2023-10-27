// components/anticipatedWeightData.js
import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';

const AnticipatedWeightData = () => {
    // Mocked data. Replace with actual data when available.
    const data = [
        { day: 'Oct 27', weight: 1675000 },
        { day: 'Oct 28', weight: 2175008 },
        { day: 'Oct 29', weight: 1814562 },
        { day: 'Oct 30', weight: 1675000 },
        { day: 'Oct 31', weight: 2175008 },
        { day: 'Nov 01', weight: 2435671 },
        { day: 'Nov 02', weight: 1995243 },
        { day: 'Nov 03', weight: 2816255 },
        { day: 'Nov 04', weight: 2228763 },
        // ... and so on for 10 days
    ];

    return (
        <div>
            <h3>Anticipated Weight Next 10 Days</h3>
            <LineChart width={600} height={300} data={data}>
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <CartesianGrid stroke="#f5f5f5" />
                <Line type="monotone" dataKey="weight" stroke="#304cb2" yAxisId={0} />
            </LineChart>
        </div>
    );
};

export default AnticipatedWeightData;
