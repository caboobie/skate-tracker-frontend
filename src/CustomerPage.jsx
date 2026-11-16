import {useState, useEffect} from 'react';
import { useParams, Link } from 'react-router-dom';
import { apiFetch } from './api';

function CustomerPage() {
    const { id } = useParams();
    const [customer, setCustomer] = useState(null);
    const [history, setHistory] = useState([]);
    const [hollows, setHollows] = useState([]);
    const [hollow, setHollow] = useState('');
    const [price, setPrice] = useState('');
    const [notes, setNotes] = useState('');

    useEffect(() => {
        apiFetch(`/api/customers/${id}`)
            .then((res) => res.json())
            .then((data) => setCustomer(data));
    }, [id]);

    async function loadHistory() {
        const res = await apiFetch(`/api/customers/${id}/sharpenings`);
        const data = await res.json();
        setHistory(data);
    }

    useEffect(() => {
        loadHistory();
    }, [id]);

    useEffect(() => {
        apiFetch('/api/hollows')
            .then((res) => res.json())
            .then((data) => setHollows(data));
    }, []);

    async function handleSharpening(e) {
        e.preventDefault();
        
        const res = await apiFetch(`/api/customers/${id}/sharpenings`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ hollow, price: price || null, notes: notes || null }),
        });

        if (res.ok) {
            setHollow('');
            setPrice('');
            setNotes('');
            await loadHistory();
        } else {
            const err = await res.json();
            alert(err.error || 'Could not save sharpening');
        }
    }

    async function logSame() {
        const last = history[0];
        if (!last) return;

        const res = await apiFetch(`/api/customers/${id}/sharpenings`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ hollow: last.hollow, price: last.price }),
            });

        if (res.ok) {
            await loadHistory();
        } else {
            alert('Could not save sharpening');
        }
    }

    async function handleDelete(sharpeningId) {
        if (!window.confirm('Delete this sharpening?')) return;

        const res = await apiFetch(`/api/sharpenings/${sharpeningId}`, {
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

            {history[0] && (
                <button type="button" onClick={logSame}>
                    Same as last time ({history[0].hollow}
                    {history[0].price && `- £${history[0].price}`})
                </button>
            )}

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
  <input
    type="text"
    placeholder="Notes (optional)"
    value={notes}
    onChange={(e) => setNotes(e.target.value)}
  />
  <button type="submit">Add Sharpening</button>
</form>

<h3>History</h3>
{history.length === 0 && <p>No sharpenings yet.</p>}
<ul>
  {history.map((s) => (
    <li key={s.id}>
      {s.sharpened_on} - {s.hollow} {s.price && `- £${s.price}`}
      {s.notes && <p className="note">{s.notes}</p>}
      <button onClick={() => handleDelete(s.id)}>Delete</button>
    </li>
  ))}
</ul>
            </div>
    );
}

export default CustomerPage;