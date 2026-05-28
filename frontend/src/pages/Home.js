import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Home() {
  const [cars, setCars] = useState([]);
  const [city, setCity] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth <= 768;

  const fetchCars = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/cars', {
        params: { city, minPrice, maxPrice },
      });
      setCars(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div style={styles(isMobile).container}>
      <h2 style={styles(isMobile).heading}>Browse Car Listings</h2>

      <div style={styles(isMobile).filterWrapper}>
        <div style={styles(isMobile).filterBox}>
          <input style={styles(isMobile).input} placeholder="Filter by City" value={city} onChange={(e) => setCity(e.target.value)} />
          <input style={styles(isMobile).input} placeholder="Min Price" type="number" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
          <input style={styles(isMobile).input} placeholder="Max Price" type="number" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
          <button style={styles(isMobile).button} onClick={fetchCars}>Search</button>
        </div>
      </div>

      <div style={styles(isMobile).grid}>
        {cars.length === 0 ? (
          <p style={styles(isMobile).noData}>No listings found.</p>
        ) : (
          cars.map((car) => (
            <div key={car._id} style={styles(isMobile).card}>
              <img src={car.image} alt={car.make} style={styles(isMobile).image} />
              <div style={styles(isMobile).cardBody}>
                <h3 style={styles(isMobile).carTitle}>{car.make} {car.model}</h3>
                <p style={styles(isMobile).carInfo}>Year: {car.year}</p>
                <p style={styles(isMobile).carInfo}>Location: {car.city}</p>
                <p style={styles(isMobile).carPrice}>Price: Rs. {car.price.toLocaleString()}</p>
                <div style={styles(isMobile).bottomSection}>
                  {car.isSold && <span style={styles(isMobile).soldBadge}>SOLD</span>}
                  <Link to={`/car/${car._id}`} style={styles(isMobile).detailBtn}>View Details</Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

const styles = (isMobile) => ({
  container: { padding: isMobile ? '15px' : '40px 20px', backgroundColor: '#f4f4f4', minHeight: '100vh' },
  heading: { textAlign: 'center', color: '#1a1a2e', marginBottom: '20px', fontSize: isMobile ? '24px' : '32px' },
  filterWrapper: { display: 'flex', justifyContent: 'center', marginBottom: '30px' },
  filterBox: { display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '10px', alignItems: 'stretch', backgroundColor: '#fff', padding: '15px', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', width: '100%', maxWidth: '900px' },
  input: { padding: '10px', borderRadius: '8px', border: '1px solid #ccc', fontSize: '14px', width: '100%', outline: 'none' },
  button: { padding: '10px 24px', backgroundColor: '#e94560', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '14px', width: isMobile ? '100%' : 'auto' },
  grid: { display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' },
  card: { backgroundColor: 'white', borderRadius: '14px', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' },
  image: { width: '100%', height: '200px', objectFit: 'cover', objectPosition: 'center' },
  cardBody: { padding: '15px' },
  carTitle: { color: '#1a1a2e', marginBottom: '8px', fontSize: '18px' },
  carInfo: { color: '#555', fontSize: '14px', margin: '4px 0' },
  carPrice: { color: '#e94560', fontSize: '16px', fontWeight: 'bold', marginTop: '8px' },
  bottomSection: { marginTop: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  soldBadge: { backgroundColor: '#e94560', color: 'white', padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold' },
  detailBtn: { backgroundColor: '#1a1a2e', color: 'white', padding: '8px 14px', borderRadius: '8px', textDecoration: 'none', fontSize: '14px', fontWeight: 'bold' },
  noData: { textAlign: 'center', color: '#888', fontSize: '18px', gridColumn: '1 / -1' },
});

export default Home;