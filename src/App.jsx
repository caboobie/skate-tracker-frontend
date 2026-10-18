import { Routes, Route } from 'react-router-dom';
import CustomerList from './CustomerList';
import './App.css';

function App() {
  return (
    <div>
      <h1>Skate Sharpening Tracker</h1>
      <Routes>
        <Route path="/" element={<CustomerList />} />
        <Route path="/customers/:id" element={<p>Customer page coming soon</p>} />
      </Routes>
    </div>
  );
}

export default App;