import React, { useState } from 'react';
import './AddProductForm.css'; // Ensure this is the correct CSS file

const AddProductForm = ({ onSubmit }) => {
    const [productData, setProductData] = useState({
        productNumber: '',
        productManufacturer: '',
        productName: '',
        productOwnerName: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductData({ ...productData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ ...productData }); // Pass the entire product data back to the parent component
        setProductData({ // Reset form fields after submission
            productNumber: '',
            productManufacturer: '',
            productName: '',
            productOwnerName: '',
        });
    };

    return (
        <div className="form-container">
            <h2>Add Product</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Product Number:</label>
                    <input
                        type="text"
                        name="productNumber"
                        value={productData.productNumber}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Product Manufacturer:</label>
                    <input
                        type="text"
                        name="productManufacturer"
                        value={productData.productManufacturer}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Product Name:</label>
                    <input
                        type="text"
                        name="productName"
                        value={productData.productName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Product Owner Name:</label>
                    <input
                        type="text"
                        name="productOwnerName"
                        value={productData.productOwnerName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default AddProductForm;
