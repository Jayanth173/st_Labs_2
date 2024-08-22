import { useEffect, useState } from 'react';
import axios from 'axios';
import Header from './Header';
import './UserScreen.css';

const UserScreen = () => {
  const baseUrl = import.meta.env.VITE_REACT_APP_API;
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const email = localStorage.getItem('userEmail');

    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/v1/getuser?email=${email}`);
        setUserData(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  if (!userData) return <p>No user data found</p>;

  const userDetails = [
    { label: 'Name', value: userData.name },
    { label: 'Email', value: userData.email },
    { label: 'Gender', value: userData.gender },
    { label: 'Last Login', value: new Date(userData.lastLoginDate).toLocaleString() }
  ];

  return (
    <>
      <Header />
      <div className="container">
        <div className="inner-container">
          <h1 className="section-title">Your Details</h1>
          <div className="content-box">
            <dl className="content-list">
              {userDetails.map((detail, index) => (
                <div
                  key={index}
                  className={`content-item ${index % 2 === 0 ? 'even-item' : 'odd-item'}`}
                >
                  <dt className="content-label">{detail.label}</dt>
                  <dd className="content-value">{detail.value || 'N/A'}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserScreen;
