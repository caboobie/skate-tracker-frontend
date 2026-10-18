import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const API_URL = 'https://skate-sharpening-tracker-production.up.railway.app';

function StatsPage() {
  const [overall, setOverall] = useState([]);
  const [byPosition, setByPosition] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/api/stats/hollows`)
      .then((res) => res.json())
      .then((data) => setOverall(data));

    fetch(`${API_URL}/api/stats/hollows-by-position`)
      .then((res) => res.json())
      .then((data) => setByPosition(data));
  }, []);

  const grouped = {};
  byPosition.forEach((row) => {
    if (!grouped[row.position]) grouped[row.position] = [];
    grouped[row.position].push(row);
  });

  return (
    <div>
      <Link to="/">🔙</Link>
      <h2>Hollow stats</h2>

      <h3>Most common hollows</h3>
      {overall.length === 0 && <p>No data yet.</p>}
      <ul>
        {overall.map((row) => (
          <li key={row.hollow}>
            {row.hollow}: {row.count}
          </li>
        ))}
      </ul>

      {Object.entries(grouped).map(([position, rows]) => (
  <div key={position}>
    <h4>{position}</h4>
    <ul>
      {rows.map((row) => (
        <li key={row.hollow}>
          {row.hollow}: {row.count}
        </li>
      ))}
    </ul>
  </div>
))}
    </div>
  );
}

export default StatsPage;