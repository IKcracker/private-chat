import { useState } from 'react';
import './App.css';
import Interface from './components/Interface';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Landing from './components/Landing';

function App() {
  const [details, setDetails] = useState({ Name: '', Email: '', Tell: '' });

  function handleInputs(target) {
    const { name, value } = target;
    setDetails(old => ({ ...old, [name]: value }));
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Landing
            handleInputs={handleInputs}
            details={details}
          />
        }
      />
      <Route
        path="/home"
        element={details.Name?<Interface Name={details.Name} Email={details.Email} Tell={details.Tell} />:<Navigate to='/' element={<Landing handleInputs={handleInputs} details={details}/>}/>}
      />
    </Routes>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;
