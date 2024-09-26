import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import AddProductForm from './components/AddProductForm';
import GetProduct from './components/GetProduct';
import './App.css';
import BASE_URL from './config'; // Import the base URL

function App() {
  const [selectedMenu, setSelectedMenu] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [showGetProduct, setShowGetProduct] = useState(false);
  const [apiResponse, setApiResponse] = useState(null);
  const [transactionLink, setTransactionLink] = useState(''); // State for the transaction link

  const handleMenuClick = (menu) => {
    console.log('Menu clicked:', menu);
    setSelectedMenu(menu);
    setShowForm(menu === 'Add Product');
    setShowGetProduct(menu === 'Get Product');
    setApiResponse(null);
    setTransactionLink(''); // Clear previous link on menu change
  };

  const handleFormSubmit = (product) => {
    console.log('Product added:', product);
    
    // Use the BASE_URL variable for the fetch request
    fetch(`${BASE_URL}/products/addProduct`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    })
    .then(async (response) => {
      const data = await response.json();
      if (!response.ok) {
        throw data;
      }
      setApiResponse({
        statuscode: data.statusCode,
        message: data.message,
        success: data.success,
        transactionId: data.data?.DLT_txnId || '',
      });

      // Construct the transaction link
      const link = `http://10.210.13.86:8080/?tab=transactions&transId=${data.data?.DLT_txnId}`;
      setTransactionLink(link); // Store the constructed link in the state
      setShowForm(false);
    })
    .catch((error) => {
      setApiResponse({
        statuscode: error.statusCode || 500,
        message: error.message || `Error adding product: ${error}`,
        success: false,
        transactionId: '',
      });
    });
  };

  return (
    <div className="app">
      <Sidebar onMenuClick={handleMenuClick} />
      <div className="content">
        <h1>{selectedMenu ? `${selectedMenu} Page` : 'Welcome!'}</h1>
        {showForm && <AddProductForm onSubmit={handleFormSubmit} />}
        {showGetProduct && <GetProduct />}
        {apiResponse && (
          <div className="response-container">
            <p><strong>Status Code:</strong> {apiResponse.statuscode}</p>
            <p><strong>Message:</strong> {apiResponse.message}</p>
            <p><strong>Success:</strong> {apiResponse.success ? 'true' : 'false'}</p>
            {apiResponse.transactionId && (
              <p className="transaction-id"><strong>Transaction ID:</strong> {apiResponse.transactionId}</p>
            )}
          </div>
        )}
        {/* Display the transaction link if it exists */}
        {transactionLink && (
          <div className="transaction-link">
            <a href={transactionLink} target="_blank" rel="noopener noreferrer">
              View Transaction Details
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
