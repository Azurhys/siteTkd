import React from 'react';
import Adherents from '../components/Adherents';
import Inscriptions from '../components/Inscriptions';

const Dashboard = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <Adherents />
      <Inscriptions />
    </div>
  );
};

export default Dashboard;
