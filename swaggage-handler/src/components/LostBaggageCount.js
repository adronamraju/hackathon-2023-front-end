// components/LostBaggageCount.js
import React from 'react';
import styled from 'styled-components';

const CountCard = styled.div`
    width: 150px;
    height: 100px;
    background-color: #f7f9fc;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    margin: 16px;
`;

const Count = styled.span`
    font-size: 24px;
    font-weight: bold;
    color: #304cb2;
`;

const Label = styled.span`
    font-size: 14px;
    color: #636363;
    margin-top: 4px;
`;

const LostBaggageCount = () => {
    const lostCount = 3145; // This is your mocked data. Replace with actual data when available.

    return (
        <CountCard>
            <Count>{lostCount}</Count>
            <Label>Lost Baggages 10/27</Label>
        </CountCard>
    );
};

export default LostBaggageCount;
