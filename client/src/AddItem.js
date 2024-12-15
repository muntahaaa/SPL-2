import React, { useState } from 'react';
import axios from 'axios';

const AddItem = ({ token }) => {
  const [item, setItem] = useState({
    title: '',
    description: '',
    latitude: '',
    longitude: '',
    displayStatus: 'active',
    category: '',
    tags: '',
    mediaAttachment: null
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setItem({ ...item, mediaAttachment: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    if (!item.title || !item.description || !item.category || !item.tags) {
      setError('Please fill in all required fields.');
      return;
    }

    const formData = new FormData();
    for (const key in item) {
       if (key === 'category' || key === 'tags') {
        // Convert category and tags to JSON strings
        formData.append(key, JSON.stringify(item[key].split(',').map((tag) => tag.trim())));
      } else {
        formData.append(key, item[key]);
      }
    }
    try {
      const response = await axios.post('/api/v1/items', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      });
      console.log(response.data);
      setMessage('Item added successfully!');
    } catch (error) {
      setMessage('Failed to add item. Please try again.');
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="title" placeholder="Title" onChange={handleChange} />
      <input type="text" name="description" placeholder="Description" onChange={handleChange} />
      <input type="text" name="latitude" placeholder="Latitude" onChange={handleChange} />
      <input type="text" name="longitude" placeholder="Longitude" onChange={handleChange} />
      <select name="displayStatus" onChange={handleChange}>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>
      <input type="text" name="category" placeholder="Category" onChange={handleChange} />
      <input type="text" name="tags" placeholder="Tags" onChange={handleChange} />
      <input type="file" name="mediaAttachment" onChange={handleFileChange} />
      <button type="submit">Add Item</button>
      {message && <p>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
};

export default AddItem;