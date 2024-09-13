import React from 'react';
import { UserProvider } from '../context/UserContext';
import JobBoard from '../components/MainContent';

function App() {
  return (
    <UserProvider>
      <JobBoard />
    </UserProvider>
  );
}

export default App;