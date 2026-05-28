import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function CarDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);

  const isMobile = window.innerWidth <= 768;

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/cars/${id}`);
        setCar(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCar();
  }, [id]);

  const markAsSold = async () => {
    try {
      await axios.patch(`http://localhost:5000/api/cars/${id}/sold`);
      setCar({ ...car, isSold: true });
    } catch (err) {
      console.log(err);
    }
  };

  const deleteCar = async () => {
    if (window.confirm('Are you sure you want to delete this listing?')) {
      try {
        await axios.delete(`http://localhost:5000/api/cars/${id}`);
        navigate('/');
      } catch (err) {
        console.log(err);
      }
    }
  };

  if (loading) return <p style={styles.loading}>Loading...</p>;
  if (!car) return <p style={styles.loading}>Car not found.</p>;

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.imageBox}>
          <img src={car.image} alt={car.make} style={styles.image} />
        </div>
        <div style={{ padding: isMobile ? '15px' : '25px' }}>
          <h2 style={styles.title}>{car.make} {car.model}</h2>

          <div style={{
            ...styles.infoGrid,
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          }}>
            <div style={styles.infoItem}>
              <span style={styles.infoLabel}>Year</span>
              <span style={styles.infoValue}>{car.year}</span>
            </div>
            <div style={styles.infoItem}>
              <span style={styles.infoLabel}>Price</span>
              <span style={styles.infoValue}>Rs. {car.price.toLocaleString()}</span>
            </div>
            <div style={styles.infoItem}>
              <span style={styles.infoLabel}>City</span>
              <span style={styles.infoValue}>{car.city}</span>
            </div>
            <div style={styles.infoItem}>
              <span style={styles.infoLabel}>Status</span>
              <span style={car.isSold ? styles.sold : styles.available}>
                {car.isSold ? 'SOLD' : 'Available'}
              </span>
            </div>
          </div>

          <div style={styles.descBox}>
            <h4 style={styles.descLabel}>Description</h4>
            <p style={styles.descText}>{car.description}</p>
          </div>

          <div style={{
            ...styles.btnRow,
            flexDirection: isMobile ? 'column' : 'row',
          }}>
            <button style={styles.backBtn} onClick={() => navigate('/')}>
              ← Back
            </button>
            {!car.isSold && (
              <button style={styles.soldBtn} onClick={markAsSold}>
                Mark as Sold
              </button>
            )}
            <button style={styles.deleteBtn} onClick={deleteCar}>
               Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { padding: '20px', backgroundColor: '#f4f4f4', minHeight: '100vh', display: 'flex', justifyContent: 'center' },
  card: { backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', overflow: 'hidden', width: '100%', maxWidth: '650px', height: 'fit-content' },
  imageBox: { width: '100%', height: '300px', overflow: 'hidden', backgroundColor: '#f0f0f0' },
  image: { width: '100%', height: '100%', objectFit: 'cover' },
  title: { color: '#1a1a2e', fontSize: 'clamp(20px, 5vw, 26px)', marginBottom: '20px' },
  infoGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' },
  infoItem: { backgroundColor: '#f4f4f4', padding: '12px', borderRadius: '8px', display: 'flex', flexDirection: 'column' },
  infoLabel: { fontSize: '12px', color: '#888', marginBottom: '4px' },
  infoValue: { fontSize: '15px', fontWeight: 'bold', color: '#1a1a2e' },
  sold: { color: '#e94560', fontWeight: 'bold', fontSize: '15px' },
  available: { color: 'green', fontWeight: 'bold', fontSize: '15px' },
  descBox: { backgroundColor: '#f4f4f4', padding: '15px', borderRadius: '8px', marginBottom: '20px' },
  descLabel: { color: '#1a1a2e', marginBottom: '8px' },
  descText: { color: '#555', fontSize: '14px', lineHeight: '1.6' },
  btnRow: { display: 'flex', gap: '10px', flexWrap: 'wrap' },
  backBtn: { flex: 1, padding: '10px 20px', backgroundColor: '#1a1a2e', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' },
  soldBtn: { flex: 1, padding: '10px 20px', backgroundColor: '#e94560', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' },
  deleteBtn: { flex: 1, padding: '10px 20px', backgroundColor: '#ff4444', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' },
  loading: { textAlign: 'center', padding: '50px', fontSize: '18px', color: '#888' },
};

export default CarDetail;