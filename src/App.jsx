import { Routes, Route, Link } from 'react-router-dom';
import CustomerList from './CustomerList';
import './App.css';
import CustomerPage from './CustomerPage';
import StatsPage from './StatsPage';


function App() {
  return (
    <div>
      <h1>Skate Sharpening Tracker</h1>
      <nav>
        <Link to="/">Customers</Link>
        <Link to="/stats">Stats</Link>
      </nav>
      <Routes>
        <Route path="/" element={<CustomerList />} />
        <Route path="/customers/:id" element={<CustomerPage />} />
        <Route path="/stats" element={<StatsPage />} />
      </Routes>
    </div>
  );
}

export default App;