import React, { useState } from 'react';
import axios from 'axios';

const MentalModuleAccess = (props) => {
  const { setLoggedIn } = props;
  const [companyCode, setCompanyCode] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:3001/validate-code',
        {
          companyCode,
        },
        { withCredentials: true }
      );
      if (!response.data.valid) {
        window.alert('De bedrijfscode is ongeldig.');
      } else {
        setLoggedIn({ companyCode });
      }
    } catch (error) {
      console.error('There was an error validating the company code:', error);
    }
  };

  return (
    <div style={{ margin: '0 auto', maxWidth: '600px', padding: '20px' }}>
      <p>
        Om het preventieplatform van The Mental Move te benaderen heb je een
        bedrijfs code nodig. Deze code is aan jou verstrekt door je werkgever.
      </p>
      <p>
        Nog geen bedrijfs code? Als je toegang wilt krijgen tot dit platform of
        meer informatie wil over de dienstverlening van The Mental Move, bezoek
        dan onze{' '}
        <a
          href="https://www.thementalmove.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          website
        </a>
        .
      </p>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="companyCode">Bedrijfscode</label>
          <input
            type="text"
            id="companyCode"
            value={companyCode}
            onChange={(e) => setCompanyCode(e.target.value)}
            style={{ width: '100%', padding: '10px', marginTop: '5px' }}
            required
          />
        </div>
        <button
          type="submit"
          style={{
            padding: '10px 20px',
            marginBottom: '10px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Versturen
        </button>
      </form>
      <p>
        <a href="/privacy">Meer over jouw privacy</a>
      </p>
    </div>
  );
};

export default MentalModuleAccess;
