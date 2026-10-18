import {useState, useEffect} from 'react';
import { useParams, Link } from 'react-router-dom';

const API_URL = 'https://skate-sharpening-tracker-production.up.railway.app';

function CustomerPage() {
    const { id } = useParams();
    const [customer, setCustomer] = useState(null);
    const [history, setHistory] = useState([]);
    const [hollows, setHollows] = useState([]);
    const [hollow, setHollow] = useState('');
    const [price, setPrice] = useState('');

    useEffect(() => {
        fetch(`${API_URL}/api/customers/${id}`)
            .then((res) => res.json())
            .then((data) => setCustomer(data));
    }, [id]);

    async function loadHistory() {
        const res = await fetch(`${API_URL}/api/customers/${id}/sharpenings`);
        const data = await res.json();
        setHistory(data);
    }

    useEffect(() => {
        loadHistory();
    }, [id]);

    useEffect(() => {
        fetch(`${API_URL}/api/hollows`)
            .then((res) => res.json())
            .then((data) => setHollows(data));
    }, []);

    async function handleSharpening(e) {
        e.preventDefault();
        
        const res = await fetch(`${API_URL}/api/customers/${id}/sharpenings`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ hollow, price: price || null }),
        });

        if (res.ok) {
            setHollow('');
            setPrice('');
            await loadHistory();
        } else {
            const err = await res.json();
            alert(err.error || 'Could not save sharpening');
        }
    }

    async function handleDelete(sharpeningId) {
        if (!window.confirm('Delete this sharpening?')) return;

        const res = await fetch(`${API_URL}/api/sharpenings/${sharpeningId}`, {
            method: 'DELETE',
        });

        if (res.ok) {
            await loadHistory();
        } else {
            alert('Could not delete sharpening');
        }
    }

    if (!customer) return <p>Loading...</p>;

    return (
        <div>
            <Link to="/">🔙</Link>
            <h2>{customer.name}</h2>
            <p>Team: {customer.team} - {customer.position}</p>
            <form onSubmit={handleSharpening}>
  <select value={hollow} onChange={(e) => setHollow(e.target.value)} required>
    <option value="">Choose hollow...</option>
    {hollows.map((h) => (
      <option key={h} value={h}>{h}</option>
    ))}
  </select>
  <input
    type="number"
    placeholder="Price"
    value={price}
    onChange={(e) => setPrice(e.target.value)}
  />
  <button type="submit">Add Sharpening</button>
</form>

<h3>History</h3>
{history.length === 0 && <p>No sharpenings yet.</p>}
<ul>
  {history.map((s) => (
    <li key={s.id}>
      {s.sharpened_on} - {s.hollow} {s.price && `- £${s.price}`}
      <button onClick={() => handleDelete(s.id)}>Delete</button>
    </li>
  ))}
</ul>
            </div>
    );
}

export default CustomerPage;