import {useState, useEffect} from 'react';
import { useParams, Link } from 'react-router-dom';

const API_URL = 'https://skate-sharpening-tracker-production.up.railway.app';

function CustomerPage() {
    const { id } = useParams();
    const [customer, setCustomer] = useState(null);

    useEffect(() => {
        fetch(`${API_URL}/api/customers/${id}`)
            .then((res) => res.json())
            .then((data) => setCustomer(data));
    }, [id]);

    if (!customer) return <p>Loading...</p>;

    return (
        <div>
            <Link to="/">🔙</Link>
            <h2>{customer.name}</h2>
            <p>Team: {customer.team} - {customer.position}</p>
            </div>
    );
}

export default CustomerPage;