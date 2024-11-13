import React, { useRef } from 'react';
import Timer from './components/Timer';
import 'bootstrap/dist/css/bootstrap.css';

function App() {
  const czasPracyRef = useRef(null); // Ref do przekazania do komponentu Timer

  const handleOdliczanie = () => {
    console.log('Odliczanie wystartowało!'); // Możesz tutaj dodać dowolną funkcję wywoływaną na start odliczania
  };

  return (
    <div className="App">
      <h1 className="text-center mt-5">Timer Pracy</h1>
      <Timer CzasPracy={czasPracyRef} odliczanie={handleOdliczanie} />
    </div>
  );
}

export default App;
