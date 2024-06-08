import React, { useState, useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import axios from 'axios';
import { StoreItem } from '../components/StoreItem';

export function Store() {
  const [storeItems, setStoreItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/products'); 
        setStoreItems(response.data);
      } catch (error) {
        console.error('Error fetching store items:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <h1 className="text-dark">Store</h1>
      <Row md={2} xs={1} lg={3} className='g-3'>
        {storeItems.map(item => (
          <Col key={item.id}>
            <StoreItem
                name={item.name}
                price={item.price}
                image={item.image}
                id={item.id}
                amount={item.amount}
                maxQuantity={item.amount} 
/>
          </Col>
        ))}
      </Row>
    </>
  );
}
