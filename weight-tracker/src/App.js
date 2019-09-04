import React, { useState } from 'react';
import axios from 'axios';

const fetchWeights = () => {
  const promise = axios.get('http://localhost:3001/api/weights');

  promise.then(response => {
    console.log(response);
  });
};
function App() {
  return (
    <div>
      <button onClick={() => fetchWeights()}>Click me</button>
    </div>
  );
}

export default App;
