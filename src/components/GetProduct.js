import React, { useState } from 'react';
import BASE_URL from '../config';
import './GetProduct.css'; // Import the CSS file

const GetProduct = () => {
  const [productNumber, setProductNumber] = useState('');
  const [apiResponse, setApiResponse] = useState(null);

  const handleFetchProduct = () => {
    fetch(`${BASE_URL}/products/getProduct`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ productNumber }),
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to fetch product');
      }
      return response.json();
    })
    .then((data) => {
      console.log('Fetched product:', data);
      setApiResponse(data);
    })
    .catch((error) => {
      console.error('Error:', error);
      setApiResponse({
        statuscode: 500,
        message: 'Error fetching product. Please try again.',
        success: false,
      });
    });
  };

  return (
    <div className="get-product-container">
      <h2>Get Product</h2>
      <div className="get-product-input-container">
        <input
          className="get-product-input"
          type="text"
          placeholder="Enter Product Number"
          value={productNumber}
          onChange={(e) => setProductNumber(e.target.value)}
        />
        <button className="get-product-button" onClick={handleFetchProduct}>Fetch</button>
      </div>

      {apiResponse && (
        <div className="response-container">
          <p><strong>Status Code:</strong> {apiResponse.statuscode}</p>
          <p><strong>Message:</strong> {apiResponse.message}</p>
          <p><strong>Success:</strong> {apiResponse.success ? 'true' : 'false'}</p>
          
          {apiResponse.data && (
            <div className="json-box">
              <h4>Product Details:</h4>
              <pre className="json-response">
                {JSON.stringify(apiResponse.data, null, 2)}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GetProduct;
