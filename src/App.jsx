import { Routes, Route, Link } from 'react-router-dom';
import CustomerList from './CustomerList';
import './App.css';
import CustomerPage from './CustomerPage';
import StatsPage from './StatsPage';
import { useState } from 'react';
import { getKey, saveKey } from './api';

function App() {
  const [hasKey, setHasKey] = useState(Boolean(getKey()));
  const [input, setInput] = useState('');

  if (!hasKey) {
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          saveKey(input);
          setHasKey(true);
        }}
      >
        <h1>Skate Sharpening Tracker</h1>
        <input
          type="password"
          placeholder="Password"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">Enter</button>
      </form>
    );
  }

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