import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const API_URL = 'https://skate-sharpening-tracker-production.up.railway.app';

function CustomerList() {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState('');
  const [name, setName] = useState('');
  const [team, setTeam] = useState('');
  const [position, setPosition] = useState('');

  async function loadCustomers() {
    const res = await fetch(
      `${API_URL}/api/customers?search=${encodeURIComponent(search)}`
    );
    const data = await res.json();
    setCustomers(data);
  }

  useEffect(() => {
    loadCustomers();
  }, [search]);

  async function handleSubmit(e) {
    e.preventDefault();

    const res = await fetch(`${API_URL}/api/customers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, team, position }),
    });

    if (res.ok) {
      setName('');
      setTeam('');
      setPosition('');
      await loadCustomers();
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Team"
          value={team}
          onChange={(e) => setTeam(e.target.value)}
        />
        <input
          type="text"
          placeholder="Position"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
        />
        
        <button type="submit">Add Customer</button>
      </form>


      <input
        type="text"
        placeholder="Search customers..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
            <ul>
        {customers.map((c) => (
          <li key={c.id}>
  <Link to={`/customers/${c.id}`}>
    {c.name} - {c.team} ({c.position})
  </Link>
</li>
        ))}
      </ul>

      {customers.length === 0 && <p>No customers found.</p>}
    </div>
  );
}

export default CustomerList;