import { useState, useEffect } from 'react';
import './App.css';

const API_URL = 'https://skate-sharpening-tracker-production.up.railway.app';

function App() {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch(`${API_URL}/api/customers?search=${encodeURIComponent(search)}`)
      .then((res) => res.json())
      .then((data) => setCustomers(data))
      .catch((err) => console.error(err));
  }, [search]);

  return (
    <div>
      <h1>Skate Sharpening Tracker</h1>
      <input
        type="text"
        placeholder="Search customers..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <ul>
        {customers.map((c) => (
          <li key={c.id}>
            {c.name} - {c.team} ({c.position})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;