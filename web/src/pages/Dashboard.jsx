import React from 'react';
import { NavLink } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div>
      <h1 className='text-center my-3'>Dashboard</h1>
      <div className='text-center'>
        <NavLink 
          to="/adherents" 
          className={({ isActive }) => (isActive ? 'btn btn-primary active' : 'btn btn-primary')}
        >
          Voir les Adhérents
        </NavLink>
        <NavLink 
          to="/inscriptions" 
          className={({ isActive }) => (isActive ? 'btn btn-primary ms-2 active' : 'btn btn-primary ms-2')}
        >
          Voir les Inscriptions
        </NavLink>
      </div>
    </div>
  );
};

export default Dashboard;
