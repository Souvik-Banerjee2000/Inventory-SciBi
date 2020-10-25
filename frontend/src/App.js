import React from 'react';
import './App.css';
import ChartComponent from "./components/ChartComponent"
import Forms from './components/Forms';
import ChartContextProvider from './context/ChartContext';
import ToogleContextProvider from './context/ToogleContext';

function App() {
  return (
    <div className="App">
    <ChartContextProvider>
    <ToogleContextProvider>
      <Forms/>
      <ChartComponent/>
    </ToogleContextProvider>
    </ChartContextProvider>
    </div>
  );
}

export default App;
