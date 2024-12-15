import React, { useState } from 'react';
import Signup from './Signup';
import Login from './Login';
import AddItem from './AddItem';
import ViewItems from './ViewItems';

function App() {
  const [token, setToken] = useState('');

  return (
    <div className="App">
      <h1>Sign Up</h1>
      <Signup />
      <h1>Login</h1>
      <Login setToken={setToken} />
      {token && (
        <>
          <h1>Add Item</h1>
          <AddItem token={token} />
          <h1>View Items</h1>
          <ViewItems token={token} />
        </>
      )}
    </div>
  );
}

export default App;