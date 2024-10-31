
import React from 'react';
import Card from './Card';
import {dashboardData} from '../../utils/data';

const Dashboard = () => {
    return (
        <div className="grid grid-cols-4 gap-4">
            {dashboardData.map((item, index) => (
                <Card key={index} title={item.title} count={item.count} />
            ))}
        </div>
    );
};

export default Dashboard;