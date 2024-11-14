import React, { useRef } from 'react';
import Timer from './components/Timer';
import 'bootstrap/dist/css/bootstrap.css';

function App() {
  const czasPracyRef = useRef(null); 

  const handleOdliczanie = () => {
    console.log('Odliczanie wystartowało!'); 
  };

  return (
    <div className="App">
      <h1 className="text-center mt-5">Timer Pracy</h1>
      <Timer CzasPracy={czasPracyRef} odliczanie={handleOdliczanie} />
    </div>
  );
}

export default App;
