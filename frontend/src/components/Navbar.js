import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const isMobile = window.innerWidth <= 768;

  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.logo}>CarListing</Link>
      <Link to="/post" style={{
        ...styles.button,
        padding: isMobile ? '6px 12px' : '8px 18px',
        fontSize: isMobile ? '13px' : '14px',
      }}>+ Post a Car</Link>
    </nav>
  );
}

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px 20px',
    backgroundColor: '#1a1a2e',
    color: 'white',
    flexWrap: 'wrap',
    gap: '10px',
  },
  logo: {
    color: 'white',
    textDecoration: 'none',
    fontSize: 'clamp(16px, 4vw, 22px)',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#e94560',
    color: 'white',
    padding: '8px 18px',
    borderRadius: '8px',
    textDecoration: 'none',
    fontWeight: 'bold',
    fontSize: '14px',
    whiteSpace: 'nowrap',
  },
};

export default Navbar;