import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h2>Dashboard</h2>
      <Link to="/login">
        <button>Login</button>
      </Link>
    </div>
  );
}

export default Home;
