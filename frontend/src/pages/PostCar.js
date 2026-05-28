import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function PostCar() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    make: '',
    model: '',
    year: '',
    price: '',
    city: '',
    description: '',
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const data = new FormData();
      data.append('make', formData.make);
      data.append('model', formData.model);
      data.append('year', formData.year);
      data.append('price', formData.price);
      data.append('city', formData.city);
      data.append('description', formData.description);
      data.append('image', image);

      await axios.post('http://localhost:5000/api/cars', data);
      navigate('/');
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const isMobile = window.innerWidth <= 768;

  return (
    <div style={styles.container}>
      <div style={{
        ...styles.formBox,
        padding: isMobile ? '20px 15px' : '30px',
        margin: isMobile ? '10px' : '0',
      }}>
        <h2 style={styles.heading}>Post a Car</h2>

        {error && <p style={styles.error}>{error}</p>}

        <input style={styles.input} name="make" placeholder="Make (e.g. Toyota)" value={formData.make} onChange={handleChange} />
        <input style={styles.input} name="model" placeholder="Model (e.g. Corolla)" value={formData.model} onChange={handleChange} />
        <input style={styles.input} name="year" placeholder="Year (e.g. 2020)" type="number" value={formData.year} onChange={handleChange} />
        <input style={styles.input} name="price" placeholder="Price (e.g. 2500000)" type="number" value={formData.price} onChange={handleChange} />
        <input style={styles.input} name="city" placeholder="City (e.g. Karachi)" value={formData.city} onChange={handleChange} />
        <textarea style={styles.textarea} name="description" placeholder="Short Description..." value={formData.description} onChange={handleChange} rows={4} />

        <label style={styles.label}>Upload Car Image:</label>
        <input style={styles.fileInput} type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />

        <button style={styles.button} onClick={handleSubmit} disabled={loading}>
          {loading ? 'Posting...' : 'Post Listing'}
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: { padding: '20px', backgroundColor: '#f4f4f4', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'flex-start' },
  formBox: { backgroundColor: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', width: '100%', maxWidth: '500px', height: 'fit-content' },
  heading: { textAlign: 'center', color: '#1a1a2e', marginBottom: '20px', fontSize: 'clamp(20px, 5vw, 26px)' },
  input: { width: '100%', padding: '10px', marginBottom: '15px', borderRadius: '8px', border: '1px solid #ccc', fontSize: '14px', boxSizing: 'border-box', outline: 'none' },
  textarea: { width: '100%', padding: '10px', marginBottom: '15px', borderRadius: '8px', border: '1px solid #ccc', fontSize: '14px', boxSizing: 'border-box', resize: 'vertical', outline: 'none' },
  label: { fontSize: '14px', color: '#555', marginBottom: '8px', display: 'block' },
  fileInput: { marginBottom: '20px', fontSize: '14px', width: '100%' },
  button: { width: '100%', padding: '12px', backgroundColor: '#e94560', color: 'white', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' },
  error: { color: 'red', marginBottom: '10px', textAlign: 'center', fontSize: '14px' },
};

export default PostCar;