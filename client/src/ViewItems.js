import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewItems = ({ token }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('/api/v1/items', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setItems(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchItems();
  }, [token]);

  return (
    <div>
      <h2>Items</h2>
      <ul>
        {items.map(item => (
          <li key={item.id}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewItems;